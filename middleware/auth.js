const jwt = require("jsonwebtoken")

const jwtkey = process.env.JWT_KEY

const auth = (req, res, next) => {
    try{
        const token = req.headers.cookie.split('=')[1]
        const payload = jwt.verify(token, jwtkey)
        const username = payload.username

        if(!username){
            res.status(401).json({
                msg: "unauthorized access"
            })
        }
        next()
    }catch(e){
        res.status(401).json({
            msg: "unauthorized access"
        })
    }
}

module.exports = {
    auth
}