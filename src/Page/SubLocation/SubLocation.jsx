import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";
import Header from "../../component/Layout/Header";
import Footer from "../../layouts/BaseLayout/Footer";
import SearchBarStoneMaster from "../../component/StoneMaster/StoneMaster/SearchBarStoneMaster";
import HeaderPage from "../../layouts/BaseLayout/HeaderPage";
import StoneMasterBody from "../../component/StoneMaster/StoneMaster/StoneMasterBody";
import axios from "axios";
import TableBoxListComponent from "component/Commons/TableBoxListComponent";
import { useNavigate, useParams } from "react-router-dom";
import FormBodyLayout from "layouts/BaseLayout/FormBodyLayout";
import {
  payloadDataSubLocationState,
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
import LocationType from "./LocationType";
import apiRequest from "helpers/apiHelper";
import { mainLocationDropdownList } from "recoil/sublocation";

const SubLocation = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [originalData, setOriginalData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [mainLocationList, setMainLocationList] = useRecoilState(
    mainLocationDropdownList
  );
  const [currencyCode, setCurrencyCode] = useRecoilState(currencyCodeState);
  const navigate = useNavigate();
  const { action, id } = useParams();
  const method = action === "add" ? "POST" : "PUT";
  const endpointPath =
    action === "add" ? "/sublocations" : "/sublocations/" + id;
  const navigatePath = "/settings/sub-location";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiRequest("GET", "/locations/active");
        const mappedLocations = (response || []).map((loc) => ({
          code: loc.location_name,
          label: loc.location_name,
        }));
        setMainLocationList(mappedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
      }
    };

    fetchLocations();
  }, []);

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
      payloadDataSubLocationState
    );
    const [saveButtonStatus, setSaveButtonStatus] = useRecoilState(
      saveButtonStatusState
    );
    const checkMainPage = props.main ? props.main : false;
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
      const data = await apiRequest("GET", "/sublocations/" + id);
      setPayloadData({
        ...data,
        location_detail: data.location_detail || "", // Ensure description is always a string
        location_type_obj: {
          label: data.location_type,
          code: data?.location_type,
        },
      });
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
          location_type_obj: null,
          status: "active" // Set default status to active
        });
      }
    }, [action, id]); // Add 'id' to dependency array to trigger when URL changes

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "26px",
          }}
        >
          <label style={{ width: "175px" }} for="location_type_obj">
            Main Location: <span class="required_red">*</span>
          </label>
          <LocationType
            id="location_type_obj"
            disabled={!isEditing}
            isEditing={isEditing}
            value={payloadData.location_type_obj}
            onChange={(e) => {
              setFormData(e, "location_type_obj");
              setFormData(e?.label, "location_type");
            }}
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
                />{" "}
              </label>
            </div>
          </div>
        </div>

        {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: "24px",
            }}
          >
            <IOSSwitch
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Box> */}
      </div>
    );
  };

  const DisplayComponent = (props) => {
    switch (action) {
      case "list":
        return (
          <TableBoxListComponent
            list_url="/sublocations"
            edit_list_url="/setting/main-location/edit"
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
            edit_list_url="/setting/main-location/edit"
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
              modalListHeader="Sub Locations"
              modalListSubHeader="Sub Location List"
              modalListEndpoint="/sublocations"
              modalUpdateStatusEndpoint="/sublocations/id/togglestatus"
              modalStatusCustomField="status"
              // modalListExportEndpoint=""
              // modalListSearchEndpoint=""
              modalListSearchCustomFieldHeader={[
                "Code",
                "Name",
                "Main Location",
                "Description",
              ]}
              modalListSearchCustomFieldName={[
                "code",
                "location_name",
                "location_type",
                "location_detail",
              ]}
              hasEditButton={true}
              headerName="Sub Location"
              selectedData={selectedData}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onStatusChange={handleStatusChange}
              baseUrl="/settings/sub-location"
            />
            <Box sx={{ paddingX: "30px" }}>
              <DisplayComponent />
              {/* <TableBoxListComponent list_url="/currencies" update_url="/currencies" /> */}
            </Box>
            {/* <StoneMasterBody
              selectedData={selectedData}
              isEditing={isEditing}
              onCodeChange={handleCodeChange}
              onNameChange={handleNameChange}
              onStatusChange={handleStatusChange}
            /> */}
          </Box>

          {/* <SearchBarStoneMaster onDataSelect={handleDataSelection} /> */}
          <div className="search_wrp">
            <SideBarList
              list_url="sublocations"
              base_url="settings/sub-location"
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
            type="subLocation"
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default SubLocation;
