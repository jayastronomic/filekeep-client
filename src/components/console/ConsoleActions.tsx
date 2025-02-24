import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upload } from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";

const ConsoleActions = () => {
  const currentFolder = useGetCurrentFolder();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const actions: ConsoleAction[] = [
    { label: "Upload", icon: <MdOutlineFileUpload /> },
    { label: "Create Folder", icon: <MdCreateNewFolder /> },
  ];

  const { mutate } = useMutation({
    mutationFn: upload,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] }),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder_name", currentFolder);
      mutate(formData);
    }
  };

  const clickHandler = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div className="flex space-x-2 p-6">
        {actions.map(({ label, icon }) => {
          return (
            <ConsoleAction
              key={label}
              action={label === "Upload" ? clickHandler : undefined}
              label={label}
              icon={icon}
            />
          );
        })}
      </div>
      <input
        onChange={handleChange}
        type="file"
        ref={inputRef}
        className="hidden"
      />
    </>
  );
};

export default ConsoleActions;
