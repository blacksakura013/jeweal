import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  ButtonOnNavBarWithRightArrow,
  NewTab,
  SidebarMenuBox,Dropdownmenu,
  DropdownMenuBox,
  TextButton,
  TextHeader,
  TextTitle,
  TextMain,
  TextMainDiable,
} from "../../../Assets/styles/NavbarStyles.jsx";
import { Outlet, Link } from "react-router-dom";

const Account = ({ handleClick, showRedBox }) => {
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
              fill="white"
            >
              <path
                d="M2.25 19.4994C2.15164 19.5006 2.05411 19.4812 1.96369 19.4424C1.87328 19.4037 1.79197 19.3464 1.725 19.2744C1.425 18.9744 1.425 18.5094 1.725 18.2094L7.95 11.9844L1.725 5.77437C1.425 5.47437 1.425 5.00938 1.725 4.70938C2.025 4.40938 2.49 4.40938 2.79 4.70938L9.525 11.4744C9.825 11.7744 9.825 12.2394 9.525 12.5394L2.775 19.2744C2.625 19.4244 2.43 19.4994 2.25 19.4994Z"
                fill="white"
              />
            </svg>
            <Box className="hovered-box" />
          </Box>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 8.66675C10 8.13632 9.78929 7.62761 9.41421 7.25253C9.03914 6.87746 8.53043 6.66675 8 6.66675C7.46957 6.66675 6.96086 6.87746 6.58579 7.25253C6.21071 7.62761 6 8.13632 6 8.66675"
              stroke="#D0D0D0"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.66699 12.9999V2.99992C2.66699 2.55789 2.84259 2.13397 3.15515 1.82141C3.46771 1.50885 3.89163 1.33325 4.33366 1.33325H12.667C12.8438 1.33325 13.0134 1.40349 13.1384 1.52851C13.2634 1.65354 13.3337 1.82311 13.3337 1.99992V13.9999C13.3337 14.1767 13.2634 14.3463 13.1384 14.4713C13.0134 14.5963 12.8438 14.6666 12.667 14.6666H4.33366C3.89163 14.6666 3.46771 14.491 3.15515 14.1784C2.84259 13.8659 2.66699 13.4419 2.66699 12.9999ZM2.66699 12.9999C2.66699 12.5579 2.84259 12.134 3.15515 11.8214C3.46771 11.5088 3.89163 11.3333 4.33366 11.3333H13.3337"
              stroke="#D0D0D0"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00033 6.66667C8.73671 6.66667 9.33366 6.06971 9.33366 5.33333C9.33366 4.59695 8.73671 4 8.00033 4C7.26395 4 6.66699 4.59695 6.66699 5.33333C6.66699 6.06971 7.26395 6.66667 8.00033 6.66667Z"
              stroke="#D0D0D0"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Typography
            className="hovered-text"
            sx={[
              TextButton, // static styles
              {
                color: showRedBox === "Account" ? "#05595B" : "#FFF",
              },
            ]}
          >
            Partner Master
          </Typography>
        </Box>
      </Box>
      {showRedBox === "Account" && (

        <Box sx={NewTab}>
          <Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <Link to="/account/vendor">
                <Typography sx={TextMain}>Vendor</Typography>
              </Link>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <Link to="/account/customer">
                <Typography sx={TextMain}>Customer</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Account;
