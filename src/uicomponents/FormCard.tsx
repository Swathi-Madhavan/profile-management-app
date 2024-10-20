import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import DivBox from "../styles/DivBox";
import { FormCardProps } from "../model";
import RowSpaceBetween from "../styles/RowSpaceBetween";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function FormCard({
  bodyContent,
  cardTitle,
  description,
  errorMessage,
  handleDelete,
  showDeleteBtn,
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
        <RowSpaceBetween>
          <Typography variant="h5">{cardTitle}</Typography>
          {showDeleteBtn && (
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </RowSpaceBetween>
        <Typography variant="body2" sx={{ fontSize: "10px", mb: 1.5 }}>
          {description}{" "}
          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        </Typography>
        {bodyContent}
      </DivBox>
    </Stack>
  );
}
