import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/edit/publication";

const PublicationItem = ({ pub, onEdit, onDelete, isLoggedIn }) => (
  <div className="flex justify-between items-start mb-3">
    <div className="flex font-light">
      <div className="font-semibold">{pub.year}:</div>
      <p className="text-left ms-2">{pub.text}</p>
    </div>

    {isLoggedIn && (
      <div className="flex gap-2 text-blue-600">
        <button
          onClick={() => onEdit(pub)}
          className="hover:text-blue-800 transition"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(pub)}
          className="hover:text-red-600 transition"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    )}
  </div>
);

const Publication = () => {
  const [publications, setPublications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [form, setForm] = useState({ year: "", text: "", id: null });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isEditing = form.id !== null;

  // === Reusable fetch function ===
  const fetchPublications = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setPublications(res.data);
      } else if (res.data && Array.isArray(res.data.publications)) {
        setPublications(res.data.publications);
      } else {
        console.error("Expected array but got:", res.data);
        setPublications([]);
      }
    } catch (error) {
      console.error("Failed to fetch publications:", error);
      setPublications([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    fetchPublications();
  }, []);

  const handleViewMore = () => setVisibleCount((prev) => prev + 3);
  const handleViewLess = () => setVisibleCount(3);

  const openForm = (pub = null) => {
    if (pub) {
      setForm({ year: pub.year, text: pub.text, id: pub._id });
    } else {
      setForm({ year: "", text: "", id: null });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setForm({ year: "", text: "", id: null });
    setIsFormOpen(false);
  };

  const handleDelete = async (pub) => {
    if (window.confirm(`Delete publication from ${pub.year}?`)) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        await axios.delete(`${API_URL}/${pub._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchPublications();
      } catch (err) {
        console.error("Delete failed:", err);
        console.error("Error response:", err.response);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
  
    // Ensure the year is valid
    const currentYear = new Date().getFullYear();
    if (!form.year || form.year < 1900 || form.year > currentYear) {
      console.error("Invalid year input. Please enter a valid year between 1900 and the current year.");
      return;
    }
  
    // Ensure that text is not empty
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
        // Update existing publication
        response = await axios.put(
          `${API_URL}/${form.id}`,
          {
            year: form.year,
            text: form.text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Add new publication
        response = await axios.post(
          `${API_URL}`,
          {
            year: form.year,
            text: form.text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      console.log("Response from server:", response);
      fetchPublications();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    }
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-left text-2xl font-mono">Publication</p>

        {/* Render the Add button only if user is logged in */}
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

      {publications.slice(0, visibleCount).map((pub) => (
        <PublicationItem
          key={pub._id}
          pub={pub}
          isLoggedIn={isLoggedIn} // Passing the isLoggedIn state
          onEdit={openForm}
          onDelete={handleDelete}
        />
      ))}

      <div className="mt-2 flex justify-center gap-4 ">
        {visibleCount < publications.length && (
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

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Publication" : "Add Publication"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="number"
                placeholder="Year (e.g., 2023)"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full border p-2 rounded"
                required
                min="1900" // Minimum year
                max={new Date().getFullYear()} // Maximum year (current year)
                step="1" // Only whole numbers are allowed
              />

              <textarea
                placeholder="Text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full border p-2 rounded h-28"
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

export default Publication;
