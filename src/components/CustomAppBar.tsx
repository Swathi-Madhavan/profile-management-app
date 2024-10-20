import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import RowSpaceBetween from "../styles/RowSpaceBetween";
import { useContext } from "react";
import { contextInit, ProfileManagementContext } from "../App";
import { useFormContext } from "react-hook-form";
import { ProfileInformation } from "../model";

export default function CustomAppBar({
  children,
}: Readonly<React.PropsWithChildren>) {
  const navigate = useNavigate();
  const { profileMgContext, setProfileMgContext } = useContext(
    ProfileManagementContext
  );
  const { reset } = useFormContext<ProfileInformation>();

  const backToHome = () => {
    navigate("/profile");
    reset({ id: "1", name: "", email: "", age: undefined });
    if (setProfileMgContext) {
      setProfileMgContext({ ...contextInit });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <RowSpaceBetween>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AccountCircleIcon />
              <Button
                variant="text"
                onClick={backToHome}
                sx={{
                  color: "white",
                  fontSize: "18px",
                  textTransform: "none",
                }}
              >
                Profile Management
              </Button>
            </Box>
            {profileMgContext?.userName && (
              <Typography>Hello, {profileMgContext?.userName}</Typography>
            )}
          </RowSpaceBetween>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
