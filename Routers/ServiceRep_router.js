const express = require("express")
const route =express.Router()
const ServiceRepController = require ("../Controllers/ServiceRep_controller")
const upload = require("../Middlewares/uploadFile")


// route.post("/createArt",articleController.createArticle)

route.post("/createService",upload.single("image"),ServiceRepController.createService)

route.get("/getAllServices",ServiceRepController.getAllServices)

route.get("/getMySer/:id",ServiceRepController.getmySer)

route.get("/getbyID/:id",ServiceRepController.getbyId)

route.get("/getbyName",ServiceRepController.getbyName)

route.put("/updateService/:id",upload.single("image"),ServiceRepController.updateService)

route.delete("/deleteService/:id",ServiceRepController.deleteService)





module.exports = route