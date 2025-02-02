"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map-client"), {
  ssr: false
})

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
