import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  SidebarMenuBox,
  ButtonOnNavBarWithRightArrow,
  DropdownMenuBox,
  TextButton,
  TextMain,
  Dropdownmenu,
} from "../../../Assets/styles/NavbarStyles.jsx";

// const ButtonOnNavBarWithRightArrow = {
//   display: "flex",
//   width: "222px",
//   height: "51px",
//   alignItems: "center",
//   flexShrink: 0,
//   "&:hover svg path": {
//     stroke: "#FFF",
//   },
//   "&:hover .hovered-text": {
//     color: "#FFF",
//   },
//   "&:hover .hovered-box": {
//     backgroundColor: "#FFF",
//   },
//   cursor: "pointer",
// };

const NewTab = {
  // position: "absolute",
  top: "702px",
  right: "-270px",
  height: "109px",
  cursor: "default",
  // borderLeft: "1px solid #E4E8EC",
  zIndex: 99,
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
  filter:
    "drop-shadow(0px 8px 8px rgba(24, 39, 75, 0.08)) drop-shadow(0px 4px 6px rgba(24, 39, 75, 0.12))",
};

const TextHeader = {
  color: "var(--Muay-Black, #343434)",
  fontFamily: "Calibri",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  marginLeft: "12px",
  marginTop: "24px",
  marginBottom: "24px",
};

const TextTitle = {
  color: "var(--Muay-Black, #343434)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "12px",
  marginTop: "16px",
};

const TextSub = {
  color: "var(--Muay-Black, #343434)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "41px",
  marginTop: "8px",
  "&:hover": {
    color: "#0072EC",
  },
  cursor: "pointer",
};

const Finance = ({ handleClick, showRedBox }) => {
  return (
    <>
      <Box
        onClick={handleClick}
        className="sidebar-menu-box"
        sx={[SidebarMenuBox, DropdownMenuBox]}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "12px" }}>
          <Box
            sx={{
              marginRight: "6px",
            }}
          >
            <svg
              className="hovered-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="12"
              viewBox="0 0 11 24"
              fill="none"
            >
              <path
                d="M2.25 19.4994C2.15164 19.5006 2.05411 19.4812 1.96369 19.4424C1.87328 19.4037 1.79197 19.3464 1.725 19.2744C1.425 18.9744 1.425 18.5094 1.725 18.2094L7.95 11.9844L1.725 5.77437C1.425 5.47437 1.425 5.00938 1.725 4.70938C2.025 4.40938 2.49 4.40938 2.79 4.70938L9.525 11.4744C9.825 11.7744 9.825 12.2394 9.525 12.5394L2.775 19.2744C2.625 19.4244 2.43 19.4994 2.25 19.4994Z"
                fill="white"
              />
            </svg>
          </Box>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21146_2463)">
              <path
                d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6818 14.6663 7.99992C14.6663 4.31802 11.6816 1.33325 7.99967 1.33325C4.31778 1.33325 1.33301 4.31802 1.33301 7.99992C1.33301 11.6818 4.31778 14.6666 7.99967 14.6666Z"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6663 5.33325H6.66634C6.31272 5.33325 5.97358 5.47373 5.72353 5.72378C5.47348 5.97383 5.33301 6.31296 5.33301 6.66659C5.33301 7.02021 5.47348 7.35935 5.72353 7.60939C5.97358 7.85944 6.31272 7.99992 6.66634 7.99992H9.33301C9.68663 7.99992 10.0258 8.14039 10.2758 8.39044C10.5259 8.64049 10.6663 8.97963 10.6663 9.33325C10.6663 9.68687 10.5259 10.026 10.2758 10.2761C10.0258 10.5261 9.68663 10.6666 9.33301 10.6666H5.33301"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 12V4"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_21146_2463">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <Typography
            className="hovered-text"
            sx={[
              TextButton,
              {
                color: showRedBox === "Finance" ? "#05595B" : "#FFF",
              },
            ]}
          >
            Finance
          </Typography>
        </Box>
      </Box>
      {showRedBox === "Finance" && (
        <Box sx={NewTab}>
          <Box>
            <Box sx={Dropdownmenu} className="hovered-box">
              <Link to="/finance/outstandingreceivble">
                <Typography sx={TextMain}>Receivable</Typography>
              </Link>
            </Box>
            <Box sx={Dropdownmenu} className="hovered-box">
              <Typography sx={TextMain}>Payable</Typography>
            </Box>
            <Box sx={Dropdownmenu} className="hovered-box">
              <Typography sx={TextMain}>Transaction</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Finance;
