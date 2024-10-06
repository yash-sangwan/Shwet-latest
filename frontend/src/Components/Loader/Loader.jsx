import { useState, useEffect } from 'react';

export default function Loader() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <div
        className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: `${colors[colorIndex]} transparent` }}
      />
    </div>
  );
}
