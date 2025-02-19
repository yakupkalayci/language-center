import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const WordList = lazy(() => import("../pages/word-list/WordList"));

export const routes = [
  {
    title: "Anasayfa",
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    title: "Kelime Listesi",
    exact: true,
    path: "/kelime-listesi",
    component: WordList,
  },
];
