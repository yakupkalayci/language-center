import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage"));
const WordListPage = lazy(() => import("../pages/word-list/WordList"));
const WordListDay = lazy(() => import("../pages/word-list-day/WordListDay"));
const WordListWeek = lazy(() => import("../pages/word-list-week/WordListWeek"));
const WordListMonth = lazy(() => import("../pages/word-list-month/WordListMonth"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const MediaList = lazy(() => import("../pages/media/MediaList"));
const MediaDetail = lazy(() => import("../pages/media/MediaDetail"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const LearnedWordsPage = lazy(() => import("../pages/learned-words/LearnedWords"));

export const routes = [
  {
    title: "Giriş Yap",
    exact: true,
    path: "/uyelik-islemleri",
    component: AuthPage,
    isPrivate: false
  },
  {
    title: "Anasayfa",
    exact: true,
    path: "/",
    component: HomePage,
    isPrivate: true
  },
  {
    title: "Günün Kelimeleri",
    exact: true,
    path: "/gunun-kelimeleri",
    component: WordListDay,
    isPrivate: true
  },
  {
    title: "Haftanın Kelimeleri",
    exact: true,
    path: "/haftanin-kelimeleri",
    component: WordListWeek,
    isPrivate: true
  },
  {
    title: "Ayın Kelimeleri",
    exact: true,
    path: "/ayin-kelimeleri",
    component: WordListMonth,
    isPrivate: true
  },
  {
    title: "Kelime Listesi",
    exact: true,
    path: "/kelime-listesi",
    component: WordListPage,
    isPrivate: true
  },
  {
    title: "Film / Dizi",
    exact: true,
    path: "/film-dizi-video-kelimeleri",
    component: MediaList,
    isPrivate: true
  },
  {
    title: "Film / Dizi Detay",
    exact: false,
    path: "/media/:id",
    component: MediaDetail,
    isPrivate: true
  },
  {
    title: "Ayarlar",
    exact: true,
    path: "/ayarlar",
    component: SettingsPage,
    isPrivate: true
  },
  {
    title: "Profilim",
    exact: true,
    path: "/profilim",
    component: ProfilePage,
    isPrivate: true
  },
  {
    title: "Öğrendiğim Kelimeler",
    exact: true,
    path: "/ogrenilen-kelimeler",
    component: LearnedWordsPage,
    isPrivate: true
  },
];
