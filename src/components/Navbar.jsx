import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
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
      <NavLink className="hover:text-black" to="/">
        Home
      </NavLink>
      <NavLink className="hover:text-black" to="/availableCars">
        Available Cars
      </NavLink>
      {user && (
        <>
          <NavLink className="hover:text-black" to="/addCar">
            Add Car
          </NavLink>
          <NavLink className="hover:text-black" to="/myCar">
            My Car
          </NavLink>
          <NavLink className="hover:text-black" to="/myBookings">
            My Bookings
          </NavLink>
        </>
      )}
      {user ? (
        <Link className="hover:text-black" onClick={handleSignOut}>
          Logout
        </Link>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar p-0 lg:w-11/12 mx-auto">
        <div className="w-full flex justify-between lg:justify-start lg:w-[20%]">
          <Link className="h-10 flex" to="/">
            <img className="h-full" src={logo} alt="" />
            <p className="font-semibold text-lg pt-2">
              <span className="text-black">R</span>entify Cars
            </p>
          </Link>
          <div className="dropdown z-50">
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
              className="menu menu-sm right-0 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        </div>
        <div className=" hidden lg:flex  items-center  lg:w-[80%]">
          <ul className="menu menu-horizontal gap-5 pl-64 text-lg px-1  ">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
