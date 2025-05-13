import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/edit/personalInfo`;

const PersonalInfoItem = ({ info, onEdit, onDelete, isLoggedIn }) => {
  return (


<div className="flex justify-between items-start mb-2">
    <div className="flex font-light">
      <div className="font-semibold">{info.title}:</div>
      <p className="text-left ms-2">{info.item}</p>
    </div>

    {isLoggedIn && (
      <div className="flex gap-2 text-blue-600">
        <button
          onClick={() => onEdit(info)}
          className="hover:text-blue-800 transition"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(info)}
          className="hover:text-red-600 transition"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    )}
  </div>
  );
};

const Personal = () => {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [form, setForm] = useState({ title: '', item: '', id: null });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isEditing = form.id !== null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && Array.isArray(res.data.personalInfo)) {
        setPersonalInfo(res.data.personalInfo);
      } else {
        console.error("Expected 'personalInfo' array but got:", res.data);
        setPersonalInfo([]);
      }
    } catch (error) {
      console.error("Failed to fetch personal information:", error);
    }
  };

  const openForm = (info = null) => {
    setForm(info ? { title: info.title, item: info.item, id: info._id } : { title: '', item: '', id: null });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setForm({ title: '', item: '', id: null });
    setIsFormOpen(false);
  };

  const handleDelete = async (info) => {
    if (window.confirm(`Delete personal info: ${info.title}?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/${info._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPersonalInfo();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { title: form.title, item: form.item };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, payload, config);
      } else {
        await axios.post(API_URL, payload, config);
      }
      fetchPersonalInfo();
      closeForm();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-mono">Personal Information</p>
        {isLoggedIn && (
          <button onClick={() => openForm()} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
            <FiPlus size={18} />
            <span className="text-sm">Add</span>
          </button>
        )}
      </div>

      <div className="bgblue w-full h-[2px] mb-2"></div>

      {personalInfo.map((info) => (
        <PersonalInfoItem
          key={info._id}
          info={info}
          onEdit={openForm}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
        />
      ))}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Personal Info' : 'Add Personal Info'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Item"
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bgblue text-white rounded transition">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;
