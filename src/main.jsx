import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
i
import Homepage from "./routes/Homepage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import Write from"./Write.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegistePage from "./routes/RegistePage.jsx";


const router = createBrowserRouter ( [
  {
    Path: "/",
    element: <Homepage />
  },
  {
    path: "/post",
    element: <PostListPage />
  },
  {
    path: "/slug",
    element: <PostListPage />
  },
  {
    path: "/write",
    element: <Write />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegistePage />
  },    
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);