import React from "react";
import assets from "../../assets/assets";

function Doc() {
  const points = [
    "You get to earn in return of the value you provide. Everytime you complete a task posted on Shwet by a project maintainer/enterprises, once your contribution is approved, your earned tokens get credited to your Shwet account.",
    "You can become initial contributors to the data for AI/ML models that may have a crucial impact on people in near future.",
    "Get early exposure to work with Data/AI/ML companies by displaying your contributions through showcase profiles and analytics",
    "Become a part in revoluntizing decentralization in data, to make future models and AI fairer, less biased and more accurate."
  ];

  return (
    <div className="relative h-max mt-20 flex justify-center font-Montserrat">
      <div className="flex flex-col mx-9 my-9 gap-10 w-[90%] md:w-[80%] lg:w-[1024px]">
        {/* <div className="h-max my-6 flex text-[5rem] md:text-[8rem] lg:text-[10rem]">
          🧠
        </div> */}

        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={assets.Web3} className="w-[80%] md:w-[300px] lg:w-[400px] rounded-xl" />
            <div className="flex flex-col gap-5">
              <h1 className="text-PURPLESHADE3 text-2xl lg:text-4xl text-left font-semibold font-Montserrat">
                Rewarded Contributors, Better Results
              </h1>
              <p className="text-left text-xl font-Montserrat">
                We believe every contribution, small or big, private or open-source, is valuable & shouldn't go empty handed at the end of the day. At Shwet, we are continously working to achieve the goal of rewarding every developer, data engineer, AI/ML practitionor who makes any contribution to a project or task on Shwet, with Shwet's native tokens which can later be used to gain some serious earnings!
              </p>
            </div>
          </div>
          <div className="text-PURPLESHADE3 text-4xl text-left font-semibold font-Montserrat py-3">
            Why should you contribute on Shwet?{" "}
          </div>
          {points.map((item, index) => (
            <div className="flex gap-6 py-1" key={index}>
              <div className="h-3 w-3 lg:h-4 lg:w-4 my-2 rounded-full bg-PURPLESHADE3"></div>
              <p className="w-[90%] text-left text-xl">{item}</p>
            </div>
          ))}

          <div className="text-left text-2xl py-2">
            If you are ready, get started by login to the Shwet Playground. And If these reasons are not enough for you to get motivated, head over to our <a href="/" className="text-blue-400">FAQs </a>section to get answers to any questions, that might be stopping you to get started. 
          </div>
        </div>
        
        {/* <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img src={assets.Solana} className="w-full md:w-[300px] lg:w-[400px] rounded-xl" />
            <div className="flex flex-col gap-5">
              <p className="text-PURPLESHADE3 text-4xl lg:text-6xl text-left font-semibold font-Poppins">
               Solana Blockchain
              </p>
              <div className="text-left text-2xl">
                The internet has been evolving ever since it was created, and it
                has been through many eras.
              </div>
            </div>
          </div>
          <div className="text-PURPLESHADE3 text-4xl text-left font-semibold font-Poppins py-3">
            Know what matters{" "}
          </div>
          {points.map((item, index) => (
            <div className="flex gap-6 py-1" key={index}>
              <div className="h-3 w-3 lg:h-4 lg:w-4 my-2 rounded-full bg-PURPLESHADE3"></div>
              <p className="w-[90%] text-left text-xl">{item}</p>
            </div>
          ))}

          <div className="text-left text-2xl py-2">
            Web3 is attempting to solve many of the problems that arose during
            Web1 and Web2, and it will hopefully be yet another step in the
            direction of a digital world that works better for more people.
          </div>
        </div> */}
        
        {/* <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img src={assets.Solana} className="w-full md:w-[300px] lg:w-[400px] rounded-xl" />
            <div className="flex flex-col gap-5">
              <p className="text-PURPLESHADE3 text-4xl lg:text-6xl text-left font-semibold font-Poppins">
              Zero Knowledge Compression
              </p>
              <div className="text-left text-2xl">
                The internet has been evolving ever since it was created, and it
                has been through many eras.
              </div>
            </div>
          </div>
          <div className="text-PURPLESHADE3 text-4xl text-left font-semibold font-Poppins py-3">
            Know what matters{" "}
          </div>
          {points.map((item, index) => (
            <div className="flex gap-6 py-1" key={index}>
              <div className="h-3 w-3 lg:h-4 lg:w-4 my-2 rounded-full bg-PURPLESHADE3"></div>
              <p className="w-[90%] text-left text-xl">{item}</p>
            </div>
          ))}

          <div className="text-left text-2xl py-2">
            Web3 is attempting to solve many of the problems that arose during
            Web1 and Web2, and it will hopefully be yet another step in the
            direction of a digital world that works better for more people.
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default Doc;
