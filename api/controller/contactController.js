const mongoose = require("mongoose")
const Contact = require("../../models/contact")



// Read operation
const getContact = (req, res, next) => {
    Contact.find().exec()
    .then(result=>{
        res.status(200).json([...result.map((data)=>{
            return {
                name: data.name,
                mobile_no: data.mobile_no
            }
        })])
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({
            msg: "Error"
        })
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
            res.status(201).json({
                msg: "Successfully created"
            })
        })
        .catch(err=>{
            console.log(err)
            if(err.code === 11000){
                res.status(400).json({
                    msg: "Duplicate entry"
                })
            }
            res.status(400).json({
                msg: "Error"
            })
        })
}

// update operation
const updateConact = (req, res, next) => {
    Contact.updateOne({name: req.body.name},{mobile_no: req.body.mobile_no}).exec()
    .then(result=>{
        console.log(result)
        if(result.modifiedCount === 1){
            res.status(200).json({
                msg: "Successfull updated"
            })
        }else{
            res.status(404).json({
                msg: "No matched contact found"
            })
        }  
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({
            msg: "Error"
        })
    })
}

// Detete operation
const deleteContact = (req, res, next) => {
    Contact.deleteOne({name: req.params.name}).exec()
    .then(result=>{
        res.status(204)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({
            msg: "Error"
        })
    })
}

module.exports = {
    getContact,
    createContact,
    deleteContact,
    updateConact
}