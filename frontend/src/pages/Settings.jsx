// src/pages/Settings.jsx
import { useEffect, useState } from "react";

export default function Settings() {
  // Profile details
  const [profile, setProfile] = useState({
    name: "Kasun Lakshan",
    rank: "Sergeant",
    serial: "POL-1023",
    phone: "+94 71 123 4567",
    email: "kasunlakshan2001@gmail.com",
    station: "Kandy Division",
  });

  // Password fields
  const [password, setPassword] = useState({
    old: "",
    newPass: "",
    confirm: "",
  });

  // Load stored profile
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData"));
    if (stored) setProfile((prev) => ({ ...prev, ...stored }));
  }, []);

  // Save profile
  const handleProfileSave = () => {
    localStorage.setItem("userData", JSON.stringify(profile));
    alert("✅ Profile updated successfully!");
  };

  // Handle password change (mock only)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.newPass !== password.confirm) {
      alert("❌ Passwords do not match!");
      return;
    }
    alert("✅ Password changed successfully!");
    setPassword({ old: "", newPass: "", confirm: "" });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100 text-gray-900">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Settings
      </h2>

      {/* 🧑‍✈️ Edit Profile */}
      <Section title="Edit Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <InputField
            label="Rank"
            value={profile.rank}
            onChange={(e) => setProfile({ ...profile, rank: e.target.value })}
          />
          <InputField
            label="Officer Serial No"
            value={profile.serial}
            onChange={(e) => setProfile({ ...profile, serial: e.target.value })}
          />
          <InputField
            label="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
          <InputField
            label="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <InputField
            label="Station / Division"
            value={profile.station}
            onChange={(e) => setProfile({ ...profile, station: e.target.value })}
          />
        </div>
        <button
          onClick={handleProfileSave}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </Section>

      {/* 🔒 Change Password */}
      <Section title="Change Password">
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <InputField
            label="Old Password"
            type="password"
            value={password.old}
            onChange={(e) => setPassword({ ...password, old: e.target.value })}
          />
          <InputField
            label="New Password"
            type="password"
            value={password.newPass}
            onChange={(e) =>
              setPassword({ ...password, newPass: e.target.value })
            }
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
          />

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Change Password
          </button>
        </form>
      </Section>

      {/* ⚙️ Preferences */}
      <Section title="Preferences">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800">Theme</span>
          <p className="text-gray-600 italic">Light Mode (default)</p>
        </div>
      </Section>
    </div>
  );
}

// 🧱 Section Wrapper
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-200 pb-2 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

// 🧱 Reusable Input Component
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
}
