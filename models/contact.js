const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    mobile_no: Number

})

module.exports = mongoose.model('Contact', contactSchema)