"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="container is-desktop">
      <div className="ืnavbar">
        <h1 className="title is-size-1-desktop is-size-3-mobile has-text-centered m-6">
          Find Me, If you can.
        </h1>
      </div>
      <div className="block m-4">
        <Map />
      </div>
    </div>
  );
}
