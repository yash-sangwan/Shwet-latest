import {
  Disclosure,
  DisclosureButton,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Answers({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the current index
  };

  return (
    <div className="w-full px-4">
      <div className="w-full divide-y divide-white/5 rounded-xl bg-white/5">
        {data.map((d) => (
          <div key={d.id} className="p-6">
            <Disclosure>
              <>
                <DisclosureButton
                  className="group flex w-full items-center justify-between"
                  onClick={() => handleToggle(d.id)}
                >
                  <span className="text-[20px] md:text-lg text-left font-medium text-white group-hover:text-white/80">
                    {d.question}
                  </span>
                  <ChevronDownIcon
                    className={`size-5 fill-white/60 group-hover:fill-white/50 transition-transform duration-200 ${
                      openIndex === d.id ? "rotate-180 transform" : ""
                    }`}
                  />
                </DisclosureButton>
                {openIndex === d.id && <div className="text-left text-[16px] md:text-base pt-2">{d.answer}</div>}
              </>
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}

Answers.propTypes = {
  data: PropTypes.array.isRequired,
};
