import { styled } from "@mui/material";
import { Stack } from "@mui/system";

const RowSpaceBetween = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

export default RowSpaceBetween;
