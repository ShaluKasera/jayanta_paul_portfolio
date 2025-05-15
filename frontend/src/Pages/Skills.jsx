import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/edit/skills`;

const SkillItem = ({ skill, onEdit, onDelete, isLoggedIn }) => {
  return (
    <div className="mb-4 text-left">
      <p className="font-semibold flex items-center gap-2">
        {skill.title}
        {isLoggedIn && (
          <>
            <button onClick={() => onEdit(skill)} className="text-blue-600 hover:text-blue-800">
              <FiEdit2 />
            </button>
            <button onClick={() => onDelete(skill)} className="text-red-600 hover:text-red-800">
              <FiTrash2 />
            </button>
          </>
        )}
      </p>
      <p className="ml-2 font-light">{skill.item.join(', ')}</p>
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ title: '', item: '', id: null });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isEditing = form.id !== null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(API_URL);
      setSkills(res.data.skills || []);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
  };

  const openForm = (skill = null) => {
    setForm(skill ? { title: skill.title, item: skill.item.join(', '), id: skill._id } : { title: '', item: '', id: null });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setForm({ title: '', item: '', id: null });
    setIsFormOpen(false);
  };

  const handleDelete = async (skill) => {
    if (window.confirm(`Delete skill: ${skill.title}?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/${skill._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchSkills();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      title: form.title,
      item: form.item.split(',').map((s) => s.trim()),
    };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, payload, config);
      } else {
        await axios.post(API_URL, payload, config);
      }
      fetchSkills();
      closeForm();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-mono">Skills</p>
        {isLoggedIn && (
          <button onClick={() => openForm()} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
            <FiPlus size={18} />
            <span className="text-sm">Add</span>
          </button>
        )}
      </div>

      <div className="bgblue w-full h-[2px] mb-2"></div>

      {skills.map((skill) => (
        <SkillItem
          key={skill._id}
          skill={skill}
          onEdit={openForm}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
        />
      ))}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Skill' : 'Add Skill'}</h2>
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
                placeholder="Items (comma separated)"
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

export default Skills;
