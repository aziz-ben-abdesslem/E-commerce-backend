const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
{

    //  date: {
    //    type: Date.new()
    // },                                              

    status: {
      type: Number,
      default: 1,
    },

    total: {
      type: Number,
      required: true,
      
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles",
      },
    ],

  },

  { timestamps: true }
);

module.exports = mongoose.model("Commandes", commandeSchema);
