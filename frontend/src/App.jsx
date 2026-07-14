import React, { useEffect, useState } from "react";
// GANTI: BrowserRouter diubah menjadi HashRouter kawan!
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Materi from "./components/Materi";
import Game from "./components/Game";

function LandscapeOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches || window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    const lockLandscape = async () => {
      if (window.screen?.orientation?.lock) {
        try {
          await window.screen.orientation.lock("landscape");
        } catch (error) {
          // Lock may fail on some browsers or without fullscreen permission.
        }
      }
    };

    lockLandscape();

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6 text-center text-white">
      <div className="max-w-md rounded-3xl border border-white/20 bg-slate-900/95 p-6 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Putar perangkat ke landscape</h1>
        <p className="mt-3 text-sm sm:text-base text-slate-200">
          Untuk pengalaman terbaik di tampilan mobile, silakan gunakan orientasi landscape.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    // GANTI: <BrowserRouter> diganti menjadi <HashRouter>
    <HashRouter>
      <LandscapeOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </HashRouter>
  );
}