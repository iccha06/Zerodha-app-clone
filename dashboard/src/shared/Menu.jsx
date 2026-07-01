// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiChevronDown,
// } from "react-icons/fi";

// import "../admin/components/AdminTopBar.css";
// //import "./Menu.css"; // Make sure this file exists

// const Menu = ({ type = "user" }) => {
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDarkMode] = useState(false);

//   const navigate = useNavigate();

//   const username = localStorage.getItem("username") || "Guest";
//   const avatar = username.charAt(0).toUpperCase();

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("role");

//     navigate("/login");
//   };

//   /* ---------------- ADMIN NAVBAR ---------------- */

//   if (type === "admin") {
//     return (
//       <div className={`admin-navbar ${isDarkMode ? "dark" : ""}`}>
//         <div className="admin-left">
//           <button className="icon-btn">
//             <FiMenu />
//           </button>

//           <div className="search-box">
//             <FiSearch className="search-icon" />

//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </div>
//         </div>

//         <div className="admin-right">
//           <div className="notification">
//             <FiBell />
//             <span>3</span>
//           </div>

//           <div className="admin-profile" onClick={handleProfileClick}>
//             <div className="avatar">{avatar}</div>

//             <div className="profile-text">
//               <h4>{username}</h4>
//               <p>Administrator</p>
//             </div>

//             <FiChevronDown />
//           </div>

//           {isProfileDropdownOpen && (
//             <div className="admin-dropdown">
//               <p onClick={handleLogout}>Logout</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- USER MENU ---------------- */

//   return (
//     <div className="menu-container">
//       <img
//         src="/kiteLogo.png"
//         alt="Kite Logo"
//         style={{ width: "50px" }}
//       />

//       <div className="menus">
//         <ul>
//           <li>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/orders"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Orders
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/holdings"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Holdings
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/positions"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Positions
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/funds"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Funds
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/apps"
//               className={({ isActive }) =>
//                 isActive ? "menu active" : "menu"
//               }
//             >
//               Apps
//             </NavLink>
//           </li>
//         </ul>

//         <hr />

//         <div style={{ position: "relative" }}>
//           <div
//             className="profile"
//             onClick={handleProfileClick}
//             style={{ cursor: "pointer" }}
//           >
//             <div className="avatar">{avatar}</div>
//             <p className="username">{username}</p>
//           </div>

//           {isProfileDropdownOpen && (
//             <div
//               style={{
//                 position: "absolute",
//                 right: 0,
//                 top: "50px",
//                 background: "#fff",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 minWidth: "120px",
//                 boxShadow: "0 5px 15px rgba(0,0,0,.15)",
//                 zIndex: 1000,
//               }}
//             >
//               <p
//                 onClick={handleLogout}
//                 style={{
//                   margin: 0,
//                   padding: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Logout
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMoon,
  FiChevronDown,
} from "react-icons/fi";

import "../admin/components/AdminTopBar.css";

const Menu = ({ type = "user" }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const avatar = username.charAt(0).toUpperCase();
  const menuClass = "menu-item";
  const activeMenuClass = "menu-item active";
  const handleMenuClick = (index) => setSelectedMenu(index);
  const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (type === "admin") {
    return (
      <div className={"admin-navbar"}>
        <div className="admin-left">
          <button className="icon-btn">
            <FiMenu />
          </button>

          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="admin-right">

          <div className="notification">
            <FiBell />
            <span>3</span>
          </div>

          <div className="admin-profile" onClick={handleProfileClick}>
            <div className="avatar">{avatar}</div>
            <div className="profile-text">
              <h4>{username}</h4>
              <p>Administrator</p>
            </div>
            <FiChevronDown />
          </div>

          {isProfileDropdownOpen && (
            <div className="admin-dropdown">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- USER MENU ---------------- */
  return (
    <div className="menu-container">
      <img src="kiteLogo.png" style={{ width: "50px" }} alt="Kite Logo" />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p
                className={
                  selectedMenu === 5
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        <div style={{ position: "relative" }}>
          <div
            className="profile"
            onClick={handleProfileClick}
          >
            <div className="avatar">{avatar}</div>
            <p className="username">{username}</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                minWidth: "100px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.15)",
                zIndex: 1000,
              }}
            >
              <p
                onClick={handleLogout}
                style={{
                  margin: 0,
                  cursor: "pointer",
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;