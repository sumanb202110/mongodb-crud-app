const mongoose = require("mongoose")
const contact = require("../../models/contact")
const Contact = require("../../models/contact")


const getContact = (req, res, next) => {
    contact.find().exec()
    .then(result=>{
        res.json({...result})
    })
    .catch(err=>{
        console.log(err)
    })
}

const createContact = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        mobile_no: req.body.mobile_no
    })

    contact.save()
    .then(result=>{
        console.log(result)
        res.status(201).json({...result})
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(...err)
    })
}

module.exports = {
    getContact,
    createContact
}