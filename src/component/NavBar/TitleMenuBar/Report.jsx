import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  TextButton,
  ButtonOnNavBarWithOutRightArrow,
  SidebarMenuBox,
} from "../../../Assets/styles/NavbarStyles.jsx";

const Report = () => {
  return (
    <Box sx={ButtonOnNavBarWithOutRightArrow}>
      <Box
        sx={SidebarMenuBox}
        className="sidebar-menu-box"
        // sx={{ display: "flex", alignItems: "center", marginLeft: "16px" }}
      >
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.29167 11.9583H10.625M3.29167 9.625H10.625M8.74767 0.651667C9.04667 0.745 10.0067 1.12567 11.3933 2.478C12.7 3.75233 13.1223 4.65733 13.2463 5.00133C13.274 5.74833 13.2917 6.61833 13.2917 7.625C13.2917 10.3133 13.1667 12.0263 13.0527 13.0297C12.9693 13.7637 12.4183 14.3123 11.685 14.398C10.7467 14.5077 9.214 14.625 6.95833 14.625C4.70267 14.625 3.17 14.5077 2.23167 14.3983C1.49833 14.3123 0.947333 13.7637 0.864 13.0297C0.75 12.0263 0.625 10.313 0.625 7.625C0.625 4.937 0.75 3.22367 0.864 2.22033C0.947333 1.48633 1.49833 0.937667 2.23167 0.851667C3.17 0.742667 4.70267 0.625 6.95833 0.625C7.615 0.625 8.21033 0.635 8.74767 0.651667Z"
            stroke="#D0D0D0"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.29199 7.24756C4.14933 5.93756 4.86433 5.36223 5.25733 5.12089C5.44299 5.00656 5.66733 5.08123 5.76399 5.27689C5.98499 5.72523 6.19399 6.34123 6.34299 6.83023C6.43099 7.11689 6.84966 7.17856 7.03399 6.94189C7.77599 5.98989 8.79199 5.12489 8.79199 5.12489M10.1477 5.73156C10.2943 4.95689 10.3 4.27723 10.2877 3.91723C10.2856 3.84148 10.2546 3.7694 10.201 3.71578C10.1474 3.66217 10.0754 3.63108 9.99966 3.62889C9.3915 3.61048 8.78313 3.65741 8.18499 3.76889C7.93366 3.81656 7.85033 4.12289 8.03166 4.30389L9.61299 5.88556C9.79399 6.06656 10.1 5.98289 10.1477 5.73156Z"
            stroke="#D0D0D0"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Typography className="hovered-text" sx={TextButton}>
          Report
        </Typography>
      </Box>
    </Box>
  );
};

export default Report;
