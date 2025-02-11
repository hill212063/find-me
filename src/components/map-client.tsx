"use client";

import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerWrapper from './marker-wrapper';
import { socket } from './socket';


const MapClient: React.FC = () => {

  const bangkokLocation: LatLngExpression = [13.7563, 100.5018];
  const [adminLocation, setAdminLocation] = useState<LatLngExpression>(bangkokLocation);
  const [clientLocation, setClientLocation] = useState<LatLngExpression>(bangkokLocation);

  useEffect(() => { initSocket(); watchClientLocation(); }, [])

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('client connected')
    })
    socket.on('update-location', msg => {
      setAdminLocation(msg)
    })
  }

  const watchClientLocation = () => {
    navigator.geolocation.watchPosition((pos) => {
      const clientLocation: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
      setClientLocation(clientLocation);
    })
  }


  return (
    <div style={{ width: "100%", height: "100%", aspectRatio: 1 }}>
      <MapContainer style={{ width: "100%", height: "100%" }} center={adminLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerWrapper markerPosition={adminLocation} markerName='Admin' />
        <MarkerWrapper markerPosition={clientLocation} markerName='Client' />
      </MapContainer>
    </div>
  )
}
export default MapClient;
