import React, { useState, useEffect, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles"; // Make sure to import correctly

const ParticleEffect = () => {
  const [ init, setInit ] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
      initParticlesEngine(async (engine) => {
          await loadFull(engine);
      }).then(() => {
          setInit(true);
      });
  }, []);

  return (
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            enable: false, // Ensure particles are inside a container
          },
          particles: {
            number: {
              value: 50,
            },
            color: {
              value: "#eab308", // Particles color
            },
            opacity: {
              value: 0.6,
              anim: {
                enable: true,
                speed: 2,
                opacity_min: 0,
              },
            },
            size: {
              value: 5,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "top", // Moves upwards
              outMode: "out",
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px", // Height of the particles container
          zIndex: 0,
        }}
      />
  );
};

export default ParticleEffect;
