import { MdOutlineFileUpload } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import ConsoleAction from "./ConsoleAction";
import { ChangeEvent, FC, useContext, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { useLocation } from "react-router";
import { ConsoleContext } from "../contexts/ConsoleContext";

const ConsoleActions: FC<ConsoleActionsProps> = ({ setIsOpen }) => {
  const { rootFolder } = useContext(ConsoleContext);
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const actions: ConsoleAction[] = [
    { label: "Upload", icon: <MdOutlineFileUpload /> },
    { label: "Create Folder", icon: <MdCreateNewFolder /> },
  ];

  const mutatation = useMutation({
    mutationFn: FileEndpoint.upload,
    onSuccess() {
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
      if (pathname === "/home") {
        formData.append("parent_id", rootFolder.id);
      }
      mutatation.mutate(formData);
    }
  };

  const clickHandler = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div className="flex space-x-2">
        {actions.map(({ label, icon }) => {
          return (
            <ConsoleAction
              key={label}
              action={label === "Upload" ? clickHandler : () => setIsOpen(true)}
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
