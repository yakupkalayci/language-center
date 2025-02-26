import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage"));
const WordListDay = lazy(() => import("../pages/word-list-day/WordListDay"));
const WordListWeek = lazy(() => import("../pages/word-list-week/WordListWeek"));
const WordListMonth = lazy(() => import("../pages/word-list-month/WordListMonth"));

export const routes = [
  {
    title: "Giriş Yap",
    exact: true,
    path: "/uyelik-islemleri",
    component: AuthPage,
  },
  {
    title: "Anasayfa",
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    title: "Günün Kelimeleri",
    exact: true,
    path: "/gunun-kelimeleri",
    component: WordListDay,
  },
  {
    title: "Haftanın Kelimeleri",
    exact: true,
    path: "/haftanin-kelimeleri",
    component: WordListWeek,
  },
  {
    title: "Ayın Kelimeleri",
    exact: true,
    path: "/ayin-kelimeleri",
    component: WordListMonth,
  },
];
