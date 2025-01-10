import { Link } from "react-router";
import { LuArrowRight } from "react-icons/lu";
import { IoIosDocument } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaFileAudio } from "react-icons/fa";

const Home = () => {
  const icons = [
    { component: <IoIosDocument className="text-7xl" />, title: "PDF, Docx" },
    {
      component: <IoMdPhotos className="text-7xl" />,
      title: "PNG, JPEG, GIF",
    },
    { component: <FaVideo className="text-7xl" />, title: "Mp4, AVi, MOV" },
    {
      component: <FaFileAudio className="text-7xl" />,
      title: "Mp3, WAV, FLAC",
    },
  ];
  return (
    <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6">
      <div className="flex flex-col louis text-2xl space-y-4">
        <h2 className="">
          Securely store, share, and access your files anytime, anywhere.
        </h2>
        <h2 className="">Your digital workspace reimagined.</h2>
      </div>
      <div className="mt-4">
        <Link
          to="#"
          className="inline-flex items-center space-x-1 text-gray-700 group cursor-pointer"
        >
          <div className="underline font-bold">See Filekeep plans</div>
          <LuArrowRight className="text-2xl group-hover:translate-x-1 transition" />
        </Link>
      </div>
      <h2 className="louis text-2xl mt-10 mb-8 text-center">
        We support a wide range of file types:
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1">
        {icons.map((icon) => {
          return (
            <div className="card bg-base-100 flex flex-col justify-center items-center rounded-lg shadow-md border">
              <div className="text-[#ff914d]">{icon.component}</div>
              <div className="pt-2">{icon.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
