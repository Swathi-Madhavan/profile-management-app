import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function CustomAppBar({
  children,
}: Readonly<React.PropsWithChildren>) {
  const navigate = useNavigate();

  const backTOHome = () => {
    navigate("/profile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <AccountCircleIcon />
          <Button
            variant="text"
            onClick={backTOHome}
            sx={{
              color: "white",
              fontSize: "18px",
              textTransform: "none",
            }}
          >
            Profile Management
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
