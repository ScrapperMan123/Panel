import React from "react";
import ReactCountryFlag from "react-country-flag";

const CountryCard = ({ ipAddress, countryName, countryCode, city }) => {
  return (
    <div
      id="toast-notification"
      className="w-full max-w-xs py-2 rounded-lg shadow bg-gray-800 text-gray-300"
      role="alert"
    >
      {/* <div className="flex items-center mb-3">
        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          New notification
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-notification"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div> */}
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
            }}
            title={countryCode}
          />
          <span className="sr-only">Message icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {ipAddress}
          </div>
          <div className="text-sm font-normal">{city}</div>
          {countryName && countryCode && (
            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
              {countryName} ({countryCode})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
