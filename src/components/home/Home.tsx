import FileKeepIcon from "./FileKeepIcon";
import FileKeepTextSvg from "./FileKeepTextSvg";
import RegistrationLinks from "./RegistrationLinks";

const Home = () => {
  return (
    <div className="relative flex flex-col h-full w-full bg-[#0d1117] justify-center items-center">
      <div className="max-w-[40rem] text-gray-100">
        <div className="flex flex-col items-center justify-center">
          <FileKeepIcon width="200" height="75" viewBox="0 75 375 200" />
          <FileKeepTextSvg width="250" height="60" viewBox="60 150 250 50" />
        </div>
        <div className="text-white px-10 text-left my-4">
          Keep your files, photos, and videos automatically backed up and
          available on all your devices.
        </div>
        <RegistrationLinks />
      </div>
      <div className="absolute bottom-4 right-4 magz text-white">
        powered by jayastronomic
      </div>
    </div>
  );
};

export default Home;
