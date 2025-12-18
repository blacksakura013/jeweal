import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../layouts/BaseLayout/Footer";
import HeaderPage from "../../layouts/BaseLayout/HeaderPage";
import axios from "axios";
import TableBoxListComponent from "component/Commons/TableBoxListComponent";
import { useNavigate, useParams } from "react-router-dom";
import FormBodyLayout from "layouts/BaseLayout/FormBodyLayout";
import {
  payloadDataCurrencyState,
  saveButtonStatusState,
  isEditingState,
} from "recoil/state/CommonState";
import { useRecoilState } from "recoil";
import Name from "layouts/BaseLayout/TextField/Name";
import StatusSwitch from "../../component/SwitchIOSStyle";
import {
  currencyCodeState,
  currencyNameState,
  currencyDescriptionState,
} from "recoil/state/CurrencyState";
import SideBarList from "layouts/BaseLayout/SideBarList";
import "App.css";
import apiRequest from "helpers/apiHelper";
const Currency = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [originalData, setOriginalData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const [currencyCode, setCurrencyCode] = useRecoilState(currencyCodeState);
  const navigate = useNavigate();
  const { action, id } = useParams();
  const method = action === "add" ? "POST" : "PUT";
  const endpointPath = action === "add" ? "/currencies" : "/currencies/" + id;
  const navigatePath = "/settings/currency";

  const handleDataSelection = (data) => {
    if (isEditing) {
      // Don't allow direct selection when editing - this should go through confirmation popup
      return;
    }
    setSelectedData(data);
    setOriginalData(data);
    setIsEditing(false);
  };

  const handleConfirmedDataSelection = (data) => {
    // This function is called when user confirms through the popup
    setSelectedData(data);
    setOriginalData(data);
    setIsEditing(false);
  };

  const handleSaveClick = () => {};

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedData(originalData);
  };

  const handleCodeChange = (newCode) => {
    setSelectedData((prevData) => ({
      ...prevData,
      code: newCode,
    }));
  };

  const handleNameChange = (newName) => {
    setSelectedData((prevData) => ({
      ...prevData,
      name: newName,
    }));
  };

  const handleStatusChange = (newStatus) => {
    console.log("New status:", newStatus ? "active" : "inactive");
    setSelectedData((prevData) => ({
      ...prevData,
      master_status: newStatus ? "active" : "inactive",
    }));
  };

  const FormBody = (props) => {
    const [payloadData, setPayloadData] = useRecoilState(
      payloadDataCurrencyState
    );
    const [saveButtonStatus, setSaveButtonStatus] = useRecoilState(
      saveButtonStatusState
    );
    const checkMainPage = props.main ? props.main : false;

    useEffect(() => {
      return () => {
        setPayloadData({});
      };
    }, [setPayloadData]);

    const setFormData = (value, keyName) => {
      setPayloadData((prev) => ({
        ...prev, // Copy previous state
        [keyName]: value, // Update or add the property
      }));
    };

    const required_field = ["code", "currency_name"];
    let validate_field = false;
    useEffect(() => {
      if (props.main) {
        setIsEditing(false);
      }
      if (payloadData) {
        for (let i = 0; i < required_field.length; i++) {
          console.log(
            payloadData[required_field[i]] !== "",
            "payloadData[required_field[i]"
          );

          if (
            payloadData[required_field[i]] !== "" ||
            (payloadData[required_field[i]] && i == required_field.length - 1)
          ) {
            validate_field = true;
          } else {
            validate_field = false;
            break;
          }
        }

        if (validate_field === true) {
          setSaveButtonStatus(true);
        } else {
          setSaveButtonStatus(false);
        }
      } else {
        setSaveButtonStatus(false);
      }
    }, [payloadData]);

    const getViewData = async () => {
      const data = await apiRequest("GET", "/currencies/" + id);
      setPayloadData(data);
    };
    useEffect(() => {
      if (action === "edit") {
        getViewData();
      }
      if (action === "add") {
        setIsEditing(true);
        // Initialize payloadData with default values for add mode
        setPayloadData({
          code: "",
          currency_name: "",
          currency_detail: "",
          selling_rate: "",
          buying_rate: "",
          status: "active" // Set default status to active
        });
      }
    }, [action, id, setPayloadData]); // Add dependencies to trigger when URL changes

    return (
      <div className="form_container">
      <div className="input_text_group">
        <label htmlFor="currency_code">
          Code: <span className="required_red">*</span>
        </label>
        <input
          type="text"
          id="currency_code"
          className={!isEditing ? "disabled_input_field" : ""}
          disabled={!isEditing}
          style={{ color: isEditing ? "#000000" : "#9A9A9A" }}
          onChange={(e) => {
            setFormData(e.target.value, "code");
          }}
          value={payloadData.code}
        />
      </div>
    
      <div className="input_text_group">
        <label htmlFor="currency_name">
          Name: <span className="required_red">*</span>
        </label>
        <input
          type="text"
          id="currency_name"
          className={!isEditing ? "disabled_input_field" : ""}
          disabled={!isEditing}
          style={{ color: isEditing ? "#000000" : "#9A9A9A" }}
          onChange={(e) => {
            setFormData(e.target.value, "currency_name");
          }}
          value={payloadData.currency_name}
        />
      </div>
    
      <div className="input_text_group">
        <label htmlFor="currency_detail">Description: </label>
        <input
          type="text"
          className={!isEditing ? "disabled_input_field" : ""}
          disabled={!isEditing}
          id="currency_detail"
          style={{ color: isEditing ? "#000000" : "#9A9A9A" }}
          onChange={(e) => {
            setFormData(e.target.value, "currency_detail");
          }}
          value={payloadData.currency_detail}
        />
      </div>
    
      <div className="input_text_group">
        <div className="exchange_rate_block">
          <h2 className="exchange_rate_label_header">Exchange Rate</h2>
          <div className="block">
            <label htmlFor="currency_code">Selling Rate </label>
            <input
              type="text"
              className={
                !isEditing
                  ? "currency_value selling_rate disabled_input_field"
                  : "currency_value selling_rate"
              }
              disabled={!isEditing}
              style={{ color: isEditing ? "#000000" : "#9A9A9A" }}
              onChange={(e) => {
                setFormData(e.target.value, "selling_rate");
              }}
              value={payloadData.selling_rate}
            />
          </div>
    
          <div className="block">
            <label htmlFor="currency_code">Buying Rate </label>
            <input
              type="text"
              disabled={!isEditing}
              className={
                !isEditing
                  ? "currency_value buying_rate disabled_input_field"
                  : "currency_value buying_rate"
              }
              style={{ color: isEditing ? "#000000" : "#9A9A9A" }}
              onChange={(e) => {
                setFormData(e.target.value, "buying_rate");
              }}
              value={payloadData.buying_rate}
            />
          </div>
    
          <div className="block">
            <label htmlFor="currency_code">
              <StatusSwitch
                checked={payloadData.status === "active"}
                disabled={!isEditing}
                onChange={(e) => {
                  let status = e.target.checked ? "active" : "inactive";
                  setFormData(status, "status");
                  console.log(payloadData.status);
                }}
                label="Active"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    
    );
  };

  const DisplayComponent = (props) => {
    switch (action) {
      case "list":
        return (
          <TableBoxListComponent
            list_url="/currencies"
            edit_list_url="/settings/currency/edit"
            update_url="/currencies"
          />
        );
        break;
      case "add":
        return (
          <FormBodyLayout>
            <FormBody />
          </FormBodyLayout>
        );
        break;

      case "edit":
        return (
          <FormBodyLayout>
            <FormBody />
          </FormBodyLayout>
        );

        break;

      case "list":
        return (
          <TableBoxListComponent
            list_url="/currencies"
            edit_list_url="/settings/currency/edit"
            update_url="/currencies"
          />
        );

        break;
      default:
        return (
          <FormBodyLayout>
            <FormBody main={true} />
          </FormBodyLayout>
        );
    }
  };

  return (
    <Box className="page_container" sx={{ display: "flex" }}>
      <NavBar />

      <Box  sx={{marginLeft: "222px" , Height : "100vh " , paddingBottom : "130px"}}>
        <Header />
        <Box>
          <Box className="form_content_wrp">
            <HeaderPage
              modalList={true}
              modalListHeader="Currency"
              modalListSubHeader="Currency List"
              modalListEndpoint="/currencies"
              modalUpdateStatusEndpoint="/currencies/id/togglestatus"
              modalStatusCustomField="status"
              // modalListExportEndpoint=""
              // modalListSearchEndpoint=""
              modalListSearchCustomFieldHeader={[
                "Code",
                "Name",
                "Description",
                "Selling Rate",
                "Buying Rate",
              ]}
              modalListSearchCustomFieldName={[
                "code",
                "currency_name",
                "currency_detail",
                "selling_rate",
                "buying_rate",
              ]}
              hasEditButton={true}
              headerName="Currency"
              selectedData={selectedData}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onStatusChange={handleStatusChange}
              baseUrl="/settings/currency"
            />
            <Box sx={{ paddingX: "30px" }}>
              <DisplayComponent />
              {/* <TableBoxListComponent list_url="/currencies" update_url="/currencies" /> */}
            </Box>
         
          </Box>

       
          <div className="search_wrp">
            <SideBarList 
              list_url="currencies" 
              base_url="settings/currency"
              isEditing={isEditing}
              onDataSelection={handleDataSelection}
              onConfirmedDataSelection={handleConfirmedDataSelection}
              method={method}
              endpointPath={endpointPath}
            />
          </div>
        </Box>

        {method === "POST" || method === "PUT" ? (
          <Footer
            selectedData={selectedData}
            onCancelEdit={handleCancelEdit}
            responseMessage={responseMessage}
            disabled={!isEditing}
            endpointPath={endpointPath}
            navigatePath={navigatePath}
            method={method}
            type="currency"
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Currency;
