import React from "react";
import FormCard from "../uicomponents/FormCard";
import { Button } from "@mui/material";

export default function ProfileStatus() {
  // Based on redux store data show sucess or failed
  return (
    <FormCard
      bodyContent={
        <React.Fragment>
          <Button color="primary" variant="contained">
            View profile
          </Button>
        </React.Fragment>
      }
      cardTitle="Profile created successfully"
      description="Congratulations, your profile created successfully."
    />
  );
}
