import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
const messaging = getMessaging(app);

export const subscribeUser = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BNa_VUjSsW3WuQzqJ0qxtKMJ1UGiqaF0byQQhoV1BodSehxg2dM2zlSvlLSB3AtSbgSymibhutQ0b0jK25LNLeo" });
    if (token) {
      await fetch("http://localhost:5000/register-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const triggerCustomAlert = async (disaster, message) => {
  await fetch("http://localhost:5000/trigger-alert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disaster, message })
  });
};