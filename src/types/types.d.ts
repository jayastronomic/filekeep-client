import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

declare global {
  interface User {
    id?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  }

  interface Folder {
    id: string;
    folderName: string;
    parentFolder: Folder;
    subFolders: Folder[];
    files: File[];
  }

  interface File {
    id: string;
    fileName: string;
    size: number;
    mimeType: string;
    fileKey: string;
  }

  interface AuthContextData {
    authUser: User | null;
    setAuthUser: Dispatch<SetStateAction<AuthContextData["authUser"]>>;
    logIn(token: string): void;
  }

  interface TextFieldProps {
    label: string;
    type?: string;
    name: string;
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

  interface AuthProviderProps {
    children: ReactNode;
  }

  interface ConsoleActionProps {
    label: string;
    icon: ReactNode;
    clickHandler: (() => void) | null;
  }

  type ConsoleAction = {
    label: string;
    icon: ReactNode;
  };

  interface ConsoleAssetsProps {
    rootFolder: Folder;
  }

  interface ConsoleFileContainerProps {
    files: File[];
  }

  interface ConsoleFolderContainerProps {
    folders: Folder[];
  }
}

export {};
