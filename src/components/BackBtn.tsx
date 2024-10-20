import { Typography, Box, Button, Stack } from "@mui/material";
import React, { useContext } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { ProfileInformation } from "../model";
import { ProfileManagementContext } from "../App";

export default function BackBtn() {
  const navigate = useNavigate();
  const { reset } = useFormContext<ProfileInformation>();

  const { setProfileMgContext } = useContext(ProfileManagementContext);

  const handleBack = () => {
    navigate(-1);
    reset({ id: "1", name: "", email: "", age: undefined });
    if (setProfileMgContext) {
      setProfileMgContext({
        userName: undefined,
      });
    }
  };

  return (
    <Box
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: "14px",
          mr: -1,
        },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Button
          variant="text"
          sx={{
            backgroundColor: "transparent",
            color: "#000",
            textTransform: "none",
          }}
          startIcon={<ArrowBackIosIcon />}
          onClick={handleBack}
        >
          <Typography sx={{ fontSize: "14px" }}>Back</Typography>
        </Button>
      </Stack>
    </Box>
  );
}
