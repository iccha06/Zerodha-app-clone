import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const navigate = useNavigate();
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [error, setError] = useState("");

  const handleBuyClick = async () => {
    try {
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);

      generalContext.closeBuyWindow();

      // Change this if your route is different
      navigate("/dashboard/orders");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Order failed. Please try again."
      );
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              min="0"
              step="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(Number(e.target.value))
              }
            />
          </fieldset>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      <div className="buttons">
        <span>
          Buying: <strong>{uid}</strong>
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
          >
            Buy
          </button>

          <Link
            to=""
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;