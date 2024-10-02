import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Grid from "./Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Price() {
  
  const features = [
    "Fully-managed human data services",
    "Quality guarantee (SLA)",
    "Full access to the Labelbox platform & tools",
    "Dedicated technical support & contact channels",
    "Custom pricing options & volume discounts available",
  ];

  return (
    <div>
      <div className="w-full pt-96 relative">
        <Grid />
        <div className="absolute top-[0%] z-20 w-full flex flex-col justify-center items-center">
          <div className="text-5xl my-7 font-Montserrat">Get to know our <span className="text-PURPLESHADE3">plans</span> and <span className="text-PURPLESHADE3">pricing</span>
          </div>
          <p className="text-sm w-full md:w-[50%] text-wrap mb-12">Choose the plan that's right for you and your team. Our offerings are designed to meet your needs today with the flexibility to grow. All are powered by the industry's most advanced labeling platform. </p>
          <div className="text-black w-[40%] bg-white rounded-3xl">
            <div className="text-left px-4 py-8 flex flex-col gap-3">
              <div className="text-5xl text-PURPLESHADE3 font-bold">
                Enterprise
              </div>
              <div>
                Internet scale data factory for frontier model builders and
                enterprise AI teams that want high-quality human data generated
                quickly for post training, evals and safety.
              </div>
              <div className="flex flex-col">
                {features.map((item, index) => (
                  <div className="flex flex-row gap-3 justify-start items-start" key={index}>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-2" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center text-white bg-PURPLESHADE4 hover:bg-PURPLESHADE3 py-4 rounded-2xl">
                <button>Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-10 my-10 flex flex-row gap-9 justify-center">
        <div className="text-black w-[40%] bg-white rounded-3xl">
          <div className="text-left px-4 py-8 flex flex-col gap-3">
            <div className="text-5xl text-PURPLESHADE3 font-bold">
              Enterprise
            </div>
            <div>
              Internet scale data factory for frontier model builders and
              enterprise AI teams that want high-quality human data generated
              quickly for post training, evals and safety.
            </div>
            <div className="flex flex-col">
              {features.map((item, index) => (
                <div className="flex flex-row gap-3 justify-start items-start">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-2" />
                  <div>{item}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center text-white bg-PURPLESHADE4 hover:bg-PURPLESHADE3 py-4 rounded-2xl">
              <button>Contact Us</button>
            </div>
          </div>
        </div>
        <div className="text-black w-[40%] bg-white rounded-3xl">
          <div className="text-left px-4 py-8 flex flex-col gap-3">
            <div className="text-5xl text-PURPLESHADE3 font-bold">
              Enterprise
            </div>
            <div>
              Internet scale data factory for frontier model builders and
              enterprise AI teams that want high-quality human data generated
              quickly for post training, evals and safety.
            </div>
            <div className="flex flex-col">
              {features.map((item, index) => (
                <div className="flex flex-row gap-3 justify-start items-start">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-2" />
                  <div>{item}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center text-white bg-PURPLESHADE4 hover:bg-PURPLESHADE3 py-4 rounded-2xl">
              <button>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Price;
