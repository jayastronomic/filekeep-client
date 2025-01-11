import { ChangeEvent } from "react";

declare global {
  interface User {
    id?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  }

  interface AuthContextData {
    authUser: User | null;
  }

  interface TextFieldProps<T extends string = string> {
    label: T;
    name: T;
    value: string;
    placeholder?: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

  interface SignUpProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: User;
  }

  interface LogInPrps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: User;
  }

  interface ApiResponse<T> {
    data: T;
    status: "SUCCESS" | "ERROR";
    message: string;
    path: string;
  }
}

export {};
