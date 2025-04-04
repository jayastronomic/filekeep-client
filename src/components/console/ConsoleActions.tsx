import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, useContext, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upload } from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { FaSync } from "react-icons/fa";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";

const ConsoleActions = () => {
  const { rootFolderId } = useContext(ConsoleContext);
  const { state, folderName } = useGetCurrentFolder();
  const currentFolderId = state ? state.currentFolderId : rootFolderId;
  const selectFile = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { setModal } = useContext(ConsoleContext);

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
      action: () =>
        setModal((prev) => ({ ...prev, isSyncFolderModalOpen: true })),
    },
  ];

  const { mutate: uploadFile } = useMutation({
    mutationFn: upload,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`get-${folderName}`] }),
  });

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder_id", currentFolderId);
      uploadFile(formData);
    }
  };

  function handleSelectFile() {
    selectFile.current?.click();
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
    </>
  );
};

export default ConsoleActions;
