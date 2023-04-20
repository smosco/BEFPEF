import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Location from "./pages/Location";
import BeFriend from "./pages/BeFriend";
import NotFound from "./pages/NotFound";
import "./scss/main.scss";

import { LikesProvider } from "./context/LikeContext";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/petdetail/:id",
        element: <PetDetail />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      { path: "/beFriend", element: <BeFriend /> },
    ],
  },
]);

function App() {
  return (
    <LikesProvider>
      <RouterProvider router={router} />
    </LikesProvider>
  );
}

export default App;
