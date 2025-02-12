"use client";

import { socket } from '@/src/components/socket';
import { useEffect, useState } from 'react';

export default function AdminPage() {

  const [isStream, setIsStream] = useState<boolean>(false);
  const [watchPositionID, setWatchPositionID] = useState<number>();

  useEffect(() => { initSocket(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('connected')
    })
  }

  useEffect(() => {
    if (isStream) {
      const watchID = navigator.geolocation.watchPosition((pos) => {
        const msg = [pos.coords.latitude, pos.coords.longitude];
        console.log("send location");
        console.log(msg);
        socket.emit("send-location", msg);
      })
      setWatchPositionID(watchID);
    } else {
      if (watchPositionID) navigator.geolocation.clearWatch(watchPositionID);
    }
  }, [isStream]);

  const onStream = () => {
    setIsStream(!isStream);
  }

  return (
    <div>
      <h1>Send location page</h1>
      <button type='button' onClick={onStream}>
        {isStream ? "Streaming location..." : "Stream location"}
      </button>
    </div>
  )
}

