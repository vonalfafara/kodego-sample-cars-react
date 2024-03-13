import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import routes from "./routes";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
