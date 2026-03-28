import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { routes } from "./routes/routes";
import PrivateRoute from "./components/authentication/PrivateRoute";
import InfoModal from "./components/modal/info-modal/InfoModal";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <>
      <Routes>
        {routes?.map((route, index) => (
          route.isPrivate ? (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading..</div>}>
                  <PrivateRoute>
                    <route.component />
                  </PrivateRoute>
                </Suspense>
              }
            />
          ) : (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <route.component />
                </DefaultLayout>
              }
            />
          )
        ))}
      </Routes>
      <InfoModal />
    </>
  );
}

export default App;
