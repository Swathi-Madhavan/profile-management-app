import { Typography, Box, Button } from "@mui/material";
import React from "react";
import RowSpaceBetween from "../styles/RowSpaceBetween";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate("/create-profile");
  };

  return (
    <Box>
      <RowSpaceBetween>
        <Typography variant="h5">Profile management</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            "& .MuiSvgIcon-root": {
              fontSize: "14px",
            },
          }}
          startIcon={<AddCircleOutline />}
          onClick={handleCreateProfile}
        >
          Create profile
        </Button>
      </RowSpaceBetween>
    </Box>
  );
}

