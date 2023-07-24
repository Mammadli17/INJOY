const express = require('express');
const app = express();


const { userRoutes } = require('./routes/userRoutes');


const { db } = require('./config/db');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use(express.urlencoded({extended: true})); 
db.connect()
app.use('/api/user', userRoutes)

app.post("/token", (req,res) => {
    let token = req.body.token;
    try {
        jwt.verify(token, "lambofgod");
        res.send("OK");
    } catch (error) {
        res.status(500).send("Token EXPIRE!");
    }
})

app.listen(8080, () => {
    console.log('Server is running...');
})




