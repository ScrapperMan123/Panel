import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
const URLS = [
  {
    name: "COUNTRY NAME",
    code: "COUNTRY CODE",
  },
  {
    name: "Afghanistan",
    code: "AF",
  },
  {
    name: "Albania",
    code: "AL",
  },
  {
    name: "Algeria",
    code: "DZ",
  },
  {
    name: "American Samoa",
    code: "AS",
  },
  {
    name: "Andorra",
    code: "AD",
  },
  {
    name: "Angola",
    code: "AO",
  },
  {
    name: "Anguilla",
    code: "AI",
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
  },
  {
    name: "Argentina",
    code: "AR",
  },
  {
    name: "Armenia",
    code: "AM",
  },
  {
    name: "Aruba",
    code: "AW",
  },
  {
    name: "Australia",
    code: "AU",
  },
  {
    name: "Austria",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
  },
  {
    name: "Bahrain",
    code: "BH",
  },
  {
    name: "Bangladesh",
    code: "BD",
  },
  {
    name: "Barbados",
    code: "BB",
  },
  {
    name: "Belarus",
    code: "BY",
  },
  {
    name: "Belgium",
    code: "BE",
  },
  {
    name: "Belize",
    code: "BZ",
  },
  {
    name: "Benin",
    code: "BJ",
  },
  {
    name: "Bermuda",
    code: "BM",
  },
  {
    name: "Bhutan",
    code: "BT",
  },
  {
    name: "Bolivia",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    name: "Botswana",
    code: "BW",
  },
  {
    name: "Brazil",
    code: "BR",
  },
  {
    name: "British Virgin Islands",
    code: "VG",
  },
  {
    name: "Brunei",
    code: "BN",
  },
  {
    name: "Bulgaria",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    code: "BF",
  },
  {
    name: "Burundi",
    code: "BI",
  },
  {
    name: "Cabo Verde",
    code: "CV",
  },
  {
    name: "Cambodia",
    code: "KH",
  },
  {
    name: "Cameroon",
    code: "CM",
  },
  {
    name: "Canada",
    code: "CA",
  },
  {
    name: "Cayman Islands",
    code: "KY",
  },
  {
    name: "Central African Republic",
    code: "CF",
  },
  {
    name: "Chad",
    code: "TD",
  },
  {
    name: "Chile",
    code: "CL",
  },
  {
    name: "China",
    code: "CN",
  },
  {
    name: "Colombia",
    code: "CO",
  },
  {
    name: "Comoros",
    code: "KM",
  },
  {
    name: "Congo",
    code: "CG",
  },
  {
    name: "Congo Democratic Republic",
    code: "CD",
  },
  {
    name: "Cook Islands",
    code: "CK",
  },
  {
    name: "Costa Rica",
    code: "CR",
  },
  {
    name: "Cote d'Ivoire",
    code: "CI",
  },
  {
    name: "Croatia",
    code: "HR",
  },
  {
    name: "Cuba",
    code: "CU",
  },
  {
    name: "Curaçao",
    code: "CW",
  },
  {
    name: "Cyprus",
    code: "CY",
  },
  {
    name: "Czechia",
    code: "CZ",
  },
  {
    name: "Denmark",
    code: "DK",
  },
  {
    name: "Djibouti",
    code: "DJ",
  },
  {
    name: "Dominica",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    code: "DO",
  },
  {
    name: "East Timor",
    code: "TL",
  },
  {
    name: "Ecuador",
    code: "EC",
  },
  {
    name: "Egypt",
    code: "EG",
  },
  {
    name: "El Salvador",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
  },
  {
    name: "Eritrea",
    code: "ER",
  },
  {
    name: "Estonia",
    code: "EE",
  },
  {
    name: "eSwatini",
    code: "SZ",
  },
  {
    name: "Ethiopia",
    code: "ET",
  },
  {
    name: "Falkland Islands",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    code: "FO",
  },
  {
    name: "Fiji",
    code: "FJ",
  },
  {
    name: "Finland",
    code: "FI",
  },
  {
    name: "France",
    code: "FR",
  },
  {
    name: "French Guiana",
    code: "GF",
  },
  {
    name: "French Polynesia",
    code: "PF",
  },
  {
    name: "Gabon",
    code: "GA",
  },
  {
    name: "Gambia",
    code: "GM",
  },
  {
    name: "Georgia",
    code: "GE",
  },
  {
    name: "Germany",
    code: "DE",
  },
  {
    name: "Ghana",
    code: "GH",
  },
  {
    name: "Gibraltar",
    code: "GI",
  },
  {
    name: "Greece",
    code: "GR",
  },
  {
    name: "Greenland",
    code: "GL",
  },
  {
    name: "Grenada",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    code: "GP",
  },
  {
    name: "Guam",
    code: "GU",
  },
  {
    name: "Guatemala",
    code: "GT",
  },
  {
    name: "Guernsey",
    code: "GG",
  },
  {
    name: "Guinea",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
  },
  {
    name: "Guyana",
    code: "GY",
  },
  {
    name: "Haiti",
    code: "HT",
  },
  {
    name: "Honduras",
    code: "HN",
  },
  {
    name: "Hong Kong",
    code: "HK",
  },
  {
    name: "Hungary",
    code: "HU",
  },
  {
    name: "Iceland",
    code: "IS",
  },
  {
    name: "India",
    code: "IN",
  },
  {
    name: "Indonesia",
    code: "ID",
  },
  {
    name: "Iran",
    code: "IR",
  },
  {
    name: "Iraq",
    code: "IQ",
  },
  {
    name: "Ireland",
    code: "IE",
  },
  {
    name: "Isle of Man",
    code: "IM",
  },
  {
    name: "Israel",
    code: "IL",
  },
  {
    name: "Italy",
    code: "IT",
  },
  {
    name: "Jamaica",
    code: "JM",
  },
  {
    name: "Japan",
    code: "JP",
  },
  {
    name: "Jersey",
    code: "JE",
  },
  {
    name: "Jordan",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    code: "KZ",
  },
  {
    name: "Kenya",
    code: "KE",
  },
  {
    name: "Kiribati",
    code: "KI",
  },
  {
    name: "Kosovo",
    code: "XK",
  },
  {
    name: "Kuwait",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
  },
  {
    name: "Laos",
    code: "LA",
  },
  {
    name: "Latvia",
    code: "LV",
  },
  {
    name: "Lebanon",
    code: "LB",
  },
  {
    name: "Lesotho",
    code: "LS",
  },
  {
    name: "Liberia",
    code: "LR",
  },
  {
    name: "Libya",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    code: "LI",
  },
  {
    name: "Lithuania",
    code: "LT",
  },
  {
    name: "Luxembourg",
    code: "LU",
  },
  {
    name: "Macau",
    code: "MO",
  },
  {
    name: "Madagascar",
    code: "MG",
  },
  {
    name: "Malawi",
    code: "MW",
  },
  {
    name: "Malaysia",
    code: "MY",
  },
  {
    name: "Maldives",
    code: "MV",
  },
  {
    name: "Mali",
    code: "ML",
  },
  {
    name: "Malta",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    code: "MH",
  },
  {
    name: "Martinique",
    code: "MQ",
  },
  {
    name: "Mauritania",
    code: "MR",
  },
  {
    name: "Mauritius",
    code: "MU",
  },
  {
    name: "Mayotte",
    code: "YT",
  },
  {
    name: "Mexico",
    code: "MX",
  },
  {
    name: "Micronesia",
    code: "FM",
  },
  {
    name: "Moldova",
    code: "MD",
  },
  {
    name: "Monaco",
    code: "MC",
  },
  {
    name: "Mongolia",
    code: "MN",
  },
  {
    name: "Montenegro",
    code: "ME",
  },
  {
    name: "Montserrat",
    code: "MS",
  },
  {
    name: "Morocco",
    code: "MA",
  },
  {
    name: "Mozambique",
    code: "MZ",
  },
  {
    name: "Myanmar",
    code: "MM",
  },
  {
    name: "Namibia",
    code: "NA",
  },
  {
    name: "Nauru",
    code: "NR",
  },
  {
    name: "Nepal",
    code: "NP",
  },
  {
    name: "Netherlands",
    code: "NL",
  },
  {
    name: "New Caledonia",
    code: "NC",
  },
  {
    name: "New Zealand",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    code: "NI",
  },
  {
    name: "Niger",
    code: "NE",
  },
  {
    name: "Nigeria",
    code: "NG",
  },
  {
    name: "North Korea",
    code: "KP",
  },
  {
    name: "North Macedonia",
    code: "MK",
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
  },
  {
    name: "Norway",
    code: "NO",
  },
  {
    name: "Oman",
    code: "OM",
  },
  {
    name: "Pakistan",
    code: "PK",
  },
  {
    name: "Palau",
    code: "PW",
  },
  {
    name: "Panama",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    code: "PG",
  },
  {
    name: "Paraguay",
    code: "PY",
  },
  {
    name: "Peru",
    code: "PE",
  },
  {
    name: "Philippines",
    code: "PH",
  },
  {
    name: "Poland",
    code: "PL",
  },
  {
    name: "Portugal",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    code: "PR",
  },
  {
    name: "Qatar",
    code: "QA",
  },
  {
    name: "Reunion",
    code: "RE",
  },
  {
    name: "Romania",
    code: "RO",
  },
  {
    name: "Russia",
    code: "RE",
  },
  {
    name: "Rwanda",
    code: "RW",
  },
  {
    name: "Saint Helena",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    code: "LC",
  },
  {
    name: "Saint Martin",
    code: "MF",
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    name: "Samoa",
    code: "WS",
  },
  {
    name: "San Marino",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
  },
  {
    name: "Senegal",
    code: "SN",
  },
  {
    name: "Serbia",
    code: "RS",
  },
  {
    name: "Seychelles",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    code: "SL",
  },
  {
    name: "Singapore",
    code: "SG",
  },
  {
    name: "Sint Maarten",
    code: "SX",
  },
  {
    name: "Slovakia",
    code: "SK",
  },
  {
    name: "Slovenia",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    code: "SB",
  },
  {
    name: "Somalia",
    code: "SO",
  },
  {
    name: "South Africa",
    code: "ZA",
  },
  {
    name: "South Korea",
    code: "KR",
  },
  {
    name: "South Sudan",
    code: "SS",
  },
  {
    name: "Spain",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    code: "LK",
  },
  {
    name: "St. Barts",
    code: "BL",
  },
  {
    name: "Sudan",
    code: "SD",
  },
  {
    name: "Suriname",
    code: "SR",
  },
  {
    name: "Sweden",
    code: "SE",
  },
  {
    name: "Switzerland",
    code: "CH",
  },
  {
    name: "Syria",
    code: "SY",
  },
  {
    name: "Taiwan",
    code: "TW",
  },
  {
    name: "Tajikistan",
    code: "TJ",
  },
  {
    name: "Tanzania",
    code: "TZ",
  },
  {
    name: "Thailand",
    code: "TH",
  },
  {
    name: "The Bahamas",
    code: "BH",
  },
  {
    name: "Togo",
    code: "TG",
  },
  {
    name: "Tonga",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
  },
  {
    name: "Tunisia",
    code: "TN",
  },
  {
    name: "Turkey",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    name: "Tuvalu",
    code: "TV",
  },
  {
    name: "Uganda",
    code: "UG",
  },
  {
    name: "Ukraine",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
  },
  {
    name: "United Kingdom",
    code: "GB",
  },
  {
    name: "United States",
    code: "US",
  },
  {
    name: "Uruguay",
    code: "UY",
  },
  {
    name: "US Virgin Islands",
    code: "VI",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    code: "VU",
  },
  {
    name: "Vatican City (Holy See)",
    code: "VA",
  },
  {
    name: "Venezuela",
    code: "VE",
  },
  {
    name: "Vietnam",
    code: "VN",
  },
  {
    name: "Wallis and Futuna",
    code: "WF",
  },
  {
    name: "Yemen",
    code: "YE",
  },
  {
    name: "Zambia",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
  },
];

