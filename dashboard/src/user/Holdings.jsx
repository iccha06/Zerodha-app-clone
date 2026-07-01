import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "../components/VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/allHoldings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Holdings:", res.data);
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Current Stock Price",
        data: allHoldings.map(
          (stock) => stock.currentPrice
        ),
        backgroundColor:
          "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Portfolio Summary
  const totalInvestment = allHoldings.reduce(
    (sum, stock) =>
      sum + stock.avg * stock.qty,
    0
  );

  const totalCurrentValue = allHoldings.reduce(
    (sum, stock) =>
      sum +
      stock.currentPrice * stock.qty,
    0
  );

  const totalPnL =
    totalCurrentValue - totalInvestment;

  const totalPnLPercent =
    totalInvestment > 0
      ? (
          (totalPnL /
            totalInvestment) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <>
      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map(
              (stock, index) => {
                const investment =
                  stock.avg * stock.qty;

                const curValue =
                  stock.currentPrice *
                  stock.qty;

                const pnl =
                  curValue - investment;

                const netPercent =
                  investment > 0
                    ? (
                        (pnl /
                          investment) *
                        100
                      ).toFixed(2)
                    : "0.00";

                const profClass =
                  pnl >= 0
                    ? "profit"
                    : "loss";

                const dayClass =
                  stock.percent?.includes(
                    "-"
                  )
                    ? "loss"
                    : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>

                    <td>{stock.qty}</td>

                    <td>
                      ₹
                      {stock.avg.toFixed(
                        2
                      )}
                    </td>

                    <td>
                      ₹
                      {stock.currentPrice.toFixed(
                        2
                      )}
                    </td>

                    <td>
                      ₹
                      {curValue.toFixed(
                        2
                      )}
                    </td>

                    <td
                      className={
                        profClass
                      }
                    >
                      ₹
                      {pnl.toFixed(2)}
                    </td>

                    <td
                      className={
                        profClass
                      }
                    >
                      {netPercent}%
                    </td>

                    <td
                      className={
                        dayClass
                      }
                    >
                      {
                        stock.percent
                      }
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ₹
            {totalInvestment.toFixed(
              2
            )}
          </h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>
            ₹
            {totalCurrentValue.toFixed(
              2
            )}
          </h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5
            className={
              totalPnL >= 0
                ? "profit"
                : "loss"
            }
          >
            ₹
            {totalPnL.toFixed(
              2
            )}{" "}
            ({totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { VerticalGraph } from "../components/VerticalGraph";

// // import { holdings } from "../data/data";

//  const Holdings = () => {
//    const [allHoldings, setAllHoldings] = useState([]);

//   useEffect(() => {
//   axios.get(`${import.meta.env.VITE_API_URL}/allHoldings`, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// })
//     .then((res) => {
//       console.log("Holdings:", res.data);
//       setAllHoldings(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

//   // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//    const labels = allHoldings.map((subArray) => subArray["name"]);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => stock.price),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   // export const data = {
//   //   labels,
//   //   datasets: [
//   // {
//   //   label: 'Dataset 1',
//   //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//   //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
//   // },
//   //     {
//   //       label: 'Dataset 2',
//   //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//   //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//   //     },
//   //   ],
//   // };

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg. cost</th>
//             <th>LTP</th>
//             <th>Cur. val</th>
//             <th>P&L</th>
//             <th>Net chg.</th>
//             <th>Day chg.</th>
//           </tr>

//           {allHoldings.map((stock, index) => {
//             const curValue =
//   stock.currentPrice * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.currentPrice.toFixed(2)}</td>
//                 <td>{curValue.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={profClass}>{stock.net}</td>
//                 <td className={dayClass}>{stock.day}</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>

//       <div className="row">
//         <div className="col">
//           <h5>
//             29,875.<span>55</span>{" "}
//           </h5>
//           <p>Total investment</p>
//         </div>
//         <div className="col">
//           <h5>
//             31,428.<span>95</span>{" "}
//           </h5>
//           <p>Current value</p>
//         </div>
//         <div className="col">
//           <h5>1,553.40 (+5.20%)</h5>
//           <p>P&L</p>
//         </div>
//       </div>
//        <VerticalGraph data={data} /> 
//     </>
//   );
// };

// export default Holdings;