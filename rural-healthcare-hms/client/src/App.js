import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DoctorDashboard from './pages/DoctorDashboard';
import API from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('Specialities');

  const [appointments, setAppointments] = useState([
    { id: 1, tokenNumber: 1, phone: '9876543210', status: 'Waiting', symptoms: 'Fever & Severe Cold', time: '10:15 AM' },
    { id: 2, tokenNumber: 2, phone: '9123456789', status: 'Waiting', symptoms: 'Routine Chest Pain Checkup', time: '10:30 AM' }
  ]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', loginData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid Credentials! Check email and password.');
    }
  };

  const handleBookAppointment = () => {
    if (!mobileNumber) return alert('Enter a valid mobile number');
    if (!symptoms.trim()) return alert('Please enter your health problem / symptoms');
    
    const newTokenNumber = appointments.length + 1;
    const newAppointment = {
      id: Date.now(),
      tokenNumber: newTokenNumber,
      phone: mobileNumber,
      status: 'Waiting',
      symptoms: symptoms,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAppointments(prev => [...prev, newAppointment]);
    alert(`OPD Token Generated Successfully! Token Number: #${newTokenNumber}`);
    
    setMobileNumber('');
    setSymptoms('');
    setShowAppointment(false);
  };

  if (isLoggedIn) {
    return (
      <DoctorDashboard 
        appointments={appointments} 
        setAppointments={setAppointments} 
        onLogout={() => setIsLoggedIn(false)} 
      />
    );
  }

  const specialitiesList = [
    { name: 'GI Sciences', icon: '➕' },
    { name: 'Liver Transplant and Biliary Sciences', icon: '🫁' },
    { name: 'Renal Sciences', icon: '🩺' },
    { name: 'Cancer Care / Oncology', icon: '🏥' },
    { name: 'Neuroscience', icon: '🧠' },
    { name: 'Obstetrics and Gynaecology', icon: '🤰' },
    { name: 'Orthopaedics and Joint Replacement', icon: '🦴' },
    { name: 'Internal Medicine', icon: '➕' },
    { name: 'Cardiac Sciences', icon: '🫀' },
    { name: 'Urology & Nephrology', icon: '💧' },
  ];

  const proceduresList = [
    { name: 'Angioplasty & Stenting', icon: '❤️' },
    { name: 'Total Knee & Hip Replacement', icon: '🦿' },
    { name: 'Kidney & Liver Transplant Procedure', icon: '🩺' },
    { name: 'Chemotherapy & Radiation Therapy', icon: '🔬' },
    { name: 'Laparoscopic Surgery', icon: '✂️' },
    { name: 'Dialysis & Renal Care', icon: '🧪' },
    { name: 'Coronary Artery Bypass Graft (CABG)', icon: '🫀' },
    { name: 'Endoscopy & Colonoscopy', icon: '🔍' },
    { name: 'Brain & Spine Surgery', icon: '🧠' },
    { name: 'C-Section & High-Risk Delivery', icon: '👶' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50 flex flex-col font-sans relative">
      <Navbar 
        onGoHome={() => {}}
        onOpenLogin={() => setShowLogin(true)} 
        onOpenAppointment={() => setShowAppointment(true)} 
      />

      {/* 3D Modern Hero Banner Section */}
      <section className="bg-gradient-to-r from-[#0b2545] via-[#13315c] to-[#0077b6] text-white py-16 px-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-4">
            <span className="bg-white/10 text-cyan-300 text-xs px-3.5 py-1.5 rounded-full font-bold border border-white/20 backdrop-blur">
              ✨ Multi-Speciality Digital Healthcare HMS
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              <span className="font-serif italic text-6xl text-cyan-300 block mb-1" style={{ fontFamily: 'cursive' }}>Amit</span>
              Super Speciality Hospital, Lucknow
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded border border-amber-400/30">4.5 / 5.0 Rating</span>
            </div>
            <div className="text-sm text-gray-200 space-y-2 pt-2">
              <p className="flex items-center gap-2">🕒 <span className="font-bold text-white">Open 24/7 Emergency Services</span> | Call +91 739 099 3915</p>
              <p className="flex items-center gap-2">📍 Hahnemann Chauraha Rd, Viraj Khand - 1, Gomti Nagar, Lucknow, UP 226028</p>
            </div>
            <div className="pt-4">
              <button 
                onClick={() => setShowAppointment(true)}
                className="bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-[#0b2545] text-sm px-6 py-3 rounded-xl font-extrabold transition shadow-lg shadow-emerald-500/30 cursor-pointer transform hover:-translate-y-0.5"
              >
                Book Instant OPD Token ›
              </button>
            </div>
          </div>

          {/* 3D Glassmorphism Live Counter Card */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative transform hover:scale-[1.02] transition duration-300">
            <div className="absolute -top-4 -right-4 bg-teal-400 text-[#0b2545] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Live Sync
            </div>
            <h3 className="text-2xl font-black text-amber-400 mb-1">Rural Healthcare HMS</h3>
            <p className="text-xs text-cyan-200">Integrated Ayushman Bharat Health Account (ABHA)</p>
            
            <div className="mt-6 p-5 bg-[#0b2545]/80 rounded-2xl border border-cyan-500/30 shadow-inner flex justify-between items-center">
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">Live OPD Serving Queue</span>
                <p className="text-3xl font-black text-white mt-1">Token Waiting: #{appointments.length}</p>
                <p className="text-xs text-gray-400 mt-1">Total Patient Tokens Generated Today: {appointments.length + 12}</p>
              </div>
              <div className="text-4xl p-3 bg-teal-500/20 rounded-2xl border border-teal-400/30">
                ⏱️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Appointment Alert Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 -mt-6 relative z-20">
        <div className="bg-gradient-to-r from-[#0b2545] to-[#13315c] text-white py-4 px-8 rounded-2xl flex justify-between items-center shadow-2xl border border-white/20 backdrop-blur">
          <span className="text-base font-bold flex items-center gap-2">
            <span className="text-teal-400 text-xl">📞</span> Need Urgent Medical OPD Token Assistance?
          </span>
          <div className="flex items-center gap-4">
            <span className="bg-teal-500 text-[#0b2545] text-xs px-3 py-1 rounded-full font-black">24/7 HELPLINE</span>
            <span className="text-sm font-extrabold text-cyan-300">+91 739 099 3915</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
        
        {/* ABOUT US SECTION */}
        <section className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-200/80">
          <h2 className="text-2xl font-black text-[#0b2545] mb-4 flex items-center gap-2">
            <span className="w-2 h-7 bg-[#0077b6] rounded-full inline-block"></span> About Our Healthcare Centre
          </h2>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                Amit Super Speciality Hospital, Lucknow (a unit of Starlit Medical Centre Pvt Ltd), is a multidisciplinary 426 bedded tertiary care hospital providing comprehensive medical care across all medical specialities.
              </p>
              <p>
                Our compassionate care blended with advanced technology helps our clinicians deliver superior clinical outcomes across 39 specialities, including Cardiac sciences, Onco Sciences, Neurosciences, Obstetrics and Gynaecology, Urology, and Kidney Transplant.
              </p>
            </div>

            <div className="space-y-4 border-l border-gray-200 pl-6">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-red-50/50 border border-red-100">
                <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center font-black text-xs shadow-md">
                  NABH
                </div>
                <p className="text-xs text-gray-700"><strong>NABH Accredited</strong> hospital ensuring top clinical quality standard</p>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-800 text-white flex items-center justify-center font-black text-xs shadow-md">
                  NABL
                </div>
                <p className="text-xs text-gray-700"><strong>NABL Certified</strong> advanced clinical testing pathology labs</p>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIALITIES & AMIT KUSHWAHA PROFILE CARD SECTION */}
        <section id="specialities" className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-black text-[#0b2545] mb-6 border-b pb-3">Specialities & Healthcare Leadership</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex gap-8 border-b mb-6 text-base font-semibold">
                <button 
                  onClick={() => setActiveTab('Specialities')}
                  className={`pb-2 transition cursor-pointer font-bold ${activeTab === 'Specialities' ? 'border-b-4 border-[#0077b6] text-[#0077b6]' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  Specialities
                </button>
                <button 
                  onClick={() => setActiveTab('Procedures')}
                  className={`pb-2 transition cursor-pointer font-bold ${activeTab === 'Procedures' ? 'border-b-4 border-[#0077b6] text-[#0077b6]' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  Procedures
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(activeTab === 'Specialities' ? specialitiesList : proceduresList).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50/70 transition cursor-pointer border border-gray-200/60 hover:border-blue-300 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AMIT KUSHWAHA PROFILE CARD */}
            <div className="bg-gradient-to-br from-[#0b2545] to-[#0077b6] text-white p-6 rounded-3xl flex flex-col items-center text-center justify-between relative overflow-hidden shadow-2xl border border-white/20">
              <div className="w-full">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img 
                    src="/profile.jpg" 
                    alt="Amit Kushwaha" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Amit+Kushwaha'; }}
                    className="w-full h-full object-cover rounded-full border-4 border-cyan-400 shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>
                <h3 className="text-xl font-black text-white">Amit Kushwaha</h3>
                <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider mt-1">Lead System Architect & Developer</p>
                <p className="text-xs text-gray-200 mt-3 leading-relaxed px-2 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur">
                  B.Sc IT scholar passionate about building modern digital healthcare management systems, combining full-stack innovation with seamless user experience.
                </p>
              </div>

              <button 
                onClick={() => setShowAppointment(true)}
                className="mt-6 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-[#0b2545] text-xs font-black px-5 py-3 rounded-xl flex items-center justify-center gap-2 w-full transition shadow-lg cursor-pointer"
              >
                <span>Consult Healthcare Team</span>
                <span>›</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative border">
            <button 
              onClick={() => setShowLogin(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-[#0b2545]">Login to Portal</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">Enter credentials to access doctor dashboard</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email / User ID</label>
                <input 
                  type="email" 
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0077b6] outline-none text-sm"
                  placeholder="doctor@phc.gov.in"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0077b6] outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#0b2545] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0077b6] transition cursor-pointer shadow"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      {showAppointment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border">
            <button 
              onClick={() => setShowAppointment(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-[#0b2545] border-b pb-3">Book OPD Appointment</h3>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mobile Number</label>
                <div className="flex gap-2">
                  <span className="bg-gray-100 border px-3 py-2 rounded-lg text-sm text-gray-600 font-medium flex items-center">🇮🇳 +91</span>
                  <input 
                    type="tel" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10 digit mobile number" 
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0077b6] outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Health Problem / Symptoms</label>
                <textarea 
                  rows="3"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms (e.g. Fever, Stomach Pain, Headache, Joint Pain etc.)" 
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0077b6] outline-none text-sm resize-none"
                ></textarea>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleBookAppointment}
              className="w-full mt-6 bg-[#0b2545] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0077b6] transition cursor-pointer shadow"
            >
              Submit & Get OPD Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;