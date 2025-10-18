import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapPicker({ form, setForm }) {
  const [position, setPosition] = useState({
    lat: parseFloat(form.latitude) || 7.8731, // Default: Sri Lanka center
    lng: parseFloat(form.longitude) || 80.7718,
  });

  // Reverse geocode whenever position changes
  useEffect(() => {
    if (!position.lat || !position.lng) return;
    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
        );
        setForm((prev) => ({
          ...prev,
          address: res.data.display_name || "",
          latitude: position.lat.toFixed(6),
          longitude: position.lng.toFixed(6),
        }));
      } catch {
        console.error("Failed to fetch address");
      }
    };
    fetchAddress();
  }, [position, setForm]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return <Marker position={position} icon={markerIcon}></Marker>;
  }

  return (
    <div className="mt-3">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <p className="text-sm text-gray-600 mt-2">
        📍 Click on the map to select a location
      </p>
    </div>
  );
}
