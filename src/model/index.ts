import { TextFieldProps } from "@mui/material/TextField/TextField";
import { ReactNode } from "react";

export interface ProfileInformation {
  id: number;
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
