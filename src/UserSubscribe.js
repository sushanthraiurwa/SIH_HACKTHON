import React, { useState } from "react";
import { subscribeUser } from './firebase';

export default function UserSubscribe() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const success = await subscribeUser();
    setSubscribed(success);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Disaster Alerts Subscription</h2>
      <p>Scan QR, allow notifications to receive emergency alerts.</p>
      <button
        style={{ fontSize: "1.2rem", padding: "12px 32px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: "8px" }}
        onClick={handleSubscribe}
        disabled={subscribed}
      >
        {subscribed ? "Subscribed!" : "Allow Notifications"}
      </button>
      {subscribed && <p style={{ color: "#388e3c", marginTop: "20px" }}>You will receive alerts!</p>}
    </div>
  );
}