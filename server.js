const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerDocumet = require("./swagger.json")
dotenv.config()



const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumet))

const {contactRouter} = require("./api/route/contactRoute")
const {userRouter} = require("./api/route/userRoute")



mongoose.connect(
    process.env.MONGODB_URL
)

app.get('/',(req, res)=>{
    res.send("Hi, welcome to CRUD operation demo app!!!!!")
})
app.use("/api/v1/contacts", contactRouter)
app.use("/api/v1/users", userRouter)



app.listen(port,()=>{
    console.log(`Server starts at localhost:${port}`)
})