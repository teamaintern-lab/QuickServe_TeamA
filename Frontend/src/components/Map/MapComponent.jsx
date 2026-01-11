import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- FIX MAP RESIZE ---------- */
function MapUpdater() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
}

/* ---------- MAIN MAP COMPONENT ---------- */
export default function MapComponent({
  locations = [],
  height = "350px",
  route = false,
  zoom = 13
}) {
  if (!locations.length) return null;

  const positions = locations.map(l => [
    l.latitude,
    l.longitude
  ]);

  const center = positions[0];

  return (
    <div style={{ height, width: "100%", borderRadius: "14px" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <MapUpdater />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* MARKERS */}
        {locations.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

        {/* ROUTE LINE */}
        {route && positions.length >= 2 && (
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#4f5dff",
              weight: 4,
              opacity: 0.85
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
