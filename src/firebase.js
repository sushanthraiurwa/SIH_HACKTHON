// src/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyBhAqxlXQ9mohs4uw9SYcC1U_mBOpKIbpQ",
  authDomain: "sih-prototype-4e6cf.firebaseapp.com",
  projectId: "sih-prototype-4e6cf",
  storageBucket: "sih-prototype-4e6cf.firebasestorage.app",
  messagingSenderId: "387337422062",
  appId: "1:387337422062:web:82755a1576345cf6571fff",
  measurementId: "G-5M29MX02L1"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// --- Register Service Worker for FCM (required for notifications) ---
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      console.log("Service Worker registered for FCM:", reg);
    } catch (err) {
      console.error("Service Worker registration failed:", err);
    }
  }
};

// --- Subscribe user for notifications ---
export const subscribeUser = async () => {
  try {
    await registerServiceWorker();
    const token = await getToken(messaging, {
      vapidKey: "BNa_VUjSsW3WuQzqJ0qxtKMJ1UGiqaF0byQQhoV1BodSehxg2dM2zlSvlLSB3AtSbgSymibhutQ0b0jK25LNLeo",
      serviceWorkerRegistration: window.navigator.serviceWorker.ready ? await window.navigator.serviceWorker.ready : undefined
    });
    console.log("Generated FCM token:", token);
    if (token) {
      const response = await fetch("https://backend-production-e17f.up.railway.app/register-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      if (response.ok) {
        console.log("Token sent to backend successfully!");
        return true;
      } else {
        console.error("Failed to send token to backend:", response.status);
        return false;
      }
    } else {
      console.error("No FCM token generated.");
      return false;
    }
  } catch (err) {
    console.error("Error subscribing user:", err);
    return false;
  }
};

// --- Trigger custom alert from admin ---
export const triggerCustomAlert = async (disaster, message) => {
  try {
    console.log("triggerCustomAlert called", disaster, message);
    const response = await fetch("https://backend-production-e17f.up.railway.app/trigger-alert", {
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