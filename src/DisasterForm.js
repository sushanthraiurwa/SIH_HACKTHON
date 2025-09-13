import React, { useState } from "react";

const disasterOptions = [
  { value: "Flood", label: "🌊 Flood" },
  { value: "Earthquake", label: "🌎 Earthquake" },
  { value: "Cyclone", label: "🌀 Cyclone" },
  { value: "Fire", label: "🔥 Fire" },
  { value: "Other", label: "❗ Other" }
];

export default function DisasterForm({ onSubmit }) {
  const [disaster, setDisaster] = useState(disasterOptions[0].value);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ disaster, message });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        maxWidth: "400px",
        margin: "auto"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#d32f2f" }}>
        Disaster Alert Subscription
      </h2>
      <label style={{ fontWeight: "bold" }}>
        Select Disaster Type:
        <select
          value={disaster}
          onChange={e => setDisaster(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "8px", marginBottom: "16px", borderRadius: "6px", border: "1px solid #eee" }}
        >
          {disasterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label style={{ fontWeight: "bold" }}>
        Message to Deliver:
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your emergency message here..."
          required
          rows={4}
          style={{ width: "100%", padding: "8px", marginTop: "8px", borderRadius: "6px", border: "1px solid #eee", resize: "vertical" }}
        />
      </label>
      <button
        type="submit"
        style={{
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "12px 0",
          width: "100%",
          fontWeight: "bold",
          fontSize: "1.1rem",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Subscribe & Receive Alerts
      </button>
    </form>
  );
}