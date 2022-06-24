const express = require("express");
const contactController = require("../Controllers/contact_controller")
const route = express.Router();


route.post("/create",contactController.createContact);

route.get("/getAll",contactController.getAllContact);

route.put("/updatecontact/:id",contactController.updateContact);

route.delete("/deletecontact/:id",contactController.deleteContact);

module.exports = route;