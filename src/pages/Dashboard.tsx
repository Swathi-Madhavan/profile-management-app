import { Typography, Box, Button, Stack, Alert } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import RowSpaceBetween from "../styles/RowSpaceBetween";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import getProfilesAPI from "../api/getProfilesAPI";
import ProfilesDataTable from "../components/ProfilesDataTable";
import { updateLocalStorageData } from "../utils/localStorageManager";
import deleteProfilesAPI from "../api/deleteProfileAPI";
import { ProfileManagementContext } from "../App";
import DialogBox from "../uicomponents/DialogBox";
import { ProfileInformation } from "../model";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<Array<ProfileInformation>>([]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<{
    state: boolean;
    selectedId: string;
  }>({ state: false, selectedId: "" });

  const { setProfileMgContext, profileMgContext } = useContext(
    ProfileManagementContext
  );

  const doRefetch = profileMgContext?.doRefetch;
  const handleCreateProfile = () => {
    navigate("/profile-form");
  };

  const getProfiles = useCallback(async () => {
    const { response } = await getProfilesAPI();
    updateLocalStorageData("profilesData", JSON.stringify(response ?? []));
    setProfileData(JSON.parse(JSON.stringify(response ?? [])));
  }, []);

  useEffect(() => {
    getProfiles();
  }, [getProfiles, doRefetch]);

  const handleDeleteClick = (id: string) => {
    setOpenDeleteDialog({ state: true, selectedId: id });
  };

  const handleCloseDeleteDialog = async (status: boolean) => {
    const clonePreviewData = { ...openDeleteDialog };
    if (status) {
      const { apiResponse } = await deleteProfilesAPI(
        clonePreviewData?.selectedId
      );
      if (apiResponse.statusCode === 200) {
        getProfiles();
      }
      if (setProfileMgContext) {
        setProfileMgContext({
          deleteProfileAPIStatus: {
            errorMessage: apiResponse.errorMessage,
            statusCode: apiResponse?.statusCode,
          },
          ...profileMgContext,
        });

        setTimeout(() => {
          setProfileMgContext({
            deleteProfileAPIStatus: {
              errorMessage: "",
              statusCode: 0,
            },
            ...profileMgContext,
          });
        }, 6000);
      }
    }
    setOpenDeleteDialog({ selectedId: "", state: false });
  };

  return (
    <Box>
      {(profileMgContext?.deleteProfileAPIStatus?.errorMessage ||
        profileMgContext?.deleteProfileAPIStatus?.statusCode === 200) && (
        <Stack sx={{ width: "100%", mb: 1.5 }} spacing={2}>
          <Alert
            severity={
              profileMgContext?.deleteProfileAPIStatus?.statusCode === 200
                ? "success"
                : "error"
            }
          >
            {profileMgContext?.deleteProfileAPIStatus?.errorMessage ||
              "Record delete successfully"}
          </Alert>
        </Stack>
      )}
      <RowSpaceBetween>
        <Typography variant="h5">Profiles</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            "& .MuiSvgIcon-root": {
              fontSize: "14px",
            },
          }}
          startIcon={<AddCircleOutline />}
          onClick={handleCreateProfile}
        >
          Create profile
        </Button>
      </RowSpaceBetween>
      <Box sx={{ pt: 2 }}>
        <ProfilesDataTable
          data={profileData}
          handleDeleteClick={handleDeleteClick}
        />
      </Box>
      <DialogBox
        contentArea={
          <Typography>
            Are you sure, Do you want to delete the record ?
          </Typography>
        }
        handleClose={handleCloseDeleteDialog}
        negativeBtnText="Close"
        open={openDeleteDialog.state}
        positiveBtnText="Yes, Delete"
        title={`Delete profile id ${openDeleteDialog?.selectedId}`}
      />
    </Box>
  );
}
