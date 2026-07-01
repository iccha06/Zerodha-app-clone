import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStocks.css";

const AdminStocks = () => {
  const [stocks, setStocks] = useState([]);

  const [formData, setFormData] = useState({
    symbol: "",
    companyName: "",
    price: "",
    availableQuantity: "",
  });

  const [message, setMessage] = useState("");

  const fetchStocks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stocks`);
      setStocks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStock = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/stocks`, {
        symbol: formData.symbol,
        companyName: formData.companyName,
        price: Number(formData.price),
        availableQuantity: Number(formData.availableQuantity),
      });

      setMessage(`${formData.symbol} added successfully`);

      setFormData({
        symbol: "",
        companyName: "",
        price: "",
        availableQuantity: "",
      });

      fetchStocks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStock = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/stocks/${id}`);
      fetchStocks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-stock-page">

      <div className="header">
        <div>
          <h1>Stock Management</h1>
          <p>Add, view and manage all available stocks</p>
        </div>

        {message && (
          <div className="success-box">
            {message}
          </div>
        )}
      </div>

      <div className="add-stock-card">

        <h3>Add New Stock</h3>

        <div className="form-grid">

          <input
            type="text"
            name="symbol"
            placeholder="e.g. TCS"
            value={formData.symbol}
            onChange={handleChange}
          />

          <input
            type="text"
            name="companyName"
            placeholder="e.g. Tata Consultancy Services"
            value={formData.companyName}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="e.g. 3500"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            value={formData.availableQuantity}
            onChange={handleChange}
          />

          <button onClick={addStock}>
            Add Stock
          </button>

        </div>

      </div>

      <div className="stock-table-card">

        <div className="table-top">
          <h3>Current Stocks</h3>
          <span>Total Stocks: {stocks.length}</span>
        </div>

        <table>

          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>
              <th>Price (₹)</th>
              <th>Available Qty</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {stocks.map((stock) => (
              <tr key={stock._id}>

                <td>{stock.symbol}</td>

                <td>{stock.companyName}</td>

                <td>₹{stock.price}</td>

                <td>{stock.availableQuantity}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteStock(stock._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminStocks;