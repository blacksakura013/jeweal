import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ProtectedLink from "../../Common/ProtectedLink";
import { SidebarMenuBox, DropdownMenuBox, TextButton, TextMain , Dropdownmenu, ButtonOnNavBarWithRightArrow} from "../../../Assets/styles/NavbarStyles.jsx";

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
  top: "600px",
  right: "-180px",
  // backgroundColor: "#FFF",
  width: "180px",
  height: "160px",
  cursor: "default",
  // borderLeft: "1px solid #E4E8EC",
  zIndex: 999,
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


const Inventory = ({ handleClick, showRedBox }) => {
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
              fill="#D0D0D0"
            />
          </svg>
        </Box>
          <svg
            className="hovered-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M21.376 7.09764L12.576 2.63637C12.3994 2.5469 12.2013 2.5 12 2.5C11.7987 2.5 11.6006 2.5469 11.424 2.63637L2.624 7.09764C2.43522 7.19328 2.27769 7.33417 2.16791 7.50555C2.05812 7.67693 2.00013 7.87249 2 8.07174V16.9276C2.00013 17.1269 2.05812 17.3224 2.16791 17.4938C2.27769 17.6652 2.43522 17.8061 2.624 17.9017L11.424 22.363C11.6005 22.4529 11.7986 22.5 12 22.5C12.2014 22.5 12.3995 22.4529 12.576 22.363L21.376 17.9017C21.5648 17.8061 21.7223 17.6652 21.8321 17.4938C21.9419 17.3224 21.9999 17.1269 22 16.9276V8.07174C21.9999 7.87249 21.9419 7.67693 21.8321 7.50555C21.7223 7.33417 21.5648 7.19328 21.376 7.09764ZM11.808 3.2864C11.8667 3.25607 11.9328 3.24015 12 3.24015C12.0672 3.24015 12.1333 3.25607 12.192 3.2864L20.867 7.68469L17.05 9.61902C17.0319 9.60512 17.0125 9.59272 16.992 9.58198L8.192 5.12072L11.808 3.2864ZM12 12.1756L3.133 7.68469L7.356 5.54295L16.223 10.0376L12 12.1756ZM3.008 17.2498C2.94517 17.218 2.89273 17.1711 2.85614 17.1141C2.81955 17.0571 2.80016 16.9921 2.8 16.9258V8.35972L11.6 12.8191V21.6074L3.008 17.2498ZM20.992 17.2498L12.4 21.6018V12.8191L16.4 10.7922V14.722C16.4 14.8202 16.4421 14.9144 16.5172 14.9839C16.5922 15.0533 16.6939 15.0924 16.8 15.0924C16.9061 15.0924 17.0078 15.0533 17.0828 14.9839C17.1579 14.9144 17.2 14.8202 17.2 14.722V10.3866L21.2 8.35972V16.9276C21.1998 16.9939 21.1805 17.059 21.1439 17.116C21.1073 17.173 21.0548 17.2199 20.992 17.2517V17.2498Z"
              fill="#D0D0D0"
            />
          </svg>
       

          <Typography
              className="hovered-text"
              sx={[
                TextButton, 
                {
                  color: showRedBox === 'Inventory' ? '#05595B' : '#FFF',
                },
              ]}
            >
             Inventory
            </Typography>
        </Box>
       
      </Box>
      {showRedBox === "Inventory" && (
        <Box sx={NewTab}>
          <Box>
            <Box sx={Dropdownmenu}  className="hovered-box" >
              <ProtectedLink to="/inventory/stockmovement">
                <Typography sx={TextMain}>Stock Movement</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/inventory/primary">
                <Typography sx={TextMain}>Primary</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/inventory/consignment">
                <Typography sx={TextMain}>Consignment</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box" >
              <ProtectedLink to="/inventory/load">
                <Typography sx={TextMain}>Load</Typography>
              </ProtectedLink>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Inventory;
