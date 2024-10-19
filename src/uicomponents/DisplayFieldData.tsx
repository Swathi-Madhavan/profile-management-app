import React from "react";
import { DisplayFieldDataProps, ProfileInformation } from "../model";
import RowSpaceBetween from "../styles/RowSpaceBetween";
import { Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

export default function DisplayFieldData({
  name,
}: Readonly<DisplayFieldDataProps>) {
  const { control } = useFormContext<ProfileInformation>();
  const value = useWatch({ control, name });

  return (
    <RowSpaceBetween>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: "14px",
          textTransform: "capitalize",
        }}
      >
        {name}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#000",
          fontSize: "14px",
          textTransform: "none",
        }}
        noWrap
      >
        {value}
      </Typography>
    </RowSpaceBetween>
  );
}
