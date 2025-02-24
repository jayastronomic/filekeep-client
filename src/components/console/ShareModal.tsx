import { FormEvent, useContext, useEffect, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import PillContainer from "./PillContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shareFolder } from "../../endpoints/FolderEndpoint";
import { shareFile } from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";

const ShareModal = () => {
  return (
    <div className="flex flex-col fixed h-full w-full bg-[#0d1117] z-10">
      <ShareModalHeader />
      <ShareModalForm />
    </div>
  );
};

const ShareModalForm = () => {
  const currentFolder = useGetCurrentFolder();
  const queryClient = useQueryClient();
  const { asset, setModal } = useContext(ConsoleContext);
  const [emailError, setEmailError] = useState(false);
  const [emailList, setEmailList] = useState<string[]>([]);
  const isValid = !emailError && emailList.length > 0;
  const type = Object.prototype.hasOwnProperty.call(asset as object, "fileKey")
    ? "file"
    : "folder";

  const endpoint = type === "file" ? shareFile : shareFolder;

  const { mutate } = useMutation({
    mutationFn: endpoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ id: asset.id, userEmails: emailList });
    setModal((prev) => ({ ...prev, isShareModalOpen: false }));
  };

  const validEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (emailList.some((email) => !validEmail(email))) setEmailError(true);
    else setEmailError(false);
  }, [emailList, setEmailError]);

  console.log(isValid);

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : "")}
      className=" text-gray-100 flex flex-col p-4"
    >
      <h1 className=" font-light text-2xl mb-10">Share this file</h1>
      {emailError && (
        <div className="w-full flex space-x-3 rounded-2xl p-5 bg-red-950 text-gray-200 mb-8">
          <IoCloseCircleOutline className="text-lg" />
          <span className="text-sm">
            One or more email addresses you entered are invalid
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <p className="text-sm">
          Anyone with this link <b>can view</b>
        </p>

        <button className="border-b text-sm font-medium hover:border-gray-500 cursor-pointer">
          Settings
        </button>
      </div>
      <PillContainer
        setEmailList={setEmailList}
        emailList={emailList}
        validEmail={validEmail}
      />
      <div className="flex w-full mt-10 justify-end">
        <button
          disabled={!isValid}
          className={` bg-gray-900 border text-lg p-2 rounded-xl  ${isValid ? "cursor-pointer text-gray-100 border-gray-700" : "border-transparent cursor-not-allowed text-gray-700"}`}
        >
          Share file
        </button>
      </div>
    </form>
  );
};

const ShareModalHeader = () => {
  const { setModal } = useContext(ConsoleContext);
  return (
    <header className="flex justify-between p-4 text-gray-100 border-b border-gray-700">
      <span>Filename</span>
      <button
        onClick={() =>
          setModal((prev) => ({ ...prev, isShareModalOpen: false }))
        }
        className="flex items-center justify-center hover:bg-gray-700 transition w-8 h-8 rounded-lg"
      >
        <IoClose className="text-2xl" />
      </button>
    </header>
  );
};

export default ShareModal;
