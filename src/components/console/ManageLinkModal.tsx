import { FaChevronDown } from "react-icons/fa6";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { FC, useContext, useState } from "react";

const ManageLinkModal = () => {
  const [isAccessDropDownOpen, setIsAccessDropDownOpen] = useState(false);
  const { setModal, asset } = useContext(ConsoleContext);
  const assetName = (asset as FKFile).fileName;
  return (
    <div className="fixed h-full w-full z-[21] md:flex md:items-center md:justify-center">
      <button
        onClick={() =>
          setModal((prev) => ({ ...prev, isManageLinkModalOpen: false }))
        }
        className="absolute bg-black/50 h-full w-full"
      ></button>
      <div className="absolute flex flex-col p-8 h-full w-full md:max-w-[38rem] md:h-1/2 bg-[#151B23]">
        <header className="text-2xl text-gray-100">
          Settings for "{assetName}"
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
                <span>Anyone with link</span>
                <FaChevronDown className="text-xs" />
              </button>
              {isAccessDropDownOpen && (
                <AccessDropDown
                  setIsAccessDropDownOpen={setIsAccessDropDownOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccessDropDown: FC<AccessDropDownProps> = ({
  setIsAccessDropDownOpen,
}) => {
  const { asset } = useContext(ConsoleContext);

  return (
    <>
      <button
        onClick={() => setIsAccessDropDownOpen(false)}
        className="fixed h-full inset-0"
      ></button>
      <div className="absolute z-[1] flex flex-col w-[20rem] right-0 -bottom-26 bg-[#151B23] border border-gray-800 shadow">
        <button
          type="button"
          className="flex flex-col space-y-1 hover:bg-gray-900 p-4"
        >
          <span className="self-start text-gray-300 font-semibold text-sm">
            Anyone with link
          </span>
          <span className="self-start text-xs text-gray-500">
            Anyone with this link can view the file
          </span>
        </button>
        <button
          type="button"
          className="flex flex-col space-y-1 hover:bg-gray-900 p-4"
        >
          <span className="self-start text-gray-300 font-semibold text-sm">
            Only me
          </span>
          <span className="self-start text-xs text-gray-500">
            The file can only be viewed by me
          </span>
        </button>
      </div>
    </>
  );
};

export default ManageLinkModal;
