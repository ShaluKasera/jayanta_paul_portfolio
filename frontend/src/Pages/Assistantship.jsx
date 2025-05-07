import React, { useState } from "react";

// Small reusable component for each publication item
const AssistantshipItem = ({ year, text }) => {
  return (
    <div className="flex font-light mb-3">
      <div className="font-semibold">{year}:</div>
      <p className="text-left ms-2">{text}</p>
    </div>
  );
};

const Assistantship = () => {
  const publications = [
   
    { year: "2022-2024", text: "CS4271: Artificial Intelligence Lab, Indian Institute of Engineering Science and Technology(IIEST)." },
    { year: "2021-2023", text: "CS4172: Machine Learning Laboratory, Indian Institute of Engineering Science and Technology(IIEST)." },
    { year: "2019-2024", text: "CS1271: Introduction to Computing, Indian Institute of Engineering Science and Technology(IIEST)." },
    { year: "2022-2024", text: "CS3273: Software Engineering Lab, Indian Institute of Engineering Science and Technology(IIEST)." },
    { year: "2021-2024", text: "CS3183: Soft Computing Lab, Indian Institute of Engineering Science and Technology(IIEST)." },
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
      <p className="text-left text-2xl font-mono">Laboratory Assistantship</p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      {publications.slice(0, visibleCount).map((pub, index) => (
        <AssistantshipItem key={index} year={pub.year} text={pub.text} />
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

export default Assistantship;
