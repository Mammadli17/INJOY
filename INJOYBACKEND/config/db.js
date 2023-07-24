const { default: mongoose } = require("mongoose");



const db = {
    connect: async () => {

        try {
            await mongoose.connect("mongodb+srv://isaom:Mammadli10@cluster0.gjsudo2.mongodb.net/?retryWrites=true&w=majority")
            console.log('Mongoose connected!!');
        } catch (error) {

            console.log('Mongoose Error', error);
        }
    }
}

module.exports = {
    db
}