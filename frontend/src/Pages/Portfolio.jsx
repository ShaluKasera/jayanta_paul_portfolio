import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import Education from "./Education";
import Assistantship from "./Assistantship";
import Fellowship from "./Fellowship";
import Personal from "./Personal";
import Publication from "./Publication";
import Referees from "./Referees";
import Responsibility from "./Responsibility";
import Skills from "./Skills";
import Achievements from "./Acheivements";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import img from "../assets/img2.jpeg";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState("Education");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(img);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const fetchImage = async () => {
      try {
        const res = await axios.get(`${API_URL}/image/portfolio-image`);
        if (res.data?.image) setProfileImage(res.data.image);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };

    fetchImage();
  }, []);

  const handleImageUploadClick = () => imageInputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading image...");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${API_URL}/image/portfolio-image/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data && res.data.image) {
        toast.success("Profile image uploaded successfully!");
        setProfileImage(res.data.image);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image.");
    }
  };

  const navItems = [
    "Education",
    "Publication",
    "Fellowship & Awards",
    "Academic Achievements",
    "Technical Skills",
    "Position of Responsibility",
    "Laboratory Assistantship",
    "Referees",
    "Personal Information",
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "Education":
        return <Education />;
      case "Publication":
        return <Publication />;
      case "Fellowship & Awards":
        return <Fellowship />;
      case "Academic Achievements":
        return <Achievements />;
      case "Technical Skills":
        return <Skills />;
      case "Position of Responsibility":
        return <Responsibility />;
      case "Laboratory Assistantship":
        return <Assistantship />;
      case "Referees":
        return <Referees />;
      case "Personal Information":
        return <Personal />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} />
      {/* Top blue divider */}
      <div className="w-10/12 h-[14px] mx-auto bgblue mb-6 "></div>

      {/* Responsive layout container */}
      <div className="flex flex-col md:flex-row w-11/12 mx-auto md:space-x-4 space-y-4 md:space-y-0 ">
        {/* Left div (ALWAYS first) */}
        <div className="px-2 py-2 w-full md:w-[25%] text-center relative">
          <div className="relative">
            <img
              src={profileImage}
              alt="pic"
              className="ms-10 h-[250px] mt-10 rounded-3xl"
            />
            {isLoggedIn && (
              <>
                <button
                  onClick={handleImageUploadClick}
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "200px",
                    background: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  title="Edit Image"
                >
                  <FiEdit size={20} />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
        </div>

        {/* Middle + Right container to control mobile order */}
        <div className="flex flex-col-reverse md:flex-row w-full md:w-[70%] md:space-x-4 space-y-4 md:space-y-0">
          {/* Middle dynamic content */}
          <div className="w-full md:w-[70%] text-center p-4 rounded-3xl min-h-[250px] ">
            {renderSection()}
          </div>

          {/* Right nav links */}
          <div className="text-left mt-4 w-full md:w-[30%]  flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedSection(item)}
                className={`w-full text-left no-underline rounded ${
                  selectedSection === item
                    ? "bgblue text-white py-2 px-4"
                    : "py-2 px-4 text-black hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
