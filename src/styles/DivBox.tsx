import * as React from "react";
import { Box } from "@mui/material";

export default function DivBox({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <Box
      sx={{
        boxShadow:
          "rgb(255, 255, 255) 0px 2px 0px inset, rgba(232, 234, 238, 0.3) 0px -2px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px",
        borderRadius: "12px",
        border: "1px solid rgb(232, 234, 238)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        minWidth: "300px",
        gap: "4px",
        width: "100%",
        padding: "30px",
      }}
    >
      {children}
    </Box>
  );
}
