import React from 'react';
import { useState, useRef, useEffect } from 'react';

const SnapScrollCarousel = ({ children, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;
  
  // Handle wheel event for horizontal scrolling
  const handleWheel = (() => {
    let isAnimating = false;
    let accumulatedDelta = 0;
    let lastScrollTime = 0;
    const SCROLL_COOLDOWN = 500; // Time in ms before allowing another scroll action
    const DELTA_THRESHOLD = 30; // Threshold to trigger a scroll
    
    return (e) => {
      e.preventDefault();
      const now = Date.now();
      
      // Accumulate delta values
      accumulatedDelta += e.deltaY;
      
      // Return early if we're still animating or in cooldown period
      if (isAnimating || (now - lastScrollTime < SCROLL_COOLDOWN && Math.abs(accumulatedDelta) < DELTA_THRESHOLD * 3)) {
        return;
      }
      
      // Determine scroll direction based on accumulated delta
      let direction = 0;
      if (accumulatedDelta > DELTA_THRESHOLD) {
        direction = 1;
      } else if (accumulatedDelta < -DELTA_THRESHOLD) {
        direction = -1;
      } else {
        return; // Not enough accumulated delta to trigger a scroll
      }
      
      // Reset accumulated delta
      accumulatedDelta = 0;
      lastScrollTime = now;
      
      // Calculate new index with circular navigation
      let newIndex;
      if (currentIndex === 0 && direction === -1) {
        newIndex = itemCount - 1;
      } else if (currentIndex === itemCount - 1 && direction === 1) {
        newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(itemCount - 1, currentIndex + direction));
      }
      
      // Only update if index changed
      if (newIndex !== currentIndex) {
        isAnimating = true;
        setCurrentIndex(newIndex);
        
        // Smooth scroll with animation
        smoothScrollToIndex(newIndex, () => {
          isAnimating = false;
        });
      }
    };
  })();
  
  // Scroll to specific index
  const smoothScrollToIndex = (index, callback) => {
    const targetElement = document.getElementById(`item-${index}`);
    if (!targetElement) {
      if (callback) callback();
      return;
    }
    
    const container = document.getElementById('scrollable-container'); // Replace with your container id
    if (!container) {
      if (callback) callback();
      return;
    }
    
    const targetPosition = targetElement.offsetLeft - 
      (container.clientWidth / 2) + (targetElement.clientWidth / 2);
    
    // Use smooth scrolling behavior
    container.scrollTo({
      left: targetPosition,
      behavior: 'smooth'
    });
    
    // Wait for animation to complete before allowing next scroll
    setTimeout(callback, 450); // Slightly less than SCROLL_COOLDOWN
  };
  
  // Ensure wheel events are properly captured
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Add passive: false to ensure preventDefault works
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;
      
      // Simulate wheel event based on touch swipe
      if (Math.abs(difference) > 50) {
        const simulatedEvent = {
          deltaY: difference > 0 ? 100 : -100,
          preventDefault: () => {}
        };
        handleWheel(simulatedEvent);
      }
    }, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, itemCount]);
  
  // Initial scroll to first item
  useEffect(() => {
    if (containerRef.current && childrenArray.length > 0) {
      smoothScrollToIndex(0);
    }
  }, []);
  
  // Handle manual navigation
  const goToItem = (index) => {
    const newIndex = Math.max(0, Math.min(itemCount - 1, index));
    setCurrentIndex(newIndex);
    smoothScrollToIndex(newIndex);
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
              className={`snap-x-item flex-shrink-0 snap-center transition-all duration-300 overflow-y-hidden ${
                isActive ? 'snap-x-center w-full opacity-100' : 'w-0 opacity-0'
              }`}
            >
              {child}
            </div>
          );
        })}
      </div>

      <div className="justify-between mt-4 max-w-2xl mx-auto">
        <div className="flex mx-auto w-1/2">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-4 mx-auto p-2 ${i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => goToItem(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnapScrollCarousel;