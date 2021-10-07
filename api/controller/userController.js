const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/user")

const jwtkey = process.env.JWT_KEY
const jwtexpirySecond = 3600

// Read operation
const login = (req, res, next) => {
    User.find({username: req.body.username}).exec()
    .then(result=>{
        console.log("result password", result[0].password)
        if(result){
            bcrypt.compare(req.body.password, result[0].password).then(
                (valid)=>{

                    if(!valid){
                        res.status(400).json({msg: "Incorrect password"})
                    }
                    
                    // Generate jwt token
                    const token = jwt.sign({username: result[0].username}, jwtkey,{
                        algorithm: "HS256",
                        expiresIn: jwtexpirySecond
                    })
                    // Set token to cookie
                    res.cookie("token", token, {maxAge: jwtexpirySecond * 1000 })
                    
                    res.status(200).json({
                        username: result[0].username,
                        msg: "Successfully logedin"
                    })
                }
            )
        }
    })
    .catch(err=>{
        console.log(err)
    })
}


// Logout
const logout = (req, res, next) => {
    res.cookie("token", "", {maxAge: -100000})
    res.status(200).json({
        msg: "Logout"
    })
}

// Create operation
const createUser = (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(
        (hash)=>{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            })
        
            user.save()
            .then(result=>{
                console.log(result)
                res.status(201).json({...result})
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json(...err)
            })
        }
    )
    
}



module.exports = {
    login,
    logout,
    createUser
}