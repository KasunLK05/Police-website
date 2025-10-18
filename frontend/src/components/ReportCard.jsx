// src/components/ReportCard.jsx
import { MapPin, Car, User } from "lucide-react";

export default function ReportCard({ report }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {report.photos?.length > 0 && (
        <img
          src={report.photos[0]}
          alt="Report evidence"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
          <User size={18} /> {report.officerName}
        </h3>

        <p className="mt-2 text-gray-700">{report.description}</p>

        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <Car size={16} /> {report.vehicleInfo || "No vehicle info"}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {report.address || "No address provided"}
          </p>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Reported on {new Date(report.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
