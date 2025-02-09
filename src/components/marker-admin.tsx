import { LatLngExpression } from 'leaflet';
import React, { useEffect } from 'react';
import { Marker, Popup, useMapEvents } from "react-leaflet";

type MarkerProps = {
  markerPosition: LatLngExpression
  markerName: string
};

const MarkerAdmin: React.FC<MarkerProps> = (props: MarkerProps) => {
  const map = useMapEvents({});

  useEffect(() => {
    map.flyTo(props.markerPosition)
  }, [props.markerPosition])

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

export default MarkerAdmin;
