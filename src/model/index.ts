import { TextFieldProps } from "@mui/material/TextField/TextField";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ProfileInformation {
  id: string;
  name: string;
  email: string;
  age?: number;
}

type TextFieldPropsType = Omit<TextFieldProps, "name">;
export interface CustomTextFieldProps extends TextFieldPropsType {
  name: keyof ProfileInformation;
}

export interface FormCardProps {
  cardTitle: string;
  description: string;
  bodyContent: ReactNode;
}

export interface DisplayFieldDataProps {
  name: keyof ProfileInformation;
}

export interface ProfileAPIStatusState {
  statusCode: number | null;
}

export interface APIResponse {
  statusCode?: number;
  errorMessage?: string;
}

export interface ProfileManagementContextDataType {
  userName?: string;
  profileId?: string;
  createProfileAPIStatus?: APIResponse;
  updateProfileAPIStatus?: APIResponse;
  deleteProfileAPIStatus?: APIResponse;
  isLoading?: boolean;
}

export interface ContextDataType {
  profileMgContext?: ProfileManagementContextDataType;
  setProfileMgContext?: Dispatch<
    SetStateAction<ProfileManagementContextDataType>
  >;
}
