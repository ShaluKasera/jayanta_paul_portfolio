import React, { useState } from "react";
import Layout from "../components/Layout";
import Education from "./Education";
import Assistantship from "./Assistantship";
import Fellowship from "./Fellowship";
import Personal from "./Personal";
import Publication from "./Publication";
import Referees from "./Referees";
import Responsibility from "./Responsibility";
import Skills from "./Skills";
import Achievements from "./Achievements";

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState("Education");

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
      {/* Top blue divider */}
      <div className="w-10/12 h-[14px] mx-auto bgblue mb-6 "></div>

      {/* Responsive layout container */}
      <div className="flex flex-col md:flex-row w-11/12 mx-auto md:space-x-4 space-y-4 md:space-y-0 ">
        {/* Left div (ALWAYS first) */}
        <div className="px-2 py-2 w-full md:w-[25%] text-center">
          <div className="border h-[250px] mt-10 rounded-3xl"></div>
        </div>

        {/* Middle + Right container to control mobile order */}
        <div className="flex flex-col-reverse md:flex-row w-full md:w-[70%] md:space-x-4 space-y-4 md:space-y-0">
          
          {/* Middle dynamic content (last on mobile, middle on desktop) */}
          <div className="w-full md:w-[70%] text-center p-4 rounded-3xl min-h-[250px] ">
            {renderSection()}
          </div>

          {/* Right nav links (second on mobile, right on desktop) */}
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
