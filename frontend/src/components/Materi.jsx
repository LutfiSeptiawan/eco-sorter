import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TAHAPAN_MATERI = [
  {
    id: 'pembuka',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-bold text-center space-y-2 px-4">
        <p className="text-[clamp(13px,2.4vw,20px)] font-black text-amber-950 leading-tight">Halo Kawan... </p>
        <p className="text-[clamp(11px,1.6vw,15px)] font-extrabold leading-snug text-slate-700">
          Buang sampah itu harus sesuai kategorinya ya!
        </p>
        <p className="text-[clamp(11px,1.6vw,15px)] font-extrabold leading-snug text-slate-700">
          Yuk, kita belajar memilah antara <span className="text-green-600 font-black">Sampah Organik</span>, <span className="text-red-600 font-black">Sampah Anorganik</span>, dan <span className="text-yellow-600 font-black">Sampah B3</span>.
        </p>
      </div>
    )
  },
  {
    id: 'organik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-4 flex flex-col justify-center">
        <h3 className="text-[clamp(12px,2vw,18px)] font-black text-green-700 mb-1 leading-tight">🌿 SAMPAH ORGANIK</h3>
        <p className="text-[clamp(10px,1.4vw,14px)] font-bold text-slate-700 leading-snug">
          Sampah yang mudah terurai oleh makhluk hidup/pembusukan alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(10px,1.4vw,14px)] text-slate-600 font-bold pl-1">
          <li>Sisa makanan, sayur, dan buah.</li>
          <li>Daun kering dan ranting.</li>
          <li>Kotoran sisa hewan.</li>
        </ul>
        <div className="mt-2 bg-green-100 border border-green-300 px-3 py-1.5 rounded-lg text-[clamp(9.5px,1.3vw,13px)] text-green-800 font-black leading-snug">
          ♻️Manfaat: Dapat diolah menjadi pupuk kompos.
        </div>
      </div>
    )
  },
  {
    id: 'anorganik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-4 flex flex-col justify-center">
        <h3 className="text-[clamp(12px,2vw,18px)] font-black text-red-600 mb-1 leading-tight">🥤 SAMPAH ANORGANIK</h3>
        <p className="text-[clamp(10px,1.4vw,14px)] font-bold text-slate-700 leading-snug">
          Sampah buaman manusia yang sangat sulit membusuk secara alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(10px,1.4vw,14px)] text-slate-600 font-bold pl-1">
          <li>Plastik, styrofoam, dan sedotan.</li>
          <li>Kaleng minuman dan botol logam bekas.</li>
          <li>Kaca, botol, dan keramik.</li>
        </ul>
        <div className="mt-2 bg-red-100 border border-red-300 px-3 py-1.5 rounded-lg text-[clamp(9.5px,1.3vw,13px)] text-red-800 font-black leading-snug">
          ⏰ Fakta: Plastik membutuhkan 100 tahun hancur untuk terurai!
        </div>
      </div>
    )
  },
  {
    id: 'b3',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-4 flex flex-col justify-center">
        <h3 className="text-[clamp(12px,2vw,18px)] font-black text-yellow-600 mb-1 leading-tight">⚠️ LIMBAH B3</h3>
        <p className="text-[clamp(10px,1.4vw,14px)] font-bold text-slate-700 leading-snug">
          Sisa bahan berbahaya yang mengandung racun kimia aktif. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(10px,1.4vw,14px)] text-slate-600 font-bold pl-1">
          <li>Baterai bekas dan kabel elektronik.</li>
          <li>Lampu neon dan bohlam.</li>
          <li>Kemasan detergen dan obat serangga.</li>
        </ul>
        <div className="mt-2 bg-yellow-100 border border-yellow-300 px-3 py-1.5 rounded-lg text-[clamp(9.5px,1.3vw,13px)] text-amber-800 font-black leading-snug">
          💀 Bahaya: Dapat menyebabkan keracunan dan pencemaran air tanah jika dibuang sembarangan.
        </div>
      </div>
    )
  }
];

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

  if (isChecking) {
    return null;
  }

  return (
    // Pembungkus terluar hitam agar area aspect-video terpusat dengan aman
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans select-none flex items-center justify-center p-2 sm:p-4">
      
      {/* 
        MENGUNCI CANVAS UTAMA KE RASIO 16:9 
        Menjamin seluruh elemen (Karakter, Papan, Tombol Navigasi) posisinya mutlak & konsisten di semua layar.
      */}
      <div className="relative aspect-video max-h-full w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-slate-900">
        
        {/* Background Latar */}
        <img
          src="/assets/materi/BGgHome.jpg"
          alt="Latar Taman"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Tombol Musik + Home Kanan Atas */}
        <div className="absolute top-3 right-3 z-50 flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className="hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
          >
            <img
              src={isMusicPlaying ? '/assets/materi/TbMusik.png' : '/assets/materi/TbMusik_Mati.png'}
              alt={isMusicPlaying ? 'Musik' : 'Musik Mati'}
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain"
            />
          </button>

          <button
            onClick={() => navigate('/')}
            className="hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
          >
            <img
              src="/assets/materi/TbHome.png"
              alt="Ke Halaman Utama"
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain"
            />
          </button>
        </div>

        {/* Kontainer Utama Konten Tengah (Mengatur ruang aman layout) */}
        <div className="absolute inset-x-0 top-[12%] bottom-[16%] flex items-end justify-between px-[5%] md:px-[8%] z-10 gap-4">

          {/* Gambar Orang Kiri */}
          <div className="relative w-[25%] h-full flex items-end justify-center flex-shrink-0">
            <motion.img
              src="/assets/materi/Orang.png"
              alt="Karakter Orang"
              className="w-full h-auto object-contain max-h-[95%]"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Kotak Kontainer Papan Kanan */}
          <div className="relative flex-1 h-full max-w-[68%] flex items-center justify-center">
            {/* Menggunakan object-contain agar papan kayu proporsional dan tidak gepeng */}
            <img
              src="/assets/materi/Papan.png"
              alt="Papan Informasi"
              className="absolute inset-0 w-full h-full object-contain z-0 drop-shadow-xl"
            />

            {/* Teks Materi Pembelajaran (Padding menggunakan persen agar presisi di tengah papan kayu) */}
            <div className="relative z-10 w-full h-full pt-[10%] pb-[14%] px-[8%] flex flex-col justify-center overflow-y-auto overflow-x-hidden overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.15 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {currentStep.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>

        {/* Tombol Kembali dan Lanjut (Diposisikan di area kaki papan bawah) */}
        <div className="absolute bottom-[3%] inset-x-0 z-30 flex items-center justify-center gap-[15%] px-6">
          <div className="w-[120px] sm:w-[150px] flex justify-center">
            {!isFirstStep && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="w-full py-1.5 sm:py-2 rounded-full text-[clamp(11px,1.3vw,15px)] font-black text-white uppercase tracking-wider shadow-md border border-black/10 bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_3px_0_rgb(159,18,57)] flex items-center justify-center"
              >
                Kembali
              </motion.button>
            )}
          </div>

          <div className="w-[120px] sm:w-[150px] flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={`w-full py-1.5 sm:py-2 rounded-full text-[clamp(11px,1.3vw,15px)] font-black text-white uppercase tracking-wider shadow-md border border-black/10 flex items-center justify-center
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

      {/* Audio Materi */}
      <audio id="materi-bgm">
        <source src="/assets/audio/explainer-corporate.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};

export default Materi;