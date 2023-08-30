const { userRoutes } = require('./routes/userRoutes');
const { db } = require('./config/db');
var jwt = require('jsonwebtoken');
const { User } = require('./models/User');
const { Post } = require('./models/Post');
const { Story } = require('./models/Story');

db.connect()
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(fileUpload());
app.use('/api/user', userRoutes)

app.get('/api/images', (req, res) => {
  const imageDir = path.join(__dirname, 'images');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Error reading image directory:', err);
      res.status(500).send('Server Error');
    } else {
      const images = files.map(file => {
        return {
          filename: file,
          url: `${req.protocol}://${req.get('host')}/images/${file}`
        };
      });
      res.json(images);
    }
  });
});
app.post('/api/s', async (req, res) => {
  const { _id, title } = req.body;
  User.findById(_id)
      .then(user => {
        
        
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
      
              // (req.files.postImg.name);
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
})
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.profileImg) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const extName = path.extname(req.files.profileImg.name);
  const targetDir = path.join(__dirname, 'images');

  // Create the 'images' directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  if (extName == ".jpeg" || extName == ".jpg" || extName == ".png") {
    const newFileName = uuidv4() + extName;
    req.files.profileImg.mv(path.join(targetDir, newFileName), async (err) => {
      if (err) {
        console.error('Error saving image:', err);
        res.status(500).send('Server Error');
      } else {
        // If the image is uploaded successfully, save the image URI to the database instead of the local file path.
        const userId = req.body.userId; // Get the user ID from the request body (sent from the React app).
        const profilePictureURI = `${req.protocol}://${req.get('host')}/images/${newFileName}`;

        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { profilepicture: profilePictureURI }, { new: true });
          res.send('Ok');
        } catch (err) {
          console.error('Error updating user profile picture:', err);
          res.status(500).send('Server Error');
        }
      }
    });
  } else {
    res.status(500).send("Ext error");
  }
});

app.post("/token", (req,res) => {
  let token = req.body.token;
  try {
      jwt.verify(token, "lambofgod");
      res.send("OK");
  } catch (error) {
      res.status(500).send("Token EXPIRE!");
  }
})
// app.post('/api/story', async (req, res) => {
 
//   if (!req.files || !req.files.story) {
//     res.status(400).send('No file uploaded.');
//     return;
//   }


//   const extName = path.extname(req.files.story.name);
//   const targetDir = path.join(__dirname, 'images');
//   if (!fs.existsSync(targetDir)) {
//     fs.mkdirSync(targetDir);
//   }
//   if (extName == ".jpeg" || extName == ".jpg" || extName == ".png") {

//     const newFileName = uuidv4() + extName;
//     req.files.story.mv(path.join(targetDir, newFileName), async (err) => {
//       if (err) {
//         console.error('Error saving image:', err);
//         res.status(500).send('Server Error');
//       } else {
//         // If the image is uploaded successfully, save the image URI to the database instead of the local file path.
//         const userId = req.body.userId; // Get the user ID from the request body (sent from the React app).
//         const profilePictureURI = `${req.protocol}://${req.get('host')}/images/${newFileName}`;

//         try {
//           const updatedUser = await User.findByIdAndUpdate(userId, { story: profilePictureURI }, { new: true });
//           res.send('Ok');
//         } catch (err) {
//           console.error('Error updating user profile picture:', err);
//           res.status(500).send('Server Error');
//         }
//       }
//     });
//   } else {
//     res.status(500).send("Ext error");
//   }
// });
app.post('/api/story', async (req, res) => {
  const { _id } = req.body;
  User.findById(_id)
      .then(user => {
        
        
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
      
              // (req.files.postImg.name);
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
                          
                          const story = new Story({
                             
                              user: _id,
                              image: profilePictureURI 
                          });

                          // Gönderiyi veritabanına kaydedelim.
                          story.save()
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
          }
      })
      .catch(err => {
          res.status(500).json({ message: "Mongo error!", error: err });
      });
})


app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(8080, () => {
  console.log('Server is running...');

});

