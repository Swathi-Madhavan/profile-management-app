import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { AlertDialogProps } from "../model";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox({
  handleClose,
  negativeBtnText,
  open,
  positiveBtnText,
  title,
  contentArea,
}: Readonly<AlertDialogProps>) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentArea}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(false)}
          sx={{
            color: "#000",
            backgroundColor: "transparent",
          }}
          variant="text"
        >
          {negativeBtnText}
        </Button>
        <Button onClick={() => handleClose(true)}>{positiveBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
}