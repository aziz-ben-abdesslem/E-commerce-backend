const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    CIN: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "please enter a valid email"],
      unique:true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxlength: [14, "password should be less than 14 characters"],
      minlength: [4, "password should be more than 4 characters"],
    },
    sexe: {
      type: String,
      required: true,
      trim: true,
    },
    nom: {
      type: String,
      required: true,
      trim: false,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    num_tel1: {
      type: Number,
      required: true,
      trim: true,
    },
    num_tel2: {
      type: Number,
      required: true,
      trim: true,
    },
    adresse: {
      type: String,
      required: true,
      trim: true,
    },
    codepostal: {
      type: String,
      required: true,
      trim: true,
    },
    role:{
      type:Boolean,
      default:false,
    },
    date_creation_compte: {
      type: Date,
      required: true,
      trim: true,
    },
    
    Contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contacts",
    },

    ServiceRep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRep",
    },

    Commande: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commandes",
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("Users", userSchema);
