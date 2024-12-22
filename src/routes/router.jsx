import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import AvailableCars from "../Pages/AvailableCars";
import AddCar from "../Pages/AddCar";
import MyCars from "../Pages/MyCars";
import MyBookings from "../Pages/MyBookings";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCars",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/addCar",
        element: <AddCar></AddCar>,
      },
      {
        path: "/myCar",
        element: <MyCars></MyCars>,
      },
      {
        path: "/myBookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);
export default router;
