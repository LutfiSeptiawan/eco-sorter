import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TAHAPAN_MATERI = [
  {
    id: 'pembuka',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-bold text-center space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2 px-1 sm:px-2 md:px-3 lg:px-4">
        <p className="text-[clamp(9px,2vw,15px)] font-black text-amber-950 leading-tight">Halo Kawan... </p>
        <p className="text-[clamp(7px,1.5vw,12px)] font-extrabold leading-snug text-slate-700">
          Buang sampah itu harus sesuai kategorinya ya!
        </p>
        <p className="text-[clamp(7px,1.5vw,12px)] font-extrabold leading-snug text-slate-700">
          Yuk, kita belajar memilah antara <span className="text-green-600 font-black">Sampah Organik</span>, <span className="text-red-600 font-black">Sampah Anorganik</span>, dan <span className="text-yellow-600 font-black">Sampah B3</span>.
        </p>
      </div>
    )
  },
  {
    id: 'organik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-2 md:px-3 lg:px-4 min-h-0 flex flex-col justify-center py-0.5 sm:py-0.75 md:py-1 lg:py-1">
        <h3 className="text-[clamp(8px,1.7vw,13px)] font-black text-green-700 mb-0.5 leading-tight">🌿 SAMPAH ORGANIK</h3>
        <p className="text-[clamp(7px,1.1vw,11px)] font-bold text-slate-700 leading-snug">
          Sampah yang mudah terurai oleh makhluk hidup/pembusukan alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(7px,1.1vw,11px)] text-slate-600 font-bold pl-1">
          <li>Sisa makanan, sayur, dan buah.</li>
          <li>Daun kering dan ranting.</li>
          <li>Kotoran sisa hewan.</li>
        </ul>
        <div className="mt-0.75 md:mt-1 lg:mt-1 bg-green-100 border border-green-300 px-1.5 sm:px-1.5 md:px-2 lg:px-2 py-0.5 sm:py-1 rounded-lg text-[clamp(6.5px,1vw,11px)] text-green-800 font-black leading-snug">
          ♻️Manfaat: Dapat diolah menjadi pupuk kompos.
        </div>
      </div>
    )
  },
  {
    id: 'anorganik',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-2 md:px-3 lg:px-4 min-h-0 flex flex-col justify-center py-0.5 sm:py-0.75 md:py-1 lg:py-1">
        <h3 className="text-[clamp(8px,1.7vw,13px)] font-black text-red-600 mb-0.5 leading-tight">🥤 SAMPAH ANORGANIK</h3>
        <p className="text-[clamp(7px,1.1vw,11px)] font-bold text-slate-700 leading-snug">
          Sampah buatan manusia yang sangat sulit membusuk secara alami. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(7px,1.1vw,11px)] text-slate-600 font-bold pl-1">
          <li>Plastik, styrofoam, dan sedotan.</li>
          <li>Kaleng minuman dan botol logam bekas.</li>
          <li>Kaca, botol, dan keramik.</li>
        </ul>
        <div className="mt-0.75 md:mt-1 lg:mt-1 bg-red-100 border border-red-300 px-1.5 sm:px-1.5 md:px-2 lg:px-2 py-0.5 sm:py-1 rounded-lg text-[clamp(6.5px,1vw,11px)] text-red-800 font-black leading-snug">
          ⏰ Fakta: Plastik membutuhkan 100 tahun hancur untuk terurai!
        </div>
      </div>
    )
  },
  {
    id: 'b3',
    content: (
      <div className="w-full max-w-full break-words text-slate-800 font-medium px-1 sm:px-2 md:px-3 lg:px-4 min-h-0 flex flex-col justify-center py-0.5 sm:py-0.75 md:py-1 lg:py-1">
        <h3 className="text-[clamp(8px,1.7vw,13px)] font-black text-yellow-600 mb-0.5 leading-tight">⚠️ LIMBAH B3</h3>
        <p className="text-[clamp(7px,1.1vw,11px)] font-bold text-slate-700 leading-snug">
          Sisa bahan berbahaya yang mengandung racun kimia aktif. Contohnya seperti:
        </p>
        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[clamp(7px,1.1vw,11px)] text-slate-600 font-bold pl-1">
          <li>Baterai bekas dan kabel elektronik.</li>
          <li>Lampu neon dan bohlam.</li>
          <li>Kemasan detergen dan obat serangga.</li>
        </ul>
        <div className="mt-0.75 md:mt-1 lg:mt-1 bg-yellow-100 border border-yellow-300 px-1.5 sm:px-1.5 md:px-2 lg:px-2 py-0.5 sm:py-1 rounded-lg text-[clamp(6.5px,1vw,11px)] text-amber-800 font-black leading-snug">
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
    <div className="relative w-full h-screen h-dvh overflow-hidden bg-slate-900 font-sans select-none flex items-center justify-center">
      {/* Background Latar */}
      <img
        src="/assets/materi/BGgHome.jpg"
        alt="Latar Taman"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Tombol Musik + Home Kanan Atas */}
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-50 flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleMusic}
          aria-label="Musik"
          className="min-w-11 min-h-11 flex items-center justify-center p-1 rounded-full hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
        >
          <img
            src={isMusicPlaying ? '/assets/materi/TbMusik.png' : '/assets/materi/TbMusik_Mati.png'}
            alt={isMusicPlaying ? 'Musik' : 'Musik Mati'}
            className="w-full h-full max-w-7 max-h-7 sm:max-w-11 sm:max-h-11 md:max-w-12 md:max-h-12 lg:max-w-14 lg:max-h-14 object-contain"
          />
        </button>

        <button
          onClick={() => navigate('/')}
          aria-label="Ke Halaman Utama"
          className="min-w-11 min-h-11 flex items-center justify-center p-1 rounded-full hover:scale-110 active:scale-95 transition-transform touch-manipulation focus:outline-none"
        >
          <img
            src="/assets/materi/TbHome.png"
            alt="Ke Halaman Utama"
            className="w-full h-full max-w-7 max-h-7 sm:max-w-11 sm:max-h-11 md:max-w-12 md:max-h-12 lg:max-w-14 lg:max-h-14 object-contain"
          />
        </button>
      </div>

      {/* Area Utama Konten Fleksibel */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex items-center justify-center px-2 sm:px-2 md:px-3 lg:px-4 gap-1 sm:gap-2">

        {/* Gambar Orang Kiri */}
        <div className="hidden sm:block w-[15%] md:w-[18%] lg:w-[20%] max-w-[200px] self-end mb-1 sm:mb-2 z-20 flex-shrink-0">
          <motion.img
            src="/assets/materi/Orang.png"
            alt="Karakter Orang"
            className="w-full h-auto object-contain max-h-[65vh] sm:max-h-[70vh]"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Kotak Kontainer Papan Kanan */}
        <div className="relative w-full sm:w-[75%] md:w-[70%] lg:w-[65%] max-w-[640px] sm:max-w-none xl:max-w-[900px] 2xl:max-w-[1000px] mx-auto h-auto min-h-[62vh] min-h-[62dvh] sm:min-h-[58vh] sm:min-h-[58dvh] md:min-h-[62vh] md:min-h-[62dvh] lg:min-h-[65vh] lg:min-h-[65dvh] max-h-[88dvh] sm:max-h-[85dvh] flex items-center justify-center sm:mt-6 md:mt-8 lg:mt-12">
          {/* Gambar Papan Kayu */}
          <img
            src="/assets/materi/Papan.png"
            alt="Papan Informasi"
            className="absolute inset-0 w-full h-full object-fill z-0 drop-shadow-xl"
          />

          {/* Teks Materi Pembelajaran Tengah Kayu */}
          {/* Posisi memakai persentase (bukan px tetap) agar teks selalu berada di area krem papan,
              tidak pernah menabrak bingkai kayu atau sudut sobek, baik di mobile maupun desktop. */}
          <div className="absolute z-10 inset-x-[10%] xs:inset-x-[9%] sm:inset-x-[9%] md:inset-x-[10%] lg:inset-x-[11%] top-[15%] sm:top-[14%] md:top-[13%] bottom-[27%] sm:bottom-[25%] md:bottom-[24%] flex flex-col justify-center overflow-y-auto overflow-x-hidden overscroll-contain">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="w-full min-h-0 flex items-center justify-center"
              >
                {currentStep.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tombol Kembali dan Lanjut */}
          <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-2.5 lg:bottom-3 left-2 right-2 sm:left-3 sm:right-3 md:left-3 md:right-3 lg:left-4 lg:right-4 z-30 flex items-center justify-between gap-1 sm:gap-2">
            {!isFirstStep && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="min-h-11 min-w-[64px] px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[clamp(9px,1.3vw,14px)] font-black text-white uppercase tracking-wider shadow-md border border-black/10 bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_2px_0_rgb(159,18,57)] sm:shadow-[0_3px_0_rgb(159,18,57)] flex-shrink-0 flex items-center justify-center"
              >
                Kembali
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={`min-h-11 min-w-[64px] px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[clamp(9px,1.3vw,14px)] font-black text-white uppercase tracking-wider shadow-md border border-black/10 ml-auto flex-shrink-0 flex items-center justify-center
                ${isLastStep
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 shadow-[0_2px_0_rgb(194,65,12)] sm:shadow-[0_3px_0_rgb(194,65,12)]'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_2px_0_rgb(29,78,216)] sm:shadow-[0_3px_0_rgb(29,78,216)]'
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