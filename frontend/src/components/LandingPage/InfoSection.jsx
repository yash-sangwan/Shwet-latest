import React from "react";
import AnimatedStaticButton from "./Animated Components/AnimatedStaticButton";
import CardZkTLS from "./CardsAnimated/CardZkTLS";
import UNI from "./CardsAnimated/UNI";
import World from "./CardsAnimated/World";
import InsuranceUseCase from "./CardsAnimated/InsuranceUseCase";
import Graph from "./CardsAnimated/Graph";

function InfoSection() {
  const data = [
    {
      header: "Heading 1",
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      header: "Heading 2",
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      header: "Heading 3",
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      header: "Heading 4",
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      header: "Heading 5",
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
  ];

  return (
    <section className="relative w-full flex flex-col justify-start items-center">
      <div className="absolute h-[2px] top-0 w-full bg-gradient-to-r from-zinc-900 via-purple-500 to-zinc-900 animate-gradient-x"></div>
      <div>
        <AnimatedStaticButton text="Information" />
      </div>
      <div className="relative my-10 mx-10 exsm:w-[95%] esm:w-[80%] sm:w-[70%] md:w-[95%] lg:w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {data.map((item, index) => {
            const colSpan = index >= 3 ? 'col-span-1 md:col-span-1' : 'col-span-1 md:col-span-1 lg:col-span-1';
            return (
              <div
                className={`pb-[3px] px-[5px] border-2 border-zinc-600 rounded-xl flex flex-col items-center h-full ${colSpan}`}
                key={index}
              >
                <div className="px-4 py-2 text-white text-left flex flex-col justify-start">
                  <p className="text-xl font-semibold">{item.header}</p>
                  <p>{item.info}</p>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden flex-grow md:h-[280px] h-[280px]">
                  {index === 0 && <UNI />}
                  {index === 1 && <CardZkTLS />}
                  {index === 2 && <InsuranceUseCase />}
                  {index === 3 && <World />}
                  {index === 4 && <Graph />}
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
