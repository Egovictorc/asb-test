const mongoose = require("mongoose")
const { isEmail } = require("validator")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [isEmail, "Invalid email"],
        required: true
    },
    password: {
            type: String,
            required: true
    }

})

module.exports = mongoose.model("admins", adminSchema)