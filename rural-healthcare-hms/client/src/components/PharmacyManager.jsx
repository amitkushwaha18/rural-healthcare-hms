import React, { useState, useEffect } from 'react';
import API from '../services/api';

const PharmacyManager = () => {
  const [isPharmacyAuth, setIsPharmacyAuth] = useState(false);
  const [pharmacyCreds, setPharmacyCreds] = useState({ username: '', password: '' });
  const [tableData, setTableData] = useState([]);
  const [prescriptionText, setPrescriptionText] = useState('');

  // Initial Form State matching Python Tkinter & MySQL Columns exactly
  const initialForm = {
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
    PatientId: '',
    NHSNumber: '',
    PatientName: '',
    DOB: '',
    Address: '',
    BloodPressure: '',
    Medication: ''
  };

  const [form, setForm] = useState(initialForm);

  // Fetch Live Data from MySQL Database
  const fetchMySQLData = async () => {
    try {
      const res = await API.get('/pharmacy/all');
      setTableData(res.data);
    } catch (err) {
      console.error("Error fetching MySQL data:", err);
    }
  };

  useEffect(() => {
    if (isPharmacyAuth) fetchMySQLData();
  }, [isPharmacyAuth]);

  // Auth Handler
  const handlePharmacyLogin = (e) => {
    e.preventDefault();
    if (pharmacyCreds.username === 'pharmacy' && pharmacyCreds.password === 'admin123') {
      setIsPharmacyAuth(true);
    } else {
      alert('Invalid Credentials! Use Username: pharmacy | Password: admin123');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Select Table Row and Populate Input Fields
  const handleSelectRow = (row) => {
    setForm({
      NameOfTablets: row.NameOfTablets || '',
      Ref: row.Reference_No || row.Ref || '',
      Dose: row.Dose || '',
      NoOfTablets: row.NoOfTablets || '',
      Lot: row.Lot || '',
      IssueDate: row.IssueDate || '',
      ExpDate: row.ExpDate || '',
      DailyDose: row.DailyDose || '',
      SideEffect: row.SideEffect || '',
      FurtherInformation: row.FurtherInformation || '',
      Storage_Advice: row.Storage_Advice || '',
      PatientId: row.PatientId || '',
      NHSNumber: row.NHSNumber || '',
      PatientName: row.PatientName || '',
      DOB: row.DOB || '',
      Address: row.Address || '',
      BloodPressure: row.BloodPressure || '',
      Medication: row.Medication || ''
    });
  };

  // Prescription Data Button Action (Save/Insert)
  const handleSave = async () => {
    if (!form.Ref.trim()) return alert('Reference No is required!');
    try {
      await API.post('/pharmacy/add', form);
      alert('Data Inserted Successfully into MySQL Database');
      fetchMySQLData();
    } catch (err) {
      alert('Error inserting data. Reference No may already exist.');
    }
  };

  // Update Button Action
  const handleUpdate = async () => {
    if (!form.Ref.trim()) return alert('Reference No is required for Update!');
    try {
      await API.put(`/pharmacy/update/${form.Ref}`, form);
      alert('Record Updated Successfully in MySQL');
      fetchMySQLData();
    } catch (err) {
      alert('Error updating record in MySQL database');
    }
  };

  // Delete Button Action (Fixed Direct Sync with MySQL)
  const handleDelete = async () => {
    if (!form.Ref.trim()) return alert('Please enter or select a Reference No to Delete!');
    
    try {
      const res = await API.delete(`/pharmacy/delete/${form.Ref.trim()}`);
      alert(res.data.message || 'Patient record deleted successfully');
      setForm(initialForm);
      setPrescriptionText('');
      fetchMySQLData(); // Immediate Table Refresh
    } catch (err) {
      alert('Error deleting record from MySQL');
    }
  };

  // Prescription Text Generator (Fixed Ref binding)
  const handlePrescriptionText = () => {
    const text = `
------------------------------------------------
         HOSPITAL MANAGEMENT PRESCRIPTION
------------------------------------------------
Name Of Tablets:\t\t${form.NameOfTablets}
Reference No:\t\t${form.Ref}
Dose:\t\t\t${form.Dose}
No Of Tablets:\t\t${form.NoOfTablets}
Lot:\t\t\t${form.Lot}
Issue Date:\t\t${form.IssueDate}
Exp Date:\t\t${form.ExpDate}
Daily Dose:\t\t${form.DailyDose}
Storage Advice:\t\t${form.Storage_Advice}
NHS Number:\t\t${form.NHSNumber}
Patient Name:\t\t${form.PatientName}
DOB:\t\t\t${form.DOB}
Blood Pressure:\t\t${form.BloodPressure}
Medication:\t\t${form.Medication}
Patient Id:\t\t${form.PatientId}
Further Info:\t\t${form.FurtherInformation}
Side Effect:\t\t${form.SideEffect}
Address:\t\t${form.Address}
------------------------------------------------`;
    setPrescriptionText(text);
  };

  if (!isPharmacyAuth) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-[#0b2545] mb-1">Pharmacy Login</h2>
        <p className="text-xs text-gray-500 mb-6">Enter system credentials to access Hospital Records</p>
        <form onSubmit={handlePharmacyLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              placeholder="pharmacy" 
              value={pharmacyCreds.username} 
              onChange={(e) => setPharmacyCreds({...pharmacyCreds, username: e.target.value})} 
              className="w-full border p-2.5 rounded text-sm focus:ring-2 focus:ring-[#0077b6] outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="admin123" 
              value={pharmacyCreds.password} 
              onChange={(e) => setPharmacyCreds({...pharmacyCreds, password: e.target.value})} 
              className="w-full border p-2.5 rounded text-sm focus:ring-2 focus:ring-[#0077b6] outline-none" 
            />
          </div>
          <button type="submit" className="w-full bg-[#0b2545] hover:bg-[#0077b6] text-white py-2.5 rounded font-bold transition cursor-pointer">
            Login to Medical System
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-bold text-red-600">+ HOSPITAL MANAGEMENT SYSTEM +</h2>
        <button onClick={() => setIsPharmacyAuth(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1.5 rounded font-semibold">
          Logout Pharmacy Tab
        </button>
      </div>
      
      {/* 3-Column Patient & Tablet Form */}
      <div className="grid md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-gray-700">Names of Tablets</label>
          <select name="NameOfTablets" value={form.NameOfTablets} onChange={handleChange} className="w-full border p-2 rounded bg-white mt-1">
            {["Aspirin", "Cetirizine", "Amoxicilline", "Ciprofloxacine", "Paracetamol", "Corona Vaccine", "Acetaminophen", "adderall", "Amlodipine", "Ativan"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div><label className="font-bold text-gray-700">Reference No :</label><input name="Ref" value={form.Ref} onChange={handleChange} className="w-full border p-2 rounded mt-1" placeholder="REF101" /></div>
        <div><label className="font-bold text-gray-700">Dose :</label><input name="Dose" value={form.Dose} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">No Of Tablets :</label><input name="NoOfTablets" value={form.NoOfTablets} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Lot :</label><input name="Lot" value={form.Lot} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Issue Date :</label><input name="IssueDate" value={form.IssueDate} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Exp Date :</label><input name="ExpDate" value={form.ExpDate} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Daily Dose :</label><input name="DailyDose" value={form.DailyDose} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Side Effect :</label><input name="SideEffect" value={form.SideEffect} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Further Information :</label><input name="FurtherInformation" value={form.FurtherInformation} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Storage Advice :</label><input name="Storage_Advice" value={form.Storage_Advice} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Blood Pressure :</label><input name="BloodPressure" value={form.BloodPressure} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Patient Id :</label><input name="PatientId" value={form.PatientId} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">NHS Number :</label><input name="NHSNumber" value={form.NHSNumber} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Patient Name :</label><input name="PatientName" value={form.PatientName} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Date Of Birth :</label><input name="DOB" value={form.DOB} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Medication :</label><input name="Medication" value={form.Medication} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
        <div><label className="font-bold text-gray-700">Patient Address :</label><input name="Address" value={form.Address} onChange={handleChange} className="w-full border p-2 rounded mt-1" /></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <button onClick={handlePrescriptionText} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs font-bold transition">Prescription</button>
        <button onClick={handleSave} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs font-bold transition">Prescription Data</button>
        <button onClick={handleUpdate} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs font-bold transition">Update</button>
        <button onClick={handleDelete} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs font-bold transition">Delete</button>
        <button onClick={() => { setForm(initialForm); setPrescriptionText(''); }} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs font-bold transition">Clear</button>
      </div>

      {/* Prescription Receipt Area */}
      {prescriptionText && (
        <textarea rows="6" value={prescriptionText} readOnly className="w-full bg-gray-900 text-green-400 p-3 font-mono text-xs rounded outline-none"></textarea>
      )}

      {/* MySQL Live Table */}
      <div>
        <h3 className="text-sm font-bold text-[#0b2545] mb-2">Live MySQL Database Records</h3>
        <div className="overflow-x-auto max-h-60 border rounded">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-[#0b2545] text-white">
              <tr>
                <th className="p-2 border">Ref No</th>
                <th className="p-2 border">Tablet</th>
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Dose</th>
                <th className="p-2 border">BP</th>
                <th className="p-2 border">Issue Date</th>
                <th className="p-2 border">Patient ID</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr><td colSpan="7" className="p-4 text-center text-gray-400">No MySQL records found</td></tr>
              ) : (
                tableData.map((row, idx) => (
                  <tr key={idx} onClick={() => handleSelectRow(row)} className="hover:bg-blue-50 cursor-pointer border-b">
                    <td className="p-2 border font-bold text-blue-700">{row.Reference_No}</td>
                    <td className="p-2 border">{row.NameOfTablets}</td>
                    <td className="p-2 border">{row.PatientName}</td>
                    <td className="p-2 border">{row.Dose}</td>
                    <td className="p-2 border">{row.BloodPressure}</td>
                    <td className="p-2 border">{row.IssueDate}</td>
                    <td className="p-2 border">{row.PatientId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacyManager;