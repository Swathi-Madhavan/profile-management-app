import React from "react";
import CustomTextField from "../uicomponents/CustomTextField";
import FormCard from "../uicomponents/FormCard";
import { FormComponentsProps } from "../model";

export default function CreateForm({
  selectedProfileId,
  handleDelete,
  showDeleteBtn,
}: Readonly<FormComponentsProps>) {
  return (
    <FormCard
      showDeleteBtn={showDeleteBtn}
      selectedProfileId={selectedProfileId}
      handleDelete={handleDelete}
      bodyContent={
        <React.Fragment>
          <CustomTextField id="name" name="name" label="Name" />
          <CustomTextField id="name" name="email" label="Email" />
          <CustomTextField id="name" name="age" label="age" type="number" />
        </React.Fragment>
      }
      cardTitle={`${selectedProfileId ? "Update" : "Create"} profile form`}
      description={`A user profile will ${
        selectedProfileId ? "Update" : "Create"
      } using the below information. Fill the
      form, click the next button to see the preview`}
    />
  );
}
