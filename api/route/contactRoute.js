const {Router} = require("express")
const contactRouter = Router()

const {getContact, createContact, deleteContact, updateConact} = require("../controller/contactController")

contactRouter.route("/").get(getContact)
contactRouter.route("/").post(createContact)
contactRouter.route("/").delete(deleteContact)
contactRouter.route("/").put(updateConact)




module.exports = {
    contactRouter
}