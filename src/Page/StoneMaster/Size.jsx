import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../component/Layout/FooterMaster";
import SearchBarSize from "../../component/StoneMaster/Size/SearchBarSize";
import SizeBody from "../../component/StoneMaster/Size/SizeBody";
import SizeHeader from "../../component/StoneMaster/Size/SizeHeader";
import ConfirmCancelDialog from "../../component/Commons/ConfirmCancelDialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  sizeFSMState,
  sizeOriginalDataState,
  sizeFormDataState,
} from "../../recoil/state/stone/SizeState";
import {API_URL} from "config/config.js";

const Size = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [fsmState, setFsmState] = useRecoilState(sizeFSMState);
  const [originalData, setOriginalData] = useRecoilState(sizeOriginalDataState);
  const [formData, setFormData] = useRecoilState(sizeFormDataState);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    } else if (!selectedData && formData && formData._id) {
      setFormData(null);
    }

  }, [selectedData?._id]);


  useEffect(() => {
    setFsmState("initial");
    setFormData(null);
    setOriginalData(null);
    setSelectedData(null);
  }, []);


  const hasUnsavedData = () => {
    if (fsmState === "dirty" || fsmState === "editing") {
      return true;
    }
    if (formData && (formData.code?.trim() || formData.name?.trim())) {
      if (originalData) {
        const formShapes = JSON.stringify(formData.master_info?.master_shapes || []);
        const origShapes = JSON.stringify(originalData.master_info?.master_shapes || []);
        return formData.code !== originalData.code || formData.name !== originalData.name || formData.master_status !== originalData.master_status || formData.master_info?.carat_size !== originalData.master_info?.carat_size || formShapes !== origShapes;
      }
      return true;
    }
    return false;
  };

  const handleDataSelection = (data) => {
    if (hasUnsavedData()) {
      setPendingSelection(data);
      setShowConfirmDialog(true);
      return;
    }
    proceedWithSelection(data);
  };

  const proceedWithSelection = (data) => {
    if (data) {
      setSelectedData(data);
      setOriginalData(data);
      setFormData(data);
      setFsmState("saved");
    } else {
      setSelectedData(null);
      setOriginalData(null);
      setFormData(null);
      setFsmState("initial");
    }
  };

  const handleConfirmDialogClose = (confirmed) => {
    setShowConfirmDialog(false);
    if (confirmed) {
      proceedWithSelection(pendingSelection);
    }
    setPendingSelection(null);
  };

  const handleEditToggle = () => {
    setFsmState("editing");
  };

  const handleAddClick = () => {
    setSelectedData(null);
    setOriginalData(null);
    setFormData(null);
    setFsmState("initial");
  };

  const handleCancelEdit = () => {
    if (fsmState === "editing") {
      // Restore original data and go to view mode (saved)
      if (originalData) {
        setFormData(originalData);
        setSelectedData(originalData);
        setFsmState("saved");
      }
    } else if (fsmState === "dirty") {
      // Clear everything and go to initial (add) mode
      setSelectedData(null);
      setOriginalData(null);
      setFormData(null);
      setFsmState("initial");
    }
  };

  const handleCancelView = () => {
    setSelectedData(null);
    setOriginalData(null);
    setFormData(null);
    setFsmState("initial");
  };

  const handleCodeChange = (newCode) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { carat_size: 0, master_shapes: [] } };
    const updatedData = {
      ...currentData,
      code: newCode,
      name: newCode,
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleCaratSizeChange = (newCaratSize) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { carat_size: 0, master_shapes: [] } };
    const updatedData = {
      ...currentData,
      master_info: {
        ...currentData.master_info,
        carat_size: newCaratSize,
      },
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleShapeChange = (newShape) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { carat_size: 0, master_shapes: [] } };
    const updatedData = {
      ...currentData,
      master_info: {
        ...currentData.master_info,
        master_shapes: newShape,
      },
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleStatusChange = (newStatus) => {
    console.log("New status:", newStatus ? "active" : "inactive");
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { carat_size: 0, master_shapes: [] } };
    const updatedData = {
      ...currentData,
      master_status: newStatus ? "active" : "inactive",
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleSaveSuccess = () => {
    if (formData?._id) {
      setOriginalData(formData);
      setFsmState("saved");
    }
  };

  const isSaveDisabled = () => {
    return !formData?.code?.trim();
  };

  const isEditing = fsmState === "initial" || fsmState === "dirty" || fsmState === "editing";
  const isListDisabled = fsmState === "editing";

  const endpointPath = "/master";
  const navigatePath = "/stone-master/size";
  const method = (fsmState === "dirty" && !formData?._id) || (fsmState === "initial" && !formData?._id) 
    ? "post" 
    : "put";
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box  sx={{marginLeft: "222px" , Height : "100vh " , paddingBottom : "130px"}}>
        <Header />
        <Box sx={{ display: "flex" }}>
          <Box>
            <SizeHeader />
            <SizeBody
              selectedData={formData}
              isEditing={isEditing}
              onCodeChange={handleCodeChange}
              onStatusChange={handleStatusChange}
              onCaratSizeChange={handleCaratSizeChange}
              onShapeChange={handleShapeChange}
            />
          </Box>
          <SearchBarSize onDataSelect={handleDataSelection} isEditing={isListDisabled} selectedData={formData} />
        </Box>
        
        <ConfirmCancelDialog
          open={showConfirmDialog}
          onClose={handleConfirmDialogClose}
        />

        <Footer
          selectedData={formData}
          onCancelEdit={handleCancelEdit}
          onCancelView={handleCancelView}
          onEditToggle={handleEditToggle}
          onAddClick={handleAddClick}
          responseMessage={responseMessage}
          fsmState={fsmState}
          endpointPath={method === "post" ? "/master?master_type=master_stone_size" : endpointPath}
          navigatePath={navigatePath}
          addNavigatePath="/stone-master/size/add"
          method={method}
          isSaveDisabled={isSaveDisabled()}
          onSaveSuccess={handleSaveSuccess}
          payLoadData={method === "post" ? {
            code: formData?.code || "",
            name: formData?.name || formData?.code || "",
            master_info: {
              carat_size: formData?.master_info?.carat_size || 0,
              master_shapes: formData?.master_info?.master_shapes || [],
            },
            master_status: formData?.master_status || "active",
            master_type: "master_stone_size",
          } : undefined}
        />
      </Box>
    </Box>
  );
};

export default Size;
