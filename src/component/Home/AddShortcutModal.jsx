import React, { useMemo, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import "../../Assets/styles/HomeShortcutModal.css";

const SHORTCUT_SECTIONS = [
  {
    title: "Dashboard",
    items: [{ value: "DashBoard", label: "Dashboard" }],
  },
  {
    title: "Stone Master",
    items: [
      { value: "Stone Group", label: "Stone Group" },
      { value: "Stone", label: "Stone" },
      { value: "Shape", label: "Shape" },
      { value: "Color", label: "Color" },
      { value: "Size", label: "Size" },
      { value: "Cutting", label: "Cutting" },
      { value: "Quality", label: "Quality" },
      { value: "Clarity", label: "Clarity" },
    ],
  },
  {
    title: "Memo",
    items: [
      { value: "Memo In", label: "Memo In" },
      { value: "Memo Return", label: "Memo Return" },
      { value: "Memo Out", label: "Memo Out" },
      { value: "Memo Out Return", label: "Memo Out Return" },
    ],
  },
  {
    title: "Report",
    items: [{ value: "Report", label: "Report" }],
  },
  {
    title: "Company",
    items: [
      { value: "Company Profile", label: "Company Profile" },
      { value: "Bank", label: "Bank" },
    ],
  },
  {
    title: "Quotation",
    items: [{ value: "Quotation", label: "Quotation" }],
  },
  {
    title: "Inventory",
    items: [
      { value: "All", label: "All" },
      { value: "Primary", label: "Primary" },
      { value: "Consignment", label: "Consignment" },
      { value: "Load", label: "Load" },
    ],
  },
  {
    title: "Setup",
    items: [
      { value: "Main Location", label: "Main Location" },
      { value: "Sub Location", label: "Sub Location" },
      { value: "Currency", label: "Currency" },
      { value: "Certificate Type", label: "Certificate Type" },
      { value: "Labour Type", label: "Labour Type" },
    ],
  },
  {
    title: "User & Permission",
    items: [{ value: "User & Permission", label: "User & Permission" }],
  },
  {
    title: "Reserve",
    items: [{ value: "Reserve", label: "Reserve" }],
  },
  {
    title: "Purchase Order",
    items: [
      { value: "Purchase Order", label: "Purchase Order" },
      { value: "Purchase", label: "Purchase (PU)" },
    ],
  },
  {
    title: "Sale",
    items: [{ value: "Sale", label: "Sale" }],
  },
  {
    title: "Partner Master",
    items: [
      { value: "Vendor", label: "Vendor" },
      { value: "Customer", label: "Customer" },
    ],
  },
  {
    title: "Finance",
    items: [
      { value: "Receivable", label: "Receivable" },
      { value: "Outstanding Receipt Payable", label: "Payable" },
      { value: "Transaction", label: "Transaction" },
    ],
  },
];

const SHORTCUT_COLUMN_TITLES = [
  ["Dashboard", "Company", "User & Permission", "Partner Master", "Finance"],
  ["Stone Master", "Quotation", "Reserve", "Purchase Order"],
  ["Memo", "Inventory", "Sale"],
  ["Report", "Setup"],
];

const DragHandleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 7H20M4 12H20M4 17H20"
      stroke="#57646E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RemoveIcon = () => (
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
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.1535 12.0008L19.5352 6.61748C19.6806 6.47704 19.7966 6.30905 19.8764 6.12331C19.9562 5.93757 19.9982 5.7378 19.9999 5.53565C20.0017 5.3335 19.9632 5.13303 19.8866 4.94593C19.8101 4.75883 19.697 4.58885 19.5541 4.44591C19.4111 4.30296 19.2412 4.18992 19.0541 4.11337C18.867 4.03682 18.6665 3.9983 18.4644 4.00006C18.2622 4.00181 18.0624 4.04381 17.8767 4.1236C17.691 4.20339 17.523 4.31937 17.3825 4.46478L11.9992 9.84654L6.61748 4.46478C6.47704 4.31937 6.30905 4.20339 6.12331 4.1236C5.93757 4.04381 5.7378 4.00181 5.53565 4.00006C5.3335 3.9983 5.13303 4.03682 4.94593 4.11337C4.75883 4.18992 4.58885 4.30296 4.44591 4.44591C4.30296 4.58885 4.18992 4.75883 4.11337 4.94593C4.03682 5.13303 3.9983 5.3335 4.00006 5.53565C4.00181 5.7378 4.04381 5.93757 4.1236 6.12331C4.20339 6.30905 4.31937 6.47704 4.46478 6.61748L9.84654 11.9992L4.46478 17.3825C4.31937 17.523 4.20339 17.691 4.1236 17.8767C4.04381 18.0624 4.00181 18.2622 4.00006 18.4644C3.9983 18.6665 4.03682 18.867 4.11337 19.0541C4.18992 19.2412 4.30296 19.4111 4.44591 19.5541C4.58885 19.697 4.75883 19.8101 4.94593 19.8866C5.13303 19.9632 5.3335 20.0017 5.53565 19.9999C5.7378 19.9982 5.93757 19.9562 6.12331 19.8764C6.30905 19.7966 6.47704 19.6806 6.61748 19.5352L11.9992 14.1535L17.3825 19.5352C17.523 19.6806 17.691 19.7966 17.8767 19.8764C18.0624 19.9562 18.2622 19.9982 18.4644 19.9999C18.6665 20.0017 18.867 19.9632 19.0541 19.8866C19.2412 19.8101 19.4111 19.697 19.5541 19.5541C19.697 19.4111 19.8101 19.2412 19.8866 19.0541C19.9632 18.867 20.0017 18.6665 19.9999 18.4644C19.9982 18.2622 19.9562 18.0624 19.8764 17.8767C19.7966 17.691 19.6806 17.523 19.5352 17.3825L14.1535 12.0008Z"
      fill="#FFFFFF"
    />
  </svg>
);

