"use client";

import { socket } from "@/src/components/socket";
import { useEffect, useState } from "react";

export default function AdminPage() {

  const [isShareLocation, setIsStream] = useState<boolean>(false);
  const [watchPositionID, setWatchPositionID] = useState<number>();

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnect the server");
    })

    return () => {
      socket.disconnect();
    }
  }, [])


  useEffect(() => {
    if (isShareLocation) {
      const watchID = navigator.geolocation.watchPosition((pos) => {
        const msg = [pos.coords.latitude, pos.coords.longitude];
        socket.emit("send-location", msg);
      })
      setWatchPositionID(watchID);
    } else {
      if (watchPositionID) navigator.geolocation.clearWatch(watchPositionID);
    }
  }, [isShareLocation]);

  const onStream = () => {
    setIsStream(!isShareLocation);
  }

  return (
    <div className="container is-flex is-flex-direction-column is-align-items-center" style={{ width: "80%" }}>
      <h1 className="title is-size-1-desktop is-size-3-mobile has-text-centered m-6">
        Share location page
      </h1>
      <button
        className="button is-medium"
        style={{ color: isShareLocation ? "red" : "green" }}
        type="button"
        onClick={onStream}
      >
        {isShareLocation ? "Stop share location" : "Share location"}
      </button>
      {isShareLocation ? <progress className="progress is-large" max="100" style={{ margin: "3rem", width: "65%" }}>60%</progress> : <div />}
    </div >
  )
}

