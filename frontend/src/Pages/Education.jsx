import React from 'react';

// 1. Small component inside the same file
const DegreeItem = ({ text }) => {
  return (
    <p className="text-left font-light mb-2">
      {text}
    </p>
  );
};

// 2. Main component
const Education = () => {
  const degrees = [
    "B.Tech in Computer Science & Engineering (2017), Global Institute of Management & Technology, Krishnanagar (MAKAUT, Formerly West Bengal University of Technology).",
    "M.Tech in Computer Science & Engineering (2020), Indian Institute of Engineering Science & Technology, Shibpur (Formerly Bengal Engineering and Science University of Technology).",
    "PhD in Computer Science & Engineering (2025), Indian Institute of Engineering Science & Technology, Shibpur (Formerly Bengal Engineering and Science University of Technology).",
  ];

  return (
    <div>
      <p className="text-left text-2xl font-mono">
        Education
      </p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      {degrees.map((degree, index) => (
        <DegreeItem key={index} text={degree} />
      ))}
    </div>
  );
};

export default Education;
