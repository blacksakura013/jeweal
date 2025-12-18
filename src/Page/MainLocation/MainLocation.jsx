import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../layouts/BaseLayout/Footer";
import HeaderPage from "../../layouts/BaseLayout/HeaderPage";
import TableBoxListComponent from "component/Commons/TableBoxListComponent";
import { useParams } from "react-router-dom";
import FormBodyLayout from "layouts/BaseLayout/FormBodyLayout";
import {
  payloadDataMainLocationState,
  saveButtonStatusState,
  isEditingState,
} from "recoil/state/CommonState";
import { useRecoilState } from "recoil";
import StatusSwitch from "../../component/SwitchIOSStyle";

import SideBarList from "layouts/BaseLayout/SideBarList";
import "App.css";

import apiRequest from "helpers/apiHelper";

const MainLocation = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [originalData, setOriginalData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const { action, id } = useParams();
  const method = action === "add" ? "POST" : "PUT";
  const endpointPath = action === "add" ? "/locations" : "/locations/" + id;
  const navigatePath = "/settings/main-location";

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

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedData(originalData);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedData((prevData) => ({
      ...prevData,
      master_status: newStatus ? "active" : "inactive",
    }));
  };

  const FormBody = (props) => {
    const [payloadData, setPayloadData] = useRecoilState(
      payloadDataMainLocationState
    );
    const [saveButtonStatus, setSaveButtonStatus] = useRecoilState(
      saveButtonStatusState
    );

    const setFormData = (value, keyName) => {
      setPayloadData((prev) => ({
        ...prev, // Copy previous state
        [keyName]: value, // Update or add the property
      }));
    };

    const required_field = ["code", "location_name"];
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
      const data = await apiRequest("GET", "/locations/" + id);
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
          location_name: "",
          location_detail: "",
          status: "active" // Set default status to active
        });
      }
    }, [action, id, setPayloadData]);

    return (
      <div className="form_container" style={{ height: "63vh" }}>
        <div className="input_text_group">
          <label for="currency_code">
            Code: <span class="required_red">*</span>
          </label>
              <input
                type="text"
                id="currency_code"
                className={!isEditing ? "disabled_input_field" : ""}
                disabled={!isEditing}
                style={{ color: isEditing ? '#000000' : '#9A9A9A' }}
                onChange={(e) => {
                  setFormData(e.target.value, "code");
                }}
                value={payloadData.code}
                placeholder={method === "POST" ? "" : ""}
              />
        </div>

        <div className="input_text_group">
          <label for="location_name">
            Name: <span class="required_red">*</span>
          </label>
              <input
                type="text"
                id="location_name"
                className={!isEditing ? "disabled_input_field" : ""}
                disabled={!isEditing}
                style={{ color: isEditing ? '#000000' : '#9A9A9A' }}
                onChange={(e) => {
                  setFormData(e.target.value, "location_name");
                }}
                value={payloadData.location_name}
                placeholder={method === "POST" ? "" : ""}
              />
        </div>

        <div className="input_text_group">
          <label for="location_detail">Description: </label>
          <input
            type="text"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            id="location_detail"
            style={{ color: isEditing ? '#000000' : '#9A9A9A' }}
            onChange={(e) => {
              setFormData(e.target.value, "location_detail");
            }}
            value={payloadData.location_detail}
            placeholder={method === "POST" ? "" : ""}
          />
        </div>

        <div className="input_text_group ">
          <div className="exchange_rate_block">
            <div className="block">
              <label for="currency_code">
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
            edit_list_url="/settings/main-location/edit"
            update_url="/currencies"
          />
        );

      case "add":
        return (
          <FormBodyLayout>
            <FormBody />
          </FormBodyLayout>
        );

      case "edit":
        return (
          <FormBodyLayout>
            <FormBody />
          </FormBodyLayout>
        );

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
              modalListHeader="Locations"
              modalListSubHeader="Location List"
              modalListEndpoint="/locations"
              modalUpdateStatusEndpoint="/locations/id/togglestatus"
              modalStatusCustomField="status"
              // modalListExportEndpoint=""
              // modalListSearchEndpoint=""
              modalListSearchCustomFieldHeader={["Code", "Name", "Description"]}
              modalListSearchCustomFieldName={[
                "code",
                "location_name",
                "location_detail",
              ]}
              hasEditButton={true}
              headerName="Main Location"
              selectedData={selectedData}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onStatusChange={handleStatusChange}
              baseUrl="/settings/main-location"
            />
            <Box sx={{ paddingX: "30px" }}>
              <DisplayComponent />
            </Box>
          </Box>

          <div className="search_wrp">
            <SideBarList
              list_url="locations"
              base_url="settings/main-location"
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
            type="mainLocation"
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default MainLocation;
