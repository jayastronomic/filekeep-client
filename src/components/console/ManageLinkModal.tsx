import { FaChevronDown } from "react-icons/fa6";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { FC, useContext, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { updateShareableFileLink } from "../../endpoints/ShareableLinkEndpoint";
import PopUp from "./PopUp";

const ManageLinkModal = () => {
  const { setModal, asset, setAsset } = useContext(ConsoleContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isAccessDropDownOpen, setIsAccessDropDownOpen] = useState(false);
  const [access, setAccess] = useState({
    linkAccessType: asset?.shareableLink?.linkAccessType,
  });

  const assetName = (asset as FKFile).fileName;

  const { mutate, isPending, isIdle, isSuccess } = useMutation({
    mutationFn: () =>
      updateShareableFileLink(access, asset.shareableLink.token),
    onSuccess: ({ data }) => {
      setAsset(data);
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    },
  });

  const handleSave = () => {
    mutate();
    setAsset(asset);
  };

  return (
    <div className="fixed h-full w-full z-[21] md:flex md:items-center md:justify-center">
      <button
        onClick={() => {
          setModal((prev) => ({ ...prev, isManageLinkModalOpen: false }));
          setAsset({} as FKFile);
        }}
        className="absolute bg-black/50 h-full w-full"
      ></button>
      <div className="absolute flex flex-col p-8 h-full w-full md:max-w-[38rem] md:h-1/2 bg-[#151B23]">
        <header className="flex w-full justify-between text-2xl text-gray-100">
          <span>Settings for "{assetName}"</span>
          <button
            onClick={() =>
              setModal((prev) => ({
                ...prev,
                isManageLinkModalOpen: false,
              }))
            }
            className="flex items-center justify-center hover:bg-gray-700 transition w-8 h-8 rounded-lg"
          >
            <IoClose className="text-gray-100 text-2xl" />
          </button>
        </header>
        <div className="flex flex-col border-gray-800 border rounded mt-8">
          <div className="text-gray-300 text-sm p-4 bg-gray-900 font-semibold">
            People with link can view
          </div>
          <div className="flex justify-between p-4">
            <div className="flex flex-col space-y-2 w-44">
              <span className="text-gray-300 text-sm font-semibold">
                Who has access
              </span>
              <span className="text-gray-400 text-xs">
                Control who can view the file with this link
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsAccessDropDownOpen(true)}
                className="flex items-center  space-x-2 bg-gray-500 text-gray-100 rounded-lg px-2 py-1 text-sm font-semibold hover:bg-gray-600 transition"
              >
                <span>
                  {access.linkAccessType === "PUBLIC" && "Anyone with link"}
                  {access.linkAccessType === "PRIVATE" && "Only me"}
                </span>
                <FaChevronDown className="text-xs" />
              </button>
              {isAccessDropDownOpen && (
                <AccessDropDown
                  setIsAccessDropDownOpen={setIsAccessDropDownOpen}
                  setAccess={setAccess}
                  access={access}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSave}
            type="button"
            disabled={
              access.linkAccessType === asset.shareableLink.linkAccessType
            }
            className={`text-white font-semibold  p-2 rounded-md ${
              access.linkAccessType === asset.shareableLink.linkAccessType
                ? "bg-gray-700 opacity-30 cursor-not-allowed border border-transparent"
                : "bg-gray-900 opacity-100 border border-gray-800"
            }`}
          >
            {isIdle && "Save"}
            {isPending && "Saving"}
            {isSuccess && "Save"}
          </button>
        </div>
      </div>
      {showPopUp && <PopUp content="Settings Saved" />}
    </div>
  );
};

const AccessDropDown: FC<AccessDropDownProps> = ({
  setIsAccessDropDownOpen,
  access,
  setAccess,
}) => {
  const handleChangeAccess = (access: UpdateShareableLinkData) => {
    setAccess(access);
    setIsAccessDropDownOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsAccessDropDownOpen(false)}
        className="fixed h-full inset-0"
      ></button>
      <div className="absolute z-[1] flex flex-col w-[20rem] right-0 -bottom-29 bg-[#151B23] border border-gray-800 shadow">
        <button
          onClick={() => handleChangeAccess({ linkAccessType: "PUBLIC" })}
          type="button"
          className="flex flex-col space-y-1 hover:bg-gray-900 p-4"
        >
          <div className="flex items-center space-x-2 text-gray-300 font-semibold text-sm">
            {(access.linkAccessType === "PUBLIC" && <IoCheckmark />) || (
              <div className="w-4"></div>
            )}
            <span>Anyone with link</span>
          </div>
          <span className="self-start pl-6 text-xs text-gray-500">
            Anyone with this link can view the file
          </span>
        </button>
        <button
          onClick={() => handleChangeAccess({ linkAccessType: "PRIVATE" })}
          type="button"
          className="flex flex-col space-y-1 hover:bg-gray-900 p-4"
        >
          <div className="flex items-center space-x-2 text-gray-300 font-semibold text-sm">
            {(access.linkAccessType === "PRIVATE" && <IoCheckmark />) || (
              <div className="w-4"></div>
            )}
            <span>Only me</span>
          </div>
          <span className=" self-start pl-6 text-xs text-gray-500">
            The file can only be viewed by me
          </span>
        </button>
      </div>
    </>
  );
};

export default ManageLinkModal;
