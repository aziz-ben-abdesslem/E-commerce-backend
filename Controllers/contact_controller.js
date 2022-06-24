const  ContactModel = require ("../Models/Contact_model")

module.exports = {

  createContact: function (req, res) {
    const contact = new ContactModel(req.body);
    contact.save(req.body, function (err, item) {
      if (err) {
        res
          .status(406)
          .json({
            success: false,
            message: "created contact failed"+err,
            data: null,
          });
      } else {
        res
          .status(201)
          .json({
            success: true,
            message: "contact created successfully",
            data: item,
          });
      }
    });
  },

  getAllContact: function (req, res) {
    ContactModel.find(function (err, item) {
      if (err) {
        res.status(406).json({
          success: false,
          message: "cannot got all contacts",
          data: null,
        });
      } else {
        res
          .status(201)
          .json({ success: true, message: "list of contacts", data:item });
      }
    });
  },

  updateContact: function (req, res) {
      ContactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, item) {
        if (err) {
          res.status(401).json({
            success: false,
            message: "connot update contact",
            data: null,
          });
        } else {
          res
            .status(200)
            .json({
              success: true,
              message: "contact updated successfully",
              data: item,
            });
        }
      }
    );
  },

  deleteContact: function (req, res) {
    ContactModel.findByIdAndDelete(req.params.id, function (err, item) {
      if (err) {
        res
          .status(406)
          .json({
            success: false,
            message: "cannot delete contact",
            data: null,
          });
        console.log(err);
      } else {
        res
          .status(201)
          .json({
            success: true,
            messae: "contact deleted successfully",
            data: item,
          });
      }
    });
  },
};