import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundIcon from "../assets/NotFoundIcon";

export default function NotFound() {
  const navigate = useNavigate();

  const reDirectToHome = () => {
    navigate("/profile");
  };

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <NotFoundIcon
        sx={{
          height: "200px",
          width: "200px",
        }}
      />
      <Typography
        sx={{
          fontSize: "17px",
          fontWeight: "300",
          color: "#000",
          letterSpacing: "0.00938em",
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        404 <br />
        No page found
      </Typography>
      <Button
        sx={{
          fontSize: "17px",
          fontWeight: "300",
          color: "#000",
          letterSpacing: "0.00938em",
          lineHeight: 1.5,
          textTransform: "None",
          marginTop: "14px",
          backgroundColor: "transparent",

          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={reDirectToHome}
        variant="contained"
      >
        Go to Home
      </Button>
    </Stack>
  );
}
