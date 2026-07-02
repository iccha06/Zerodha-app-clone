const express = require("express");

const router = express.Router();

const {
  getAllStocks,
  addStock,
  deleteStock,
} = require("../controllers/stockController");

router.get("/", getAllStocks);

router.post("/", addStock);

router.delete("/:id", deleteStock);

module.exports = router;