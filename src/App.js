import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PetDetail from "./pages/PetDetail";
import Location from "./pages/Location";
import MarkList from "./pages/MarkList";
import Board from "./pages/Board";
import Post from "./pages/Post";
import AddEdit from "./pages/AddEdit";
import MyPage from "./pages/MyPage";
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
      { path: "/board", element: <Board /> },
      { path: "/:postId", element: <Post /> },
      {
        path: "/add",
        element: <AddEdit />,
      },
      { path: "/update/:postId", element: <AddEdit /> },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <MarkProvider>
      <RouterProvider router={router} />
    </MarkProvider>
  );
}

export default App;
