const { User } = require("../models/User");
const { confirmCodeEmail } = require("../utils/emailService");
var jwt = require('jsonwebtoken');
var moment = require('moment')
let privateKey = "lambofgod";
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Post } = require("../models/Post");
const { Like } = require("../models/Like");
const { Comment } = require("../models/Comment");
const { Follow } = require("../models/Follow");
const { Story } = require("../models/Story");
const { Chat } = require("../models/Chat");
const userController = {


    register: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(data => {
                if (!data) {
                    var randomCode = Math.floor((Math.random() * 1000) + 1000)
                    confirmCodeEmail(req.body.email, randomCode)

                    var user = new User({
                        email: req.body.email,
                        password: req.body.password,
                        code: randomCode,
                        seria: req.body.seria,
                        FullName: req.body.fullName,
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
        User.findOne({ email: req.body.email.toLowerCase() })
            .then(data => {

                if (data) {

                    if (data.code == req.body.code) {
                        if (data.codeCounter > 0 && moment(data.codeExpire) > moment()) {
                            data.codeCounter = 3;
                            data.isActive = true;
                            data.save();

                            let token = jwt.sign(req.body.email, privateKey);
                            res.json({ token: token, user: data })
                        }
                        else {
                            res.status(500).json({ "message": "Code counter or code expire error!" })
                        }
                    }
                    else {
                        data.codeCounter = data.codeCounter - 1;
                        data.save();
                        res.status(500).json({ "message": "Code wrong!" })
                    }
                }
                else {
                    res.status(500).json({ "msg": "Confirm Code errorrrr" })
                }
            })
            .catch(err => {
                res.status(500).send("Mongo error!")
            })
    }, login: (req, res) => {
        User.findOne({ email: req.body.email?.toLowerCase(), password: req.body.password })
            .then(data => {
                if (data) {
                    var randomCode = Math.floor((Math.random() * 1000) + 1000)
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
        const { _id } = req.body;
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
    }, createPost: (req, res) => {
        const { _id, title } = req.body;
        (_id);
        User.findById(_id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
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
    getPostByUserId: (req, res) => {
        const userId = req.body.id; // İstek gövdesinden kullanıcı ID'sini alın.
        Post.find({ "user": userId }) // Kullanıcının ID'sine göre uygun tüm postları bulun.
            .populate("user") // 'user' alanını ilgili kullanıcı ayrıntıları ile doldurun.
            .then(posts => {
                res.json(posts);
            })
            .catch(err => {
                res.status(500).json({ message: "Postları alırken hata oluştu", error: err });
            });
    },
    likePost: async (req, res) => {
        try {
            const { userId, postId, authId } = req.body;

            // Kullanıcı ve gönderi var mı diye kontrol edelim
            const user = await User.findById(userId);
            const auth = await User.findById(authId);
            const post = await Post.findById(postId);
            if (!user || !post || !auth) {
                return res.status(404).json({ message: "User or post not found" });
            }

            // Kullanıcının bu gönderiyi daha önce beğenip beğenmediğini kontrol edelim
            const existingLike = await Like.findOne({ user: userId, post: postId });

            if (existingLike) {

                await Like.deleteOne({ _id: existingLike._id }); // Belgeyi silmek için deleteOne kullanılıyor
                post.likes.pull(existingLike._id);
                await post.save();
                res.json({ message: "Post deleted successfully" });

            }
            else {
                const newLike = new Like({
                    user: userId,
                    post: postId,
                    auth: authId
                });

                await newLike.save();

                post.likes.push(newLike._id);
                await post.save();

                res.json({ message: "Post liked successfully", like: newLike });

            }

            // Yeni bir Like oluşturup kaydedelim

        } catch (error) {
            console.error("Error liking post:", error);
            res.status(500).json({ message: "An error occurred while liking the post" });
        }
    },

    getAllLikes: async (req, res) => {
        try {
            const likes = await Like.find()
                .populate("user")
                .populate("post")
                .populate("auth")
                .exec();

            res.json(likes);
        } catch (error) {
            console.error("Error getting likes:", error);
            res.status(500).json({ message: "An error occurred while getting likes" });
        }
    },
    CommentPost: async (req, res) => {
        try {

            const { userId, postId, authId, message } = req.body;
            const user = await User.findById(userId);
            const auth = await User.findById(authId);
            const post = await Post.findById(postId);
            if (!user || !post || !auth) {
                return res.status(404).json({ message: "User or post not found" });
            } else {
                const newComment = new Comment({
                    user: userId,
                    post: postId,
                    auth: authId,
                    message: message
                });
                post.comments.push(newComment._id);
                await post.save();
                await newComment.save();

                res.json({ message: "Comment added successfully", comment: newComment });
            }

        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ message: "An error occurred while adding the comment" });
        }
    }
    ,
    getAllComments: async (req, res) => {
        try {
            const Comments = await Comment.find()
                .populate("user")
                .populate("post")
                .populate("auth")
                .exec();

            res.json(Comments);
        } catch (error) {
            console.error("Error getting likes:", error);
            res.status(500).json({ message: "An error occurred while getting likes" });
        }
    }, deletePost: async (req, res) => {
        try {
            const { _id } = req.body;

            // Find the post to be deleted
            const post = await Post.findById(_id);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            await Like.deleteMany({ post: _id });
            await Comment.deleteMany({ post: _id });
            await Post.deleteOne({ _id: _id });

            res.json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ message: "An error occurred while deleting the post" });
        }
    },
    follow: async (req, res) => {
        try {
            const { follower, followed } = req.body;


            const deletedFollow = await Follow.findOneAndDelete({ follower, followed });

            if (deletedFollow) {
                res.status(200).json({ message: 'Takip başarılı bir şekilde silindi.' });
            } else {
                const follow = new Follow({ follower, followed });
                await follow.save();
                res.status(201).json({ message: 'Takip başarılı bir şekilde oluşturuldu.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Takip silinirken bir hata oluştu.' });
        }
    },
    getAllFollowers: async (req, res) => {
        try {

            const allFollows = await Follow.find()
                .populate("follower")
                .populate("followed")
                .exec();
            res.status(200).json(allFollows);
        } catch (error) {
            res.status(500).json({ error: 'Takip kayıtları getirilirken bir hata oluştu.' });
        }
    },  getAllUsers : async(req,res) =>{
        try {
          
            const allUsers= await User.find()
            
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json({ error: 'Takip kayıtları getirilirken bir hata oluştu.' });
        }
    } ,getAllStory: (req, res) => {
       
        Story.find()
            .populate("user") 
            .then(posts => {
                res.json(posts);
            })
            .catch(err => {
                res.status(500).json({ message: "Gönderileri alırken hata oluştu", error: err });
            });
    }, addUserToStory: async (req, res) => {
        try {
            const { storyId, userId } = req.body;
            const story = await Story.findById(storyId)
             
            if (!story) {
                return res.json({ message: "stroy not found"  });

            }
             const user = await User.findById(userId)
           
    
            if (!user) {
                return res.json({ message: "User not found"  });
            }
    
            // Check if the user is already in the story's users array
            if (story.users.includes(userId)) {
               return res.json({ message: "User is already in the story"  });
            }
    
            // Add the user to the story's users array
            story.users.push(user);
            await story.save();
      
            res.json({ message: "User added to the story successfully", story });
        } catch (error) {
            console.error("Error adding user to story:", error);
            res.status(500).json({ message: "An error occurred while adding user to story" });
        }
    },
    createChatMessage : async (req, res) => {
        try {
          const { sender, receiver, content } = req.body; // Req'den gelen verileri alın.
      
          // Verileri kullanarak yeni bir mesaj oluşturun.
          const newMessage = {
            sender,
            receiver,
            content,
          };
      
          // Chat koleksiyonuna yeni mesajı ekleyin.
          const chat = await Chat.findOneAndUpdate(
            {},
            {
              $push: { messages: newMessage },
            },
            { upsert: true, new: true }
          );
      
          // Başarılı bir yanıt gönderin.
          res.status(201).json(chat);
        } catch (error) {
          // Hata durumunda uygun bir hata mesajıyla yanıt verin.
          console.error(error);
          res.status(500).json({ error: 'Bir hata oluştu' });
        }
    },
    getAllMessages : async (req, res) => {
        try {
        
            const chat = await Chat.findOne({}, 'messages');
    
            const messages = chat.messages;
            res.status(200).json(messages);
        } catch (error) {

          console.error(error);
          res.status(500).json({ error: 'Bir hata oluştu' });
        }
      }



}


module.exports = {
    userController
}