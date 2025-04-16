import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

declare global {
  interface LoginData {
    email: string;
    password: string;
  }

  interface NewUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    rootFolderId: string;
  }

  interface Asset {
    id: string;
    whoCanAccess: number;
    shareableLink: ShareableLinkData | null;
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
    parentFolderId: string;
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

  type LinkAccessType = "PUBLIC" | "PRIVATE" | "PROTECTED";

  interface UpdateShareableLinkData {
    linkAccessType: LinkAccessType;
  }

  interface ShareableLinkData {
    shareableUrl: string;
    token: string;
    linkAccessType: LinkAccessType;
  }

  interface ShareableFileData {
    ownerId: string;
    fileName: string;
    mimeType: string;
    size: number;
    content: string;
    linkAccessType: LinkAccessType;
  }

  interface ShareableFolderData {
    folderData: Folder;
  }

  interface SyncData {
    folderPath: string;
  }

  interface AuthContextData {
    authUser: AuthUser | null;
    isLoading?: boolean;
  }

  interface ModalsState {
    isCreateFolderModalOpen: boolean;
    isNavModalOpen: boolean;
    isProfileModalOpen: boolean;
    isShareModalOpen: boolean;
    isManageLinkModalOpen: boolean;
    isSyncFolderModalOpen: boolean;
  }

  type ConsoleContextData = ModalsState & {
    setModal: Dispatch<SetStateAction<ModalsState>>;
    asset: FKFile | Folder;
    setAsset: Dispatch<SetStateAction<FKFile | Folder>>;
    rootFolderId: string;
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
    user: NewUser;
    isPending: boolean;
  }

  interface LogInProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: LoginData;
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
    action: (() => void) | undefined;
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

  interface TextAssetProps {
    blob: Blob;
  }

  interface ImageAssetProps {
    blob: Blob;
  }

  interface AccessDropDownProps {
    setIsAccessDropDownOpen: Dispatch<SetStateAction<boolean>>;
    setAccess: Dispatch<SetStateAction<UpdateShareableLinkData>>;
    access: UpdateShareableLinkData;
  }

  interface PopUpProps {
    content: string;
  }

  interface FileViewProps {
    fileData?: ShareableFileData;
    isLoading?: boolean;
  }

  interface ProtectProps {
    children: ReactNode;
    assetName: string;
    token: string;
  }

  interface RegistrationsProps {
    classes?: string;
    secured?: boolean;
    assetName?: string;
    token?: string;
  }

  interface SVG {
    className?: string;
    viewBox?: string;
    height?: string;
    width?: string;
  }

  interface CurrentFolderData {
    folderName: string;
    pathname: string;
    state: { currentFolderId: string };
  }
}

export {};
