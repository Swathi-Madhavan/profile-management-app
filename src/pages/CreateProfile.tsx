import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import BackBtn from "../components/BackBtn";
import CustomStepper from "../components/CustomStepper";
import useFetchProfile from "../hook/useFetchProfile";
import { APIResponse, ProfileInformation } from "../model";
import PreviewForm from "../components/PreviewForm";
import ProfileStatus from "../components/ProfileStatus";
import CreateForm from "../components/CreateForm";
import DialogBox from "../uicomponents/DialogBox";
import deleteProfilesAPI from "../api/deleteProfileAPI";
import { useNavigate } from "react-router-dom";
import { ProfileManagementContext } from "../App";
import { useFormContext } from "react-hook-form";

export default function CreateProfile() {
  const navigate = useNavigate();
  const { reset } = useFormContext<ProfileInformation>();

  const [apiErrorMessage, setApiErrorMessage] = useState<APIResponse>({
    errorMessage: "",
    statusCode: 0,
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openProfileNotfoundDialog, setOpenProfileNotfoundDialog] =
    useState(false);

  const { setProfileMgContext } = useContext(ProfileManagementContext);

  const handleUpdatedForm = useCallback((apiResponse: APIResponse) => {
    setApiErrorMessage(apiResponse);
  }, []);

  const { selectedProfileId } = useFetchProfile({
    handleUpdatedForm,
    setOpenProfileNotfoundDialog,
  });

  const handleOpenDelete = useCallback(() => {
    setOpenDeleteDialog(true);
  }, []);

  const handleCloseDelete = async (state: boolean) => {
    setOpenDeleteDialog(false);
    if (state) {
      const { apiResponse } = await deleteProfilesAPI(selectedProfileId);
      if (apiResponse.statusCode === 200) {
        setApiErrorMessage({
          errorMessage:
            "Profile deleted Successfully, you will be redirect to home page in 2 sec...",
          statusCode: 200,
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);

        if (setProfileMgContext) {
          setProfileMgContext({ doRefetch: true });
        }
      } else {
        setApiErrorMessage(apiResponse);
      }
    }
  };

  const renderComponents: Record<number, ReactNode> = useMemo(
    () => ({
      0: (
        <CreateForm
          selectedProfileId={selectedProfileId}
          showDeleteBtn={!openProfileNotfoundDialog && !!selectedProfileId}
          handleDelete={handleOpenDelete}
        />
      ),
      1: <PreviewForm selectedProfileId={selectedProfileId} />,
      2: <ProfileStatus />,
    }),
    [selectedProfileId, openProfileNotfoundDialog, handleOpenDelete]
  );

  const handleCreateProfileReDirect = () => {
    navigate("/profile-form");
    reset({ id: "1", name: "", email: "", age: undefined });
    if (setProfileMgContext) {
      setProfileMgContext({
        userName: undefined,
      });
    }
    setOpenProfileNotfoundDialog(false);
  };

  return (
    <Box>
      {(apiErrorMessage?.errorMessage ||
        apiErrorMessage?.statusCode === 200) && (
        <Stack sx={{ width: "100%", mb: 1.5 }} spacing={2}>
          <Alert
            severity={apiErrorMessage?.statusCode === 200 ? "success" : "error"}
          >
            {apiErrorMessage?.errorMessage || "Profile loaded successfully"}
          </Alert>
        </Stack>
      )}
      <BackBtn />
      <CustomStepper
        selectedProfileId={selectedProfileId}
        renderComponents={renderComponents}
      />
      <DialogBox
        contentArea={
          <Typography>
            Are you sure, Do you want to delete the record ?
          </Typography>
        }
        handleClose={handleCloseDelete}
        negativeBtnText="Close"
        open={openDeleteDialog}
        positiveBtnText="Yes, Delete"
        title={`Delete profile id ${selectedProfileId}`}
      />
      <DialogBox
        contentArea={
          <React.Fragment>
            <Typography>
              Profile with give id not found. Try create a profile.
            </Typography>
            <Button
              onClick={handleCreateProfileReDirect}
              variant="contained"
              color="primary"
              sx={{ width: "100%", mt: 2 }}
            >
              Create profile
            </Button>
          </React.Fragment>
        }
        handleClose={handleCloseDelete}
        negativeBtnText="Close"
        open={openProfileNotfoundDialog}
        positiveBtnText="Yes, Delete"
        title={`Profile not found`}
        showActionBtn={false}
      />
    </Box>
  );
}
