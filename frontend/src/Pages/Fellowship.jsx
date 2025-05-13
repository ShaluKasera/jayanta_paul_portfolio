import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/edit/fellowship";

const FellowshipItem = ({ fellowship, onEdit, onDelete, isLoggedIn }) => (
  <div className="flex justify-between items-start mb-3">
    <div className="flex font-light">
      <div className="font-semibold">{fellowship.year}:</div>
      <p className="text-left ms-2">{fellowship.text}</p>
    </div>

    {isLoggedIn && (
      <div className="flex gap-2 text-blue-600">
        <button
          onClick={() => onEdit(fellowship)}
          className="hover:text-blue-800 transition"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(fellowship)}
          className="hover:text-red-600 transition"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    )}
  </div>
);

const Fellowship = () => {
  const [fellowships, setFellowships] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [form, setForm] = useState({ year: "", text: "", id: null });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isEditing = form.id !== null;

  const fetchFellowships = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setFellowships(res.data);
      } else if (res.data && Array.isArray(res.data.fellowships)) {
        setFellowships(res.data.fellowships);
      } else {
        console.error("Expected array but got:", res.data);
        setFellowships([]);
      }
    } catch (error) {
      console.error("Failed to fetch fellowships:", error);
      setFellowships([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchFellowships();
  }, []);

  const handleViewMore = () => setVisibleCount((prev) => prev + 3);
  const handleViewLess = () => setVisibleCount(3);

  const openForm = (fellowship = null) => {
    if (fellowship) {
      setForm({
        year: fellowship.year,
        text: fellowship.text,
        id: fellowship._id,
      });
    } else {
      setForm({ year: "", text: "", id: null });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setForm({ year: "", text: "", id: null });
    setIsFormOpen(false);
  };

  const handleDelete = async (fellowship) => {
    if (window.confirm(`Delete fellowship from ${fellowship.year}?`)) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        await axios.delete(`${API_URL}/${fellowship._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchFellowships();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    if (!form.year || form.year < 1900 || form.year > currentYear) {
      console.error("Invalid year input");
      return;
    }

    if (!form.text) {
      console.error("Text is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      let response;
      if (form.id) {
        response = await axios.put(
          `${API_URL}/${form.id}`,
          { year: form.year, text: form.text },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          API_URL,
          { year: form.year, text: form.text },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchFellowships();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-left text-2xl font-mono">Fellowship</p>
        {isLoggedIn && (
          <button
            onClick={() => openForm()}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
          >
            <FiPlus size={18} />
            <span className="text-sm">Add</span>
          </button>
        )}
      </div>

      <div className="bgblue w-full h-[2px] mb-2"></div>

      {fellowships.slice(0, visibleCount).map((fellowship) => (
        <FellowshipItem
          key={fellowship._id}
          fellowship={fellowship}
          isLoggedIn={isLoggedIn}
          onEdit={openForm}
          onDelete={handleDelete}
        />
      ))}

      <div className="mt-2 flex justify-center gap-4 ">
        {visibleCount < fellowships.length && (
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bgblue text-white rounded transition"
          >
            View More
          </button>
        )}
        {visibleCount > 3 && (
          <button
            onClick={handleViewLess}
            className="px-4 py-2 bgblue text-white rounded transition"
          >
            View Less
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Fellowship" : "Add Fellowship"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Year or duration "
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                required
              />

              <textarea
                placeholder="Text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full border p-2 mb-2 rounded h-28"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bgblue text-white rounded transition"
                >
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

export default Fellowship;
