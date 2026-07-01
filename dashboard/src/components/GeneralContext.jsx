import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  // Auth
  user: null,
  setUser: () => {},
  logout: () => {},

  // Trading Windows
  openBuyWindow: () => {},
  closeBuyWindow: () => {},

  openSellWindow: () => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  // ================= AUTH STATE =================
  const [user, setUser] = useState({
    username: "Guest",
    initials: "GU",
  });

  const logout = () => {
    setUser({
      username: "Guest",
      initials: "GU",
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ================= WINDOW STATE =================
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // ================= BUY =================
  const handleOpenBuyWindow = (uid) => {
    console.log("Opening Buy Window:", uid);

    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);

    // optional: ensure only one popup at a time
    setIsSellWindowOpen(false);
  };

  const handleCloseBuyWindow = () => {
    console.log("Closing Buy Window");

    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // ================= SELL =================
  const handleOpenSellWindow = (uid) => {
    console.log("Opening Sell Window:", uid);

    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);

    // optional: ensure only one popup at a time
    setIsBuyWindowOpen(false);
  };

  const handleCloseSellWindow = () => {
    console.log("Closing Sell Window");

    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        // auth
        user,
        setUser,
        logout,

        // trading windows
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {children}

      {/* BUY WINDOW */}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}

      {/* SELL WINDOW */}
      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;