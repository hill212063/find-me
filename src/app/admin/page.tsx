"use client";

import { socket } from '@/src/components/socket';
import React, { useEffect, useRef, useState } from 'react'

export default function AdminPage() {

  const [isStream, setIsStream] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { initSocket(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('connected')
    })
  }

  useEffect(() => {
    if (isStream) {
      intervalIdRef.current = setInterval(() => {
        streamingLocation();
      }, 1000);
    } else {
      console.log("Stop" + intervalIdRef.current);
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    }
  }, [isStream]);

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

