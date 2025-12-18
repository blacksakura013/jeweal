import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../Assets/image/Codth logo-JPG(WH).png";
import { saveShortcutService } from "services/homeService";
import AddShortcutModal from "./AddShortcutModal";
import DeleteShortcutModal from "./DeleteShortcutModal";
import {
  DashboardIcon,
  CompanyProfileIcon,
  BankIcon,
  UserPermissionIcon,
  VendorIcon,
  CustomerIcon,
  StoneGroupIcon,
  StoneIcon,
  ShapeIcon,
  ReserveIcon,
  SaleIcon,
  SubLocationIcon,
  ReportIcon,
  AllIcon,
  PrimaryIcon,
  ConsignmentIcon,
  LoadIcon,
  OutstandingReceiptPayableIcon,
  ReceivableIcon,
  TransactionIcon,
  CurrencyIcon,
  QualityIcon,
  ClarityIcon,
  CertificateTypeIcon,
  LabourTypeIcon,
  QuotationIcon,
  PurchaseOrderIcon,
  PurchaseIcon,
  MemoInIcon,
  MemoReturnIcon,
  MemoOutIcon,
  MemoOutReturnIcon,
  SizeIcon,
  ColorIcon,
  CuttingIcon,
  MainLocationIcon,
} from "./HomeIcons";

const MAX_BOXES = 14;

const getBoxLink = (boxName) => {
  switch (boxName) {
    case "Company Profile":
      return "/company/company-profile";
    case "Bank":
      return "/company/bank";
    case "User & Permission":
      return "/userandpermission";
    case "Vendor":
      return "/account/vendor";
    case "Customer":
      return "/account/customer";
    case "Stone Group":
      return "/stone-master/stone-group";
    case "Stone":
      return "/stone-master/stone";
    case "Shape":
      return "/stone-master/shape";
    case "Size":
      return "/stone-master/size";
    case "Color":
      return "/stone-master/color";
    case "Cutting":
      return "/stone-master/cutting";
    case "Quality":
      return "/stone-master/quality";
    case "Clarity":
      return "/stone-master/clarity";
    case "Certificate Type":
      return "/stone-master/certificate-type";
    case "Labour Type":
      return "/stone-master/labour-type";
    case "Purchase Order":
      return "/purchase-order/purchase-order";
    case "Purchase":
      return "/purchase-order/purchase";
    case "Memo In":
      return "/memo/memo-in";
    default:
      return "/home";
  }
};

