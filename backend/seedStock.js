require("dotenv").config();
const mongoose = require("mongoose");
const StockModel = require("./model/StockModel");

const stocks = [
  {
    symbol: "INFY",
    companyName: "Infosys",
    price: 1555.45,
    percent: "-1.60%",
    isDown: true,
    availableQuantity:200
  },
  {
    symbol: "ONGC",
    companyName: "Oil and Natural Gas Corporation",
    price: 116.8,
    percent: "-0.09%",
    isDown: true,
    availableQuantity:300
  },
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    price: 3194.8,
    percent: "-0.25%",
    isDown: true,
    availableQuantity:500
  },
  {
    symbol: "KPITTECH",
    companyName: "KPIT Technologies",
    price: 266.45,
    percent: "3.54%",
    isDown: false,
    availableQuantity:377
  },
  {
    symbol: "QUICKHEAL",
    companyName: "Quick Heal",
    price: 308.55,
    percent: "-0.15%",
    isDown: true,
    availableQuantity:900
  },
  {
    symbol: "WIPRO",
    companyName: "Wipro",
    price: 577.75,
    percent: "0.32%",
    isDown: false,
    availableQuantity:520
  },
  {
    symbol: "M&M",
    companyName: "Mahindra & Mahindra",
    price: 779.8,
    percent: "-0.01%",
    isDown: true,
    availableQuantity:210
  },
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries",
    price: 2112.4,
    percent: "1.44%",
    isDown: false,
    availableQuantity:1000
  },
  {
    symbol: "HUL",
    companyName: "Hindustan Unilever",
    price: 512.4,
    percent: "1.04%",
    isDown: false,
    availableQuantity:450
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);

  await StockModel.deleteMany({});

  await StockModel.insertMany(stocks);

  console.log("Stocks inserted successfully");

  process.exit();
}

seed();