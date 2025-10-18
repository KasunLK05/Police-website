// src/pages/ReportsList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "../components/ReportCard";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports");
        setReports(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <Loader />;

  if (!reports.length)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <p className="text-lg">No reports yet.</p>
        <p className="text-sm text-gray-400">Click “Add Report” to create one.</p>
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {reports.map((r) => (
        <div
          key={r._id}
          onClick={() => setSelectedReport(r)}
          className="cursor-pointer"
        >
          <ReportCard report={r} />
        </div>
      ))}

      {/* Modal for viewing details */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title="Report Details"
      >
        {selectedReport && (
          <div className="space-y-2">
            <p>
              <strong>Officer:</strong> {selectedReport.officerName}
            </p>
            <p>
              <strong>Description:</strong> {selectedReport.description}
            </p>
            <p>
              <strong>Vehicle Info:</strong> {selectedReport.vehicleInfo}
            </p>
            <p>
              <strong>Address:</strong> {selectedReport.address}
            </p>
            <p>
              <strong>Location:</strong> {selectedReport.latitude},{" "}
              {selectedReport.longitude}
            </p>
            {selectedReport.photos?.length > 0 && (
              <div>
                <strong>Photos:</strong>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedReport.photos.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      alt={`photo-${i}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
