import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '50%', left: '80%' }); // Posisi awal di kanan
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonClicks, setNoButtonClicks] = useState(0);

  // Fungsi untuk generate posisi random
  const getRandomPosition = useCallback(() => {
    let newTop = Math.random() * 80 + 15; // antara 15% - 95%
    let newLeft = Math.random() * 80 + 15; // antara 15% - 95%

    return {
      top: `${newTop}%`,
      left: `${newLeft}%`
    };
  }, []);

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    setNoButtonClicks(prev => prev + 1);
    setYesButtonSize(prev => prev + 0.1);

    const newPosition = getRandomPosition();
    setNoButtonPosition(newPosition);
  };

  const handleNoHover = () => {
    if (noButtonClicks < 8) {
      const newPosition = getRandomPosition();
      setNoButtonPosition(newPosition);
      setYesButtonSize(prev => prev + 0.1);
    }
  };

  const handleReset = () => {
    setNoButtonPosition({ top: '50%', left: '80%' }); // Kembali ke posisi awal di kanan
    setYesButtonSize(1);
    setShowSuccess(false);
    setNoButtonClicks(0);
  };

  const getNoButtonMessage = () => {
    if (noButtonClicks === 0) return "Tidak";
    if (noButtonClicks === 1) return "Yakin?";
    if (noButtonClicks === 2) return "Masa sih?";
    if (noButtonClicks === 3) return "Coba lagi!";
    if (noButtonClicks === 4) return "Jangan keras kepala 😅";
    if (noButtonClicks === 5) return "Masih aja...";
    if (noButtonClicks === 6) return "Gabakal bisa!";
    if (noButtonClicks === 7) return "Nyerah aja deh";
    if (noButtonClicks >= 8) return "OKE IYA DEH! 😘";
    return "Tidak";
  };

  const [floatingHearts] = useState(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: i * 0.3
    }))
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6 animate-bounce">🥰❤️</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Yeay! Aku juga sayang kamu! ❤️
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Sekarang kita resmi pacaran! 🥳
          </p>
          <div className="space-y-4">
            <p className="text-pink-500 text-xl animate-pulse">💕 I love you 3000! 💕</p>
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all hover:scale-105 shadow-lg"
            >
              Mulai Lagi 🌟
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-purple-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite]"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite_2s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_7s_infinite_4s]"></div>
      </div>

      {/* Main content */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl border-4 border-pink-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ❤️ Will You Be My Valentine? ❤️
          </h1>
          <p className="text-xl text-gray-600">Aku suka banget sama kamu...</p>
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-3xl animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                {i < 3 ? '❤️' : '💕'}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-75 w-full">
          {/* Container dengan posisi relative untuk kedua tombol */}
          <div className="absolute inset-0">
            {/* Tombol NO yang kabur - di bawah (z-index rendah) */}
            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              style={{
                position: 'absolute',
                top: noButtonPosition.top,
                left: noButtonPosition.left,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.2s ease'
              }}
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-xl whitespace-nowrap cursor-pointer relative z-0"
            >
              {getNoButtonMessage()}
            </button>

            {/* Tombol YES di tengah - di atas (z-index tinggi) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={handleYesClick}
                style={{
                  transform: `scale(${yesButtonSize})`,
                  transition: 'transform 0.3s ease'
                }}
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full shadow-2xl border-4 border-white cursor-pointer whitespace-nowrap relative z-10 hover:z-20"
              >
                IYA ❤️
              </button>
            </div>
          </div>
        </div>

        {/* Petunjuk lucu */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-500 text-sm">
            💡 Tips: Tombol "Tidak" suka kabur!
          </p>
          {noButtonClicks >= 3 && (
            <p className="text-pink-500 font-semibold animate-pulse">
              Makin lama tombol "IYA" makin gede lho! 😘
            </p>
          )}
        </div>

        {/* Progress bar lucu */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Keras kepala</span>
            <span>Menyerah</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(noButtonClicks * 12, 100)}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-gray-400 mt-1">
            {Math.min(noButtonClicks * 12, 100)}% menuju keputusan tepat
          </p>
        </div>
      </div>

      {/* Animasi hati jatuh */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-[float_4s_linear_infinite]"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              bottom: '-20px'
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;