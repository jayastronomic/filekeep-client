import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileEndpoint from "../../endpoints/FileEndpoint";

const ConsoleActions = ({ selectedFolderId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const actions: ConsoleAction[] = [
    { label: "Upload", icon: <MdOutlineFileUpload /> },
    { label: "Create Folder", icon: <MdCreateNewFolder /> },
  ];

  const mutatation = useMutation({
    mutationFn: FileEndpoint.upload,
    onSuccess({ data }) {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-root"] });
    },
    onError(e) {
      console.log(e);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("parent_id", selectedFolderId);
      mutatation.mutate(formData);
    }
  };

  const clickHandler = () => {
    inputRef.current?.click();
  };

  console.log(selectedFolderId);

  return (
    <>
      <div className="flex space-x-2">
        {actions.map(({ label, icon }) => {
          return (
            <ConsoleAction
              key={label}
              clickHandler={label === "Upload" ? clickHandler : null}
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
