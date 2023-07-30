const { userRoutes } = require('./routes/userRoutes');
const { db } = require('./config/db');
var jwt = require('jsonwebtoken');
const { User } = require('./models/User');
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
app.post("/token", (req,res) => {
    let token = req.body.token;
    try {
        jwt.verify(token, "lambofgod");
        res.send("OK");
    } catch (error) {
        res.status(500).send("Token EXPIRE!");
    }
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
        // Resim başarıyla yüklendiyse, resmin adını ve konumunu veritabanına kaydedelim.
        const userId = req.body.userId; // React tarafından gelen kullanıcı kimliğini alıyoruz
        const profilePicturePath = path.join(targetDir, newFileName);

        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { profilepicture: profilePicturePath }, { new: true });
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

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(8080, () => {
  console.log('Server is running...');
});

