import React, { useCallback, useContext, useEffect } from "react";
import FormCard from "../uicomponents/FormCard";
import { Button } from "@mui/material";
import { ProfileManagementContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ProfileStatus() {
  const { profileMgContext, setProfileMgContext } = useContext(
    ProfileManagementContext
  );
  const navigate = useNavigate();

  const handleRetry = () => {
    setTimeout(() => {
      navigate("/profile-form");
    }, 10);
    navigate(-1);
  };

  const handleViewProfile = () => {
    navigate(`/profile-form/?profileId=${profileMgContext?.profileId}`);
  };

  const handleRedirect = useCallback(() => {
    setTimeout(() => {
      navigate("/profile");
      if (setProfileMgContext) {
        setProfileMgContext({
          createAndUpdateProfileAPIStatus: undefined,
          ...profileMgContext,
        });
      }
    }, 1000);
  }, [navigate, profileMgContext, setProfileMgContext]);

  useEffect(() => {
    if (profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode === 201) {
      handleRedirect();
    }
  }, [
    handleRedirect,
    profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode,
  ]);

  return profileMgContext?.createAndUpdateProfileAPIStatus?.statusCode ===
    201 ? (
    <FormCard
      bodyContent={
        <Button color="primary" variant="contained" onClick={handleViewProfile}>
          View profile
        </Button>
      }
      cardTitle="Profile created successfully"
      description={`Congratulations, your profile created successfully. Your profile id is ${profileMgContext?.profileId}`}
    />
  ) : (
    <FormCard
      bodyContent={
        <Button color="error" variant="contained" onClick={handleRetry}>
          Retry again
        </Button>
      }
      cardTitle="Unable to create profile"
      description={`Oop!, your profile was not created due to following reason.`}
      errorMessage={
        profileMgContext?.createAndUpdateProfileAPIStatus?.errorMessage
      }
    />
  );
}
