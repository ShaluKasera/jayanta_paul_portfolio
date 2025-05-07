import React, { useState } from 'react';

const ResponsibilityItem = ({ year, text }) => {
  return (
    <div className="flex font-light mb-3 text-left">
      <div className="font-semibold w-32">{year}:</div>
      <p className="ms-2">{text}</p>
    </div>
  );
};

const Responsibility = () => {
  const responsibilities = [
    {
      year: '2014-2017',
      text: 'Class representative in CSE Department, Global Institute Of Management And Technology.',
    },
    {
      year: '2023-2024',
      text: 'Year representative, Ph.D., CST Department, Indian Institute of Engineering Science and Technology (IIEST).',
    },
    {
      year: '2023-2024',
      text: 'Treasurer, Academic Society of Computer Engineers, CST Department, Indian Institute of Engineering Science and Technology (IIEST).',
    },
    {
      year: 'March 22-24, 2023',
      text: 'Organizer, Revelation, The Departmental Fest of CST, Indian Institute of Engineering Science and Technology (IIEST).',
    },
    {
      year: 'April 4-6, 2024',
      text: 'Committee Convenor, Revelation, The Departmental Fest of CST, Indian Institute of Engineering Science and Technology (IIEST).',
    },
    {
      year: 'March 21-23, 2025',
      text: 'ML Event Lead, Revelation, Academic Society of Computer Engineers, CST Department, Indian Institute of Engineering Science and Technology (IIEST).',
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, responsibilities.length));
  };

  const handleViewLess = () => {
    setVisibleCount(3);
  };

  return (
    <div className="text-left">
      <p className='text-2xl font-mono'>Position of Responsibility</p>
      <div className='bgblue w-full h-[2px] mb-2'></div>

      {responsibilities.slice(0, visibleCount).map((item, index) => (
        <ResponsibilityItem key={index} year={item.year} text={item.text} />
      ))}

      <div className="mt-2 flex justify-center gap-4">
        {visibleCount < responsibilities.length && (
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

export default Responsibility;
