"use client";

import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import MarkerWrapper from './marker-wrapper';
import { socket } from './socket';

const Map: React.FC = () => {

  const bangkokLocation: LatLngTuple = [13.7563, 100.5018];
  const [adminLocation, setAdminLocation] = useState<LatLngTuple>(bangkokLocation);
  const [clientLocation, setClientLocation] = useState<LatLngTuple>(bangkokLocation);
  const [route, setRoute] = useState<LatLngTuple[]>([]);

  useEffect(() => { initSocketAndLocations(); }, [])
  useEffect(() => { getRouteData(); }, [clientLocation, adminLocation])

  const initSocketAndLocations = async () => {
    await initSocket();
    getUpdatedAdminLocation();
    getUpdatedClientLocation();
  }

  const initSocket = async () => {
    await fetch('/api/socket');
    socket.on('connect', () => {
      console.log('client connected')
    })
  }

  const getUpdatedAdminLocation = () => {
    socket.on('update-location', msg => {
      console.log('update location from admin')
      setAdminLocation(msg)
    })
  }

  const getUpdatedClientLocation = () => {
    navigator.geolocation.watchPosition((pos) => {
      const clientLocation: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
      setClientLocation(clientLocation);
    })
  }

  const getRouteData = async () => {
    try {
      if (clientLocation[0] && clientLocation[1] && adminLocation[0] && adminLocation[1]) {
        console.log(`client location: ${clientLocation}`);
        console.log(`admin location: ${adminLocation}`);
        const routeData = await ((await fetch(getRouteURL(clientLocation, adminLocation))).json());
        if (routeData.routes.length > 0) {
          const coordinates: LatLngTuple[] = routeData.routes[0].geometry.coordinates.map(
            (point: [number, number]) => [point[1], point[0]] // Swap lng, lat → lat, lng
          );
          setRoute(coordinates)
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }

  const getRouteURL = (start: LatLngTuple, end: LatLngTuple): string => {
    return `https://router.project-osrm.org/route/v1/walking/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
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
        {route.length > 0 && <Polyline positions={route} color="green" />}
      </MapContainer>
    </div>
  )
}
export default Map;
