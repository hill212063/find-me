"use client";

import React, { useState } from 'react'

export default function SendLocPage() {

  const [streamState, setStreamState] = useState(false);

  return (
    <div>
      <h1>Send location page</h1>
      <button type='button' onClick={() => setStreamState(!streamState)}>
        {!streamState ? "Stream location" : "Streaming location..."}
      </button>
    </div>
  )
}

