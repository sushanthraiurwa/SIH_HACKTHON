export const triggerCustomAlert = async (disaster, message) => {
  try {
    console.log("triggerCustomAlert called", disaster, message);
    const response = await fetch("https://sih-hackthon-935y.onrender.com/trigger-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disaster, message })
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Alert sent to backend successfully!", data);
      if (data.success === 0) {
        alert("No notifications sent! Check device tokens or FCM settings.");
      }
      return data;
    } else {
      const errData = await response.json();
      console.error("Failed to send alert:", response.status, errData);
      alert("Failed to send alert: " + (errData.message || response.status));
      throw new Error("Failed to send alert: " + (errData.message || response.status));
    }
  } catch (err) {
    console.error("Error sending alert:", err);
    alert("Error sending alert: " + err.message);
    throw err;
  }
};