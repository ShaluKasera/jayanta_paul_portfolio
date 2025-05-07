import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
const RefereeItem = ({ name, position, department, institute, phone, email }) => {
  return (
    <div className="text-left m-0">
  <p className="font-semibold m-0">{name}</p>
  <p className='m-0'>{position}, {department}</p>
  <p className='m-0'>{institute}</p>
  <p className='m-0 flex '><FaPhoneAlt className='me-2 text-green-600 mt-0.5' />{phone}</p>
  <p className='mb-4 flex'><IoMdMail className='me-2 mt-1'/> {email}</p>
</div>

  );
};

const Referees = () => {
  const referees = [
    {
      name: 'Prof. Jaya Sil',
      position: 'Professor',
      department: 'Department of Computer Science & Technology',
      institute: 'IIEST, Shibpur',
      phone: '+91 -033 - 26684561',
      email: 'js@cs.iiests.ac.in',
    },
    {
      name: 'Dr. Malay Kule',
      position: 'Assistant Professor',
      department: 'Department of Computer Science & Engineering',
      institute: 'IIEST, Shibpur',
      phone: '+91 -033 - 26686151',
      email: 'malay@cs.iiests.ac.in',
    },
  ];

  return (
    <div className="text-left">
      <p className='text-2xl font-mono'>Referees</p>
      <div className='bgblue w-full h-[2px] mb-2'></div>

      {referees.map((ref, index) => (
        <RefereeItem
          key={index}
          name={ref.name}
          position={ref.position}
          department={ref.department}
          institute={ref.institute}
          phone={ref.phone}
          email={ref.email}
        />
      ))}
    </div>
  );
};

export default Referees;
