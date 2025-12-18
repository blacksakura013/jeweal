import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "component/NavBar/NavBar";
import Header from "component/Layout/Header";
import Footer from "layouts/BaseLayout/Footer";
import HeaderPage from "layouts/BaseLayout/HeaderPage";
import TableBoxListComponent from "component/Commons/TableBoxListComponent";
import { useParams } from "react-router-dom";
import FormBodyLayout from "layouts/BaseLayout/FormBodyLayout";
import {
  payloadDataMainLocationState,
  saveButtonStatusState,
  isEditingState,
} from "recoil/state/BankState";
import { useRecoilState } from "recoil";
import StatusSwitch from "component/SwitchIOSStyleLabel";

import SideBarList from "layouts/BaseLayout/SideBarList";
import "App.css";

import apiRequest from "helpers/apiHelper";

const Bank = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [originalData, setOriginalData] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [refreshListKey, setRefreshListKey] = useState(0);

  const { action, id } = useParams();
  const method = action === "add" ? "POST" : "PUT";
  const endpointPath = action === "add" ? "/banks" : "/banks/" + id;
  const navigatePath = "/company/bank";

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
      const data = await apiRequest("GET", "/banks/" + id);
      setPayloadData(data);
    };

    useEffect(() => {
      if (action === "edit") {
        getViewData();
      }
      if (action === "add") {
        setIsEditing(true);
      }
    }, [action]);
console.log(payloadData,"okokok")
    return (
      <div className="form_container" style={{ height: "63vh" }}>
       {/* 1 */}
        <div className="input_text_group">
          <label for="bank_name">
           Bank Name: <span class="required_red">*</span>
          </label>
          <input
            type="text"
            id="bank_name"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            onChange={(e) => {
              setFormData(e.target.value, "bank_name");
            }}
            value={payloadData.bank_name}
            placeholder={method === "POST" ? "" : ""}
          />
        </div>
        {/* 2 */}
        <div className="input_text_group">
          <label for="branch_name">
            Branch Name: <span class="required_red">*</span>
          </label>
          <input
            type="text"
            id="branch_name"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            onChange={(e) => {
              setFormData(e.target.value, "branch_name");
            }}
            value={payloadData.branch_name}
            placeholder={method === "POST" ? "" : ""}
          />
        </div>
         {/* 3 */}
        <div className="input_text_group">
          <label for="account_name">Account Name: </label>
          <input
            type="text"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            id="account_name"
            onChange={(e) => {
              setFormData(e.target.value, "account_name");
            }}
            value={payloadData.account_name}
            placeholder={method === "POST" ? "" : ""}
          />
        </div>
         {/*  4 */}
        <div className="input_text_group">
          <label for="account_number">Account Number: </label>
          <input
            type="text"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            id="account_number"
            onChange={(e) => {
              setFormData(e.target.value, "account_number");
            }}
            value={payloadData.account_number}
            placeholder={method === "POST" ? "" : ""}
          />
        </div>

          {/*  5  */}
        <div className="input_text_group">
          <label for="swift_code">swift Code: </label>
          <input
            type="text"
            className={!isEditing ? "disabled_input_field" : ""}
            disabled={!isEditing}
            id="swift_code"
            onChange={(e) => {
              setFormData(e.target.value, "swift_code");
            }}
            value={payloadData.swift_code}
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
                  label={payloadData.status ? payloadData.status : "active"}
                />{" "}
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
            list_url="/company/bank"
            edit_list_url="/company/bank/edit"
            update_url="/company/bank"
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

      <Box   sx={{marginLeft: "222px" , Height : "100vh " , paddingBottom : "130px"}}>
        <Header />
        <Box>
          <Box className="form_content_wrp">
            <HeaderPage
              modalList={true}
              modalListHeader="Locations"
              modalListSubHeader="Location List"
              modalListEndpoint="/banks"
              modalUpdateStatusEndpoint="/banks/id/togglestatus"
              modalStatusCustomField="status"
              // modalListExportEndpoint=""
              // modalListSearchEndpoint=""
              modalListSearchCustomFieldHeader={["bank_name", "branch_name", "account_name" , "account_number" , "swift_code"]}
              modalListSearchCustomFieldName={[
                "bank_name",
                "branch_name",
                "account_name",
                "account_number",
                "swift_code"
              ]}
              hasEditButton={true}
              headerName="Bank"
              selectedData={selectedData}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onStatusChange={handleStatusChange}
              baseUrl="/company/bank"
            />
            <Box sx={{ paddingX: "30px" }}>
              <DisplayComponent />
            </Box>
          </Box>

          <div className="search_wrp">
            <SideBarList
              list_url="banks"
              base_url="company/bank"
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

export default Bank;
