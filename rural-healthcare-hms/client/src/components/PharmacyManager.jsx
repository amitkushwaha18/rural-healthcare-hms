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
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Python logic: Add / Insert Prescription Record
  const handleAddData = () => {
    if (!formData.refNo.trim()) {
      alert("Error inserting data. Reference No is required!");
      return;
    }

    const exists = records.some(item => item.refNo === formData.refNo);
    if (exists) {
      alert("Error inserting data. Reference No may already exist.");
      return;
    }

    setRecords([...records, formData]);
    alert("Record Inserted Successfully!");
  };

  // Update existing record
  const handleUpdateData = () => {
    if (!formData.refNo) {
      alert("Please select or enter Reference No to update.");
      return;
    }

    const index = records.findIndex(r => r.refNo === formData.refNo);
    if (index === -1) {
      alert("Record not found to update.");
      return;
    }

    const updatedRecords = [...records];
    updatedRecords[index] = formData;
    setRecords(updatedRecords);
    alert("Record Updated Successfully!");
  };

  // Delete Record
  const handleDeleteData = () => {
    if (!formData.refNo) {
      alert("Please select or enter Reference No to delete.");
      return;
    }

    setRecords(records.filter(r => r.refNo !== formData.refNo));
    handleClearForm();
    alert("Record Deleted Successfully!");
  };

  // Clear Form Fields
  const handleClearForm = () => {
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
    setSelectedRecord(null);
  };

  const handleSelectRow = (item) => {
    setFormData(item);
    setSelectedRecord(item);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4 font-sans text-xs">
      <div className="max-w-7xl mx-auto bg-gray-200 p-4 rounded border border-gray-400 shadow-md">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-4">
          <h1 className="text-2xl font-black text-red-800 tracking-wider">
            + HOSPITAL MANAGEMENT SYSTEM +
          </h1>
          <button 
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold px-4 py-1.5 rounded"
          >
            Logout Pharmacy Tab
          </button>
        </div>

        {/* Form Inputs (3 Columns Grid matching Python Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-100 p-4 rounded border border-gray-300 mb-4">
          
          {/* Column 1 */}
          <div className="space-y-2">
            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Names Of Tablets :</label>
              <select 
                name="tabletName" 
                value={formData.tabletName} 
                onChange={handleChange}
                className="w-full border border-gray-400 p-1.5 rounded bg-white text-xs font-semibold"
              >
                <option>Ciprofloxacine</option>
                <option>Paracetamol</option>
                <option>Amoxicillin</option>
                <option>Ibuprofen</option>
                <option>Azithromycin</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">No Of Tablets :</label>
              <input type="text" name="noOfTablets" value={formData.noOfTablets} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Exp Date :</label>
              <input type="text" name="expDate" value={formData.expDate} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" placeholder="DD/MM/YYYY" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Further Information :</label>
              <input type="text" name="furtherInfo" value={formData.furtherInfo} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Patient Id :</label>
              <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Date Of Birth :</label>
              <input type="text" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" placeholder="DD/MM/YYYY" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Ref No :</label>
              <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white font-bold" placeholder="e.g. 101" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Lot :</label>
              <input type="text" name="lot" value={formData.lot} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Daily Dose :</label>
              <input type="text" name="dailyDose" value={formData.dailyDose} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Storage Advice :</label>
              <input type="text" name="storageAdvice" value={formData.storageAdvice} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">NHS Number :</label>
              <input type="text" name="nhsNumber" value={formData.nhsNumber} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Medication :</label>
              <input type="text" name="medication" value={formData.medication} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Dose :</label>
              <input type="text" name="dose" value={formData.dose} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Issue Date :</label>
              <input type="text" name="issueDate" value={formData.issueDate} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" placeholder="DD/MM/YYYY" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Side Effect :</label>
              <input type="text" name="sideEffect" value={formData.sideEffect} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Blood Pressure :</label>
              <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Patient Name :</label>
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white font-semibold" />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Patient Address :</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-400 p-1 rounded bg-white" />
            </div>
          </div>

        </div>

        {/* Python Action Buttons Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={handleAddData} 
            className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-4 py-2 rounded"
          >
            Prescription
          </button>
          
          <button 
            onClick={handleAddData} 
            className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-4 py-2 rounded"
          >
            Prescription Data
          </button>

          <button 
            onClick={handleUpdateData} 
            className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-4 py-2 rounded"
          >
            Update
          </button>

          <button 
            onClick={handleDeleteData} 
            className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-4 py-2 rounded"
          >
            Delete
          </button>

          <button 
            onClick={handleClearForm} 
            className="bg-green-800 hover:bg-green-900 text-white font-extrabold px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        {/* Live MySQL Database Records Table */}
        <div className="border border-gray-400 rounded overflow-hidden bg-white">
          <div className="bg-[#0b2545] text-white p-2 font-bold text-xs flex justify-between items-center">
            <span>Live MySQL Database Records</span>
            <span className="text-[10px] text-gray-300">Click row to select</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-2 border-r border-slate-700">Ref No</th>
                  <th className="p-2 border-r border-slate-700">Tablet</th>
                  <th className="p-2 border-r border-slate-700">Patient Name</th>
                  <th className="p-2 border-r border-slate-700">Dose</th>
                  <th className="p-2 border-r border-slate-700">BP</th>
                  <th className="p-2 border-r border-slate-700">Issue Date</th>
                  <th className="p-2">Patient ID</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500 font-medium">
                      No MySQL records found
                    </td>
                  </tr>
                ) : (
                  records.map((item, index) => (
                    <tr 
                      key={index} 
                      onClick={() => handleSelectRow(item)}
                      className={`border-b cursor-pointer transition ${selectedRecord?.refNo === item.refNo ? 'bg-amber-100 font-semibold' : 'hover:bg-blue-50'}`}
                    >
                      <td className="p-2 border-r font-bold">{item.refNo}</td>
                      <td className="p-2 border-r">{item.tabletName}</td>
                      <td className="p-2 border-r">{item.patientName}</td>
                      <td className="p-2 border-r">{item.dose}</td>
                      <td className="p-2 border-r">{item.bloodPressure}</td>
                      <td className="p-2 border-r">{item.issueDate}</td>
                      <td className="p-2">{item.patientId}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PharmacyManager;