require("dotenv").config();
const verifyToken = require("./middlewares/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const stockRoutes = require("./routes/stockRoutes");

const adminRoutes = require("./routes/adminRoutes");
const UserModel = require("./model/UserModel");
const StockModel = require("./model/StockModel");
const app = express();
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/stocks", stockRoutes);
app.use("/admin", adminRoutes);

mongoose.connect(url)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get(
  "/allHoldings",
  verifyToken,
  async (req, res) => {
    try {
      const holdings = await HoldingsModel.find({
        userId: req.user.id,
      });

      const updatedHoldings = await Promise.all(
        holdings.map(async (holding) => {
          const stock = await StockModel.findOne({
            symbol: holding.name,
          });

          return {
            ...holding._doc,
            currentPrice: stock
              ? stock.price
              : holding.price,
            percent: stock
              ? stock.percent
              : "0%",
          };
        })
      );

      res.json(updatedHoldings);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Failed to fetch holdings",
      });
    }
  }
);

app.get(
  "/allPositions",
  verifyToken,
  async (req, res) => {
    let allPositions = await PositionsModel.find({ userId: req.user.id, });
    res.json(allPositions);
  }
);

app.get(
  "/allOrders",
  verifyToken,
  async (req, res) => {
    const allOrders = await OrdersModel.find({ userId: req.user.id, });
    res.json(allOrders);
  }
);

app.post(
  "/newOrder",
  verifyToken,
  async (req, res) => {

    try {
      console.log("REQUEST RECEIVED");
      console.log(req.body);
      const { name, qty, price, mode } = req.body;

      if (mode === "BUY") {

        //console.log("BUY REQUEST");
        //console.log("name =", name);
        // console.log("qty =", qty);

        const stock = await StockModel.findOne({
          symbol: name,
        });

        //console.log("Searching stock:", name);
        //console.log("Stock found:", stock);

        if (!stock) {
          return res.status(404).json({
            message: "Stock not found",
          });
        }

        if (stock.availableQuantity < Number(qty)) {
          return res.status(400).json({
            message: "Not enough quantity available",
          });
        }

        stock.availableQuantity -= Number(qty);
        await stock.save();

        let holding = await HoldingsModel.findOne({
          userId: req.user.id,
          name,
        });

        if (holding) {

          const totalInvestment =
            holding.avg * holding.qty +
            Number(price) * Number(qty);

          const totalQty =
            holding.qty + Number(qty);

          holding.avg = totalInvestment / totalQty;
          holding.qty = totalQty;
          holding.price = Number(price);

          await holding.save();

        } else {

          const newHolding = new HoldingsModel({
            userId: req.user.id,
            name,
            qty: Number(qty),
            avg: Number(price),
            price: Number(price),
            net: "0%",
            day: "0%",
          });

          await newHolding.save();
        }
      }

  
      // SELL Logic
      else if (mode === "SELL") {

        console.log("SELL REQUEST");
        console.log("name =", name);
        console.log("qty =", qty);

        const stock = await StockModel.findOne({
          symbol: name,
        });

        console.log("Stock found:", stock);

        if (!stock) {
          return res.status(404).json({
            message: "Stock not found",
          });
        }

        let holding = await HoldingsModel.findOne({
          userId: req.user.id,
          name,
        });

        console.log("Holding found:", holding);

        if (!holding) {
          return res.status(400).json({
            message: "Stock not found in holdings",
          });
        }

        if (holding.qty < Number(qty)) {
          return res.status(400).json({
            message: `You only own ${holding.qty} shares`,
          });
        }

        // reduce holding
        holding.qty -= Number(qty);
        holding.price = Number(price);

        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({
            _id: holding._id,
          });

          console.log("Holding removed completely");
        } else {
          await holding.save();

          console.log("Holding updated");
        }

        // return shares to market
        stock.availableQuantity += Number(qty);
        await stock.save();

        console.log(
          `Sold ${qty} shares of ${name}. New available quantity = ${stock.availableQuantity}`
        );
      }

      const newOrder = new OrdersModel({
        userId: req.user.id,
        name,
        qty,
        price,
        mode,
      });

      await newOrder.save();

      res.status(200).json({
        message: `${mode} order placed successfully`,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  });
app.get("/", (req, res) => {
  res.send("Zerodha Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});