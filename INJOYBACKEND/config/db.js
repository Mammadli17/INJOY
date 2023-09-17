const { default: mongoose } = require("mongoose");



const db = {
    connect: async () => {
        try {
            await mongoose.connect("mongodb+srv://isaom:Mammadli10@cluster0.gjsudo2.mongodb.net/?retryWrites=true&w=majority")
        }
         catch (error) {
           
        }
    }
}

module.exports = {
    db
}