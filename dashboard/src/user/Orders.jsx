import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/allOrders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [location]);

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Orders ({orders.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                <td>{order.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/allOrders`, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// })
//       .then((res) => {
//         setOrders(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   if (orders.length === 0) {
//     return (
//       <div className="orders">
//         <div className="no-orders">
//           <p>You haven't placed any orders today</p>

//           <Link to={"/"} className="btn">
//             Get started
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h3 className="title">Orders ({orders.length})</h3>

//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Stock</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Mode</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order.name}</td>
//                 <td>{order.qty}</td>
//                 <td>{order.price}</td>
//                 <td>{order.mode}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Orders;