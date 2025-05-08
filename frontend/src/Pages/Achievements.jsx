import React, { useState } from "react";

// Small reusable component for each publication item
const AchievementsItems = ({ year, text }) => {
  return (
    <div className="flex font-light mb-3">
      <div className="font-semibold">{year}:</div>
      <p className="text-left ms-2">{text}</p>
    </div>
  );
};

const Achievements = () => {
  const publications = [
    {
      year: "2023",
      text: "Invited for a talk in 'The Innovative Power of Machine Learning in Image Processing',during 6th-10th November, 2023 at Faculty Development Programme Organization- MCKV Institute of Engineering, Lilua, Howrah.",
    },
    {
      year: "2017",
      text: "Qualified GATE Examination",
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
      <p className="text-left text-2xl font-mono">Academic Achievements & Recognitions</p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      {publications.slice(0, visibleCount).map((pub, index) => (
        <AchievementsItems key={index} year={pub.year} text={pub.text} />
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

export default Achievements;
