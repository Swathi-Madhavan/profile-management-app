import React, { useContext } from "react";
import FormCard from "../uicomponents/FormCard";
import { Button } from "@mui/material";
import { ProfileManagementContext } from "../App";

export default function ProfileStatus() {
  const { profileMgContext } = useContext(ProfileManagementContext);

  return profileMgContext?.createProfileAPIStatus?.statusCode === 201 ? (
    <FormCard
      bodyContent={
        <React.Fragment>
          <Button color="primary" variant="contained">
            View profile
          </Button>
        </React.Fragment>
      }
      cardTitle="Profile created successfully"
      description={`Congratulations, your profile created successfully. Your profile id is ${profileMgContext?.profileId}`}
    />
  ) : (
    <FormCard
      bodyContent={
        <React.Fragment>
          <Button color="primary" variant="contained">
            Retry again
          </Button>
        </React.Fragment>
      }
      cardTitle="Profile created successfully"
      description={`Oop!, your profile not created due to following reason.`}
    />
  );
}
