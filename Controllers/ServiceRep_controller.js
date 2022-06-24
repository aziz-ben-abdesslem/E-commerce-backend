
const ServiceRepModel = require ("../Models/ServiceRep_model")
const mongoose = require("mongoose");

module.exports={

        createService: function (req, res) {
            req.body["image"] = req.file.filename
            const service = new ServiceRepModel(req.body);
            service.save(req.body, function (err, item) {
              if (err) {
                res.status(404).json({success: false,message: "created service failed",data: null})
              } else {
                res.status(201).json({success: true,message: "service created successfully",data: item})
              }
            });
          },

        getAllServices:function(req,res){
            ServiceRepModel.find().populate("utilisateur").exec(function(err,item){
                if (err) {
                    res.status(402).json({success:false,message:"cannot get services",data:null})
                } else {
                    res.status(202).json({success:true,message:"list of all services",data:item})
                }
            }) 
        },
        getmySer:function(req,res){
          ServiceRepModel.find({utilisateur:mongoose.Types.ObjectId(req.params.id)}).populate("utilisateur").exec(function(err,item){
              if (err) {
                  res.status(402).json({success:false,message:"cannot get services",data:null})
              } else {
                  res.status(202).json({success:true,message:"list of all services",data:item})
              }
          }) 
      },

        getbyId: function (req, res) {
          ServiceRepModel.findById(req.params.id, function (err, item) {
            if (err) {
              res.status(405).json({
                success: false,
                message: "failed to get services by ID",
                data: null,
              });
            } else {
              res
                .status(202)
                .json({ success: true, message: "Service by ID has founded", data: item });
            }
          });
        },

        getbyName: function (req, res) {
          ServiceRepModel.find({ num_rep: req.query.num_rep}, function (err, items) {
            if (err) {
              res.status(405).json({
                success: false,
                message: "connot get service by this name",
                data: null,
              });
            } else {
              res
                .status(202)
                .json({
                  success: true,
                  message: "service by this name has founded",
                  data: items,
                });
            }
          });
        },
      
        updateService: function (req, res) {

          req.body.image = req.file.filename
          
          ServiceRepModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            function (err, item) {
              if (err) {
                res.status(401).json({
                  success: false,
                  message: "connot update service",
                  data: null,
                });
              } else {
                res
                  .status(200)
                  .json({
                    success: true,
                    message: "service updated successfully",
                    data: item,
                  });
              }
            }
          );
        },
      
        deleteService:function(req,res){
          ServiceRepModel.findByIdAndDelete(req.params.id,function(err,item){
            if (err) {
              res.status(406).json({success:false,message:"cannot delete service",data:null})
            } else {
              res.status(201).json({success:true,message:"service deleted successfully",data:item})
            }
          })
        }

}