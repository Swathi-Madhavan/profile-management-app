import { styled } from "@mui/material";
import { Box } from "@mui/system";

const Layout = styled(Box)(() => ({
  padding: "24px",
  backgroundColor: "white",
  height: "calc(100vh - 120px)",
  width: "calc(100vw - 48px)",
  position: "relative",
}));

export default Layout;
