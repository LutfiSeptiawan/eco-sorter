import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TAHAPAN_MATERI = [
  {
    id: 'pembuka',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-bold text-center space-y-2 sm:space-y-3 px-1 sm:px-4 md:px-6">
        <p className="text-sm sm:text-xl md:text-2xl font-black text-amber-950">Halo Kawan... </p>
        <p className="text-[10px] sm:text-sm md:text-base font-extrabold leading-relaxed text-slate-700">
          Buang sampah itu harus sesuai kategorinya ya!
        </p>
        <p className="text-[10px] sm:text-sm md:text-base font-extrabold leading-relaxed text-slate-700">
          Yuk, kita belajar memilah antara <span className="text-green-600 font-black">Sampah Organik</span>, <span className="text-red-600 font-black">Sampah Anorganik</span>, dan <span className="text-yellow-600 font-black">Sampah B3</span>.
        </p>
      </div>
    )
  },
  {
    id: 'organik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-4 md:px-6 min-h-0 flex flex-col justify-center py-1 sm:py-2">
        <h3 className="text-sm sm:text-lg md:text-xl font-black text-green-700 mb-1">🌿 SAMPAH ORGANIK</h3>
        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
          Sampah yang mudah terurai oleh makhluk hidup/pembusukan alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-[10px] sm:text-xs md:text-sm text-slate-600 font-bold pl-1">
          <li>Sisa makanan, sayur, dan buah.</li>
          <li>Daun kering dan ranting.</li>
          <li>Kotoran sisa hewan.</li>
        </ul>
        <div className="mt-1.5 bg-green-100 border border-green-300 px-2 py-1 rounded-lg text-[9px] sm:text-xs text-green-800 font-black leading-relaxed">
          ♻️Manfaat: Dapat diolah menjadi pupuk kompos.
        </div>
      </div>
    )
  },
  {
    id: 'anorganik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-4 md:px-6 min-h-0 flex flex-col justify-center py-1 sm:py-2">
        <h3 className="text-sm sm:text-lg md:text-xl font-black text-red-600 mb-1">🥤 SAMPAH ANORGANIK</h3>
        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
          Sampah buatan manusia yang sangat sulit membusuk secara alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-[10px] sm:text-xs md:text-sm text-slate-600 font-bold pl-1">
          <li>Plastik, styrofoam, dan sedotan.</li>
          <li>Kaleng minuman dan botol logam bekas.</li>
          <li>Kaca, botol, dan keramik.</li>
        </ul>
        <div className="mt-1.5 bg-red-100 border border-red-300 px-2 py-1 rounded-lg text-[9px] sm:text-xs text-red-800 font-black leading-relaxed">
          ⏰ Fakta: Plastik membutuhkan 100 tahun hancur untuk terurai!
        </div>
      </div>
    )
  },
  {
    id: 'b3',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-4 md:px-6 min-h-0 flex flex-col justify-center py-1 sm:py-2">
        <h3 className="text-sm sm:text-lg md:text-xl font-black text-yellow-600 mb-1">⚠️ LIMBAH B3</h3>
        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
          Sisa bahan berbahaya yang mengandung racun kimia aktif. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-[10px] sm:text-xs md:text-sm text-slate-600 font-bold pl-1">
          <li>Baterai bekas dan kabel elektronik.</li>
          <li>Lampu neon dan bohlam.</li>
          <li>Kemasan detergen dan obat serangga.</li>
        </ul>
        <div className="mt-1.5 bg-yellow-100 border border-yellow-300 px-2 py-1 rounded-lg text-[9px] sm:text-xs text-amber-800 font-black leading-relaxed">
          💀 Bahaya: Dapat menyebabkan keracunan dan pencemaran air tanah jika dibuang sembarangan.
        </div>
      </div>
    )
  }
];

const { AnimatePresence: AP } = { AnimatePresence };

