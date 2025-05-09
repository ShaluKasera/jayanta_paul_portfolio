import React from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-24 py-0">
        <p className="flex items-center space-x-2">
          <FaPhoneVolume className="text-xl" />
          <span>(+91) 7001976767</span>
        </p>
        <p className="flex items-center space-x-2">
          <IoIosMail className="text-xl" />
          <span>jayantapaul888@gmail.com</span>
        </p>
        <a href="https://www.linkedin.com/in/jayanta-paul-228789146/" className="no-underline text-black ">
          <p className="flex items-center space-x-2">
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </p>
        </a>
      </div>
    </>
  );
};

export default Footer;
