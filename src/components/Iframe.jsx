import React from "react";

export default function Iframe({ Link }) {

    console.log(Link);
  return (
    <div>
      <iframe
        src={Link}
        frameBorder="0"
        style={{ width: "100vw", height: "100vh" }}
      ></iframe>
    </div>
  );
}
