"use client";
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerWrapper from './marker-wrapper';
import { socket } from './socket';


const MapClient: React.FC = () => {

  const bangkokLocation: LatLngExpression = [13.7563, 100.5018];
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression>(bangkokLocation);

  useEffect(() => { initSocket(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('client connected')
    })
    socket.on('update-location', msg => {
      console.log(msg)
      setCurrentLocation(msg)
    })
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100%", aspectRatio: 1 }}>
      <MapContainer style={{ width: "100%", height: "100%" }} center={currentLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerWrapper markerPosition={currentLocation} markerName='Current' />
      </MapContainer>
    </div>
  )
}
export default MapClient;