function Poison() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCouuntries, setSelectedCouuntries] = useState([]);

  const [viewData, setViewData] = useState({
    name: "",
    link: "",
    isStrating: false,
  });

  const toggleCountry = (country) => {
    const condition = selectedCouuntries.find((c) => c.code == country.code);
    if (condition) {
      setSelectedCouuntries([
        ...selectedCouuntries.filter((e) => e.code != country.code),
      ]);
    } else {
      setSelectedCouuntries([...selectedCouuntries, country]);
    }
  };

  const addView = async (e) => {
    e.preventDefault();
    if (viewData.name && viewData.link) {
      await addDoc(collection(db, "views"), {
        name: viewData.name,
        isStrarting: viewData.isStrating,
        link: viewData.link,
        locale: "en",
        allowedCountries: selectedCouuntries.map((e) => e.code),
      });
    }
  };

  useEffect(() => {
    if (searchCountry) {
      setCountries(
        URLS.filter((e) => {
          return e.name
            .toLocaleLowerCase()
            .includes(searchCountry.toLocaleLowerCase());
        })
      );
    } else {
      setCountries([]);
    }
  }, [searchCountry]);

  return (
    <div>
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setViewData({ ...viewData, name: e.target.value })}
            type="string"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required=""
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Link
          </label>
          <input
            onChange={(e) => setViewData({ ...viewData, link: e.target.value })}
            type="string"
            id="link"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required=""
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <span className="w-1/3 relative">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Countries
            </label>
            <input
              type="string"
              onChange={(event) => setSearchCountry(event.target.value)}
              id="link"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required=""
            />
            <div
              id="dropdown"
              className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
            >
              {countries.length > 0 && (
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {countries.map((e) => (
                    <li>
                      <button
                        onClick={() => toggleCountry(e)}
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {e.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </span>
          <span>
            {selectedCouuntries.map((c, idx) => (
              <span
                key={idx}
                id="badge-dismiss-default"
                className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {c.name} <span>({c.code})</span>
                <button
                  type="button"
                  className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                >
                  <svg
                    onClick={() => toggleCountry(c)}
                    aria-hidden="true"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              onChange={() =>
                setViewData({ ...viewData, isStrating: !viewData.isStrating })
              }
              id="start"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required=""
            />
          </div>
          <label
            htmlFor="start"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            can be a{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              starting page
            </a>
          </label>
        </div>
        <button
          onClick={addView}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new view
        </button>
      </form>
    </div>
  );
}

export default Poison;
