const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
    num_rep:{
        type:String,
        required:true,
        trim:true
    },

    marque:{

        type:String,
        required:true,
        trim:true
    },

    panne:{

        type:String,
        required:true,
        trim:true
    },

    image:{
        type:String,
        required:false,
        trim:true
    },

    num_tel:{
        type:Number,
        required:true,
        trim:true
    },

    date_estim:{
        type:String,
        required:true,
        trim:true
    },

    etat:{
        type:String,
        required:true,
        trim:true
    },

    utilisateur: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      

},{timestamps:true})

module.exports= mongoose.model("ServiceRep",serviceSchema)