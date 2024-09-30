import React from "react";
import assets from "../../assets/assets";

function Doc() {
  const points = [
    "Web1 started during the 1990s, and it was a period marked by people connecting to the internet and reading what was there, but not publishing or contributing themselves.",
    "Web2 came into being during the early 2000s with the rise of socialmedia, faster internet speeds, and mobile devices. Web2 was a periodmarked by user generated content, targeted advertising, andcorporate owned data.",
    "Web3 is a new era of the internet that is currently emerging thanksto the power of blockchain technology. Web3 is marked by user-owneddata, open-source software, decentralized platforms, propertyrights, collective action, digital money (cryptocurrencies) and interoperability",
  ];

  return (
    <div className="relative h-max mt-20 flex justify-center font-Montserrat">
      <div className="flex flex-col mx-9 my-9 gap-10 w-[90%] md:w-[80%] lg:w-[1024px]">
        {/* <div className="h-max my-6 flex text-[5rem] md:text-[8rem] lg:text-[10rem]">
          🧠
        </div> */}

        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img src={assets.Web3} className="w-[80%] md:w-[300px] lg:w-[400px] rounded-xl" />
            <div className="flex flex-col gap-5">
              <p className="text-PURPLESHADE3 text-4xl lg:text-6xl text-left font-semibold font-Poppins">
                Understanding Web 3
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
        </div>
        
        <div className="flex flex-col items-start gap-8">
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
        </div>
        
        <div className="flex flex-col items-start gap-8">
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
        </div>

      </div>
    </div>
  );
}

export default Doc;
