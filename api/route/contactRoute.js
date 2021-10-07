const {Router} = require("express")
const contactRouter = Router()

const {getContact, createContact} = require("../controller/contactController")

contactRouter.route("/").get(getContact)
contactRouter.route("/").post(createContact)


module.exports = {
    contactRouter
}