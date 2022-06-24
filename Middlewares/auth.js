const jwt = require("jsonwebtoken")

const JWT_SECRET= process.env.JWT_SECRET

const verify_token=function(req,res,next){
    const authHeader=req.headers.authorization
    if (authHeader) {
const token = authHeader
jwt.verify(token,"JWT_SECRET",function(err,PAYload){
if (err) {
    return res.status(403).json({message:"invalid token"})
} else {
    req.user_data=PAYload 
    next()
}
}
)       
    } else {
        res.status(401).json({message:"You are note authenticated"})
    }



}

module.exports=verify_token