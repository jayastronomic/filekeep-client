import { LiaDownloadSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import { downloadFile } from "../../endpoints/FileEndpoint";
import { IoShareOutline } from "react-icons/io5";
import { IoIosLink, IoIosGlobe } from "react-icons/io";
import { FC, useContext, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { useMutation } from "@tanstack/react-query";
import { createShareableLink } from "../../endpoints/ShareableLinkEndpoint";

const MoreMenu: FC<MoreMenuProps> = ({
  type,
  asset,
  setIsOpen,
  handleDelete,
}) => {
  const { setModal, setAsset } = useContext(ConsoleContext);
  const [shareableURL, setShareableURL] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: createShareableLink,
    onSuccess: ({ data }) => {
      setShareableURL(data.shareableUrl);
      setIsLinkModalOpen(true);
    },
  });
  const assetName =
    type === "file" ? (asset as FKFile).fileName : (asset as Folder).folderName;

  const handleShareModal = () => {
    setModal((prev) => ({ ...prev, isShareModalOpen: true }));
    setAsset(asset);
    setIsOpen(null);
  };

  const handleManageLink = () => {
    setModal((prev) => ({ ...prev, isManageLinkModalOpen: true }));
    setAsset(asset);
    setIsOpen(null);
  };

  const handleCopyLink = () => {
    mutate({ id: asset.id, type });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(null)}
        className="fixed z-[1] inset-0  h-full w-full"
      ></button>
      <div
        className={`text-sm bg-[#151B23] rounded absolute right-4 flex flex-col p-2 shadow-md border border-gray-700 z-20 w-56 ${
          type === "file" ? "-top-30" : "-top-10"
        }`}
      >
        {type === "file" ? (
          <>
            <button
              onClick={
                type === "file"
                  ? () => downloadFile(asset as FKFile)
                  : undefined
              }
              className="flex items-center border-b border-gray-700 p-2 hover:bg-gray-800 z-[2] cursor-pointer"
            >
              <LiaDownloadSolid className="text-lg mr-2" />
              <span>Download</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="relative flex items-center border-b border-gray-700 p-2 hover:bg-gray-800 z-[2] cursor-pointer"
            >
              <IoIosLink className="text-lg mr-2" />
              <span>Copy link</span>
              {isLinkModalOpen && (
                <div className="absolute -left-[15rem] -bottom-16 p-4 flex flex-col z-[2] w-[30rem] bg-[#151D29] border border-gray-700 rounded-xl space-y-2">
                  <span className="flex items-center space-x-2">
                    <IoIosLink className="text-lg" />
                    <span>
                      Link copied to <b>{assetName}</b>
                    </span>
                  </span>
                  <input
                    autoFocus
                    className="ring-2 rounded-md px-2 py-1 caret-transparent text-xs"
                    value={shareableURL}
                    readOnly
                  />
                  <span className="flex items-center space-x-2">
                    <IoIosGlobe className="text-xs" />
                    <span className="text-xs text-gray-500">
                      {asset.shareableLink.linkAccessType === "PUBLIC" &&
                        "Anyone with this link can view"}
                      {asset.shareableLink.linkAccessType === "PRIVATE" &&
                        "Only you can view this link"}
                    </span>
                    <button onClick={handleManageLink} className="underline">
                      Manage
                    </button>
                  </span>
                </div>
              )}
            </button>
          </>
        ) : null}
        <button
          onClick={handleShareModal}
          className="flex items-center border-b border-gray-700 p-2 hover:bg-gray-800 z-[1] cursor-pointer"
        >
          <IoShareOutline className="text-lg mr-2" />

          <span>Share</span>
        </button>

        <button
          onClick={
            type === "file"
              ? () => handleDelete((asset as FKFile).fileKey)
              : () => handleDelete(asset.id)
          }
          className="flex items-center p-2 hover:bg-gray-800 cursor-pointer"
        >
          <FaTrash className="text-base mr-2" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
};

export default MoreMenu;
