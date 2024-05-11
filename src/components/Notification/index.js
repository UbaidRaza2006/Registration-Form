import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Import your stylesheet

const Notification = ({ message, success, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const progressRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Animate progress bar depletion
    const animateProgress = () => {
      if (!isVisible || !progressRef.current) return;
      progressRef.current.style.width = `${progressRef.current.offsetWidth - (progressRef.current.offsetWidth / duration) * 10}px`;
      if (progressRef.current.offsetWidth > 0) {
        requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();

    return () => clearTimeout(timeout);
  }, [isVisible, duration]);

  const notificationClasses = success ? 'notification success' : 'notification error'; // Class assignment based on success prop

  return (
    isVisible && (
      <div className={notificationClasses}>
        <p className="message">{message}</p>
        <div ref={progressRef} className="progressBar" />
      </div>
    )
  );
};

export default Notification;
