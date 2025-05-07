import React from 'react';

const Personal = () => {
  const personalInfo = [
    { label: 'Father', value: 'Mr. Ranjan Kumar Paul' },
    { label: 'Gender', value: 'Male' },
    { label: 'Languages', value: 'Bengali, Hindi and English' },
    { label: 'Hobby', value: 'Playing cricket, playing guitar, teaching, editing videos' },
    { label: 'DOB', value: '10.02.1995' },
  ];

  return (
    <div className="text-left ">
      <p className="text-2xl font-mono">Personal Information</p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      <div className="space-y-1">
        {personalInfo.map((item, index) => (
          <div key={index} className="flex m-0">
            <p className=" mr-2 m-0">{item.label}:</p>
            <p className="m-0 ms-2 font-light">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personal;
