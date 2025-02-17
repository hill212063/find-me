"use client";

import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import MarkerWrapper from "./marker-wrapper";
import { socket } from "./socket";

const Map: React.FC = () => {

  const bangkokLocation: LatLngTuple = [13.7563, 100.5018];
  const [adminLocation, setAdminLocation] = useState<LatLngTuple>(bangkokLocation);
  const [clientLocation, setClientLocation] = useState<LatLngTuple>(bangkokLocation);
  const [isInitLocation, setIsInitLocation] = useState<boolean>(false);
  const [route, setRoute] = useState<LatLngTuple[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("update-location", adminLocationData => {
      setAdminLocation(adminLocationData);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnect the server with this reason:", reason);
    });

    watchClientLocation();
    setIsInitLocation(true);

    return () => {
      socket.disconnect();
    }
  }, []);

  const watchClientLocation = () => {
    navigator.geolocation.watchPosition((pos) => {
      const clientLocation: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
      setClientLocation(clientLocation);
    });
  }

  useEffect(() => { getRouteData(); }, [clientLocation, adminLocation]);

  const getRouteData = async () => {
    try {
      if (clientLocation[0] && clientLocation[1] && adminLocation[0] && adminLocation[1]) {
        const routeData = await ((await fetch(getRouteURL(clientLocation, adminLocation))).json());
        if (routeData.routes.length > 0) {
          const coordinates: LatLngTuple[] = routeData.routes[0].geometry.coordinates.map(
            // Change OSRM format to leaflet by Swap lng, lat → lat, lng
            (point: [number, number]) => [point[1], point[0]]
          );
          setRoute(coordinates)
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }

  const getRouteURL = (start: LatLngTuple, end: LatLngTuple): string => {
    return `http://127.0.0.1:8080/route/v1/walking/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
  }

  return (
    <MapContainer style={{ width: "100%", height: "70vh", borderRadius: "30px" }} center={adminLocation} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerWrapper markerPosition={adminLocation} markerName="Admin" markerColor="red" />
      <MarkerWrapper markerPosition={clientLocation} markerName="Client" markerColor="green" />
      {isInitLocation && route.length > 0 && <Polyline positions={route} color="black" />}
    </MapContainer>
  )
}
export default Map;
