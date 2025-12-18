import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Header from "./TitleMenuBar/Header.jsx";
import Home from "./TitleMenuBar/Home.jsx";
import Dashboard from "./TitleMenuBar/Dashboard.jsx";
import Company from "./TitleMenuBar/Company.jsx";
import UserAndPermission from "./TitleMenuBar/UserAndPermission.jsx";
import Account from "./TitleMenuBar/Account.jsx";
import StoneMaster from "./TitleMenuBar/StoneMaster.jsx";
import Quotation from "./TitleMenuBar/Quotation.jsx";
import Reserve from "./TitleMenuBar/Reserve.jsx";
import PurchaseOrder from "./TitleMenuBar/PurchaseOrder.jsx";
import Memo from "./TitleMenuBar/Memo.jsx";
import Inventory from "./TitleMenuBar/Inventory.jsx";
import Sale from "./TitleMenuBar/Sale.jsx";
import Finance from "./TitleMenuBar/Finance";
import Report from "./TitleMenuBar/Report.jsx";
import Other from "./TitleMenuBar/Other.jsx";
import Setup from "./TitleMenuBar/Setup.jsx";

const NavBar = () => {
  const [showRedBox, setShowRedBox] = useState(null);
  const navRef = useRef();

  const handleClickAccount = () => {
    setShowRedBox(showRedBox === "Account" ? null : "Account");
  };

  const handleClickCompany = () => {
    setShowRedBox(showRedBox === "Company" ? null : "Company");
  };

  const handleClickStoneMaster = () => {
    setShowRedBox(showRedBox === "Stone Master" ? null : "Stone Master");
  };

  const handleClickPurchaseOrder = () => {
    setShowRedBox(showRedBox === "Purchase Order" ? null : "Purchase Order");
  };

  const handleClickMemo = () => {
    setShowRedBox(showRedBox === "Memo" ? null : "Memo");
  };

  const handleClickInventory = () => {
    setShowRedBox(showRedBox === "Inventory" ? null : "Inventory");
  };

  const handleClickFinance = () => {
    setShowRedBox(showRedBox === "Finance" ? null : "Finance");
  };

  const handleClickOther = () => {
    setShowRedBox(showRedBox === "Other" ? null : "Other");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowRedBox(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Box
        ref={navRef}
        sx={{
          position: "fixed",
          width: "200px",
          height: "952px",
          bgcolor: "#05595B",
          zIndex : "999",
          padding : "12px"
        }}
      >
        {/* Header */}
     
  <Header />
     
      

        {/* Menu */}
        <Home />
        <Dashboard />
        <Company handleClick={handleClickCompany} showRedBox={showRedBox} />
        <UserAndPermission />
        <Account handleClick={handleClickAccount} showRedBox={showRedBox} />
        <StoneMaster
          handleClick={handleClickStoneMaster}
          showRedBox={showRedBox}
        />
        <Quotation />
        <Reserve />
        <PurchaseOrder
          handleClick={handleClickPurchaseOrder}
          showRedBox={showRedBox}
        />
        <Memo handleClick={handleClickMemo} showRedBox={showRedBox} />
        <Inventory handleClick={handleClickInventory} showRedBox={showRedBox} />
        <Sale />
        <Finance handleClick={handleClickFinance} showRedBox={showRedBox} />
        <Report />
        <Other handleClick={handleClickOther} showRedBox={showRedBox} />
        {/* <Setup/> */}
      </Box>
    </>
  );
};

export default NavBar;
