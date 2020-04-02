const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    description: {
        type: String,
     },
     beds: {
        type: Number,
    },
     available: {
        type: Number,
    },
    cost: {
        type: Number,
        default: 5000,
    },
    gender: {
        male: {type: Boolean},
        female: {type: Boolean},
    }

})

module.exports = mongoose.model("Rooms", roomSchema)