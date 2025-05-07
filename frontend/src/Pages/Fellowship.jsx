import React, { useState } from "react";

// Small reusable component for each publication item
const FellowshipItems = ({ year, text }) => {
  return (
    <div className="flex font-light mb-3">
      <div className="font-semibold">{year}:</div>
      <p className="text-left ms-2">{text}</p>
    </div>
  );
};

const Fellowship = () => {
  const publications = [
    {
      year: "2020-present",
      text: "Institute Fellowship as a Ph.D. research scholar at Indian Institute of Engineering Science and Technology (IIEST), Shibpur.",
    },
    {
      year: "2017",
      text: "Achieved 1st position making quadcopter (robotics championship zonal round) under ARK Techno solutions and robokart.com (IIT Madras).",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleViewLess = () => {
    setVisibleCount(3);
  };

  return (
    <div>
      <p className="text-left text-2xl font-mono">Fellowship & Award</p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      {publications.slice(0, visibleCount).map((pub, index) => (
        <FellowshipItems key={index} year={pub.year} text={pub.text} />
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
    </div>
  );
};

export default Fellowship;
