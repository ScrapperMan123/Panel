import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useParams, useSearchParams } from "react-router-dom";
import {
  doc,
  collection,
  onSnapshot,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import Iframe from "./components/Iframe";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next",
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const [LoadingState, setIsLoading] = useState(0);
  const [initialRoute, setInitialeRoure] = useState(null);
  const [iframeView, setView] = useState(null);
  let { view } = useParams();

  // const getView = async () => {
  //   const q = query(
  //     collection(db, "views"),
  //     where("isStarting", "==", true),
  //     where("name", "==", view.toLocaleUpperCase())
  //   );

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.docs.map((e) => {
  //     const currentView = e.data();
  //     setView(currentView);
  //   });
  // };

  // const getAdminInfo = async () => {
  //   const unsub = onSnapshot(doc(db, "admin", "Loading"), (doc) => {
  //     let loadingState = doc.data();
  //     setIsLoading(loadingState);
  //   });
  // };

  // useEffect(() => {
  //   getView();
  //   getAdminInfo();
  //   getItems();
  // }, []);

  return (
    // <>
    //   <div>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   {/* <h1>verification code : {LoadingState.code}</h1> */}
    //   {LoadingState.status == "false" && setView && (
    //     <div className="card">
    //       <Iframe Link={iframeView?.link} />
    //     </div>
    //   )}
    // </>
    <></>
  );
}

export default App;
