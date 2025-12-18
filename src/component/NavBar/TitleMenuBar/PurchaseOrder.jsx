import React from "react";
import { Box, Typography } from "@mui/material";
import ProtectedLink from "../../Common/ProtectedLink";
import {
  SidebarMenuBox,ButtonOnNavBarWithRightArrow,Dropdownmenu,
  DropdownMenuBox,
  TextButton,
} from "../../../Assets/styles/NavbarStyles.jsx";


const NewTab = {
  // position: "absolute",
  top: "498px",
  right: "-180px",
  // backgroundColor: "#FFF",
  width: "180px",
  height: "75px",
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
  marginLeft: "16px",
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
  marginLeft: "16px",
  marginTop: "16px",
};

const TextMain = {
  color: "#D0D0D0",
   letterSpacing: "0 !important",
  textAlign: "right",
  fontFamily: "Calibri",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "70px",
  cursor: "pointer",
};

const PurchaseOrder = ({ handleClick, showRedBox }) => {
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
            <g clip-path="url(#clip0_21167_2410)">
              <path
                d="M8.66634 10.6667H5.33301"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33301 5.33325H5.33301"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6663 8H5.33301"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.66699 2.00003C2.66699 1.82321 2.73723 1.65365 2.86225 1.52862C2.98728 1.4036 3.15685 1.33336 3.33366 1.33336C3.49874 1.33245 3.66064 1.37871 3.80033 1.46669L4.42233 1.86669C4.56168 1.95574 4.72361 2.00306 4.88899 2.00306C5.05437 2.00306 5.2163 1.95574 5.35566 1.86669L5.97833 1.46669C6.11768 1.37764 6.27961 1.33032 6.44499 1.33032C6.61037 1.33032 6.7723 1.37764 6.91166 1.46669L7.53366 1.86669C7.67302 1.95574 7.83495 2.00306 8.00033 2.00306C8.16571 2.00306 8.32763 1.95574 8.46699 1.86669L9.08899 1.46669C9.22835 1.37764 9.39028 1.33032 9.55566 1.33032C9.72104 1.33032 9.88297 1.37764 10.0223 1.46669L10.645 1.86669C10.7844 1.95574 10.9463 2.00306 11.1117 2.00306C11.277 2.00306 11.439 1.95574 11.5783 1.86669L12.2003 1.46669C12.34 1.37871 12.5019 1.33245 12.667 1.33336C12.8438 1.33336 13.0134 1.4036 13.1384 1.52862C13.2634 1.65365 13.3337 1.82321 13.3337 2.00003V14C13.3337 14.1768 13.2634 14.3464 13.1384 14.4714C13.0134 14.5965 12.8438 14.6667 12.667 14.6667C12.5019 14.6676 12.34 14.6213 12.2003 14.5334L11.5783 14.1334C11.439 14.0443 11.277 13.997 11.1117 13.997C10.9463 13.997 10.7844 14.0443 10.645 14.1334L10.0223 14.5334C9.88297 14.6224 9.72104 14.6697 9.55566 14.6697C9.39028 14.6697 9.22835 14.6224 9.08899 14.5334L8.46699 14.1334C8.32763 14.0443 8.16571 13.997 8.00033 13.997C7.83495 13.997 7.67302 14.0443 7.53366 14.1334L6.91166 14.5334C6.7723 14.6224 6.61037 14.6697 6.44499 14.6697C6.27961 14.6697 6.11768 14.6224 5.97833 14.5334L5.35566 14.1334C5.2163 14.0443 5.05437 13.997 4.88899 13.997C4.72361 13.997 4.56168 14.0443 4.42233 14.1334L3.80033 14.5334C3.66064 14.6213 3.49874 14.6676 3.33366 14.6667C3.15685 14.6667 2.98728 14.5965 2.86225 14.4714C2.73723 14.3464 2.66699 14.1768 2.66699 14V2.00003Z"
                stroke="#D0D0D0"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_21167_2410">
                <rect width="16" height="16" fill="#D0D0D0" />
              </clipPath>
            </defs>
          </svg>

          <Typography
            className="hovered-text"
            sx={[
              TextButton, // static styles
              {
                color: showRedBox === "Purchase Order" ? "#05595B" : "#FFF",
              },
            ]}
          >
            Purchase Order
          </Typography>
        </Box>
      </Box>
      {showRedBox === "Purchase Order" && (
        <Box sx={NewTab}>
          <Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/purchase-order/purchase-order">
                <Typography sx={TextMain}>Purchase Order</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/purchase-order/purchase">
                <Typography sx={TextMain}>Purchase(PU)</Typography>
              </ProtectedLink>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PurchaseOrder;
