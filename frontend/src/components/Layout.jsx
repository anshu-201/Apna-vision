import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatbotPlaceholder from "./ChatbotPlaceholder.jsx";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(1000px_500px_at_90%_10%,rgba(16,185,129,0.14),transparent_55%)]">
      <Navbar />
      <main className="container-app pb-16 pt-10 sm:pt-14">
        <Outlet />
      </main>
      <Footer />
      <ChatbotPlaceholder />
    </div>
  );
}

