"use client";

import { LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import MarkerWrapper from './marker-wrapper';
import { socket } from './socket';

const MapClient: React.FC = () => {

  const bangkokLocation: LatLngTuple = [13.7563, 100.5018];
  const [adminLocation, setAdminLocation] = useState<LatLngTuple>(bangkokLocation);
  const [clientLocation, setClientLocation] = useState<LatLngTuple>(bangkokLocation);
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const OSRM_ROUTE_URL = `https://router.project-osrm.org/route/v1/driving/${clientLocation[1]},${clientLocation[0]};${adminLocation[1]},${adminLocation[0]}?overview=full&geometries=geojson`;

  useEffect(() => { initSocket(); watchClientLocation(); }, [])
  useEffect(() => { getRoutingData(); }, [clientLocation, adminLocation])

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

  const getRoutingData = () => {
    fetch(OSRM_ROUTE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.routes.length > 0) {
          const coordinates: LatLngTuple[] = data.routes[0].geometry.coordinates.map(
            (point: [number, number]) => [point[1], point[0]] // Swap lng, lat → lat, lng
          );
          setRoute(coordinates)
        }
      })
      .catch((err) => console.error("Error fetching route:", err));
  }


  return (
    <div style={{ width: "100%", height: "100%", aspectRatio: 1 }}>
      <MapContainer style={{ width: "100%", height: "100%" }} center={adminLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerWrapper markerPosition={adminLocation} markerName="Admin" />
        <MarkerWrapper markerPosition={clientLocation} markerName="Client" />
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  )
}
export default MapClient;
