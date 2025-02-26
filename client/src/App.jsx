import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { routes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <>
      <Routes>
        {routes?.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading..</div>}>
                  <DefaultLayout>
                    <Component />
                  </DefaultLayout>
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
