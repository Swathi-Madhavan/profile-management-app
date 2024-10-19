import React from "react";
import FormCard from "../uicomponents/FormCard";
import DisplayFieldData from "../uicomponents/DisplayFieldData";

export default function PreviewForm() {
  return (
    <FormCard
      bodyContent={
        <React.Fragment>
          <DisplayFieldData name="name" />
          <DisplayFieldData name="email" />
          <DisplayFieldData name="age" />
        </React.Fragment>
      }
      cardTitle="Preview create profile form"
      description="A user profile will be create using the below information. verify the below information before clicking the submit button. if you want to edit the form before submit. Click back button to edit the form."
    />
  );
}
