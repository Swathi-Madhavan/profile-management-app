import * as React from "react";
import TextField from "@mui/material/TextField";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomTextFieldProps, ProfileInformation } from "../model";

export default function CustomTextField(props: Readonly<CustomTextFieldProps>) {
  const { name, ...rest } = props;
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileInformation>();
  const defaultValue = useWatch({ control, name });

  return (
    <TextField
      variant="standard"
      defaultValue={defaultValue}
      value={defaultValue}
      error={!!errors[name]?.message}
      helperText={errors[name]?.message}
      {...register(name)}
      {...rest}
    />
  );
}
