"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="container is-desktop">
      <div className="ืnavbar">
        <p className="is-size-1 has-text-centered">Find Me, If you can.</p>
      </div>
      <Map />
    </div>
  );
}
