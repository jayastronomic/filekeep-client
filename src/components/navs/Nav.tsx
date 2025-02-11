import { Link, useLocation } from "react-router";
import logo from "../../assets/fk-logo-nb.png";
const Nav = () => {
  const location = useLocation();
  const { pathname } = location;
  const isRegistration = pathname === "/register" || pathname === "/login";

  return (
    <nav className="navbar border-b p-4 justify-between flex-none shadow-sm">
      <div className="w-36">
        <Link to="/">
          <img alt="FileKeep logo" src={logo} />
        </Link>
      </div>
      {!isRegistration && (
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4">
            <Link className="hover:text-[#ff914d] transition" to="/register">
              Sign up
            </Link>
            <Link className="hover:text-[#ff914d] transition" to="/login">
              Log in
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
