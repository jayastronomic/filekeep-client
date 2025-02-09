import { Link } from "react-router";
const RegistrationLinks = () => {
  return (
    <div className="flex flex-col space-y-2 mt-8 w-full px-10">
      <Link
        className="text-center bg-gray-900 text-white font-light rounded-md p-2 border-[0.5px]"
        to="/login"
      >
        Log in
      </Link>
      <Link
        className="text-center bg-gray-100 text-[#0d1117] font-light rounded-md p-2 border-[0.5px]"
        to="/register"
      >
        Register
      </Link>
    </div>
  );
};

export default RegistrationLinks;
