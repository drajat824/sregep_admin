import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const ViewMaps = (props) => {
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  console.log(props?.center?.lat)

  return (
    <MapContainer
      style={{ width: "100%", height: "50vh" }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[51.505, -0.09]}>
        <Popup>Lokasi siswa disini</Popup>
      </Marker>
    </MapContainer>
  );
};

const SelectMaps = ({ getLocation }) => {
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  const center = {
    lat: 51.505,
    lng: -0.09,
  }

  const [position, setPosition] = useState(center)

  const markerRef = useRef(null);

  useEffect(() => {
    getLocation(position)
  }, [position])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {

          const newPos = marker.getLatLng()
          setPosition(newPos);
          
        }
      },
    }),
    []
  );

  return (
    <MapContainer
      style={{ width: "100%", height: "50vh" }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        icon={customIcon}
        position={position}
        eventHandlers={eventHandlers}
        ref={markerRef}
      >
      </Marker>
    </MapContainer>
  );
};

export { ViewMaps, SelectMaps };
