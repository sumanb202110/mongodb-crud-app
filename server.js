const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

dotenv.config()

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Libray API",
            version: "1.0.0",
            description: "Contact management app with mongodb"
        },
        server: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis:["./api/controller/*.js"]

}

const specs = swaggerJsDoc(options)

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

const {contactRouter} = require("./api/route/contactRoute")
const {userRouter} = require("./api/route/userRoute")



mongoose.connect(
    process.env.MONGODB_URL
)

app.get('/',(req, res)=>{
    res.send("Hi, welcome to CRUD operation demo app!!!!!")
})
app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/user", userRouter)



app.listen(port,()=>{
    console.log(`Server starts at localhost:${port}`)
})