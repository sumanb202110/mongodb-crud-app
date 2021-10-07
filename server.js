const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

const {contactRouter} = require("./api/route/contactRoute")


mongoose.connect(
    process.env.MONGODB_URL
)

app.get('/',(req, res)=>{
    res.send("Hello")
})
app.use("/api/v1/contact", contactRouter)


app.listen(port,()=>{
    console.log(`Server starts at localhost:${port}`)
})