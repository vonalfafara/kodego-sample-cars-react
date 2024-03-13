import Home from "./views/Home";
import Cars from "./views/Cars";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Cars",
    path: "/cars",
    element: <Cars />,
  },
];

export default routes;
