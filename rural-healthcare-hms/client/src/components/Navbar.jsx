import React from 'react';

const Navbar = ({ onGoHome, onOpenLogin, onOpenAppointment, onOpenPharmacy }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0077b6] to-[#00b4d8] flex items-center justify-center text-white text-xl shadow-md transform group-hover:scale-105 transition">
            🏥
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#0b2545] tracking-tight leading-none group-hover:text-[#0077b6] transition">
              Amit Healthcare
            </h1>
            <p className="text-[10px] text-teal-600 font-bold mt-1 tracking-wider uppercase">LUCKNOW CENTRE</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onGoHome}
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#0077b6] font-semibold text-xs px-3 py-2 rounded-lg transition cursor-pointer"
          >
            🏠 Home
          </button>
          <button 
            onClick={onOpenAppointment}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-md shadow-teal-500/20 transition cursor-pointer"
          >
            Book OPD Token
          </button>
          <button 
            onClick={onOpenPharmacy}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            💊 Pharmacy Login
          </button>
          <button 
            onClick={onOpenLogin}
            className="border-2 border-[#0b2545] text-[#0b2545] hover:bg-[#0b2545] hover:text-white text-xs px-4 py-2 rounded-lg font-bold transition cursor-pointer"
          >
            👨‍⚕️ Doctor Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;