const Materi = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('eco-music-muted') !== 'true';
  });
  const [isChecking, setIsChecking] = useState(true);
  const materiAudioRef = useRef(null);

  const stopExternalMateriAudio = () => {
    if (typeof window !== 'undefined' && window.__ecoMateriAutoAudio && window.__ecoMateriAutoAudio.__ecoSource !== 'materi') {
      window.__ecoMateriAutoAudio.pause();
      window.__ecoMateriAutoAudio.currentTime = 0;
      window.__ecoMateriAutoAudio = null;
    }
  };

  const handleNext = () => {
    if (step < TAHAPAN_MATERI.length - 1) {
      setStep(step + 1);
    } else {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('eco-allow-game', 'true');
      }
      navigate('/game');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const allowed = typeof window !== 'undefined' && sessionStorage.getItem('eco-allow-materi') === 'true';
    if (!allowed) {
      navigate('/', { replace: true });
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  const currentStep = TAHAPAN_MATERI[step];
  const isLastStep = step === TAHAPAN_MATERI.length - 1;
  const isFirstStep = step === 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const autoPlayFromHome = sessionStorage.getItem('eco-play-materi') === 'true';
    const isMuted = localStorage.getItem('eco-music-muted') === 'true';
    stopExternalMateriAudio();

    if (autoPlayFromHome) {
      sessionStorage.removeItem('eco-play-materi');
      if (!isMuted && window.__ecoMateriAutoAudio) {
        materiAudioRef.current = window.__ecoMateriAutoAudio;
        materiAudioRef.current.loop = true;
        if (materiAudioRef.current.paused) {
          materiAudioRef.current.play().catch(() => {});
        }
        setIsMusicPlaying(true);
        return;
      }
      if (!isMuted) {
        const audio = document.getElementById('materi-bgm');
        if (audio) {
          materiAudioRef.current = audio;
          audio.loop = true;
          audio.play().catch(() => {});
        }
        setIsMusicPlaying(true);
      }
    }
  }, []);

  useEffect(() => {
    const audioElement = materiAudioRef.current || window.__ecoMateriAutoAudio || document.getElementById('materi-bgm');
    materiAudioRef.current = audioElement;
    if (!audioElement) return;

    audioElement.loop = true;
    if (isMusicPlaying) {
      audioElement.play().catch(() => {});
    } else {
      audioElement.pause();
    }

    return () => {
      try {
        if (materiAudioRef.current) {
          materiAudioRef.current.pause();
          materiAudioRef.current.currentTime = 0;
        }
        if (typeof window !== 'undefined' && window.__ecoMateriAutoAudio && window.__ecoMateriAutoAudio.__ecoSource === 'materi') {
          window.__ecoMateriAutoAudio = null;
        }
      } catch (e) {}
    };
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    const audio = materiAudioRef.current || document.getElementById('materi-bgm');
    if (!audio) return;
    const nextPlaying = !isMusicPlaying;
    if (nextPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
      stopExternalMateriAudio();
    }
    setIsMusicPlaying(nextPlaying);
    localStorage.setItem('eco-music-muted', nextPlaying ? 'false' : 'true');
  };

  // Jika sedang cek akses, jangan render apapun
  if (isChecking) {
    return null;
  }

  return (
    <div className="relative w-screen h-screen h-dvh overflow-hidden bg-slate-900 font-sans select-none flex items-center justify-center">
      {/* Background Latar */}
      <img 
        src="/assets/materi/BGgHome.jpg" 
        alt="Latar Taman" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* Tombol Musik + Home Kanan Atas */}
      <div className="absolute top-2 right-2 z-50 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className="hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
        >
          <img
            src={isMusicPlaying ? '/assets/materi/TbMusik.png' : '/assets/materi/TbMusik_Mati.png'}
            alt={isMusicPlaying ? 'Musik' : 'Musik Mati'}
            className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain"
          />
        </button>

        <button
          onClick={() => navigate('/')}
          className="hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
        >
          <img
            src="/assets/materi/TbHome.png"
            alt="Ke Halaman Utama"
            className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain"
          />
        </button>
      </div>

      {/* Area Utama Konten Fleksibel */}
      <div className="relative z-10 w-full h-full max-w-4xl mx-auto flex items-center justify-center px-2 sm:px-4">
        
        {/* Gambar Orang Kiri */}
        <div className="w-[22%] sm:w-[25%] max-w-[180px] self-end mb-2 z-20">
          <motion.img 
            src="/assets/materi/Orang.png" 
            alt="Karakter Orang"
            className="w-full h-auto object-contain max-h-[75vh]"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Kotak Kontainer Papan Kanan */}
        <div className="relative w-[84%] sm:w-[72%] h-[70vh] sm:h-auto min-h-[60vh] sm:min-h-[70vh] max-h-[86vh] flex items-center justify-center mt-16 sm:mt-20">
          {/* Gambar Papan Kayu */}
          <img 
            src="/assets/materi/Papan.png" 
            alt="Papan Informasi" 
            className="absolute inset-0 w-full h-full object-fill z-0 drop-shadow-xl" 
          />

          {/* Teks Materi Pembelajaran Tengah Kayu */}
          <div className="relative z-10 w-full h-full -mt-2 sm:-mt-3 pb-12 px-2.5 sm:px-8 md:px-10 flex flex-col justify-start overflow-y-auto overflow-x-hidden overscroll-contain">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="w-full min-h-0 flex items-center justify-center px-1 sm:px-0"
              >
                {currentStep.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tombol Kembali dan Lanjut */}
          <div className="absolute bottom-2.5 left-4 right-4 sm:left-10 sm:right-10 z-30 flex items-center justify-between">
            {!isFirstStep && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-4 sm:px-6 py-1.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-black text-white uppercase tracking-wider shadow-md border border-black/10 bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_3px_0_rgb(159,18,57)]"
              >
                Kembali
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={`px-4 sm:px-6 py-1.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-black text-white uppercase tracking-wider shadow-md border border-black/10 ml-auto
                ${isLastStep 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 shadow-[0_3px_0_rgb(194,65,12)]' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_3px_0_rgb(29,78,216)]'
                }
              `}
            >
              {isLastStep ? 'Mulai!' : 'Lanjut'}
            </motion.button>
          </div>

        </div>
      </div>
      {/* Audio Materi (kontrol via tombol di pojok kanan) */}
      <audio id="materi-bgm">
        <source src="/assets/audio/explainer-corporate.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};

export default Materi;