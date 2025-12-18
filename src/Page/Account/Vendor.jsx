import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../component/Layout/FooterVendor";
import AccountHeaderVendor from "../../component/Account/AccountVendorHeader";
import SearchBar from "../../component/Account/SearchBar";
import AccountVendorBodyVendor from "../../component/Account/AccountVendorBody";
import ConfirmCancelDialog from "../../component/Commons/ConfirmCancelDialog";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  vendorFSMState,
  vendorOriginalDataState,
  vendorFormDataState,
} from "../../recoil/state/VendorState";
import {
  vendorDataState,
  enableEditState,
  vendorViewInfoState,
  vendorInvoiceAddressListState,
  vendorShippingAddressListState,
  vendorInfoState,
} from "recoil/state/VendorState";
import { VendorDataSelector } from "recoil/selector/VendorSelector";
import apiRequest from "../../helpers/apiHelper";

const Vendor = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [fsmState, setFsmState] = useRecoilState(vendorFSMState);
  const [originalData, setOriginalData] = useRecoilState(vendorOriginalDataState);
  const [formData, setFormData] = useRecoilState(vendorFormDataState);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  
  const [vendorData, setVendorData] = useRecoilState(vendorDataState);
  const [vendorDataSelector, setVendorDataSelector] = useRecoilState(VendorDataSelector);
  const [editStatus, setEditStatus] = useRecoilState(enableEditState);
  const [vendorViewInfo, setVendorViewInfo] = useRecoilState(vendorViewInfoState);
  const [vendorListAddress, setVendorListAddress] = useRecoilState(vendorInvoiceAddressListState);
  const [vendorListShippingAddress, setVendorListShippingAddress] = useRecoilState(vendorShippingAddressListState);
  const [vendorInfo, setVendorInfo] = useRecoilState(vendorInfoState);
  
  const resetVendorData = useResetRecoilState(vendorDataState);
  const resetVendorViewInfo = useResetRecoilState(vendorViewInfoState);
  const resetVendorInvoiceAddress = useResetRecoilState(vendorInvoiceAddressListState);
  const resetVendorShippingAddress = useResetRecoilState(vendorShippingAddressListState);
  const resetVendorInfo = useResetRecoilState(vendorInfoState);
  const resetEditStatus = useResetRecoilState(enableEditState);

 
  useEffect(() => {
   
    resetVendorData();
    resetVendorViewInfo();
    resetVendorInvoiceAddress();
    resetVendorShippingAddress();
    resetVendorInfo();
    resetEditStatus();
    
   
    setFsmState("initial");
    setFormData(null);
    setOriginalData(null);
    setSelectedData(null);
    
    
    setEditStatus(true);
  }, []);

  
  useEffect(() => {
    if (fsmState === "saved") {
      setEditStatus(false);
    } else {
 
      setEditStatus(true);
    }
  }, [fsmState, setEditStatus]);

  useEffect(() => {
    if (fsmState === "initial" && vendorDataSelector) {
 
      const hasData = vendorDataSelector.vendor_code_id || 
                     vendorDataSelector.vendor_code_name || 
                     vendorDataSelector.phone_no || 
                     vendorDataSelector.email ||
                     (vendorDataSelector.invoice_address && vendorDataSelector.invoice_address.length > 0 && vendorDataSelector.invoice_address[0]?.address) ||
                     (vendorDataSelector.shipping_address && vendorDataSelector.shipping_address.length > 0 && vendorDataSelector.shipping_address[0]?.address);
      
      if (hasData && !formData?._id) {
        setFsmState("dirty");
      }
    }
  }, [vendorDataSelector, fsmState, formData, setFsmState]);

  const loadAccountData = async (id) => {
    try {
      const vendor_info_data = await apiRequest("GET", "/account/vendor/get-info?_id=" + id);
      
      
      setVendorViewInfo(vendor_info_data);
      
      
      setVendorListAddress(vendor_info_data.invoice_address || []);
      setVendorListShippingAddress(vendor_info_data.shipping_address || []);
      
      
      setVendorData(vendor_info_data);
      
      
      setVendorInfo({
        ...vendorInfo,
        business_type: vendor_info_data.business_type || "corporation",
        account_status: vendor_info_data.account_status || "active",
      });
      
      setFormData(vendor_info_data);
      setOriginalData(vendor_info_data);
      setSelectedData(vendor_info_data);
      setFsmState("saved");
    } catch (error) {
      console.error("Error loading account data:", error);
    }
  };

  const hasUnsavedData = () => {
    if (fsmState === "dirty" || fsmState === "editing") {
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
    if (data && data._id) {
      loadAccountData(data._id);
    } else {
      setSelectedData(null);
      setOriginalData(null);
      setFormData(null);
      resetVendorData();
      resetVendorViewInfo();
      resetVendorInvoiceAddress();
      resetVendorShippingAddress();
      resetVendorInfo();
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
    resetVendorData();
    resetVendorViewInfo();
    resetVendorInvoiceAddress();
    resetVendorShippingAddress();
    resetVendorInfo();
    resetEditStatus();
    setFsmState("initial");
    setEditStatus(true); 
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
      resetVendorData();
      resetVendorViewInfo();
      resetVendorInvoiceAddress();
      resetVendorShippingAddress();
      resetVendorInfo();
      resetEditStatus();
      setFsmState("initial");
      setEditStatus(true);
    }
  };

  const handleCancelView = () => {
    setSelectedData(null);
    setOriginalData(null);
    setFormData(null);
    resetVendorData();
    resetVendorViewInfo();
    resetVendorInvoiceAddress();
    resetVendorShippingAddress();
    resetVendorInfo();
    setFsmState("initial");
  };

  const handleSaveSuccess = () => {

    setSelectedData(null);
    setOriginalData(null);
    setFormData(null);
    resetVendorData();
    resetVendorViewInfo();
    resetVendorInvoiceAddress();
    resetVendorShippingAddress();
    resetVendorInfo();
    resetEditStatus();
    setFsmState("initial");
    setEditStatus(true); 
    
  
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const isSaveDisabled = () => {
  
    return false;
  };

  const isEditing = fsmState === "initial" || fsmState === "dirty" || fsmState === "editing";
  const isListDisabled = fsmState === "editing";

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box  sx={{marginLeft: "222px" , Height : "100vh " , paddingBottom : "130px"}}>
        <Header />
        <Box sx={{ display: "flex" }}>
          <div className="vendor_page">
            <Box>
              <AccountHeaderVendor/>
              <AccountVendorBodyVendor/>
            </Box>
          </div>
          <SearchBar 
            base_url="account/vendor" 
            list_url="account/vendor/list"
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
          account_type="vendor"
          fsmState={fsmState}
          formData={formData}
          selectedData={selectedData}
          onCancelEdit={handleCancelEdit}
          onCancelView={handleCancelView}
          onEditToggle={handleEditToggle}
          onAddClick={handleAddClick}
          onSaveSuccess={handleSaveSuccess}
          isSaveDisabled={isSaveDisabled()}
        />
      </Box>
    </Box>
  );
};

export default Vendor;
