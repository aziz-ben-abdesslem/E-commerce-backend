const user_model = require("../Models/Users_model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
let refreshTokens = [];


var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fd22f62a8081de",
    password: "644b52e9482aed",
  },
});

//generate AccessToken
const generateAccessToken = function (user) {
  return jwt.sign({ id: user.id, email: user.email }, "JWT_SECRET", {
    expiresIn: "30m",
  });
};

//generate refreshToken
const generateRefreshToken = function (user) {
  return jwt.sign({ id: user.id, email: user.email }, "R_JWT_SECRET", {
    expiresIn: "40m",
  });
};

module.exports = {

  Registeruser: function (req, res) {
    const user = new user_model(req.body);
    user.save(req.body, function (err, item) {
      if (err) {
        res
          .status(400)
          .json({
            success: false,
            message: "Failed to register user" + err,
            data: null,
          });
      } else {
        transport.sendMail(
          {
            from: "chicwatch1@gmail.com",
            to: item.email,
            cc: "azizbna20@gmail.com",
            bcc: "zouhaierbenabdesslem@gmail.com",
            subject: "Bienvenue" + item.firstName,
            text: "bonjour Mr/Mme ",
            html: `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta http-equiv="x-ua-compatible" content="ie=edge">
                  <title>Bienvenue Email</title>
                </head>
                <body>
                  <h2>Hello ${
                    item.firstName + " Aziz ben abdesslem " + item.lastName
                  }! </h2>
                  <p>We're glad to have you on board at ${item.email}. </p>
                  <p>We're glad to have you on board at chic watch.tn</p>
                </body>
                </html>`,
          },
          function (err, info) {
            if (err) {
              console.log("error" + err);
            } else {
              console.log("e-mail sended successfully", info + res);
            }
          }
        );
        res
          .status(200)
          .json({
            success: true,
            message: "User has registred successfully",
            data: item,
          });
      }
    });
  },

  getAllregistred: function (req, res) {
    user_model.find(function (err, item) {
      if (err) {
        res
          .status(402)
          .json({
            success: false,
            message: "Failed to get all registred",
            data: null + err,
          });
      } else {
        res
          .status(203)
          .json({ success: true, message: "List of registred", data: item });
      }
    });
  },

getbyName:function(req,res){
user_model.find({nom: req.query.nom} ,function(err,items){
  if (err) {
    res.status(403).json({success:false,message:"Cannot get users by name",data:null})
  } else {
    res.status(203).json({success:true,message:"Users by this name has founded",data:items})
  }
})
},

getbyID: function(req,res){
  user_model.findById(req.params.id, function (err, item) {
    if (err) {
      res.status(405).json({
        success: false,
        message: "Failed to get user by ID"+err,
        data: null,
      });
    } else {
      res
        .status(202)
        .json({ success: true, message: "User founded", data: item });
    }
  });
},

updateUser:function(req,res){
  user_model.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,item)
  {
    if (err) {
      res.status(401).json({
        success: false,
        message: "connot update user",
        data: null,
      });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user updated successfully", data: item });
    }
  })
},

deleteUser:function(req,res){
  user_model.findByIdAndDelete(req.params.id,function(err,item){
    if (err) {
      res.status(406).json({success:false,message:"cannot delete user",data:null})
    } else {
      res.status(201).json({success:true,message:"user deleted successfully",data:item})
    }
  })
},

  login: function (req, res) {
    user_model.findOne({email:req.body.email}, function (err, user) {
      if (err) {
        res
          .status(404)
          .json({ success: false, message: "Failed to login", data: null });
      } else {
        if (user != null) {
          if (bcrypt.compareSync(req.body.password,user.password)) {
            const AccessToken = generateAccessToken(user);

            const RefreshToken = generateRefreshToken(user);

            refreshTokens.push(RefreshToken);

            res
              .status(201)
              .json({
                success: true,
                message: "Hello dear",
                data: user,
                AccessToken,
                RefreshToken,
              });
          } else {
            res
              .status(404)
              .json({
                success: false,
                message: "incorrect password",
                data: null,
              });
          }
        } else {
          res
            .status(406)
            .json({ success: false, message: "incorrect email", data: null });
        }
      }
    });
  },

  refreshtoken: function (req, res, next) {

    //Take the refresh token from user

    const refreshToken = req.body.token;

    //send error if there is not token or its invalid

    if (!refreshToken) {
      return res.status(401).json({ message: "you are not authenticated" });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "refresh token is invalid" });
    }

    jwt.verify(refreshToken, "R_JWT_SECRET", function (err, user) {
      err && console.log(err);

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(user);

      const newRefreshToken = generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      res
        .status(201)
        .json({ AccessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  },

  logout: function (req, res) {
    const refreshToken = req.body.token;

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    res.status(202).json({ message: "you logged out successfully" });
  },
};


