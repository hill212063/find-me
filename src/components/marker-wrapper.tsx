import { LatLngExpression } from 'leaflet';
import React from 'react';
import { Marker, Popup } from "react-leaflet";

type MarkerProps = {
  markerPosition: LatLngExpression
  markerName: string
};

const MarkerWrapper: React.FC<MarkerProps> = (props: MarkerProps) => {

  return (
    <div>
      <Marker position={props.markerPosition}>
        <Popup>
          {props.markerName}
        </Popup>
      </Marker>
    </div>
  );
}

export default MarkerWrapper;
