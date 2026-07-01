import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import GeneralContext from "./GeneralContext";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSellClick = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage(res.data.message);

      setTimeout(() => {
        generalContext.closeSellWindow();
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(
        "Error placing sell order:",
        err.response?.data || err.message
      );

      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div
      className="container"
      id="sell-window"
      draggable="true"
    >
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

        {errorMessage && (
          <div
            style={{
              color: "red",
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              color: "green",
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            {successMessage}
          </div>
        )}
      </div>

      <div className="buttons">
        <span>
          Selling: <strong>{uid}</strong>
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleSellClick}
          >
            Sell
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

export default SellActionWindow;
