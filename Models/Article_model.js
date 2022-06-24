const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    
    ref_art:{

        type:String,
        required:true,
        trim:true
    },
    designation:{

        type:String,
        required:true,
        trim:true
    },
    prix:{

        type:Number,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        required:true,
        trim:true
    },

    type:{
        type:String,
        required:true,
        trim:true
    },

    promotion:{
        type:Boolean,
        default:false
    },
    
    Articles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Commandes",
        },
      ],

},{timestamps:true})

module.exports= mongoose.model("Articles",articleSchema)