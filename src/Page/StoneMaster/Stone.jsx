import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../component/Layout/FooterMaster";
import SearchBarStone from "../../component/StoneMaster/Stone/SearchBarStone";
import StoneBody from "../../component/StoneMaster/Stone/StoneBody";
import StoneHeader from "../../component/StoneMaster/Stone/StoneHeader";
import ConfirmCancelDialog from "../../component/Commons/ConfirmCancelDialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  stoneFSMState,
  stoneOriginalDataState,
  stoneFormDataState,
} from "../../recoil/state/stone/StoneState";
import {API_URL} from "config/config.js";

const Stone = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedGroupBoxData, setSelectedGroupBoxData] = useState(null);
  const [fsmState, setFsmState] = useRecoilState(stoneFSMState);
  const [originalData, setOriginalData] = useRecoilState(stoneOriginalDataState);
  const [formData, setFormData] = useRecoilState(stoneFormDataState);
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
        return formData.code !== originalData.code || formData.name !== originalData.name || formData.master_status !== originalData.master_status || formData.stone_group_id !== originalData.stone_group_id || formData.hsn !== originalData.hsn;
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
      setSelectedGroupBoxData(data.stone_group_id);
      setFsmState("saved");
    } else {
      setSelectedData(null);
      setOriginalData(null);
      setFormData(null);
      setSelectedGroupBoxData(null);
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
    setSelectedGroupBoxData(null);
    setFsmState("initial");
  };

  const handleCancelEdit = () => {
    if (fsmState === "editing") {
      // Restore original data and go to view mode (saved)
      if (originalData) {
        setFormData(originalData);
    setSelectedData(originalData);
        setSelectedGroupBoxData(originalData.stone_group_id);
        setFsmState("saved");
      }
    } else if (fsmState === "dirty") {
      // Clear everything and go to initial (add) mode
      setSelectedData(null);
      setOriginalData(null);
      setFormData(null);
      setSelectedGroupBoxData(null);
      setFsmState("initial");
    }
  };

  const handleCancelView = () => {
    setSelectedData(null);
    setOriginalData(null);
    setFormData(null);
    setSelectedGroupBoxData(null);
    setFsmState("initial");
  };

  const handleCodeChange = (newCode) => {
    const currentData = formData || { code: "", name: "", master_status: "active", hsn: "", stone_group_id: null };
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
    const currentData = formData || { code: "", name: "", master_status: "active", hsn: "", stone_group_id: null };
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

  const handleStatusChange = (newStatus) => {
    console.log("New status:", newStatus ? "active" : "inactive");
    const currentData = formData || { code: "", name: "", master_status: "active", hsn: "", stone_group_id: null };
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

  const handleHSNChange = (newHSN) => {
    const currentData = formData || { code: "", name: "", master_status: "active", hsn: "", stone_group_id: null };
    const updatedData = {
      ...currentData,
      hsn: newHSN,
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
  };

  const handleStoneGroupChange = (newId, newCode, newName) => {
    const currentData = formData || { code: "", name: "", master_status: "active", hsn: "", stone_group_id: null };
    const updatedData = {
      ...currentData,
      stone_group_id: newId,
      stone_group_code: newCode,
      stone_group_name: newName,
    };
    setFormData(updatedData);
    setSelectedData(updatedData);
    setSelectedGroupBoxData(newId);
    if (fsmState === "initial") {
      setFsmState("dirty");
    }
    console.log("Stone group changed:", newId, newCode, newName);
  };

  const handleSaveSuccess = () => {
    if (formData?._id) {
      setOriginalData(formData);
      setFsmState("saved");
    }
  };

  const isSaveDisabled = () => {
    return !formData?.name?.trim() || !formData?.code?.trim() || !formData?.stone_group_name?.trim();
  };

  const isEditing = fsmState === "initial" || fsmState === "dirty" || fsmState === "editing";
  const isListDisabled = fsmState === "editing";

  const endpointPath = "/master";
  const navigatePath = "/stone-master/stone";
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
            <StoneHeader />
            <StoneBody
              selectedData={formData}
              isEditing={isEditing}
              onCodeChange={handleCodeChange}
              onNameChange={handleNameChange}
              onStatusChange={handleStatusChange}
              onHSNChange={handleHSNChange}
              onStoneGroupChange={handleStoneGroupChange}
              defaultGroupValue={selectedGroupBoxData}
            />
          </Box>
          <SearchBarStone 
            isEditing={isListDisabled}
          onDataSelect={handleDataSelection}
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
          endpointPath={method === "post" ? "/master?master_type=master_stone_name" : endpointPath}
          navigatePath={navigatePath}
          addNavigatePath="/stone-master/stone/add"
          method={method}
          isSaveDisabled={isSaveDisabled()}
          onSaveSuccess={handleSaveSuccess}
          payLoadData={method === "post" ? {
            code: formData?.code || "",
            name: formData?.name || "",
            master_info: {
              hsn: formData?.hsn || "",
              stone_group: formData?.stone_group_id || "",
            },
            master_status: formData?.master_status || "active",
            master_type: "master_stone_name",
          } : undefined}
        />
        
      </Box>
    </Box>
  );
};

export default Stone;
