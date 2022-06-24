const route= require("express").Router()

const { getbyID } = require("../Controllers/Users_controller")
const usercontroller = require("../Controllers/Users_controller")

 route.post("/register",usercontroller.Registeruser)

 route.get("/getAll",usercontroller.getAllregistred)

 route.get("/getbyName",usercontroller.getbyName)

 route.get("/getbyId/:id",usercontroller.getbyID)

 route.put("/updateUser/:id",usercontroller.updateUser);

 route.delete("/deleteUser/:id",usercontroller.deleteUser);

 route.post("/login",usercontroller.login);
 
route.post("/refreshtoken",usercontroller.refreshtoken)

route.post("/logout",usercontroller.logout)

 module.exports=route