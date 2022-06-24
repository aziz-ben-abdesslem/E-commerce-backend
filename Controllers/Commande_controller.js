const commandeModel = require("../Models/Commande_model");
const user_model = require("../Models/Users_model");

module.exports = {
  create: (req, res) => {
    commandeModel.create(req.body, (err, order) => {
      if (err) {
        res.status(500).json({
          message: "order not created " + err,
          data: null,
        });
      } else {
        user_model.findOneAndUpdate(
          { _id: req.body.client, __t: "Users" },
          { $push: { Commande: order._id } },
          (error, user) => {
            if (error) {
              res.status(500).json({
                message: "order added but not pushed in user"+err,
                data: null,
              });
            } else {
              res.status(200).json({
                message: "order added and pushed in user  ",
                data: order,
              });
            }
          }
        );
      }
    });
  },


  getall: (req, res) => {
    commandeModel.find({})
      .populate({
        path: "client",
      })
      .populate({
        path: "products"})
      .then((orders) => {
        res.status(200).json({
          message: "orders in system ",
          data: orders,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "no orders from system ",
          data: null,
        });
      });
  },

  getOrderbyId: function (req, res) {
    commandeModel.findById(req.params.id, function (err, item) {
      if (err) {
        res.status(405).json({
          success: false,
          message: "failed to get order by ID",
          data: null,
        });
      } else {
        res
          .status(202)
          .json({ success: true, message: "order founded", data: item });
      }
    });
  },

  getOrderbyRef: function (req, res) {
    commandeModel.find({ ref_cmd: req.query.ref_cmd }, function (err, items) {
      if (err) {
        res.status(405).json({
          success: false,
          message: "connot get order by this ref",
          data: null,
        });
      } else {
        res.status(202).json({
          success: true,
          message: "order by this ref founded",
          data: items,
        });
      }
    });
  },

  updateOrder: function (req, res) {
    commandeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, item) {
        if (err) {
          res.status(401).json({
            success: false,
            message: "connot update order",
            data: null,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "order updated successfully",
            data: item,
          });
        }
      }
    );
  },

  deleteOrder: function (req, res) {
    commandeModel.findByIdAndDelete(req.params.id, function (err, item) {
      if (err) {
        res
          .status(406)
          .json({ success: false, message: "cannot delete order", data: null });
      } else {
        res.status(201).json({
          success: true,
          message: "order deleted successfully",
          data: item,
        });
      }
    });
  },

  getincome: async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
     
      const income = await commandeModel.aggregate([
        { $match: { createdAt: { $gte: prevMonth } } },
        { $project: { month: { $month: "$createdAt" }, sales: "$prix_total" } },
        { $group: { _id: "$month", prix_total: {$sum: "sales" } } },
      ]);
      res.status(201).json(income);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
