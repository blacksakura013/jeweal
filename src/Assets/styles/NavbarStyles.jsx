export const ButtonOnNavBarWithOutRightArrow = {
  display: "flex",
  width: "182px",
  /* height: "51px", */
  alignItems: "center",
  flexShrink: 0,
  "&:hover svg path": {
    stroke: "#FFF",
  },
  "&:hover .hovered-text": {
    color: "#FFF",
  },
  "&:hover": {
    backgroundColor: "#066B6E",
    color: "black",
  },
  cursor: "pointer",
};

export const ButtonOnNavBarWithRightArrow = {
  display: "flex",
  width: "182px",
  /* height: "51px", */
  alignItems: "center",
  flexShrink: 0,
  "&:hover svg path": {
    stroke: "#FFF",
  },
  "&:hover .hovered-text": {
    color: "#FFF",
  },
  "&:hover .hovered-box": {
    backgroundColor: "#FFF",
  },
  cursor: "pointer",
  // backgroundColor: "#f5f5f5",
};

export const TextButton = {
  letterSpacing: "0 !important",
  color: "#D0D0D0",
  textAlign: "center",
  fontFamily: "Calibri",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "12px",
};

export const NewTab = {
  // position: "absolute",
  top: "294px",
  right: "-180px",
  Color: "#FFF",
  width: "180px",
  // height: "87px",
  cursor: "default",
  // borderLeft: "1px solid #E4E8EC",
  zIndex: 999,
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
  filter:
    "drop-shadow(0px 8px 8px rgba(24, 39, 75, 0.08)) drop-shadow(0px 4px 6px rgba(24, 39, 75, 0.12))",
};

export const TextHeader = {
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

export const TextTitle = {
  color: "var(--Muay-Black, #343434)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "12px",
  marginTop: "16px",
};

export const TextMain = {
  color: "#D0D0D0",
   letterSpacing: "0 !important",
  textAlign: "left",
  fontFamily: "Calibri",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "70px",
  cursor: "pointer",
};

export const TextSub = {
  color: "var(--Muay-Black, #343434)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginLeft: "41px",
  marginTop: "8px",
  "&:hover": {
    color: "#05595B",
  },
  cursor: "pointer",
};

export const TextMainDiable = {
  color: "var(--Muay-Black, #ACACAC)",
  fontFamily: "Calibri",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  marginLeft: "10px",
  cursor: "pointer",
};

export const SidebarMenuBox = {
  display: "flex",
    borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 400,
  padding: "12px 20px 12px 30px",
  fontFamily: "Calibri",
  alignItems: "center",
  flexShrink: 0,
  cursor: "pointer",
  ".hovered-text": {
    color: "#D0D0D0",
  },
  ".hovered-svg path": {
    stroke: "#D0D0D0",
  },
  "&:hover": {
    bgcolor: "#066B6E",
    ".hovered-text": {
      color: "#fff",
    },
    ".hovered-svg path": {
      stroke: "#fff",
    },
  },
};
export const DropdownMenuBox = (showRedBox, name) => ({
  display: "flex",
    borderRadius: "10px",
  // width: "222px",
  padding: "12px 20px 12px 2px",
  alignItems: "center",
  flexShrink: 0,
  bgcolor: showRedBox === "name" ? "#FFF" : "#05595B",

  "&:hover": {
    bgcolor: "#066B6E",
    ".hovered-text": {
      color: "#fff",
    },
    ".hovered-svg path": {
      fill: "#fff",
    },
  },

  ".hovered-svg path": {
    fill: showRedBox === "name" ? "#05595B" : "#FFF",
  },

  cursor: "pointer",
  justifyContent: "space-between",
});

export const Dropdownmenu = {
  display: "flex",
  textAlign: "left",
  alignItems: "center",
  borderRadius: "10px",
  // height: "32px",
   padding: "9px 20px 9px 2px",
  "&:hover.hovered-box": {
    backgroundColor: "#066B6E",
  },
};
