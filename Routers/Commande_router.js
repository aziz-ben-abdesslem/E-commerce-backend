const express = require("express");

const commandeController = require("../Controllers/Commande_controller");
const route = express.Router();


route.post("/create",commandeController.create);

route.get("/getAll",commandeController.getall);

route.get("/income",commandeController.getincome);

route.get("/getOrderbyId/:id",commandeController.getOrderbyId);

route.get("/getOrderbyRef/",commandeController.getOrderbyRef);

route.put("/updateOrder/:id",commandeController.updateOrder);

route.delete("/deleteOrder/:id",commandeController.deleteOrder);

module.exports = route;
