import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const API_URL =import.meta.env.VITE_BACKEND_URL + "/edit/referee";

const RefereeItem = ({ referee, onEdit, onDelete, isLoggedIn }) => {
  const { name, position, department, institute, phone, email } = referee;
  return (
    <div className="text-left m-0 mb-4 border-b pb-2">
      <p className="font-semibold m-0">{name}</p>
      <p className='m-0'>{position}, {department}</p>
      <p className='m-0'>{institute}</p>
      <p className='m-0 flex items-center'><FaPhoneAlt className='me-2 text-green-600' />{phone}</p>
      <p className='flex items-center'><IoMdMail className='me-2' /> {email}</p>

      {isLoggedIn && (
        <div className="flex gap-2 text-blue-600">
          <button onClick={() => onEdit(referee)} className="hover:text-blue-800 transition">
            <FiEdit2 size={18} />
          </button>
          <button onClick={() => onDelete(referee)} className="hover:text-red-600 transition">
            <FiTrash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

const Referees = () => {
  const [referees, setReferees] = useState([]);
  const [form, setForm] = useState({ name: '', position: '', department: '', institute: '', phone: '', email: '', id: null });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isEditing = form.id !== null;

  const fetchReferees = async () => {
    try {
      const res = await axios.get(API_URL);
      setReferees(res.data.referees || []);
    } catch (error) {
      console.error("Failed to fetch referees:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchReferees();
  }, []);

  const openForm = (referee = null) => {
    setForm(referee ? { ...referee, id: referee._id } : {
      name: '', position: '', department: '', institute: '', phone: '', email: '', id: null
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setForm({ name: '', position: '', department: '', institute: '', phone: '', email: '', id: null });
    setIsFormOpen(false);
  };

  const handleDelete = async (referee) => {
    if (window.confirm(`Delete referee: ${referee.name}?`)) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/${referee._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchReferees();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, form, config);
      } else {
        await axios.post(API_URL, form, config);
      }

      fetchReferees();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2">
        <p className='text-2xl font-mono'>Referees</p>
        {isLoggedIn && (
          <button onClick={() => openForm()} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
            <FiPlus size={18} />
            <span className="text-sm">Add</span>
          </button>
        )}
      </div>

      <div className='bgblue w-full h-[2px] mb-2'></div>

      {referees.map((ref) => (
        <RefereeItem
          key={ref._id}
          referee={ref}
          isLoggedIn={isLoggedIn}
          onEdit={openForm}
          onDelete={handleDelete}
        />
      ))}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Referee" : "Add Referee"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "position", "department", "institute", "phone", "email"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                  required
                />
              ))}

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bgblue text-white rounded transition">
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referees;
