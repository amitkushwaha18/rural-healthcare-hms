import React, { useState, useEffect } from 'react';

const DoctorDashboard = ({ appointments = [], setAppointments, onLogout }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [rxNotes, setRxNotes] = useState('');

  // Auto-select first waiting patient on component load or state update
  useEffect(() => {
    if (!selectedPatient || selectedPatient.status === 'Completed') {
      const firstWaiting = appointments.find(pt => pt.status === 'Waiting');
      if (firstWaiting) {
        setSelectedPatient(firstWaiting);
      }
    }
  }, [appointments]);

  const handleCallPatient = (patient) => {
    setSelectedPatient(patient);
    setRxNotes('');
  };

  const handleCompleteConsultation = (id) => {
    if (setAppointments) {
      setAppointments(prev => prev.map(pt => pt.id === id ? { ...pt, status: 'Completed' } : pt));
    }
    alert(`Token #${selectedPatient.tokenNumber} Consultation Completed!`);
    
    // Find next waiting patient automatically
    const remainingWaiting = appointments.filter(pt => pt.id !== id && pt.status === 'Waiting');
    if (remainingWaiting.length > 0) {
      setSelectedPatient(remainingWaiting[0]);
    } else {
      setSelectedPatient(null);
    }
    setRxNotes('');
  };

  // Stats Counters
  const waitingCount = appointments.filter(pt => pt.status === 'Waiting').length;
  const completedCount = appointments.filter(pt => pt.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Dashboard Top Header */}
      <header className="bg-[#0b2545] text-white py-4 px-8 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">Doctor OPD Portal</h1>
          <p className="text-xs text-teal-300">PHC Lucknow — Primary Health Centre</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">Dr. Amit Kushwaha</span>
          <button 
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-semibold transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Live Queue Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Patients Waiting</p>
              <h3 className="text-2xl font-bold text-amber-600">{waitingCount} Patients</h3>
            </div>
            <span className="text-3xl">⏳</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Currently Active Token</p>
              <h3 className="text-2xl font-bold text-[#0077b6]">
                {selectedPatient ? `#${selectedPatient.tokenNumber}` : 'None'}
              </h3>
            </div>
            <span className="text-3xl">🩺</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Completed Today</p>
              <h3 className="text-2xl font-bold text-green-600">{completedCount} Patients</h3>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </div>

        {/* Dashboard Main Panel */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Side: OPD Queue List */}
          <div className="md:col-span-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-[#0b2545]">Today's OPD Queue</h2>
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">
                {appointments.length} Total
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {appointments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">No OPD appointments booked yet.</p>
              ) : (
                appointments.map((pt) => (
                  <div 
                    key={pt.id} 
                    className={`p-3.5 border rounded-lg flex justify-between items-center transition cursor-pointer ${selectedPatient?.id === pt.id ? 'border-2 border-[#0077b6] bg-blue-50/70 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => handleCallPatient(pt)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0b2545] text-sm">Token #{pt.tokenNumber}</span>
                        <span className="text-[10px] text-gray-400">{pt.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Phone: {pt.phone}</p>
                      <p className="text-xs text-teal-600 font-medium">{pt.symptoms}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${pt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {pt.status}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCallPatient(pt); }}
                        className={`text-xs px-2.5 py-1 rounded font-medium transition cursor-pointer ${selectedPatient?.id === pt.id ? 'bg-[#0b2545] text-white' : 'bg-[#0077b6] text-white hover:bg-[#0b2545]'}`}
                      >
                        {selectedPatient?.id === pt.id ? 'Examining...' : 'Examine'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side: Consultation Panel */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
            {selectedPatient ? (
              <div>
                <div className="border-b pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <span className="bg-[#0b2545] text-white text-xs px-2.5 py-1 rounded font-bold">
                      Active Consultation Token: #{selectedPatient.tokenNumber}
                    </span>
                    <h3 className="text-xl font-bold text-[#0b2545] mt-2">Patient Details</h3>
                    <p className="text-xs text-gray-500">Contact: +91 {selectedPatient.phone}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded ${selectedPatient.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    Status: {selectedPatient.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Chief Complaints & Symptoms</label>
                    <div className="p-3 bg-gray-50 border rounded-lg text-sm text-gray-700 font-medium">
                      {selectedPatient.symptoms}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Doctor's Clinical Notes & Rx Prescriptions</label>
                    <textarea 
                      rows="6"
                      value={rxNotes}
                      onChange={(e) => setRxNotes(e.target.value)}
                      placeholder="Enter diagnosis, prescribed medicines (Paracetamol, Amoxicillin etc.), and advice..."
                      className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-[#0077b6] outline-none"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {selectedPatient.status !== 'Completed' && (
                    <button 
                      onClick={() => handleCompleteConsultation(selectedPatient.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition shadow cursor-pointer"
                    >
                      Save Prescription & Complete
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedPatient(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-lg transition cursor-pointer"
                  >
                    Deselect Patient
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="text-5xl text-gray-300 mb-3">✅</div>
                <h3 className="text-lg font-bold text-gray-600">All Waiting Patients Examined</h3>
                <p className="text-xs text-gray-400 max-w-sm mt-1">
                  Queue clear hai! Agla patient book hote hi auto-select ho jayega.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;