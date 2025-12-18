import React from "react";
import { Box, Typography } from "@mui/material";
import ProtectedLink from "../../Common/ProtectedLink";
import {
  SidebarMenuBox,
  DropdownMenuBox,
  TextButton,
  TextMain,
  Dropdownmenu,
} from "../../../Assets/styles/NavbarStyles.jsx";

const NewTab = {
  top: "549px",
  right: "-180px",
  width: "196px",
  height: "139px",
  cursor: "default",
  zIndex: 999,
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
  filter:
    "drop-shadow(0px 8px 8px rgba(24, 39, 75, 0.08)) drop-shadow(0px 4px 6px rgba(24, 39, 75, 0.12))",
};

const TextHeader = {
  color: "var(--Muay-Black, #FFF)",
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
  color: "var(--Muay-Black, #FFF)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "12px",
  marginTop: "16px",
};

const NavBar = ({ handleClick, showRedBox }) => {
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
            <path
              d="M13 9.5V7.75C13 7.15326 12.7629 6.58097 12.341 6.15901C11.919 5.73705 11.3467 5.5 10.75 5.5H9.75C9.55109 5.5 9.36032 5.42098 9.21967 5.28033C9.07902 5.13968 9 4.94891 9 4.75V3.75C9 3.15326 8.76295 2.58097 8.34099 2.15901C7.91903 1.73705 7.34674 1.5 6.75 1.5H5.5M5.5 10H10.5M5.5 12H8M7 1.5H3.75C3.336 1.5 3 1.836 3 2.25V13.75C3 14.164 3.336 14.5 3.75 14.5H12.25C12.664 14.5 13 14.164 13 13.75V7.5C13 5.9087 12.3679 4.38258 11.2426 3.25736C10.1174 2.13214 8.5913 1.5 7 1.5Z"
              stroke="#D0D0D0"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Typography
            className="hovered-text"
            sx={[
              TextButton,
              {
                color: showRedBox === "Memo" ? "#05595B" : "#FFF",
              },
            ]}
          >
            Memo
          </Typography>
        </Box>
      </Box>
      {showRedBox === "Memo" && (
        <Box sx={NewTab}>
          <Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/memo/memo-in">
                <Typography sx={TextMain}>Memo In</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/memo/memo-return">
                <Typography sx={TextMain}>Memo Return</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box">
              <ProtectedLink to="/memo/memo-out">
                <Typography sx={TextMain}>Memo Out</Typography>
              </ProtectedLink>
            </Box>
            <Box sx={Dropdownmenu}  className="hovered-box" >
              <ProtectedLink to="/memo/memo-out-return">
                <Typography sx={TextMain}>Memo Out Return</Typography>
              </ProtectedLink>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NavBar;
