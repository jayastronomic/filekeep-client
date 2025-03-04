import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

declare global {
  interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    passwordConfirmation?: string;
  }

  interface Asset {
    id: string;
    whoCanAccess: number;
  }

  interface Folder extends Asset {
    folderName: string;
    parentFolder: Folder | null;
    subFolders: Folder[];
    files: FKFile[];
  }

  interface FKFile extends Asset {
    fileName: string;
    size: number;
    mimeType: string;
    fileKey: string;
  }

  interface NewFolder {
    folderName: string;
    parentName: string;
  }

  interface SharedAccess {
    id: string;
    collaborators: string[];
    owner: string;
    sharedOn: string;
    whoCanAccess: number;
  }

  interface SharedAccessFile extends SharedAccess {
    fileName: string;
    size: number;
    mimeType: string;
    fileKey: string;
    assetType: "file";
  }

  interface SharedAccessFolder extends SharedAccess {
    id: string;
    folderName: string;
    assetType: "folder";
  }

  interface ShareData {
    userEmails: string[];
    id: string;
  }

  interface NewShareableLinkData {
    id: string;
    type: "folder" | "file";
  }

  interface ShareableLinkData {
    shareableUrl: string;
  }

  interface AuthContextData {
    authUser: User | null;
    isLoading?: boolean;
  }

  interface ModalsState {
    isCreateFolderModalOpen: boolean;
    isNavModalOpen: boolean;
    isProfileModalOpen: boolean;
    isShareModalOpen: boolean;
  }

  type ConsoleContextData = ModalsState & {
    setModal: Dispatch<SetStateAction<ModalsState>>;
    asset: FKFile | Folder;
    setAsset: Dispatch<SetStateAction<FKFile | Folder>>;
  };

  interface ConsoleProviderProps {
    children: ReactNode;
  }

  interface TextFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

  interface SignUpProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: User;
    isPending: boolean;
  }

  interface LogInPrps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: User;
    isPending: boolean;
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
    action: (() => void) | undefined;
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
    setIsCreateFolderModalOpen: Dispatch<SetStateAction<boolean>>;
  }

  interface AssetCardProps {
    type: "folder" | "file";
    asset: Folder | FKFile;
  }

  interface MoreMenuProps {
    type: "folder" | "file";
    asset: FKFile | Folder;
    setIsOpen: Dispatch<SetStateAction<string | null>>;
    handleDelete: (fileKey: string) => void;
  }

  interface FileKeepIconProps {
    height: string;
    width: string;
    viewBox: string;
    className?: string;
  }
  interface FileKeepTextSvgProps {
    height: string;
    width: string;
    viewBox: string;
    className?: string;
  }

  interface ConsoleControlsProps {
    consoleScrollPosition: number;
  }

  interface ErrorBannerProps {
    message: string;
  }

  interface ShareModalProps {
    setIsShareModalOpen: Dispatch<SetStateAction<boolean>>;
  }

  interface SharedFolderContainerProps {
    sharedAssets: (SharedAccessFile | SharedAccessFolder)[];
  }

  interface SharedAssetCardProps {
    asset: SharedAccessFile | SharedAccessFolder;
  }

  interface PillContainerProps {
    setEmailList: Dispatch<SetStateAction<string[]>>;
    emailList: string[];
    validEmail: (email: string) => boolean;
  }
}

export {};
