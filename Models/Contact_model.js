const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    sujet: {
      type: String,
      required: true,
      trim: true,
    },

    num_tel1: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    Contact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", ContactSchema);