import React, { createContext, useEffect, useState } from "react";
import CustomAppBar from "./components/CustomAppBar";
import { Outlet, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "./styles/Layout";
import { useForm, FormProvider } from "react-hook-form";
import {
  ContextDataType,
  ProfileInformation,
  ProfileManagementContextDataType,
} from "./model";
import profileSchema from "./schema/formValidation";

export const contextInit = {
  createAndUpdateProfileAPIStatus: undefined,
  deleteProfileAPIStatus: undefined,
  isLoading: false,
  profileId: undefined,
  userName: undefined,
  doRefetch: true,
};

export const ProfileManagementContext = createContext<ContextDataType>({
  profileMgContext: contextInit,
});

function App() {
  const [profileMgContext, setProfileMgContext] =
    useState<ProfileManagementContextDataType>({});
  const navigate = useNavigate();

  const form = useForm<ProfileInformation>({
    resolver: yupResolver(profileSchema),
    defaultValues: { id: "1", name: "", email: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      localStorage.setItem("hasVisited", "true");
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <div>
      <ProfileManagementContext.Provider
        value={{
          profileMgContext,
          setProfileMgContext,
        }}
      >
        <FormProvider {...form}>
          <CustomAppBar />
          <Layout>
            <Outlet />
          </Layout>
        </FormProvider>
      </ProfileManagementContext.Provider>
    </div>
  );
}

export default App;
