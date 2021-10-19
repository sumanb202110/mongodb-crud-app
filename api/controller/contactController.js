const mongoose = require("mongoose")
const Contact = require("../../models/contact")



// Read operation
const getContact = async (req, res, next) => {
    try{
        const result = await Contact.find()
        console.log(result)
        res.status(200).json([...result.map((data)=>{
                    return {
                        name: data.name,
                        mobile_no: data.mobile_no
                    }
                })]).send()
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: "Error"
        }).send()
    }
}

// Create operation
const createContact = async (req, res, next) => {
    try{
        const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            mobile_no: req.body.mobile_no
        })
        const result = await contact.save()
    
        console.log(result)
            res.status(201).json({
                msg: "Successfully created"
            }).send()

    }catch(err){
        console.log(err)
        if(err.code === 11000){
            return res.status(400).json({
                msg: "Duplicate entry"
            }).send()
        }
        res.status(400).json({
            msg: "Error"
        }).send()
    }
}

// update operation
const updateContact = async (req, res, next) => {
    try{
        const result = await Contact.updateOne({name: req.body.name},{mobile_no: req.body.mobile_no})

        console.log(result)
        if(result.modifiedCount === 1){
            return res.status(200).json({
                msg: "Successfull updated"
            }).send()
        }else{
            return res.status(404).json({
                msg: "No matched contact found"
            }).send()
        }  

    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: "Error"
        }).send()
    }
}

// Detete operation
const deleteContact = async (req, res, next) => {
    try{
        const result = await Contact.deleteOne({name: req.params.name})
        if(result.deletedCount === 1){
            return res.status(204).send()
        }else{
            res.status(200).json({
                msg: "Contact not found"
            }).send()
        }
    }catch(err){
        console.log("err",err)
        res.status(400).json({
            msg: "Error"
        }).send()
    }
    
}

module.exports = {
    getContact,
    createContact,
    deleteContact,
    updateContact
}