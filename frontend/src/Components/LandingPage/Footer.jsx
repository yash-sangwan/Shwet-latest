import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center border-t border-gray-700 pt-6">
          <div className="mb-4">
            {/* <img src="path/to/logo.png" alt="NACE" className="h-12" /> */}
          </div>

          <div className=" text-center md:text-left max-w-2xl mx-auto">
            <p className="text-PURPLESHADE3 font-semibold mb-2">
              Shwet - An incentivized tool for Data collaboration
            </p>
            <p className=" text-gray-400 text-sm">
            Shwet never discriminates in terms of religion, gender, race, color, etc, in any manner. We embrace diversity and foster an inclusive environment where all individuals are valued and respected. Our commitment to equality drives innovation and strengthens our community.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; 2024 Shwet All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://x.com/beshwet"
              className="text-white hover:text-PURPLESHADE3"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Custom SVG for X icon */}
              <FaXTwitter />
            </a>
            <a
              href="https://x.com/beshwet"
              className="text-white hover:text-PURPLESHADE3"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Custom SVG for X icon */}
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
