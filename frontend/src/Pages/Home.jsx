import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import img1 from "../assets/img1.jpeg"
const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full items-center lg:items-start">
        {/* Left side — Circle */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-20">
          <div >
             <img src={img1} alt="pic" className=' h-60 w-60 rounded-full lg:h-80 lg:w-80' />
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto">
          <a href="https://drive.google.com/file/d/16904LpOdO_LQ2uF1KDjq-jSmqLZ4glk9/view?usp=sharing" download>
            <button className="px-4 py-2 b w-full">Resume</button>
            </a>
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
