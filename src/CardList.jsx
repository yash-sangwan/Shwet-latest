import React, { useRef } from 'react';
import content from './Content';
import Card from './Card';

const CardsList = () => {
  const listRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    listRef.current.classList.add('cursor-grabbing'); // Show hand gesture while dragging
    startX = e.pageX - listRef.current.offsetLeft;
    scrollLeft = listRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
    listRef.current.classList.remove('cursor-grab');
  };

  return (
    <div
      ref={listRef}
      className="flex space-x-6 overflow-x-auto p-6 scrollbar-hide snap-x cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ 
        scrollBehavior: 'smooth', // Smooth scrolling
        width: 'calc(100% + 100px)' // Extend width beyond the visible area
      }}
    >
      {content.map((item) => (
        <div key={item.id} className="flex-shrink-0 snap-center">
          <Card
            heading={item.heading}
            video={item.video}
            isWhite={item.id === 2}  // Dynamic text color for the second card
          />
        </div>
      ))}
    </div>
  );
};

export default CardsList;
