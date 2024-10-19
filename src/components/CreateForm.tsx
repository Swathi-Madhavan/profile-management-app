import React from "react";
import CustomTextField from "../uicomponents/CustomTextField";
import FormCard from "../uicomponents/FormCard";

export default function CreateProfile() {
  return (
    <FormCard
      bodyContent={ 
        <React.Fragment>
          <CustomTextField id="name" name="name" label="Name" />
          <CustomTextField id="name" name="email" label="Email" />
          <CustomTextField id="name" name="age" label="age" type="number" />
        </React.Fragment>
      }
      cardTitle="Create profile form"
      description="A user profile will be create using the below information. Fill the
      form, click the next button to see the preview"
    />
  );
}
