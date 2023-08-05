const { User } = require("../models/User");
const { confirmCodeEmail } = require("../utils/emailService");
var jwt = require('jsonwebtoken');
var moment = require('moment')
let  privateKey = "lambofgod";
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Post } = require("../models/Post");
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
                        FullName:req.body.fullName,
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
            updateBio: (req, res) => {
                const { _id, bio } = req.body;
                User.findById(_id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }
                        user.bio = bio;
                        user.save()
                            .then(updatedUser => {
                                res.json(updatedUser);
                            })
                            .catch(err => {
                                res.status(500).json({ message: "Failed to update bio", error: err });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Mongo error!", error: err });
                    });
            },  createPost: (req, res) => {
                const { _id, title } = req.body;
                console.log(_id);
                User.findById(_id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }
                            // console.log(req.files.postImg.name);
                        // Eğer gönderi resmi yüklendi ise req.files'dan alıp gönderi verisine ekleyelim.
                        if (req.files && req.files.image) {
                           
                            const extName = path.extname(req.files.image.name);
                            const targetDir = path.join(__dirname, 'images');
                                  
                            if (!fs.existsSync(targetDir)) {
                                fs.mkdirSync(targetDir);
                            }
                            
                            if (extName === ".jpeg" || extName === ".jpg" || extName === ".png") {
                                const newFileName = uuidv4() + extName;
                                req.files.image.mv(path.join(targetDir, newFileName), async (err) => {
                                    if (err) {
                                        console.error('Error saving image:', err);
                                        res.status(500).send('Server Error');
                                    } else {
                                        const profilePictureURI = `${req.protocol}://${req.get('host')}/images/${newFileName}`;
                                        
                                        const post = new Post({
                                            title: title,
                                            content: req.body.content,
                                            user: _id,
                                            image: profilePictureURI // Resim URI'sini gönderiye ekleyelim.
                                        });
        
                                        // Gönderiyi veritabanına kaydedelim.
                                        post.save()
                                            .then(savedPost => {
                                                res.json(savedPost);
                                            })
                                            .catch(err => {
                                                res.status(500).json({ message: "Failed to save the post", error: err });
                                            });
                                    }
                                });
                            } else {
                                res.status(500).send("Ext error");
                            }
                        } else {
                            // Resim yüklenmediyse sadece gönderiyi kaydedelim.
                            const post = new Post({
                                title: title,
                                content: req.body.content,
                                user: _id
                            });
        
                            // Gönderiyi veritabanına kaydedelim.
                            post.save()
                                .then(savedPost => {
                                    res.json(savedPost);
                                })
                                .catch(err => {
                                    res.status(500).json({ message: "Failed to save the post", error: err });
                                });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Mongo error!", error: err });
                    });
            },
           
        
        
              getAllPosts: (req, res) => {
                // Tüm gönderileri veritabanından alın.
                Post.find()
                    .populate("user") // 'user' alanını ilgili kullanıcı ayrıntıları ile doldurun.
                    .then(posts => {
                        res.json(posts);
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Gönderileri alırken hata oluştu", error: err });
                    });
            },
        
}


module.exports = {
    userController
}