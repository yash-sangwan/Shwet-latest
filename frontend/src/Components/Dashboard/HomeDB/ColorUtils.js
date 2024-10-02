// Function to generate a random number within a range
const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Function to generate a random mid-tone color
  export const getRandomMidToneColor = () => {
    const hue = randomInRange(0, 360);
    const saturation = randomInRange(40, 60);
    const lightness = randomInRange(40, 60);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  // Function to generate a slightly lighter shade of a given color
  export const getLighterShade = (color, amount) => {
    const [h, s, l] = color.match(/\d+/g).map(Number);
    const newLightness = Math.min(l + amount, 100);
    return `hsl(${h}, ${s}%, ${newLightness}%)`;
  };
  
  // Function to generate a mid-tone gradient
  export const getMidToneGradient = () => {
    const color1 = getRandomMidToneColor();
    const color2 = getRandomMidToneColor();
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
  };
  
  // Function to generate a slightly darker shade of a given color
  export const getDarkerShade = (color, amount) => {
    const [h, s, l] = color.match(/\d+/g).map(Number);
    const newLightness = Math.max(l - amount, 0);
    return `hsl(${h}, ${s}%, ${newLightness}%)`;
  };
  
  // Function to generate a complementary color
  export const getComplementaryColor = (color) => {
    const [h, s, l] = color.match(/\d+/g).map(Number);
    const complementaryHue = (h + 180) % 360;
    return `hsl(${complementaryHue}, ${s}%, ${l}%)`;
  };