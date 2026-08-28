import React, { useState } from 'react';

const PharmacyManager = ({ onBack }) => {
  // Login Guard State
  const [isPharmacyAuthenticated, setIsPharmacyAuthenticated] = useState(false);
  const [pharmacyCredentials, setPharmacyCredentials] = useState({ username: '', password: '' });

  const [formData, setFormData] = useState({
    NameOfTablets: 'Aspirin',
    Ref: '',
    Dose: '',
    NoOfTablets: '',
    Lot: '',
    IssueDate: '',
    ExpDate: '',
    DailyDose: '',
    SideEffect: '',
    FurtherInformation: '',
    Storage_Advice: '',
    BloodPressure: '',
    Medication: '',
    PatientId: '',
    NHSNumber: '',
    PatientName: '',
    DOB: '',
    Address: ''
  });

  const [prescriptionText, setPrescriptionText] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePharmacyLoginSubmit = (e) => {
    e.preventDefault();
    if (pharmacyCredentials.username === 'admin' && pharmacyCredentials.password === 'admin123') {
      setIsPharmacyAuthenticated(true);
    } else {
      alert("Invalid Credentials! Default credentials: Username: admin | Password: admin123");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIPrescription = () => {
    const text = 
`Name Of Tablets:\t\t${formData.NameOfTablets}
Reference No:\t\t${formData.Ref}
Dose:\t\t\t${formData.Dose}
No Of Table:\t\t${formData.NoOfTablets}
Lot:\t\t\t${formData.Lot}
Issue Date:\t\t${formData.IssueDate}
Exp Dat:\t\t${formData.ExpDate}
Daily Dose:\t\t${formData.DailyDose}
Storage_Advice :\t\t${formData.Storage_Advice}
NHS Number:\t\t${formData.NHSNumber}
Patient Nam:\t\t${formData.PatientName}
DOB:\t\t\t${formData.DOB}
Blood Pressure:\t\t\t${formData.BloodPressure}
Medication:\t\t\t${formData.Medication}
Patient Id:\t\t\t${formData.PatientId}
FurtherInformation:\t\t\t${formData.FurtherInformation}
Side Effect:\t\t\t${formData.SideEffect}
Address:\t\t${formData.Address}`;
    
    setPrescriptionText(text);
  };

  const handleIPrescriptionData = () => {
    if (!formData.Ref.trim()) {
      alert("Error: Reference No is required");
      return;
    }

    const exists = records.some(r => r.Ref === formData.Ref);
    if (exists) {
      alert("Error: Reference No already exists!");
      return;
    }

    setRecords([...records, formData]);
    alert("Data Inserted Successfully");
  };

  const handleUpdateData = () => {
    if (!formData.Ref.trim()) {
      alert("Error: Reference No is required");
      return;
    }

    const index = records.findIndex(r => r.Ref === formData.Ref);
    if (index === -1) {
      alert("Error: Record with given Reference No not found");
      return;
    }

    const updated = [...records];
    updated[index] = formData;
    setRecords(updated);
    alert("Record Updated Successfully");
  };

  const handleIDelete = () => {
    if (!formData.Ref.trim()) {
      alert("Error: Reference No is required for deletion");
      return;
    }

    setRecords(records.filter(r => r.Ref !== formData.Ref));
    handleClear();
    alert("Patient has been deleted successfully");
  };

  const handleClear = () => {
    setFormData({
      NameOfTablets: 'Aspirin',
      Ref: '',
      Dose: '',
      NoOfTablets: '',
      Lot: '',
      IssueDate: '',
      ExpDate: '',
      DailyDose: '',
      SideEffect: '',
      FurtherInformation: '',
      Storage_Advice: '',
      BloodPressure: '',
      Medication: '',
      PatientId: '',
      NHSNumber: '',
      PatientName: '',
      DOB: '',
      Address: ''
    });
    setPrescriptionText('');
    setSelectedIndex(null);
  };

  const handleIExit = () => {
    if (window.confirm("Confirm you want to exit")) {
      onBack();
    }
  };

  const handleSelectRow = (item, index) => {
    setFormData(item);
    setSelectedIndex(index);
  };

  // Agar login authenticated nahi hai, toh Login Screen dikhayega
  if (!isPharmacyAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-slate-700">
          <button 
            onClick={onBack}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-xl"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
              💊
            </div>
            <h2 className="text-2xl font-black text-[#0b2545]">Pharmacy Manager Login</h2>
            <p className="text-xs text-gray-500 mt-1">Authorized personnel only</p>
          </div>

          <form onSubmit={handlePharmacyLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Username / User ID</label>
              <input 
                type="text" 
                required
                value={pharmacyCredentials.username}
                onChange={(e) => setPharmacyCredentials({...pharmacyCredentials, username: e.target.value})}
                placeholder="Enter username (e.g. admin)"
                className="w-full border p-2.5 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input 
                type="password" 
                required
                value={pharmacyCredentials.password}
                onChange={(e) => setPharmacyCredentials({...pharmacyCredentials, password: e.target.value})}
                placeholder="Enter password (e.g. admin123)"
                className="w-full border p-2.5 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black py-3 rounded-lg text-xs transition shadow-lg cursor-pointer"
            >
              Access Pharmacy Database
            </button>
          </form>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 text-center font-medium">
            <strong>Default Credentials:</strong><br/>
            Username: <code className="bg-amber-100 px-1 py-0.5 rounded">admin</code> | Password: <code className="bg-amber-100 px-1 py-0.5 rounded">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // Login Hone Ke Baad Main Python Interface Open Hoga
  return (
    <div className="min-h-screen bg-white p-2 font-serif text-sm">
      {/* Title Bar */}
      <div className="border-4 border-double border-gray-600 bg-white p-3 text-center mb-3">
        <h1 className="text-3xl md:text-4xl font-black text-red-700 tracking-wide">
          +HOSPITAL MANAGEMENT SYSTEM+
        </h1>
      </div>

      {/* DATA FRAME (Left Patient Info + Right Prescription) */}
      <div className="border-4 border-double border-gray-500 p-3 mb-3 bg-gray-50 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* DataframeLeft: Patient Information */}
        <div className="lg:col-span-8 border-2 border-gray-400 p-3 relative bg-white">
          <span className="absolute -top-3 left-4 bg-white px-2 font-bold text-gray-800 text-xs">
            Patient Information
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            
            {/* Left Column Fields */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Names of Tablets</label>
                <select 
                  name="NameOfTablets" 
                  value={formData.NameOfTablets} 
                  onChange={handleChange}
                  className="w-56 border border-gray-400 p-1 text-xs font-bold"
                >
                  <option>Aspirin</option>
                  <option>Cetirizine</option>
                  <option>Amoxicilline</option>
                  <option>Ciprofloxacine</option>
                  <option>Paracetamol</option>
                  <option>Corona Vaccine</option>
                  <option>Acetaminophen</option>
                  <option>adderall</option>
                  <option>Amlodipine</option>
                  <option>Ativan</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Reference No :</label>
                <input type="text" name="Ref" value={formData.Ref} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Dose :</label>
                <input type="text" name="Dose" value={formData.Dose} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">No Of Tablets :</label>
                <input type="text" name="NoOfTablets" value={formData.NoOfTablets} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Lot :</label>
                <input type="text" name="Lot" value={formData.Lot} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Issue Date :</label>
                <input type="text" name="IssueDate" value={formData.IssueDate} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Exp Date :</label>
                <input type="text" name="ExpDate" value={formData.ExpDate} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Daily Dose :</label>
                <input type="text" name="DailyDose" value={formData.DailyDose} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Side Effect :</label>
                <input type="text" name="SideEffect" value={formData.SideEffect} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>
            </div>

            {/* Right Column Fields */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Further Information :</label>
                <input type="text" name="FurtherInformation" value={formData.FurtherInformation} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Blood Pressure :</label>
                <input type="text" name="BloodPressure" value={formData.BloodPressure} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Storage_Advice :</label>
                <input type="text" name="Storage_Advice" value={formData.Storage_Advice} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Medication :</label>
                <input type="text" name="Medication" value={formData.Medication} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Patient Id :</label>
                <input type="text" name="PatientId" value={formData.PatientId} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">NHS Number :</label>
                <input type="text" name="NHSNumber" value={formData.NHSNumber} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Patient Name :</label>
                <input type="text" name="PatientName" value={formData.PatientName} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Date Of Birth :</label>
                <input type="text" name="DOB" value={formData.DOB} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold text-xs">Patient Address :</label>
                <input type="text" name="Address" value={formData.Address} onChange={handleChange} className="w-56 border border-gray-400 p-1 text-xs font-bold" />
              </div>
            </div>

          </div>
        </div>

        {/* DataframeRight: Prescription Box */}
        <div className="lg:col-span-4 border-2 border-gray-400 p-3 relative bg-white">
          <span className="absolute -top-3 left-4 bg-white px-2 font-bold text-gray-800 text-xs">
            Prescription
          </span>

          <textarea 
            readOnly
            value={prescriptionText}
            className="w-full h-80 font-mono text-xs border border-gray-300 p-2 leading-relaxed resize-none bg-slate-50 outline-none"
            placeholder="Click 'Prescription' button to generate text here..."
          ></textarea>
        </div>

      </div>

      {/* BUTTON FRAME */}
      <div className="border-4 border-double border-gray-500 p-2 mb-3 bg-gray-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <button onClick={handleIPrescription} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Prescription</button>
        <button onClick={handleIPrescriptionData} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Prescription Data</button>
        <button onClick={handleUpdateData} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Update</button>
        <button onClick={handleIDelete} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Delete</button>
        <button onClick={handleClear} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Clear</button>
        <button onClick={handleIExit} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-xs">Exit</button>
      </div>

      {/* DETAILS FRAME / TREEVIEW TABLE */}
      <div className="border-4 border-double border-gray-500 p-2 bg-white overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-400 font-bold">
              <th className="p-2 border-r border-gray-300">Name Of Table</th>
              <th className="p-2 border-r border-gray-300">Reference No.</th>
              <th className="p-2 border-r border-gray-300">Dose</th>
              <th className="p-2 border-r border-gray-300">No Of Tablets</th>
              <th className="p-2 border-r border-gray-300">Lot</th>
              <th className="p-2 border-r border-gray-300">Issue Date</th>
              <th className="p-2 border-r border-gray-300">Exp Date</th>
              <th className="p-2 border-r border-gray-300">Daily Dose</th>
              <th className="p-2 border-r border-gray-300">Storage_Advice</th>
              <th className="p-2 border-r border-gray-300">NHS Number</th>
              <th className="p-2 border-r border-gray-300">Patient Name</th>
              <th className="p-2 border-r border-gray-300">DOB</th>
              <th className="p-2 border-r border-gray-300">Blood Pressure</th>
              <th className="p-2 border-r border-gray-300">Medication</th>
              <th className="p-2 border-r border-gray-300">Patient ID</th>
              <th className="p-2 border-r border-gray-300">Further Information</th>
              <th className="p-2 border-r border-gray-300">Side Effect</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="18" className="text-center p-4 text-gray-500 font-bold">
                  No records found
                </td>
              </tr>
            ) : (
              records.map((item, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleSelectRow(item, index)}
                  className={`border-b border-gray-200 cursor-pointer ${selectedIndex === index ? 'bg-blue-200 font-bold' : 'hover:bg-gray-100'}`}
                >
                  <td className="p-2 border-r border-gray-200">{item.NameOfTablets}</td>
                  <td className="p-2 border-r border-gray-200 font-bold">{item.Ref}</td>
                  <td className="p-2 border-r border-gray-200">{item.Dose}</td>
                  <td className="p-2 border-r border-gray-200">{item.NoOfTablets}</td>
                  <td className="p-2 border-r border-gray-200">{item.Lot}</td>
                  <td className="p-2 border-r border-gray-200">{item.IssueDate}</td>
                  <td className="p-2 border-r border-gray-200">{item.ExpDate}</td>
                  <td className="p-2 border-r border-gray-200">{item.DailyDose}</td>
                  <td className="p-2 border-r border-gray-200">{item.Storage_Advice}</td>
                  <td className="p-2 border-r border-gray-200">{item.NHSNumber}</td>
                  <td className="p-2 border-r border-gray-200">{item.PatientName}</td>
                  <td className="p-2 border-r border-gray-200">{item.DOB}</td>
                  <td className="p-2 border-r border-gray-200">{item.BloodPressure}</td>
                  <td className="p-2 border-r border-gray-200">{item.Medication}</td>
                  <td className="p-2 border-r border-gray-200">{item.PatientId}</td>
                  <td className="p-2 border-r border-gray-200">{item.FurtherInformation}</td>
                  <td className="p-2 border-r border-gray-200">{item.SideEffect}</td>
                  <td className="p-2">{item.Address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PharmacyManager;