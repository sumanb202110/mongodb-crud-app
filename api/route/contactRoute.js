const {Router} = require("express")
const contactRouter = Router()

const {auth} = require("../../middleware/auth")

const {getContact, createContact, deleteContact, updateContact} = require("../controller/contactController")

contactRouter.route("/").get(auth, getContact)
contactRouter.route("/").post(auth, createContact)
contactRouter.route("/:name").delete(auth, deleteContact)
contactRouter.route("/").patch(auth, updateContact)




module.exports = {
    contactRouter
}