const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTesting,
} = require("../controllers/products");

router.route("/fetch").get(getAllProducts);
router.route("/get").get(getAllProductsTesting);

module.exports = router;
