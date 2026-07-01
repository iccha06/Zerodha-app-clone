import React, { useState } from 'react';

function Brokerage() {

    const [activeTab, setActiveTab] = useState("equity");

    const renderEquity = () => (
        <table className='table table-bordered align-middle mt-4'>
            <thead className='table-light'>
                <tr>
                    <th>Charges</th>
                    <th>Equity Delivery</th>
                    <th>Equity Intraday</th>
                    <th>F&O Futures</th>
                    <th>F&O Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='text-muted'>Brokerage</td>
                    <td className='text-muted'>Zero</td>
                    <td className='text-muted'>0.03% or ₹20</td>
                    <td className='text-muted'>0.03% or ₹20</td>
                    <td className='text-muted'>₹20/order</td>
                </tr>
                <tr>
                    <td className='text-muted'>STT</td>
                    <td className='text-muted'>0.1%</td>
                    <td className='text-muted'>0.025%</td>
                    <td className='text-muted'>0.02%</td>
                    <td className='text-muted' >0.1%</td>
                </tr>
                <tr>
                    <td className='text-muted'>Transaction<br /> charges</td>
                    <td className='text-muted'>NSE: 0.00307%<br />BSE: 0.00375%</td>
                    <td className='text-muted'>NSE: 0.00307%
                        <br />BSE: 0.00375%</td>
                    <td className='text-muted'>NSE: 0.00183%
                        <br />BSE: 0</td>
                    <td className='text-muted'>NSE: 0.03553% (on premium)<br />
                        BSE: 0.0325% (on premium)</td>
                </tr>
                <tr>
                    <td className='text-muted'>GST</td>
                    <td className='text-muted'>18% on (brokerage + SEBI charges + transaction charges)</td>
                    <td className='text-muted'>18% on (brokerage + SEBI charges + transaction charges)</td>
                    <td className='text-muted'>18% on (brokerage + SEBI charges + transaction charges)</td>
                    <td className='text-muted'>18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>
                <tr>
                    <td className='text-muted'>SEBI charges</td>
                    <td className='text-muted'>₹10 / crore</td>
                    <td className='text-muted'>₹10 / crore</td>
                    <td className='text-muted'>₹10 / crore</td>
                    <td className='text-muted'>₹10 / crore</td>
                </tr>
                <tr>
                    <td className='text-muted'>Stamp charges</td>
                    <td className='text-muted'>0.015% or ₹1500 / crore on buy side</td>
                    <td className='text-muted'>0.003% or ₹300 / crore on buy side</td>
                    <td className='text-muted'>0.002% or ₹200 / crore on buy side</td>
                    <td className='text-muted'>0.003% or ₹300 / crore on buy side</td>
                </tr>
            </tbody>
        </table>
    );

    const renderCurrency = () => (
        <table className='table table-bordered align-middle mt-4'>
            <thead className='table-light'>
                <tr>
                    <th>Charges</th>
                    <th>Currency Futures</th>
                    <th>Currency Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='text-muted'>Brokerage</td>
                    <td className='text-muted' >0.03% or ₹20</td>
                    <td className='text-muted'>₹20/order</td>
                </tr>
                <tr>
                    <td className='text-muted'>STT</td>
                    <td className='text-muted'>0</td>
                    <td className='text-muted'>0</td>
                </tr>
                <tr>
                    <td className='text-muted'>Transaction charges</td>
                    <td className='text-muted'>NSE: 0.00035%<br/>
BSE: 0.00045%</td>
                    <td className='text-muted'>NSE: 0.0311%<br/>
BSE: 0.001%</td>
                </tr>
                <tr>
                    <td className='text-muted'>GST</td>
                    <td className='text-muted'>18% on (brokerage + SEBI charges + transaction charges)</td>
                    <td className='text-muted'>	18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>
                <tr>
                    <td className='text-muted'>SEBI charges</td>
                    <td className='text-muted'>₹10 / crore</td>
                    <td className='text-muted'>	₹10 / crore</td>
                </tr>
                <tr>
                    <td className='text-muted'>Stamp charges</td>
                    <td className='text-muted'>	0.0001% or ₹10 / crore on buy side</td>
                    <td className='text-muted'>	0.0001% or ₹10 / crore on buy side</td>
                </tr>
            </tbody>
        </table>
    );

    const renderCommodity = () => (
        <table className='table table-bordered align-middle mt-4'>
            <thead className='table-light '>
                <tr>
                    <th>Charges</th>
                    <th>Commodity Futures</th>
                    <th>Commodity Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='text-muted'>Brokerage</td>
                    <td className='text-muted'>0.03% or ₹20</td>
                    <td className='text-muted'd>₹20/order</td>
                </tr>
                <tr>
                    <td className='text-muted'>STT/CTT</td>
                    <td className='text-muted'>0.01%</td>
                    <td className='text-muted'>0.05%</td>
                </tr>
                <tr>
                    <td className='text-muted'>GST</td>
                    <td className='text-muted'>18%</td>
                    <td className='text-muted'>18%</td>
                </tr>
                <tr>
                    <td className='text-muted'>Transaction charges</td>
                    <td className='text-muted'>MCX: 0.0021%<br/>NSE: 0.0001%</td>
                    <td className='text-muted'>MCX: 0.0418%<br/>
NSE: 0.001%</td>
                </tr>
                <tr>
                    <td className='text-muted'>SEBI charges</td>
                    <td className='text-muted'>Agri:<br/>
₹1 / crore<br/>
Non-agri:<br/>
₹10 / crore</td>
                    <td className='text-muted'>18%</td>
                </tr>
                <tr>
                    <td className='text-muted'>GST</td>
                    <td className='text-muted'>18%</td>
                    <td className='text-muted'>18%</td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <div className='container p-5'>

            {/* Tabs */}
            <div className='d-flex gap-5 border-bottom'>

                <h5
                    onClick={() => setActiveTab("equity")}
                    style={{
                        cursor: "pointer",
                        paddingBottom: "10px",
                        borderBottom: activeTab === "equity" ? "2px solid #387ed1" : "none",
                        color: activeTab === "equity" ? "#387ed1" : "#424242"
                    }}
                >
                    Equity
                </h5>

                <h5
                    onClick={() => setActiveTab("currency")}
                    style={{
                        cursor: "pointer",
                        paddingBottom: "10px",
                        borderBottom: activeTab === "currency" ? "2px solid #387ed1" : "none",
                        color: activeTab === "currency" ? "#387ed1" : "#424242"
                    }}
                >
                    Currency
                </h5>

                <h5
                    onClick={() => setActiveTab("commodity")}
                    style={{
                        cursor: "pointer",
                        paddingBottom: "10px",
                        borderBottom: activeTab === "commodity" ? "2px solid #387ed1" : "none",
                        color: activeTab === "commodity" ? "#387ed1" : "#424242"
                    }}
                >
                    Commodity
                </h5>

            </div>

            {/* Table */}
            {activeTab === "equity" && renderEquity()}
            {activeTab === "currency" && renderCurrency()}
            {activeTab === "commodity" && renderCommodity()}
            <p className="text-muted mt-5 text-center fs-5">
  <a href='/' style={{textDecoration:"none"}}>Calculate your costs upfront </a>using our brokerage calculator
</p>

<div className='container p-5 mb-3 mt-5'>
                <div className='row text-center'>
                    <h1>
                        Open a Zerodha account
                    </h1>
                    <p className='text-muted mt-3'>
                        Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.
                    </p>
                    <button className='p-2 btn btn-primary fs-5 mt-3 mb-5' style={{ width: "20%", margin: "0 auto" }}>SignUp now</button>
                </div>
            </div>
        </div>
        
        
    );
}

export default Brokerage;