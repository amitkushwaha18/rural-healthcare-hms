import React, { useState } from 'react';

const PharmacyManager = ({ onBack }) => {
  const [formData, setFormData] = useState({
    tabletName: 'Ciprofloxacine',
    refNo: '',
    dose: '',
    noOfTablets: '',
    lot: '',
    issueDate: '',
    expDate: '',
    dailyDose: '',
    sideEffect: '',
    furtherInfo: '',
    storageAdvice: '',
    bloodPressure: '',
    patientId: '',
    nhsNumber: '',
    patientName: '',
    dob: '',
    medication: '',
    address: ''
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrescription = () => {
    if (!formData.refNo || !formData.patientName) {
      alert('Please fill at least Reference No and Patient Name!');
      return;
    }

    const exists = records.some(item => item.refNo === formData.refNo);
    if (exists) {
      alert('Error inserting data. Reference No already exists in current list!');
      return;
    }

    setRecords([...records, formData]);
    alert('Prescription Record Added Successfully!');
  };

  const handleClear = () => {
    setFormData({
      tabletName: 'Ciprofloxacine',
      refNo: '',
      dose: '',
      noOfTablets: '',
      lot: '',
      issueDate: '',
      expDate: '',
      dailyDose: '',
      sideEffect: '',
      furtherInfo: '',
      storageAdvice: '',
      bloodPressure: '',
      patientId: '',
      nhsNumber: '',
      patientName: '',
      dob: '',
      medication: '',
      address: ''
    });
  };

  const handleDelete = (refNo) => {
    setRecords(records.filter(r => r.refNo !== refNo));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-red-700">+ HOSPITAL MANAGEMENT SYSTEM +</h2>
          <button 
            onClick={onBack}
            className="bg-gray-800 text-white text-xs px-4 py-2 rounded font-bold hover:bg-black"
          >
            Logout Pharmacy Tab
          </button>
        </div>

        {/* Input Form Fields */}
        <div className="grid md:grid-cols-3 gap-4 text-xs font-bold text-gray-700 mb-6">
          <div>
            <label className="block mb-1">Names Of Tablets :</label>
            <select name="tabletName" value={formData.tabletName} onChange={handleChange} className="w-full border p-2 rounded">
              <option>Ciprofloxacine</option>
              <option>Paracetamol</option>
              <option>Amoxicillin</option>
              <option>Ibuprofen</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Ref No :</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. 101" />
          </div>

          <div>
            <label className="block mb-1">Dose :</label>
            <input type="text" name="dose" value={formData.dose} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">No Of Tablets :</label>
            <input type="text" name="noOfTablets" value={formData.noOfTablets} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Lot :</label>
            <input type="text" name="lot" value={formData.lot} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Issue Date :</label>
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Patient Id :</label>
            <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">NHS Number :</label>
            <input type="text" name="nhsNumber" value={formData.nhsNumber} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Patient Name :</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button onClick={handlePrescription} className="bg-emerald-700 text-white text-xs px-5 py-2.5 rounded font-bold hover:bg-emerald-800">Prescription</button>
          <button onClick={handleClear} className="bg-green-800 text-white text-xs px-5 py-2.5 rounded font-bold hover:bg-green-900">Clear</button>
        </div>

        {/* Data Table */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          <h3 className="bg-[#0b2545] text-white p-3 font-bold text-sm">Live Hospital Database Records</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="p-3">Ref No</th>
                <th className="p-3">Tablet</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Dose</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">No records inserted yet.</td>
                </tr>
              ) : (
                records.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-bold">{item.refNo}</td>
                    <td className="p-3">{item.tabletName}</td>
                    <td className="p-3">{item.patientName}</td>
                    <td className="p-3">{item.dose}</td>
                    <td className="p-3">{item.issueDate}</td>
                    <td className="p-3">
                      <button onClick={() => handleDelete(item.refNo)} className="text-red-600 font-bold hover:underline">Delete</button>
                    </td>
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