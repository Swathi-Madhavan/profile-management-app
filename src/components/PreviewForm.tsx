import React from "react";
import FormCard from "../uicomponents/FormCard";
import DisplayFieldData from "../uicomponents/DisplayFieldData";
import { FormComponentsProps } from "../model";

export default function PreviewForm({
  selectedProfileId,
}: Readonly<FormComponentsProps>) {
  return (
    <FormCard
      bodyContent={
        <React.Fragment>
          <DisplayFieldData name="name" />
          <DisplayFieldData name="email" />
          <DisplayFieldData name="age" />
        </React.Fragment>
      }
      cardTitle={`Preview ${
        selectedProfileId ? "update" : "create"
      } profile form`}
      description={`A user profile will be ${
        selectedProfileId ? "update" : "create"
      } using the below information. verify the below information before clicking the submit button. if you want to edit the form before submit. Click back button to edit the form.`}
    />
  );
}
