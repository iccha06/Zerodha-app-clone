import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GeneralContext from "../components/GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "../components/DoughnoutChart";

const WatchList = () => {
  const [stocks, setStocks] = useState([]);

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

  const data = {
    labels: stocks.map((stock) => stock.symbol),

    datasets: [
      {
        label: "Price",
        data: stocks.map((stock) => stock.price),

       backgroundColor: [
  "rgba(34, 197, 94, 0.8)",   // Profit Green
  "rgba(59, 130, 246, 0.8)",  // Blue
  "rgba(168, 85, 247, 0.8)",  // Purple
  "rgba(249, 115, 22, 0.8)",  // Orange
  "rgba(20, 184, 166, 0.8)",  // Teal
  "rgba(100, 116, 139, 0.8)", // Slate
],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks..."
          className="search"
        />

        <span className="counts">{stocks.length} Stocks</span>
      </div>

      <ul className="list">
        {stocks.map((stock) => (
          <WatchListItem
            stock={stock}
            key={stock._id}
          />
        ))}
      </ul>

      {stocks.length > 0 && <DoughnutChart data={data} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] =
    useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.symbol}
        </p>

        <div className="item-info">
          <span>{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <div>
            <span>₹{stock.price}</span>

            <div
              style={{
                fontSize: "11px",
                color: "#777",
                marginTop: "2px",
              }}
            >
              Qty: {stock.availableQuantity}
            </div>
          </div>
        </div>
      </div>

      {showWatchlistActions && (
        <WatchListActions stock={stock} />
      )}
    </li>
  );
};

const WatchListActions = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    console.log("Buying:", stock.symbol);
    generalContext.openBuyWindow(stock.symbol);
  };

  const handleSellClick = () => {
    console.log("Selling:", stock.symbol);
    generalContext.openSellWindow(stock.symbol);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button
            className="buy"
            onClick={handleBuyClick}
          >
            Buy
          </button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button
            className="sell"
            onClick={handleSellClick}
          >
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
// import React, { useState, useContext } from "react";

// import axios from "axios";

// import GeneralContext from "../components/GeneralContext";

// import { Tooltip, Grow } from "@mui/material";

// import {
//   BarChartOutlined,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   MoreHoriz,
// } from "@mui/icons-material";

// import { useEffect } from "react";
// import { DoughnutChart } from "../components/DoughnoutChart";

// const labels = watchlist.map((subArray) => subArray["name"]);

// const WatchList = () => {
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Price",
//         data: watchlist.map((stock) => stock.price),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.5)",
//           "rgba(54, 162, 235, 0.5)",
//           "rgba(255, 206, 86, 0.5)",
//           "rgba(75, 192, 192, 0.5)",
//           "rgba(153, 102, 255, 0.5)",
//           "rgba(255, 159, 64, 0.5)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // export const data = {
//   //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   // datasets: [
//   //   {
//   //     label: "# of Votes",
//   //     data: [12, 19, 3, 5, 2, 3],
//   //     backgroundColor: [
//   //       "rgba(255, 99, 132, 0.2)",
//   //       "rgba(54, 162, 235, 0.2)",
//   //       "rgba(255, 206, 86, 0.2)",
//   //       "rgba(75, 192, 192, 0.2)",
//   //       "rgba(153, 102, 255, 0.2)",
//   //       "rgba(255, 159, 64, 0.2)",
//   //     ],
//   //     borderColor: [
//   //       "rgba(255, 99, 132, 1)",
//   //       "rgba(54, 162, 235, 1)",
//   //       "rgba(255, 206, 86, 1)",
//   //       "rgba(75, 192, 192, 1)",
//   //       "rgba(153, 102, 255, 1)",
//   //       "rgba(255, 159, 64, 1)",
//   //     ],
//   //     borderWidth: 1,
//   //   },
//   // ],
//   // };

//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         <span className="counts"> {watchlist.length} / 50</span>
//       </div>

//       <ul className="list">
//         {watchlist.map((stock, index) => {
//           return <WatchListItem stock={stock} key={index} />;
//         })}
//       </ul>

//       <DoughnutChart data={data} />
//     </div>
//   );
// };

// export default WatchList;

// const WatchListItem = ({ stock }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   const handleMouseEnter = (e) => {
//     setShowWatchlistActions(true);
//   };

//   const handleMouseLeave = (e) => {
//     setShowWatchlistActions(false);
//   };

//   return (
//     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="item">
//         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
//         <div className="itemInfo">
//           <span className="percent">{stock.percent}</span>
//           {stock.isDown ? (
//             <KeyboardArrowDown className="down" />
//           ) : (
//             <KeyboardArrowUp className="down" />
//           )}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>
//       {showWatchlistActions && <WatchListActions uid={stock.name} />}
//     </li>
//   );
// };

// const WatchListActions = ({ uid }) => {
//   const generalContext = useContext(GeneralContext);

//   const handleBuyClick = () => {
//     generalContext.openBuyWindow(uid);
//   };
//   const handleSellClick = () => {
//   generalContext.openSellWindow(uid);
// };

//   return (
//     <span className="actions">
//       <span>
//         <Tooltip
//           title="Buy (B)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//           onClick={handleBuyClick}
//         >
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip
//   title="Sell (S)"
//   placement="top"
//   arrow
//   TransitionComponent={Grow}
//   onClick={handleSellClick}
// >
//   <button className="sell">Sell</button>
// </Tooltip>
//         <Tooltip
//           title="Analytics (A)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>
//         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//           <button className="action">
//             <MoreHoriz className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };
