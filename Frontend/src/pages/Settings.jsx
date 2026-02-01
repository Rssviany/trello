import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/UserSlice";

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = { ...user, name, phone };
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col md:flex-row">

      <aside className="w-full md:w-64 bg-[#fafbfc] border-r border-[#dfe1e6] px-4 py-5">
        <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          Workspace
        </h2>

        <nav className="flex flex-col gap-1">
          <SidebarItem label="Home" icon="🏠" onClick={() => navigate("/")} />
          <SidebarItem label="Dashboard" icon="📋" onClick={() => navigate("/dashboard")} />
          <SidebarItem label="Settings" icon="⚙️" active />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-8">


        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded-md bg-white border border-[#dfe1e6] hover:bg-gray-100 transition"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Account settings
          </h1>
        </div>

        <div className="max-w-2xl bg-white rounded-lg border border-[#dfe1e6] p-6 shadow-sm">

          <h3 className="text-sm font-semibold text-gray-600 mb-4">
            Personal information
          </h3>

          <Field
            label="Full name"
            value={name}
            disabled={!editing}
            onChange={setName}
          />

          <Field
            label="Email"
            value={user?.email || ""}
            disabled
            helper="Email address can’t be changed"
          />

          <Field
            label="Phone number"
            value={phone}
            disabled={!editing}
            onChange={setPhone}
          />

          <div className="flex justify-end gap-2 mt-6">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Settings;


function SidebarItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm transition
        ${active
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-gray-700 hover:bg-[#e4e6ea]"
        }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-r
          ${active ? "bg-blue-600" : "bg-transparent group-hover:bg-blue-300"}`}
      />
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Field({ label, value, disabled, onChange, helper }) {
  return (
    <div className="mb-5">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`mt-1 w-full rounded-md px-3 py-2 text-sm border transition
          ${disabled
            ? "bg-[#f4f5f7] border-[#dfe1e6] text-gray-500"
            : "bg-white border-blue-400 focus:ring-2 focus:ring-blue-400"
          }`}
      />
      {helper && (
        <p className="text-xs text-gray-400 mt-1">{helper}</p>
      )}
    </div>
  );
}


