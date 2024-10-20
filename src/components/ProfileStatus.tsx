import React, { useCallback, useContext, useEffect } from "react";
import FormCard from "../uicomponents/FormCard";
import { Button } from "@mui/material";
import { ProfileManagementContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { ProfileInformation, ProfileStatusProps } from "../model";

export default function ProfileStatus({
  selectedProfileId,
}: Readonly<ProfileStatusProps>) {
  const { profileMgContext, setProfileMgContext } = useContext(
    ProfileManagementContext
  );
  const navigate = useNavigate();
  const { reset } = useFormContext<ProfileInformation>();

  const handleRetry = () => {
    setTimeout(() => {
      navigate("/profile-form");
    }, 10);
    navigate(-1);
  };

  const handleRedirect = useCallback(() => {
    setTimeout(() => {
      navigate("/profile");
      if (setProfileMgContext) {
        setProfileMgContext({
          userName: undefined,
          doRefetch: true,
        });
        reset({ id: "1", name: "", email: "", age: undefined });
      }
    }, 1000);
  }, [navigate, reset, setProfileMgContext]);

  useEffect(() => {
    if (
      profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode === 201 ||
      profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode === 200
    ) {
      handleRedirect();
    }
  }, [
    handleRedirect,
    profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode,
  ]);

  return profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode ===
    201 ||
    profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode === 200 ? (
    <FormCard
      bodyContent={null}
      cardTitle={`Profile ${
        selectedProfileId ? "update" : "create"
      } successfully`}
      description={`Congratulations, your profile ${
        selectedProfileId ? "update" : "create"
      } successfully. Your profile id is ${profileMgContext?.profileId}`}
    />
  ) : (
    <FormCard
      bodyContent={
        <Button color="error" variant="contained" onClick={handleRetry}>
          Retry again
        </Button>
      }
      cardTitle="Unable to create profile"
      description={`Oop!, your profile was not ${
        selectedProfileId ? "update" : "create"
      } due to following reason.`}
      errorMessage={
        profileMgContext?.createAndUpdateProfileAPIStatus?.errorMessage
      }
    />
  );
}
