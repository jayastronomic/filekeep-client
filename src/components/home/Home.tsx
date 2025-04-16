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
      <div className="flex justify-between absolute bottom-0 w-full  px-3 pb-4">
        <a
          href="https://codingchallenges.fyi/challenges/challenge-dropbox"
          className="flex items-center space-x-2"
        >
          <div className="rounded-full overflow-hidden shadow shadow-gray-400 border border-gray-600">
            <img src="./images/john.jpeg" className="w-16 h-16 object-cover" />
          </div>
          <div className=" flex flex-col text-white text-[12px] geo-sans">
            <div>John Crickett</div>
            <div className="pl-1">Coding Challenge</div>
          </div>
        </a>
        <div className="magz text-sm text-white self-end">
          powered by jayastronomic
        </div>
      </div>
    </div>
  );
};

export default Home;
