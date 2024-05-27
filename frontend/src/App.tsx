import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UnProtectedRoutes from "./routes/UnProtectedRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UnProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
