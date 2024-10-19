import React from "react";
import CustomAppBar from "./components/CustomAppBar";
import { Outlet } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "./styles/Layout";
import { useForm, FormProvider } from "react-hook-form";
import { ProfileInformation } from "./model";
import profileSchema from "./schema/formValidation";

function App() {
  const form = useForm<ProfileInformation>({
    resolver: yupResolver(profileSchema),
    defaultValues: { id: 1, name: "", email: "" },
    mode: "onBlur",
  });

  return (
    <div>
      <FormProvider {...form}>
        <CustomAppBar />
        <Layout>
          <Outlet />
        </Layout>
      </FormProvider>
    </div>
  );
}

export default App;
