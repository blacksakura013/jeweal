import React from "react";
import { Box, Typography } from "@mui/material";
import ProtectedLink from "../../Common/ProtectedLink";
import {
  TextButton,
  ButtonOnNavBarWithOutRightArrow,
  SidebarMenuBox,
} from "../../../Assets/styles/NavbarStyles.jsx";

const Quotation = () => {
  return (
    <Box sx={ButtonOnNavBarWithOutRightArrow}>
      <Box
        sx={SidebarMenuBox}
        className="sidebar-menu-box"
        // sx={{ display: "flex", alignItems: "center", marginLeft: "16px" }}
      >
        <svg
          width="12"
          height="15"
          viewBox="0 0 12 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29167 6.625H3.29167M7.29167 3.95833H3.29167M0.625 11.7223V4.661C0.625 2.75833 0.625 1.80767 1.211 1.21633C1.79633 0.625 2.73967 0.625 4.625 0.625H7.29167C9.177 0.625 10.1203 0.625 10.7057 1.21633C11.2917 1.807 11.2917 2.75833 11.2917 4.661V11.7223C11.2917 12.7297 11.2917 13.2337 10.9837 13.4323C10.4803 13.7563 9.70233 13.0763 9.311 12.8297C8.98767 12.6257 8.82633 12.5243 8.64633 12.5183C8.453 12.5117 8.28833 12.6097 7.939 12.8297L6.665 13.633C6.321 13.8497 6.14967 13.9583 5.95833 13.9583C5.767 13.9583 5.59567 13.8497 5.25167 13.633L3.97833 12.8297C3.65433 12.6257 3.493 12.5243 3.31367 12.5183C3.11967 12.5117 2.955 12.6097 2.60567 12.8297C2.21433 13.0763 1.43633 13.7563 0.932333 13.4323C0.625 13.2337 0.625 12.7303 0.625 11.7223Z"
            stroke="#D0D0D0"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <ProtectedLink to="/quotation">
          <Typography className="hovered-text" sx={TextButton}>
            Quotation
          </Typography>
        </ProtectedLink>
      </Box>
    </Box>
  );
};

export default Quotation;
