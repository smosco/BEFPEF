import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Location from "./pages/Location";
import MarkList from "./pages/MarkList";
import NotFound from "./pages/NotFound";
import "./scss/main.scss";

import { MarkProvider } from "./context/MarkContext";

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
      { path: "/marklist", element: <MarkList /> },
    ],
  },
]);

function App() {
  return (
    <MarkProvider>
      <RouterProvider router={router} />
    </MarkProvider>
  );
}

export default App;
