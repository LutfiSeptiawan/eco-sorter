import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Game component - hanya bisa diakses setelah menyelesaikan materi
const Game = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const allowed = typeof window !== 'undefined' && sessionStorage.getItem('eco-allow-game') === 'true';
    if (!allowed) {
      navigate('/', { replace: true });
    } else {
      setIsChecking(false);
      sessionStorage.removeItem('eco-allow-game');
    }
  }, [navigate]);

  // Jika sedang cek akses, jangan render apapun
  if (isChecking) {
    return null;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center font-sans">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">🎮 Game akan segera datang!</h1>
        <p className="text-xl sm:text-2xl text-blue-100 mb-8">Anda telah menyelesaikan materi pembelajaran.</p>
        <p className="text-lg text-blue-50 mb-12">Terima kasih sudah belajar tentang penggolongan sampah!</p>
        
        <button
          onClick={() => {
            sessionStorage.removeItem('eco-allow-game');
            navigate('/', { replace: true });
          }}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-bold text-lg sm:text-xl shadow-lg transition-all touch-manipulation"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Game;
