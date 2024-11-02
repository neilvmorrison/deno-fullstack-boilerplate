import RootRoute from "./root/index.tsx";
import Profile from "./profile/index.tsx";
import Login from "./login/index.tsx";
import Register from "./register/index.tsx";
import Home from "./home/index.tsx";

const routes = [
  {
    element: <RootRoute />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Profile />,
        path: "/profile",
      },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Register />,
    path: "/register",
  },
];

export default routes;
