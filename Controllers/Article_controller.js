const articleModel = require("../Models/Article_model");

module.exports = {

  createArticle: function (req, res) {
    req.body.image = req.file.filename;
    const article = new articleModel(req.body);
    article.save(req.body, function (err, item) {
      if (err) {
        res
          .status(404)
          .json({
            success: false,
            message: "created article failed" + err,
            data: null,
          });
      } else {
        res
          .status(201)
          .json({
            success: true,
            message: "article created successfully",
            data: item,
          });
      }
    });
  },

  getAllarticles: function (req, res) {
    articleModel.find(function (err, item) {
      if (err) {
        res
          .status(402)
          .json({ success: false, message: "Cannot get articles", data: null });
      } else {
        res
          .status(202)
          .json({ success: true, message: "List of all articles", data: item });
      }
    });
  },

  ////////////////Homme//////////////////
  getbygenreH: async (req, res) => {
    articleModel.find({ genre: "Homme" }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get article by genre homme" });
      }
    });
  },

  getbytypeMH: async (req, res) => {
    articleModel.find({ type: "Montres", genre: "Homme" }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get article by type montre" });
      }
    });
  },

  getbytypeLH: async (req, res) => {
    articleModel.find(
      { type: "Lunettes", genre: "Homme" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type montre" });
        }
      }
    );
  },

  getbytypeAH: async (req, res) => {
    articleModel.find(
      { type: "Accessoires", genre: "Homme" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type montre" });
        }
      }
    );
  },

  /////////////////Femme/////////////////
  getbygenreF: async (req, res) => {
    articleModel.find({ genre: "Femme" }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get article by genre femme" });
      }
    });
  },

  getbytypeMF: async (req, res) => {
    articleModel.find({ type: "Montres", genre: "Femme" }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get article by type montre" });
      }
    });
  },

  getbytypeLF: async (req, res) => {
    articleModel.find(
      { type: "Lunettes", genre: "Femme" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type lunette" });
        }
      }
    );
  },

  getbytypeAF: async (req, res) => {
    articleModel.find(
      { type: "Accessoires", genre: "Femme" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type accessoire" });
        }
      }
    );
  },

  /////////////////Enfants/////////////////
  getbygenreE: async (req, res) => {
    articleModel.find({ genre: "Enfants" }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get article by genre enfant" });
      }
    });
  },

  getbytypeME: async (req, res) => {
    articleModel.find(
      { type: "Montres", genre: "Enfants" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type montre" });
        }
      }
    );
  },

  getbytypeLE: async (req, res) => {
    articleModel.find(
      { type: "Lunettes", genre: "Enfants" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type montre" });
        }
      }
    );
  },

  getbytypeAE: async (req, res) => {
    articleModel.find(
      { type: "Accessoires" , genre: "Enfants" },
      function (err, art) {
        if (art) {
          res.status(201).json({ data: art });
        } else {
          res
            .status(404)
            .json({ message: "Failed to get article by type montre" });
        }
      }
    );
  },


  getbyPromotion: async (req, res) => {
    articleModel.find({ promotion: true }, function (err, art) {
      if (art) {
        res.status(201).json({ data: art });
      } else {
        res
          .status(404)
          .json({ message: "Failed to get articles with promotion" });
      }
    });
  },

  getbyId: function (req, res) {
    articleModel.findById(req.params.id, function (err, item) {
      if (err) {
        res.status(405).json({
          success: false,
          message: "failed to get article by ID",
          data: null,
        });
      } else {
        res
          .status(202)
          .json({
            success: true,
            message: "Article by ID has founded",
            data: item,
          });
      }
    });
  },

  updateArt: function (req, res) {
    req.body.image = req.file.filename;

    articleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, item) {
        if (err) {
          res.status(401).json({
            success: false,
            message: "Cannot update article",
            data: null,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Article updated successfully",
            data: item,
          });
        }
      }
    );
  },

  deleteArt: function (req, res) {
    articleModel.findByIdAndDelete(req.params.id, function (err, item) {
      if (err) {
        res
          .status(406)
          .json({
            success: false,
            message: "Cannot delete article",
            data: null,
          });
      } else {
        res
          .status(201)
          .json({
            success: true,
            message: "Article deleted successfully",
            data: item,
          });
      }
    });
  },
};
