import { FC } from "react";
import { IoCheckmark } from "react-icons/io5";

const PopUp: FC<PopUpProps> = ({ content }) => {
  return (
    <div className="absolute flex space-x-2 text-xs bottom-6 left-2  bg-black text-gray-300 w-1/2 rounded shadow border border-gray-600 p-2  group-hover:block delay-300">
      <span>
        <IoCheckmark className="text-lg" />
      </span>
      <span>{content}</span>
    </div>
  );
};

export default PopUp;
