const { User } = require("../models/User");
const { confirmCodeEmail } = require("../utils/emailService");
var jwt = require('jsonwebtoken');
var moment = require('moment')
let  privateKey = "lambofgod";
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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
                        FullName:req.body.FullName,
                    });
                    user.codeExpire = moment().add(120, 'seconds');
                    user.save()
                        .then(saveRes => {
                            res.json(user)
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
                            res.json({token: token, user:data})
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
    }, login: (req, res) => {
        User.findOne({ email: req.body.email?.toLowerCase(), password: req.body.password })
            .then(data => {
                console.log("data",data); 
                if (data) {
                    console.log("s");
                    var randomCode = Math.floor(Math.random() * 10000);
                    data.code = randomCode;
                   

                    confirmCodeEmail(req.body.email, randomCode);
                    data.codeExpire = moment().add(120, 'seconds');
                    data.save();
                    res.json({ email: req.body.email })

                }
                else {
                    res.status(404).json({ "msg": "Email or password error" })
                }
            })

    },
        getUser: (req, res) => {
            const { _id} = req.body;
    
            // Find the user by the provided id
            User.findById(_id)
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }
    
                 res.json(user)
                })
                .catch(err => {
                    res.status(500).json({ message: "Mongo error!" });
                });
    
            },

            getPicture: (req, res) => {
                
             
            }
        
  
}


module.exports = {
    userController
}