import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSubscribe from "./UserSubscribe";   // For user QR scan
import AdminDashboard from "./AdminDashboard"; // For admin to send alerts

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSubscribe />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}