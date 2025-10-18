// src/pages/Profile.jsx
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Kasun Lakshan",
    rank: "Sergeant",
    serial: "POL-1023",
    badge: "10452",
    phone: "+94 71 123 4567",
    email: "kasunlakshan2001@gmail.com",
    station: "Kandy Division",
    joinedDate: "2023-05-10",
    totalReports: 24,
    photo: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser((prev) => ({
        ...prev,
        name: storedUser.name || prev.name,
        email: storedUser.email || prev.email,
        phone: storedUser.phone || prev.phone,
        photo: storedUser.photo || prev.photo,
      }));
    }
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100">
      {/* Header */}
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Officer Profile
      </h2>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Profile Photo */}
        <img
          src={user.photo}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
        />

        {/* Officer Identity Section */}
        <Section title="Officer Identity">
          <Detail label="Name" value={user.name} />
          <Detail label="Rank" value={user.rank} />
          <Detail label="Officer Serial No" value={user.serial} />
          <Detail label="Badge No" value={user.badge} />
        </Section>

        {/* Contact & Work Info Section */}
        <Section title="Contact & Work Info">
          <Detail label="Phone" value={user.phone} />
          <Detail label="Email" value={user.email} />
          <Detail label="Station / Division" value={user.station} />
        </Section>

        {/* System Info Section */}
        <Section title="System Info">
          <Detail label="Joined Date" value={user.joinedDate} />
          <Detail label="Total Reports Submitted" value={user.totalReports} />
        </Section>
      </div>
    </div>
  );
}

// ✅ Reusable section component with title
function Section({ title, children }) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-200 pb-1 mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ✅ Reusable detail line
function Detail({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <span className="font-semibold text-gray-700 w-52">{label} :</span>
      <span className="text-gray-800 break-words">{value}</span>
    </div>
  );
}
