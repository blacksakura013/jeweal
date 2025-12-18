import React from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../component/Layout/Footer";
import UserAndPermissionHeader from "../../component/UserAndPermission/UserAndPermissionHeader";
import SearchBar from "../../component/Account/SearchBar";
import UserAndPermissionBody from "../../component/UserAndPermission/Disable/UserAndPermissionBodyDisable";

const UserAndPermission = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box  sx={{marginLeft: "222px" , Height : "100vh " , paddingBottom : "130px"}}>
        <Header />
        <Box sx={{ display: "flex" }}>
          <Box>
            <UserAndPermissionHeader />
            <UserAndPermissionBody />
          </Box>
          <SearchBar />
        </Box>
        <Footer/>
      </Box>
    </Box>
  );
};

export default UserAndPermission;
