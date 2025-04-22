import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upload } from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { FaSync } from "react-icons/fa";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { IoClose } from "react-icons/io5";
import SyncEndpoint from "../../endpoints/SyncEndpoint";

const ConsoleActions = () => {
  const [error, setError] = useState("");
  const { rootFolderId, syncStatus, setSyncStatus } =
    useContext(ConsoleContext);
  const { state, pathname } = useGetCurrentFolder();
  const currentFolderId = state ? state.currentFolderId : rootFolderId;
  const selectFile = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { setModal } = useContext(ConsoleContext);

  const syncAction = () => {
    if (syncStatus === "off") {
      return {
        label: "Sync Folder",
        icon: <FaSync className="text-[0.75rem]" />,
        action: () =>
          setModal((prev) => ({ ...prev, isSyncFolderModalOpen: true })),
      };
    } else if (syncStatus === "pending") {
      return {
        label: "Syncing...",
        icon: <FaSync className="text-[0.75rem] animate-spin" />,
        action: () => {},
      };
    } else {
      return {
        label: "Unsync Folder",
        icon: <FaSync className="text-[0.75rem]" />,
        action: () => stopSync(),
      };
    }
  };

  const actions: ConsoleAction[] = [
    {
      label: "Upload",
      icon: <MdOutlineFileUpload />,
      action: handleSelectFile,
    },
    {
      label: "Create Folder",
      icon: <MdCreateNewFolder />,
      action: () =>
        setModal((prev) => ({ ...prev, isCreateFolderModalOpen: true })),
    },
    import.meta.env.PROD ? ({} as ConsoleAction) : syncAction(),
  ];

  const { mutate: uploadFile } = useMutation({
    mutationFn: upload,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`get-${pathname}`] }),
    onError: (err) => {
      if (err.name === "MaxFileStorage")
        setError("Max File Storage Capacity Reached");
    },
  });

  const { mutate: stopSync } = useMutation({
    mutationFn: SyncEndpoint.stopSync,
    onSettled() {
      setSyncStatus("off");
    },
  });

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile: File = e.target.files[0];
      if (isImageOrText(selectedFile)) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder_id", currentFolderId);
        uploadFile(formData);
      } else {
        setError("File MIME Type Must Be Image or Text");
      }
    }
  };

  const isImageOrText = (selectedFile: File): boolean => {
    const type = selectedFile.type.split("/")[0];
    if (type === "text" || type === "image") return true;
    else return false;
  };

  function handleSelectFile() {
    selectFile.current?.click();
  }

  return (
    <div>
      <div className="flex space-x-2 p-6">
        {actions.map(({ label, icon, action }, i) => {
          if (label)
            return (
              <ConsoleAction
                key={i}
                action={action}
                label={label}
                icon={icon}
              />
            );
          else return null;
        })}
      </div>
      <div className="px-6">
        {error && (
          <div className="flex justify-between items-center text-gray-200 border border-red-700 bg-[rgba(255,0,0,0.1)] p-2 rounded text-sm w-full">
            <span>{error}</span>
            <button onClick={() => setError("")}>
              <IoClose />
            </button>
          </div>
        )}
      </div>
      <input
        onChange={handleUploadFile}
        type="file"
        ref={selectFile}
        className="hidden"
      />
    </div>
  );
};

export default ConsoleActions;
