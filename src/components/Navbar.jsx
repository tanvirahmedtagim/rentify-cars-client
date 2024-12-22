import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout, setLoading } = useContext(AuthContext);
  const handleSignOut = async () => {
    setLoading(true);
    await handleLogout().then(() => {
      navigate("/");
      setLoading(false);
    });
  };
  const links = (
    <>
      <NavLink className="hover:text-[#e9631a]" to="/">
        Home
      </NavLink>
      <NavLink className="hover:text-[#e9631a]" to="/availableCars">
        Available Cars
      </NavLink>
      {user && (
        <>
          <NavLink className="hover:text-[#e9631a]" to="/addCar">
            Add Car
          </NavLink>
          <NavLink className="hover:text-[#e9631a]" to="/myCar">
            My Car
          </NavLink>
          <NavLink className="hover:text-[#e9631a]" to="/myBookings">
            My Bookings
          </NavLink>
        </>
      )}
      {user ? (
        <Link className="hover:text-[#e9631a]" onClick={handleSignOut}>
          Logout
        </Link>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 w-11/12 mx-auto">
        <div className="navbar-start lg:w-[20%]">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="h-10" to="/">
            <img className="h-full" src={logo} alt="" />{" "}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex  items-center  lg:w-[80%]">
          <ul className="menu menu-horizontal gap-5 pl-64 text-lg px-1  ">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
