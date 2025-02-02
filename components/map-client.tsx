"use client";
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerWrapper from './marker-wrapper';


const MapClient: React.FC = () => {

  const bangkokPosition: LatLngExpression = [13.7563, 100.5018];
  const [currentPosition, setCurrentPosition] = useState<LatLngExpression>(bangkokPosition);

  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      setCurrentPosition([pos.coords.latitude, pos.coords.longitude])
    })
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", aspectRatio: 1 }}>
      <MapContainer style={{ width: "100%", height: "100%" }} center={currentPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerWrapper markerPosition={currentPosition} markerName='Current' />
      </MapContainer>
    </div>
  )
}
export default MapClient;
