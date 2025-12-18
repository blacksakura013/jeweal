import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";

const DeleteShortcutModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          bgcolor: "#FFF",
          borderRadius: "4px",
          boxShadow: 24,
          outline: "none",
        
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: "1px solid #E6E6E6",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L1 21h22L12 2Z"
                fill="#DE350B"
                opacity="0.9"
              />
              <path
                d="M12 8v6"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 17.5h.01"
                stroke="#FFF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <Typography
              sx={{
                fontFamily: "Calibri",
                fontSize: "24px",
                fontWeight: 700,
                color: "#343434",
              }}
            >
              Delete Shortcut
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#57646E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
        </Box>

        <Box sx={{ padding: "16px 18px 8px 18px" }}>
          <Typography
            sx={{
              fontFamily: "Calibri",
              fontSize: "16px",
              fontWeight: 400,
              color: "#343434",
            }}
          >
            Do you want to remove this shortcut from your list?
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "12px 18px 16px 18px",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              fontFamily: "Calibri",
              fontWeight: 700,
              borderColor: "#E6E6E6",
              color: "#343434",
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              textTransform: "none",
              fontFamily: "Calibri",
              fontWeight: 700,
              bgcolor: "#B41E38",
              "&:hover": { bgcolor: "#B41E38" },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteShortcutModal;
