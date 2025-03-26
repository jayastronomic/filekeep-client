import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, useContext, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upload } from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { FaSync } from "react-icons/fa";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { syncHomeFolder } from "../../endpoints/FileEndpoint";

const ConsoleActions = () => {
  const currentFolder = useGetCurrentFolder();
  const selectFile = useRef<HTMLInputElement>(null);
  const syncFolder = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
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
    {
      label: "Sync Folder",
      icon: <FaSync className="text-[0.75rem]" />,
      action: handleSelectSyncFolder,
    },
  ];
  const { setModal } = useContext(ConsoleContext);

  const { mutate } = useMutation({
    mutationFn: upload,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] }),
  });

  const { mutate: sync } = useMutation({
    mutationFn: syncHomeFolder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`get-root-folder}`] }),
  });

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder_id", currentFolder);
      mutate(formData);
    }
  };

  const handleFolderSync = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const formData = new FormData();
      for (const file of files)
        formData.append("files", file, file.webkitRelativePath);
      sync(formData);
    }
  };

  function handleSelectFile() {
    selectFile.current?.click();
  }

  function handleSelectSyncFolder() {
    syncFolder.current?.click();
  }

  return (
    <>
      <div className="flex space-x-2 p-6">
        {actions.map(({ label, icon, action }) => {
          return (
            <ConsoleAction
              key={label}
              action={action}
              label={label}
              icon={icon}
            />
          );
        })}
      </div>
      <input
        onChange={handleUploadFile}
        type="file"
        ref={selectFile}
        className="hidden"
      />
      <input
        onChange={handleFolderSync}
        type="file"
        webkitdirectory=""
        directory=""
        ref={syncFolder}
        className="hidden"
      />
    </>
  );
};

export default ConsoleActions;
