const express = require("express")
const route =express.Router()
const articleController=require("../Controllers/Article_controller")
const upload = require("../Middlewares/uploadFile")


// route.post("/createArt",articleController.createArticle)

route.post("/createArt",upload.single("image"),articleController.createArticle)

route.get("/getAllArt",articleController.getAllarticles)

route.get("/getbyID/:id",articleController.getbyId)

/////////////////Homme/////////////////
route.get("/getbyGenreH",articleController.getbygenreH)

route.get("/getbytypeMH",articleController.getbytypeMH)
route.get("/getbytypeLH",articleController.getbytypeLH)
route.get("/getbytypeAH",articleController.getbytypeAH)

/////////////////Femme/////////////////
route.get("/getbyGenreF",articleController.getbygenreF)

route.get("/getbytypeMF",articleController.getbytypeMF)
route.get("/getbytypeLF",articleController.getbytypeLF)
route.get("/getbytypeAF",articleController.getbytypeAF)

/////////////////Enfants/////////////////
route.get("/getbyGenreE",articleController.getbygenreE)

route.get("/getbytypeME",articleController.getbytypeME)
route.get("/getbyTypeLE",articleController.getbytypeLE)
route.get("/getbyTypeAE",articleController.getbytypeAE)

//////////////////////////////////
route.get("/getbyPromo",articleController.getbyPromotion)

route.put("/updateArt/:id",upload.single("image"),articleController.updateArt)

route.delete("/deleteArt/:id",articleController.deleteArt)





module.exports = route