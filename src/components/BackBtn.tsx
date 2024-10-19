import { Typography, Box, Button, Stack } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
