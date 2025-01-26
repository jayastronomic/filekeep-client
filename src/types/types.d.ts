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
    parentFolder: Folder | null;
    subFolders: Folder[];
    files: FKFile[];
  }

  interface NewFolder {
    folderName: string;
    parentId: string;
  }

  interface FKFile {
    id: string;
    fileName: string;
    size: number;
    mimeType: string;
    fileKey: string;
  }

  interface AuthContextData {
    authUser: User | null;
    isLoading?: boolean;
  }

  interface ConsoleContextData {
    rootFolder: Folder;
    isLoading: boolean;
  }

  interface ConsoleProviderProps {
    children: ReactNode;
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
    action: (() => void) | (() => Dispatch<SetStateAction<boolean>>);
  }

  interface ConsoleActionsProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }

  type ConsoleAction = {
    label: string;
    icon: ReactNode;
  };

  interface ConsoleFileContainerProps {
    files: FKFile[];
  }

  interface ConsoleFolderContainerProps {
    folders: Folder[];
  }

  interface CreateFolderModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }

  interface ProfileMenuProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }

  interface ConsoleFolderCardProps {
    folder: Folder;
  }
}

export {};