export default function AddShortcutModal({
  open,
  onClose,
  selected = [],
  setSelected,
  max = 14,
  onReset,
  onOk,
}) {
  const [draggingIndex, setDraggingIndex] = useState(null);

  const labelByValue = useMemo(() => {
    const m = new Map();
    SHORTCUT_SECTIONS.forEach((section) => {
      section.items.forEach((it) => {
        m.set(it.value, it.label);
      });
    });
    return m;
  }, []);

  const sectionsByTitle = useMemo(() => {
    const m = new Map();
    SHORTCUT_SECTIONS.forEach((s) => m.set(s.title, s));
    return m;
  }, []);

  const isChecked = (value) => selected.includes(value);

  const toggle = (value) => {
    setSelected((prev) => {
      const exists = prev.includes(value);
      if (exists) return prev.filter((v) => v !== value);
      if (prev.length >= max) return prev;
      return [...prev, value];
    });
  };

  const remove = (value) => {
    setSelected((prev) => prev.filter((v) => v !== value));
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";
    setDraggingIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedIndex = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isNaN(draggedIndex) || draggedIndex === index) {
      setDraggingIndex(null);
      return;
    }

    setSelected((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });

    setDraggingIndex(null);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-shortcut-modal">
      <Box className="homeShortcutModalRoot">
        <Box className="homeShortcutModalHeader">
          <Typography className="homeShortcutModalTitle">Add Shortcut</Typography>
          <IconButton onClick={onClose} className="homeShortcutCloseBtn">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="homeShortcutModalBody">
          <Box className="homeShortcutPanel">
            <Box className="homeShortcutPanelHeader">
              <Box className="homeShortcutPanelHeaderLeft">
                <Typography className="homeShortcutPanelTitle">
                  Select Shortcuts
                </Typography>
              
              </Box>
              <Typography className="homeShortcutCount">
                {selected.length}/{max}
              </Typography>
            </Box>

            <Box className="homeShortcutDivider" />

            <Box className="homeShortcutLeftScroll">
              <Box className="homeShortcutColumns">
                {SHORTCUT_COLUMN_TITLES.map((column, colIdx) => (
                  <Box key={colIdx} className="homeShortcutColumn">
                    {column.map((title) => {
                      const section = sectionsByTitle.get(title);
                      if (!section) return null;
                      return (
                        <Box key={section.title} className="homeShortcutGroup">
                          <Typography className="homeShortcutGroupTitle">
                            {section.title}
                          </Typography>
                          <Box className="homeShortcutGroupItems">
                            {section.items.map((it) => {
                              const checked = isChecked(it.value);
                              const disabled = !checked && selected.length >= max;
                              return (
                                <FormControlLabel
                                  key={it.value}
                                  className="homeShortcutCheckboxRow"
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={checked}
                                      disabled={disabled}
                                      onChange={() => toggle(it.value)}
                                    />
                                  }
                                  label={
                                    <Typography className="homeShortcutCheckboxLabel">
                                      {it.label}
                                    </Typography>
                                  }
                                />
                              );
                            })}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box className="homeShortcutPanel homeShortcutPanel--sort">
            <Box className="homeShortcutPanelHeader">
              <Typography className="homeSortPanelTitle" >
                Sort Shortcuts
              </Typography>
            </Box>
            <Box className="homeShortcutDivider" />

            <Box className="homeShortcutRightScroll">
              {selected.map((value, index) => (
                <Box
                  key={`${value}-${index}`}
                  className={`homeShortcutSortItem ${
                    draggingIndex === index ? "isDragging" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Box className="homeShortcutSortLeft">
                    <Box className="homeShortcutDragHandle">
                      <DragHandleIcon />
                    </Box>
                    <Typography className="homeShortcutSortText">
                      {labelByValue.get(value) || value}
                    </Typography>
                  </Box>
                  <IconButton
                    className="homeShortcutRemoveBtn"
                    onClick={() => remove(value)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="homeShortcutFooter">
          {onReset ? (
            <Button
              className="homeShortcutBtnReset"
              variant="outlined"
              onClick={onReset}
            >
              Reset
            </Button>
          ) : null}
          <Button className="homeShortcutBtnOk" variant="contained" onClick={onOk}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

