import React, { useState } from "react";
import { triggerCustomAlert } from './firebase';

const disasterOptions = [
  "Flood", "Earthquake", "Cyclone", "Fire", "Other"
];

export default function AdminDashboard() {
  const [disaster, setDisaster] = useState(disasterOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSendAlert = async () => {
  setStatus("Sending...");
  try {
    console.log("Calling triggerCustomAlert with:", disaster, message);
    await triggerCustomAlert(disaster, message);
    setStatus("Alert sent!");
  } catch (err) {
    setStatus("Failed to send alert.");
    console.error("Send Alert error:", err);
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", background: "#fff" }}>
      <h2 style={{ color: "#d32f2f" }}>Send Disaster Alert</h2>
      <label>
        Disaster Type:
        <select value={disaster} onChange={e => setDisaster(e.target.value)} style={{ width: "100%", margin: "8px 0", padding: "8px" }}>
          {disasterOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      </label>
      <label>
        Alert Message:
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          style={{ width: "100%", margin: "8px 0", padding: "8px", borderRadius: "6px", border: "1px solid #eee" }}
          placeholder="Type your emergency message here..."
        />
      </label>
      <button
        style={{ width: "100%", background: "#1976d2", color: "#fff", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1.1rem" }}
        onClick={handleSendAlert}
      >
        Send Alert
      </button>
      {status && <div style={{ color: "#388e3c", marginTop: "16px" }}>{status}</div>}
    </div>
  );
}