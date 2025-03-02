import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { routes } from "./routes/routes";
import PrivateRoute from "./components/authentication/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {routes?.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading..</div>}>
                  <PrivateRoute component={route.component} />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
