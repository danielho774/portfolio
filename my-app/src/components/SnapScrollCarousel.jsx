import React from 'react';
import { useState, useRef, useEffect } from 'react';

const SnapScrollCarousel = ({ children, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;
  
  // Handle wheel event for horizontal scrolling
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Determine scroll direction
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Calculate new index and implement circular navigation
    // If at the end, go to start; if at start, go to end
    if (currentIndex === 0 && direction === -1) {
      setCurrentIndex(itemCount - 1);
      scrollToIndex(itemCount - 1);
      return;
    } else if (currentIndex === itemCount - 1 && direction === 1) {
      setCurrentIndex(0);
      scrollToIndex(0);
      return;
    } else {
      const newIndex = Math.max(0, Math.min(itemCount - 1, currentIndex + direction));
      
      // Only update if index changed
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
      }
    }
  };
  
  // Scroll to specific index
  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const items = container.querySelectorAll('.snap-item');
    
    if (items[index]) {
      // Smooth scroll to center the selected item
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };
  
  // Ensure wheel events are properly captured
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Add passive: false to ensure preventDefault works
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, itemCount]);
  
  // Initial scroll to first item
  useEffect(() => {
    if (containerRef.current && childrenArray.length > 0) {
      scrollToIndex(0);
    }
  }, []);
  
  // Handle manual navigation
  const goToItem = (index) => {
    const newIndex = Math.max(0, Math.min(itemCount - 1, index));
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };
  
  const goNext = () => goToItem(currentIndex + 1);
  const goPrev = () => goToItem(currentIndex - 1);
  
  return (
    <div className="static w-full">
      {/* Container with snap points */}
      <div
        ref={containerRef}
        className={`w-full flex snap-x ${className}`}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        {/* Wrap each child in a snap container */}
        {React.Children.map(children, (child, index) => {
          const isActive = index === currentIndex;
          //circular navigation
          const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === itemCount - 1);
          const isNext = index === currentIndex + 1 || (currentIndex === itemCount - 1 && index === 0);
          
          return (
            <div 
              className={`snap-item flex-shrink-0 snap-center transition-all duration-300 ${
                isActive ? 'snap-center w-full opacity-100' : 'w-0 opacity-0'
              }`}
            >
              {child}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-4 max-w-2xl mx-auto">
        <div className="flex mx-auto items-center space-x-1">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded p-2 ${i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => goToItem(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnapScrollCarousel;