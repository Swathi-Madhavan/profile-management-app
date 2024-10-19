import React, { ReactNode, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateProfile from "./CreateForm";
import { useFormContext } from "react-hook-form";
import { ProfileInformation } from "../model";
import PreviewForm from "./PreviewForm";
import ProfileStatus from "./ProfileStatus";

const steps = ["Fill information", "Preview information", "Submitted"];

const renderComponents: Record<number, ReactNode> = {
  0: <CreateProfile />,
  1: <PreviewForm />,
  2: <ProfileStatus />,
};

export default function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const {
    formState: { isValid },
  } = useFormContext<ProfileInformation>();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const isValidForm = activeStep === 0 ? isValid : true;

    if (isValidForm) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      // show error banner here
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleRender = useCallback(
    () => renderComponents[activeStep],
    [activeStep]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {handleRender()}
          {activeStep !== steps.length - 1 && (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  backgroundColor: "transparent",
                  textTransform: "none",
                }}
                variant="text"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  backgroundColor: "transparent",
                  textTransform: "none",
                }}
                {...(activeStep === 1
                  ? { variant: "contained", color: "primary" }
                  : { variant: "text" })}
              >
                {activeStep === 0 ? "Next" : "Save profile"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      )}
    </Box>
  );
}
