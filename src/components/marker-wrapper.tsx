"use client";

import L, { LatLngExpression } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";

type MarkerProps = {
  markerPosition: LatLngExpression
  markerName: string
  markerColor: string
};

const MarkerWrapper: React.FC<MarkerProps> = (props: MarkerProps) => {

  const icon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-" + props.markerColor + ".png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div>
      <Marker position={props.markerPosition} icon={icon}>
        <Popup>
          {props.markerName}
        </Popup>
      </Marker>
    </div>
  );
}

export default MarkerWrapper;
