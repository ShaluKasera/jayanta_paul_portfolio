import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import img1 from "../assets/img1.jpeg";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api";


const Home = () => {
  const [resume, setResume] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(img1);

  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const fetchResume = async () => {
      try {
        const response = await axios.get(`${API_URL}/resume`);
        if (response.data && response.data.resume) {
          setResume(response.data.resume);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    const fetchImage = async () => {
      try {
        const res = await axios.get(`${API_URL}/resume/image/homepage-image`);
        if (res.data?.image) setProfileImage(res.data.image);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };

    fetchResume();
    fetchImage();
  }, []);

  const handleOpenResume = () => {
    if (resume) {
      window.open(resume, "_blank");
    } else {
      alert("Resume is not yet available.");
    }
  };

  const handleImageUploadClick = () => imageInputRef.current.click();
  const handleResumeUploadClick = () => resumeInputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading image...");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${API_URL}/resume/image/homepage-image/add`,
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
        setProfileImage(res.data.image); // if new image URL returned
      }
    } catch (err) {
      console.error("Image upload failed:", err);
         toast.error("Failed to upload image.");
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

      toast.info("Uploading resume...");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        `${API_URL}/resume/resume/add-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       if (res.data && res.data.newresume?.resume) {
        toast.success("Resume uploaded successfully!");
      setResume(res.data.newresume.resume);
      
    } 
    } catch (err) {
      console.error("Resume upload failed:", err);
       toast.error("Failed to upload resume.");
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} />

      <div className="flex flex-col lg:flex-row w-full items-center lg:items-start">
        {/* Left side — Circle */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-20 relative">
          <div>
            <img
              src={profileImage}
              alt="pic"
              className=" h-60 w-60 rounded-full lg:h-80 lg:w-80"
            />
            {isLoggedIn && (
              <>
                <button
                  onClick={handleImageUploadClick}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "235px",
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

        {/* Right side — Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start p-6 mt-8 lg:mt-14 lg:me-32 lg:items-start items-center">
          <p className="text-3xl lg:text-3xl font-bold text-color mb-2">
            JAYANTA PAUL
          </p>
          <p className="text-lg font-semibold mb-2">A Bit About Me</p>
          <p className="mb-4 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            voluptates eum placeat quasi aspernatur id perferendis laborum
            eveniet vero vel cupiditate optio minus officia, iusto alias
            veritatis sunt, inventore ex, adipisci dignissimos. Rem ab accusamus
            facere atque natus beatae perspicia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto relative">
            <button
              onClick={handleOpenResume}
              className="px-4 py-2 b w-full"
              disabled={!resume}
            >
              {resume ? "Resume" : "Loading..."}
            </button>
            {isLoggedIn && (
              <>
                <button
                  onClick={handleResumeUploadClick}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "125px",
                    background: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  title="Edit Resume"
                >
                  <FiEdit size={20} />

                </button>
                <input
                  type="file"
                  accept=".pdf"
                  ref={resumeInputRef}
                  onChange={handleResumeChange}
                  style={{ display: "none" }}
                />
              </>
            )}
            <Link to="/portfolio" className="px-4 py-2 b2 text-center">
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
