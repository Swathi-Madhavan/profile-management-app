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
  errorMessage?: string;
  selectedProfileId?: string;
  handleDelete?: () => void;
  showDeleteBtn?: boolean;
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
  createAndUpdateProfileAPIStatus?: APIResponse;
  deleteProfileAPIStatus?: APIResponse;
  isLoading?: boolean;
  searchParamsProfileId?: string;
  doRefetch?: boolean;
}

export interface ContextDataType {
  profileMgContext?: ProfileManagementContextDataType;
  setProfileMgContext?: Dispatch<
    SetStateAction<ProfileManagementContextDataType>
  >;
}

export interface AlertDialogProps {
  title: string;
  open: boolean;
  handleClose: (status: boolean) => void;
  positiveBtnText: string;
  negativeBtnText: string;
  contentArea: ReactNode;
  showActionBtn?: boolean;
}

export interface ProfilesDataTableProps {
  handleDeleteClick: (id: string) => void;
  data: Array<ProfileInformation>;
}

export interface FormComponentsProps {
  selectedProfileId: string;
  handleDelete?: () => void;
  showDeleteBtn?: boolean;
}

export interface ProfileStatusProps {
  selectedProfileId: string;
}

export interface CustomStepperProps extends FormComponentsProps {
  renderComponents: Record<number, ReactNode>;
}
