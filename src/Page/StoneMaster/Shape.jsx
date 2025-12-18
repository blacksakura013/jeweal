import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../component/Layout/FooterMaster";
import SearchBarShape from "../../component/StoneMaster/Shape/SearchBarShape";
import ShapeBody from "../../component/StoneMaster/Shape/ShapeBody";
import ShapeHeader from "../../component/StoneMaster/Shape/ShapeHeader";
import ConfirmCancelDialog from "../../component/Commons/ConfirmCancelDialog";
import apiRequest from "../../helpers/apiHelper";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  shapeFSMState,
  shapeOriginalDataState,
  shapeFormDataState,
} from "../../recoil/state/stone/ShapeState";
import axios from "axios";
import {API_URL} from "config/config.js";

const Shape = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [fsmState, setFsmState] = useRecoilState(shapeFSMState);
  const [originalData, setOriginalData] = useRecoilState(shapeOriginalDataState);
  const [formData, setFormData] = useRecoilState(shapeFormDataState);
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
        const formSizeIds = JSON.stringify(formData.master_info?.size_ids || []);
        const origSizeIds = JSON.stringify(originalData.master_info?.size_ids || []);
        return formData.code !== originalData.code || formData.name !== originalData.name || formData.master_status !== originalData.master_status || formSizeIds !== origSizeIds;
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
    
      if (originalData) {
        setFormData(originalData);
        setSelectedData(originalData);
        setFsmState("saved");
      }
    } else if (fsmState === "dirty") {
 
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
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { size_ids: [], stone_group: "" } };
    const updatedData = {
      ...currentData,
      code: newCode,
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleNameChange = (newName) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { size_ids: [], stone_group: "" } };
    const updatedData = {
      ...currentData,
      name: newName,
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleSizeChange = (newShape) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { size_ids: [], stone_group: "" } };
    const updatedData = {
      ...currentData,
      master_info: {
        ...currentData.master_info,
        size_ids: newShape,
      },
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleStatusChange = (newStatus) => {
    const currentData = formData || { code: "", name: "", master_status: "active", master_info: { size_ids: [], stone_group: "" } };
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
    return !formData?.name?.trim() || !formData?.code?.trim();
  };

  const isEditing = fsmState === "initial" || fsmState === "dirty" || fsmState === "editing";
  const isListDisabled = fsmState === "editing";

  const endpointPath = "/master";
  const navigatePath = "/stone-master/shape";
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
            <ShapeHeader />
            <ShapeBody
              selectedData={formData}
              isEditing={isEditing}
              onCodeChange={handleCodeChange}
              onNameChange={handleNameChange}
              onStatusChange={handleStatusChange}
              onSizeChange={handleSizeChange}
            />
          </Box>
          <SearchBarShape
            onDataSelect={handleDataSelection}
            isEditing={isListDisabled}
            selectedData={formData}
          />
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
          endpointPath={method === "post" ? "/master?master_type=master_stone_shape" : endpointPath}
          navigatePath={navigatePath}
          addNavigatePath="/stone-master/shape/add"
          method={method}
          isSaveDisabled={isSaveDisabled()}
          onSaveSuccess={handleSaveSuccess}
          payLoadData={method === "post" ? {
            code: formData?.code || "",
            name: formData?.name || "",
            master_info: {
              size_ids: formData?.master_info?.size_ids || [],
              stone_group: formData?.master_info?.stone_group || "",
            },
            master_status: formData?.master_status || "active",
            master_type: "master_stone_shape",
          } : undefined}
        />
      </Box>
    </Box>
  );
};

export default Shape;
