// src/pages/AddReport.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";
import Loader from "../components/Loader";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// 📍 Marker icon setup
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AddReport() {
  const [form, setForm] = useState({
    officerName: "",
    description: "",
    vehicleInfo: "",
    latitude: "",
    longitude: "",
    address: "",
  });
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [position, setPosition] = useState({
    lat: 7.8731, // Default (Sri Lanka)
    lng: 80.7718,
  });

  // ✅ Handle text inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Handle photo uploads
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setPhotos((prev) => (prev ? [...prev, ...newFiles] : newFiles));
  };

  // ✅ Remove selected photo
  const handleRemoveFile = (index) => {
    const updatedFiles = Array.from(photos).filter((_, i) => i !== index);
    setPhotos(updatedFiles);
  };

  // 🧭 Auto detect current device location (mobile/desktop)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setForm((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
        },
        (err) => {
          console.warn("Geolocation permission denied or failed:", err);
        }
      );
    } else {
      console.warn("Geolocation not supported in this browser.");
    }
  }, []);

  // ✅ Reverse geocode to get address when coordinates change
  useEffect(() => {
    const fetchAddress = async () => {
      if (!form.latitude || !form.longitude) return;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${form.latitude}&lon=${form.longitude}`
        );
        if (res.data?.display_name) {
          setForm((prev) => ({ ...prev, address: res.data.display_name }));
        }
      } catch (err) {
        console.error("Failed to fetch address:", err);
      }
    };
    fetchAddress();
  }, [form.latitude, form.longitude]);

  // ✅ Map marker click
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        setForm((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        }));
      },
    });
    return <Marker position={position} icon={markerIcon} />;
  }

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ visible: false, message: "", type: "" });

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (photos) Array.from(photos).forEach((p) => formData.append("photos", p));

      await axios.post("http://localhost:5000/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({
        visible: true,
        message: "✅ Report submitted successfully!",
        type: "success",
      });
      setForm({
        officerName: "",
        description: "",
        vehicleInfo: "",
        latitude: "",
        longitude: "",
        address: "",
      });
      setPhotos(null);
    } catch (err) {
      console.error(err);
      setToast({
        visible: true,
        message: "❌ Failed to submit report.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ visible: false, message: "", type: "" }), 2500);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6 border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Add New Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        {["officerName", "description", "vehicleInfo"].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 text-gray-700">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required={["officerName", "description"].includes(field)}
            />
          </div>
        ))}

        {/* Map Picker */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Location
          </label>

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
            📍 Tap anywhere on the map to change the location. Your current
            position will load automatically (with permission).
          </p>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              type="text"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="border border-gray-300 rounded-lg p-2.5 w-full"
              required
            />
            <input
              type="text"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="border border-gray-300 rounded-lg p-2.5 w-full"
              required
            />
          </div>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address (auto or manual)"
            className="border border-gray-300 rounded-lg p-2.5 w-full mt-3"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Photos</label>
          <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <span className="text-blue-600 font-medium">📷 Choose Photos</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {photos && photos.length > 0 && (
            <div className="mt-4">
              <p className="font-medium text-sm mb-2 text-gray-700">
                Selected Files ({photos.length}):
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {Array.from(photos).map((file, index) => {
                  const imageURL = URL.createObjectURL(file);
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={imageURL}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-md border border-gray-200"
                      />
                      <p className="text-xs text-center mt-1 truncate text-gray-600">
                        {file.name}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-full w-full transition transform hover:scale-[1.02]"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      <ToastMessage
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
      />
    </div>
  );
}
