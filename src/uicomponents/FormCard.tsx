import { Stack, Typography } from "@mui/material";
import React from "react";
import DivBox from "../styles/DivBox";
import { FormCardProps } from "../model";

export default function FormCard({
  bodyContent,
  cardTitle,
  description,
}: Readonly<FormCardProps>) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12px",
        mt: "24px",
      }}
    >
      <DivBox>
        <Typography variant="h5">{cardTitle}</Typography>
        <Typography variant="body2" sx={{ fontSize: "10px", mb: 1.5 }}>
          {description}
        </Typography>
        {bodyContent}
      </DivBox>
    </Stack>
  );
}
