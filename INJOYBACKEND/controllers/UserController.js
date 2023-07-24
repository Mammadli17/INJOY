const { User } = require("../models/User");
const { confirmCodeEmail } = require("../utils/emailService");
var jwt = require('jsonwebtoken');
var moment = require('moment')
let  privateKey = "lambofgod";
const userController = {


    register: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(data => {
                if (!data) {
                    var randomCode = Math.floor((Math.random()*1000)+1000)
                    confirmCodeEmail(req.body.email, randomCode)

                    var user = new User({
                        email: req.body.email,
                        password: req.body.password,
                        code: randomCode,
                        seria:req.body.seria,
                        finCode:req.body.finCode,
                    

                    });
                    user.codeExpire = moment().add(120, 'seconds');
                    user.save()
                        .then(saveRes => {
                            res.json(saveRes)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }
                else {
                    res.json({ "msg": "Bu email sisteme kayıtlı!" })
                }
            })

    },
    confirmCode: (req, res) => {

      
        User.findOne({ email: req.body.email.toLowerCase()})
            .then(data => {
           
                if (data) {

                    if(data.code == req.body.code){
                        if(data.codeCounter > 0 && moment(data.codeExpire) > moment()){
                            data.codeCounter = 3;
                            data.isActive = true;
                            data.save();
    
                            let token = jwt.sign(req.body.email,privateKey);
                            res.json({token: token })
                        }
                        else{
                            res.status(500).json({"message":"Code counter or code expire error!"})
                        }
                    }
                    else{
                        data.codeCounter = data.codeCounter - 1;
                        data.save();
                        res.status(500).json({"message":"Code wrong!"})
                    }
                }
                else {
                    res.status(500).json({ "msg": "Confirm Code errorrrr" })
                }
            })
            .catch(err => {
                console.log('Err', err);
                res.status(500).send("Mongo error!")
            })
    },
  
}


module.exports = {
    userController
}