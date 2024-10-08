import React from "react";
import AnimatedStaticButton from "./AnimatedComponents/AnimatedStaticButton";
import World from "./CardsAnimated/World";
import Graph from "./CardsAnimated/Graph";
import Usecase1 from "./CardsAnimated/Usecase1";
import Usecase3 from "./CardsAnimated/Usecase3";
import Usecase2 from "./CardsAnimated/Usecase2";
import Usecase4 from "./CardsAnimated/Usecase4";
import Usecase5 from "./CardsAnimated/Usecase5";

function InfoSection() {
  const data = [
    {
      header: "Text Annotation",
      info: "Label, clean, process any type of text data.",
    },
    {
      header: "Image Labelling & Classification",
      info: "Classification and Labelling of different image data.",
    },
    {
      header: "Audio Interpretation",
      info: "Transribe and process audio data",
    },
    {
      header: "Time Series Data (Coming Soon)",
      info: "Support for real-time data processing coming soon.",
    },
    {
      header: "3D & Mapping (Coming Soon)",
      info: "Support for 3D images and graph mapping coming soon.",
    },
  ];

  return (
    <section className="relative w-full flex flex-col justify-start items-center">
      <div className="absolute h-[2px] top-0 w-full bg-gradient-to-r from-zinc-900 via-purple-500 to-zinc-900 animate-gradient-x"></div>
      <div>
        <AnimatedStaticButton text="Usecases" />
      </div>
      <div className="relative my-10 mx-10 exsm:w-[95%] esm:w-[80%] sm:w-[70%] md:w-[95%] lg:w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center items-center">
          {data.map((item, index) => {
            const colSpan =
              index >= 3
                ? "col-span-1 md:col-span-2 lg:col-span-3"
                : "col-span-1 md:col-span-2 lg:col-span-2";
            return (
              <div
                className={`pb-[3px] px-[5px] border-2 border-zinc-600 rounded-xl flex flex-col items-center h-full ${colSpan}`}
                key={index}
              >
                <div className="px-4 py-2 text-white  flex flex-col justify-start">
                  <p className="text-xl font-semibold">{item.header}</p>
                  <p>{item.info}</p>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden flex-grow md:h-[280px] h-[280px]">
                  {index === 0 && <Usecase1 />}
                  {index === 1 && <Usecase2 />}
                  {index === 2 && <Usecase3 />}
                  {index === 3 && <Usecase4 />}
                  {index === 4 && <World />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
