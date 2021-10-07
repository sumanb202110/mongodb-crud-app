const mongoose = require("mongoose")
const contact = require("../../models/contact")
const Contact = require("../../models/contact")


// Read operation
const getContact = (req, res, next) => {
    contact.find().exec()
    .then(result=>{
        res.status(200).json({...result})
    })
    .catch(err=>{
        console.log(err)
    })
}

// Create operation
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

// update operation
const updateConact = (req, res, next) => {
    contact.updateMany({name: req.body.name},{mobile_no: req.body.mobile_no}).exec()
    .then(result=>{
        res.status(200).json({...result})
    })
    .catch(err=>{
        console.log(err)
    })
}

// Detete operation
const deleteContact = (req, res, next) => {
    contact.deleteOne({name: req.body.name}).exec()
    .then(result=>{
        res.status(200).json({...result})
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = {
    getContact,
    createContact,
    deleteContact,
    updateConact
}