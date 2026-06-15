import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { routes } from "./routes/routes";
import PrivateRoute from "./components/authentication/PrivateRoute";
import InfoModal from "./components/modal/info-modal/InfoModal";
import DailyWordsModal from "./components/modal/daily-words-modal/DailyWordsModal";
import DefaultLayout from "./layouts/default-layout/DefaultLayout";
import LandingPageLayout from "./layouts/landing-page-layout/LandingPageLayout";

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
                    <DefaultLayout>
                      <route.component />
                    </DefaultLayout>
                  </PrivateRoute>
                </Suspense>
              }
            />
          ) : (
            <Route
              key={index}
              path={route.path}
              element={
                route.defaultLayout ? (
                  <DefaultLayout>
                    <route.component />
                  </DefaultLayout>
                ) : (
                  <LandingPageLayout>
                    <route.component />
                  </LandingPageLayout>
                )
              }
            />
          )
        ))}
      </Routes>
      <InfoModal />
      <DailyWordsModal />
    </>
  );
}

export default App;
