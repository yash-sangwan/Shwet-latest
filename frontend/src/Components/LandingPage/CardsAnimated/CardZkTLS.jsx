import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import assets from "../../../assets/assets";

function CardZkTLS() {
  const [isHovered, setIsHovered] = useState(false);
  const [blurred, setBlurred] = useState();


  useEffect(()=>{
    if(isHovered){
      setTimeout(()=>{
          setBlurred(true)
      }, 300)
    }
    else{
      setTimeout(()=>{
          setBlurred(false)
      }, 300)
    }
  } , [isHovered])

  return (
    <>
            <motion.div
          className="relative w-full h-full bg-black border-[1px] border-zinc-700 rounded-2xl flex flex-col justify-around items-center"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative w-[97%] h-[96.5%] bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-600/50 border-[px] border-zinc-700 rounded-2xl flex flex-col overflow-hidden">
            <div className="relative flex flex-row">
              <div className="px-4 py-2 flex">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 scale-75 border-[1px] border-zinc-800 rounded-full bg-white"
                  ></div>
                ))}
              </div>
              <div className="absolute -top-[2px] left-[35%] w-[30%] h-[30px] bg-black border-zinc-700 border-b-[1px] border-l-[1px] border-r-[1px] rounded-b-xl z-10"></div>
            </div>
            <div className="relative mt-11 mx-4 flex flex-col items-center gap-3 pb-7 z-20">

              <div className="relative w-[90%] flex flex-row justify-between ">
                <div className="w-[25%] h-[20px] bg-white bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"></div>
                <div className="w-[10%] h-[20px] bg-white bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"></div>
              </div>

              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[90%] h-[22px] bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"
                ></div>
              ))}
            </div>
            <div className="absolute w-[60%] h-[80%] z-30 bottom-0 left-[20%] border-t-[2px] border-l-[3px] border-r-[3px] border-[#C0C0C0] rounded-t-3xl">
              <div className="relative w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-900/95 border-zinc-900 border-t-[5px] border-l-[5px] border-r-[5px] rounded-t-[20px] overflow-hidden">
                {/* Green button animation */}
                <motion.div
                  className="absolute w-full h-full bg-green-300/20 z-30"
                  style={{ transformOrigin: "bottom" }} // Scale animation starts from the bottom
                  initial={{ scaleY: 0 }}
                  animate={isHovered ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.1, delay : 0.8, ease: "easeInOut" }}
                ></motion.div>

                {/* Checkmark animation */}
                <motion.img
                  className="absolute w-[50px] left-[35%] top-[40%]"
                  src={assets.CheckMark}
                  initial={{ scale: 0 }}
                  animate={isHovered ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.1, delay: 0.8 }}
                />

                {/* Content that blurs when hovering */}
                <motion.div
                  className={`relative flex flex-col gap-4 ${
                   (isHovered && blurred) ? "blur-sm" : "blur-0"
                  }`}
                  transition={{
                    duration: 0.5,
                    delay: isHovered ? 0.1 : 0.2, // Add delay when hovering
                  }}
                >
                  <div className="relative flex justify-center items-center">
                    <div className="w-[35%] h-[20px] bg-black rounded-3xl mt-2"></div>
                  </div>
                  <div className="flex flex-col gap-6 items-center px-2">
                    <div className="flex flex-row w-full gap-3">
                      <div className="px-2 w-[40%] h-full">
                        <img
                          className="w-[70px] h-[50px] rounded-lg"
                          src={assets.NFT}
                          alt=""
                        />
                      </div>
                      <div className="w-[50%] flex flex-col gap-3">
                        <div className="w-full h-[20px] bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"></div>
                        <div className="w-full h-[20px] bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"></div>
                      </div>
                    </div>
                    <div className="w-full h-[20px] bg-zinc-500/10 border-[1px] border-zinc-600 rounded-2xl"></div>
                    <div className="flex flex-row w-full justify-evenly">
                      <motion.div
                        className="w-[40%] h-[24px] bg-green-800/20 border-[1px] rounded-2xl border-zinc-600"
                        initial={{ scale: 1 }}
                        animate={isHovered ? { scale: [0.8, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <div className="w-[40%] h-[24px] bg-red-800/20 border-[1px] rounded-2xl border-zinc-600"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
    </>
  );
}

export default CardZkTLS;