const Homey = () => {
  const boxConfig = {
    DashBoard: { icon: <DashboardIcon />, text: "Dashboard" },
    "Company Profile": {
      icon: <CompanyProfileIcon />,
      text: "Company Profile",
    },
    Bank: { icon: <BankIcon />, text: "Bank" },
    "User & Permission": {
      icon: <UserPermissionIcon />,
      text: "User & Permission",
    },
    Vendor: { icon: <VendorIcon />, text: "Vendor" },
    Customer: { icon: <CustomerIcon />, text: "Customer" },
    "Stone Group": { icon: <StoneGroupIcon />, text: "Stone Group" },
    Stone: { icon: <StoneIcon />, text: "Stone" },
    Shape: { icon: <ShapeIcon />, text: "Shape" },
    Size: { icon: <SizeIcon />, text: "Size" },
    Color: { icon: <ColorIcon />, text: "Color" },
    Cutting: { icon: <CuttingIcon />, text: "Cutting" },
    Quality: { icon: <QualityIcon />, text: "Quality" },
    Clarity: { icon: <ClarityIcon />, text: "Clarity" },
    "Certificate Type": {
      icon: <CertificateTypeIcon />,
      text: "Certificate Type",
    },
    "Labour Type": { icon: <LabourTypeIcon />, text: "Labour Type" },
    Quotation: { icon: <QuotationIcon />, text: "Quotation" },
    Reserve: { icon: <ReserveIcon />, text: "Reserve" },
    "Purchase Order": { icon: <PurchaseOrderIcon />, text: "Purchase Order" },
    Purchase: { icon: <PurchaseIcon />, text: "Purchase" },
    "Memo In": { icon: <MemoInIcon />, text: "Memo In" },
    "Memo Return": { icon: <MemoReturnIcon />, text: "Memo Return" },
    "Memo Out": { icon: <MemoOutIcon />, text: "Memo Out" },
    "Memo Out Return": { icon: <MemoOutReturnIcon />, text: "Memo Out Return" },
    All: { icon: <AllIcon />, text: "All" },
    Primary: { icon: <PrimaryIcon />, text: "Primary" },
    Consignment: { icon: <ConsignmentIcon />, text: "Consignment" },
    Load: { icon: <LoadIcon />, text: "Load" },
    Sale: { icon: <SaleIcon />, text: "Sale" },
    "Outstanding Receipt Payable": {
      icon: <OutstandingReceiptPayableIcon />,
      text: "Outstanding Receipt Payable",
    },
    Receivable: { icon: <ReceivableIcon />, text: "Receivable" },
    Transaction: { icon: <TransactionIcon />, text: "Transaction" },
    Report: { icon: <ReportIcon />, text: "Report" },
    "Main Location": { icon: <MainLocationIcon />, text: "Main Location" },
    "Sub Location": { icon: <SubLocationIcon />, text: "Sub Location" },
    Currency: { icon: <CurrencyIcon />, text: "Currency" },
  };

  const [open, setOpen] = useState(false);
  const [createdBoxes, setCreatedBoxes] = useState([]);
  const [externalBoxes, setExternalBoxes] = useState([]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [boxToRemove, setBoxToRemove] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRemoveDialog = (boxName) => {
    setBoxToRemove(boxName);
    setRemoveDialogOpen(true);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveDialogOpen(false);
    setBoxToRemove(null);
  };

  const handleSave = async () => {
    setExternalBoxes(createdBoxes);
    try {
      const dashboard_setting = createdBoxes.map((boxName) => {
        return {
          columnClass: "mb-4 col-md-6 col-12",
          index: 0,
          name: boxName,
        };
      });

      const payload = {
        user_id: "66fe3fcad2af9608024c884d",
        dashboard_setting: dashboard_setting,
        type: "Dashboard",
      };

      const response = await saveShortcutService(payload);
      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleConfirmRemove = async () => {
    if (!boxToRemove) return;
    const updated = createdBoxes.filter((name) => name !== boxToRemove);
    setCreatedBoxes(updated);
    setExternalBoxes(updated);

    try {
      const dashboard_setting = updated.map((boxName) => {
        return {
          columnClass: "mb-4 col-md-6 col-12",
          index: 0,
          name: boxName,
        };
      });

      const payload = {
        user_id: "66fe3fcad2af9608024c884d",
        dashboard_setting: dashboard_setting,
        type: "Dashboard",
      };

      await saveShortcutService(payload);
    } catch (error) {
      console.error("Remove shortcut failed", error);
    } finally {
      handleCloseRemoveDialog();
    }
  };

  const handleReset = () => {
    setCreatedBoxes([]);
  };

  return (
    <div>
      <AddShortcutModal
        open={open}
        onClose={handleClose}
        selected={createdBoxes}
        setSelected={setCreatedBoxes}
        max={MAX_BOXES}
        onReset={handleReset}
        onOk={handleSave}
      />

      <DeleteShortcutModal
        open={removeDialogOpen}
        onClose={handleCloseRemoveDialog}
        onConfirm={handleConfirmRemove}
      />

      {/* External Boxes Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            marginTop: "2px",
          }}
        >
          <img src={Logo} />

          <Box
            sx={{
              width: externalBoxes.length > 0 ? "1345px" : "100%",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "20px",
              rowGap: "62px",
              justifyContent:
                externalBoxes.length > 0 ? "flex-start" : "center",
              alignContent: "flex-start",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "18rem",
            }}
          >
            {externalBoxes.map((box, index) => {
              const config = boxConfig[box] || { icon: null, text: box };
              const displayText =
                config.text || box.replace(/([A-Z])/g, " $1").trim();

              return (
                <Link
                  to={getBoxLink(box)}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "175px",
                      cursor: "pointer",
                      flexDirection: "column",
                      borderRadius: "5px",
                      position: "relative",
                      "&:hover .homeShortcutRemoveBtn": {
                        opacity: 1,
                        pointerEvents: "auto",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "80px",
                        height: "80px",
                        alignItems: "center",
                        backgroundColor: "#F2F6F7",
                        alignContent: "center",
                      }}
                    >
                      <IconButton
                        className="homeShortcutRemoveBtn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenRemoveDialog(box);
                        }}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "28px",
                          height: "28px",
                          opacity: 0,
                          pointerEvents: "none",
                          bgcolor: "#FFF",
                          border: "1px solid #E6E6E6",
                          "&:hover": { bgcolor: "#FFF" },
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M6.1875 8.4375H11.8125C11.9617 8.4375 12.1048 8.49676 12.2102 8.60225C12.3157 8.70774 12.375 8.85082 12.375 9C12.375 9.14918 12.3157 9.29226 12.2102 9.39775C12.1048 9.50324 11.9617 9.5625 11.8125 9.5625H6.1875C6.03832 9.5625 5.89524 9.50324 5.78975 9.39775C5.68426 9.29226 5.625 9.14918 5.625 9C5.625 8.85082 5.68426 8.70774 5.78975 8.60225C5.89524 8.49676 6.03832 8.4375 6.1875 8.4375Z"
                            fill="#E00410"
                          />
                          <path
                            d="M9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75ZM9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95469 13.0916 1.125 11.0886 1.125 9C1.125 6.91142 1.95469 4.90838 3.43153 3.43153C4.90838 1.95469 6.91142 1.125 9 1.125C11.0886 1.125 13.0916 1.95469 14.5685 3.43153C16.0453 4.90838 16.875 6.91142 16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875Z"
                            fill="#E00410"
                          />
                        </svg>
                      </IconButton>

                      {config.icon}
                    </Box>

                    <Typography
                      sx={{
                        color: "#05595B",
                        fontFamily: "Calibri",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        marginTop: "25px",
                      }}
                    >
                      {displayText}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
            {externalBoxes.length < MAX_BOXES && (
              <Box
                onClick={handleOpen}
                sx={{
                  // border: "1px solid gray",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "175px",
                  // height: "140px",
                  cursor: "pointer",
                  flexDirection: "column",
                  borderRadius: "5px",
                  // border: "1px solid #BDBDBD",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 75 75"
                  fill="none"
                >
                  <path
                    d="M39.8438 35.1562V15.625C39.8438 15.0034 39.5968 14.4073 39.1573 13.9677C38.7177 13.5282 38.1216 13.2813 37.5 13.2812C36.8784 13.2813 36.2823 13.5282 35.8427 13.9677C35.4032 14.4073 35.1562 15.0034 35.1562 15.625V35.1562H15.625C15.0034 35.1562 14.4073 35.4032 13.9677 35.8427C13.5282 36.2823 13.2813 36.8784 13.2812 37.5C13.2813 38.1216 13.5282 38.7177 13.9677 39.1573C14.4073 39.5968 15.0034 39.8438 15.625 39.8438H35.1562V59.375C35.1643 59.9941 35.4139 60.5855 35.8517 61.0233C36.2895 61.4611 36.8809 61.7107 37.5 61.7188C38.1216 61.7188 38.7177 61.4718 39.1573 61.0323C39.5968 60.5927 39.8438 59.9966 39.8438 59.375V39.8438H59.375C59.9966 39.8438 60.5927 39.5968 61.0323 39.1573C61.4718 38.7177 61.7188 38.1216 61.7188 37.5C61.7107 36.8809 61.4611 36.2895 61.0233 35.8517C60.5855 35.4139 59.9941 35.1643 59.375 35.1562H39.8438Z"
                    fill="#57646E"
                  />
                </svg>
                <Typography
                  sx={{
                    color: "#343434",
                    fontFamily: "Calibri",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    marginTop: "70px",
                  }}
                >
                  Add Shortcuts
                </Typography>
                <Typography
                  sx={{
                    color: "#9A9A9A",
                    fontFamily: "Calibri",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    width: "189px",
                  }}
                >
                  Click here to create one
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Homey;
