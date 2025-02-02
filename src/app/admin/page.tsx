"use client";

import { socket } from '@/socket';
import React, { useEffect, useRef, useState } from 'react'

export default function SendLocPage() {

  const [isStream, setIsStream] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { initSocket(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('connected')
    })
    return null;
  }

  useEffect(() => {
    console.log(isStream)
    if (isStream) {
      intervalIdRef.current = setInterval(() => {
        streamingLocation();
      }, 1000);
    } else {
      console.log("Stop" + intervalIdRef.current);
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    }
  }, [isStream]);

  const onStream = () => {
    setIsStream(!isStream);
  }

  const streamingLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const msg = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      console.log("send location");
      console.log(msg);
      socket.emit("send-location", msg);
    })
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

