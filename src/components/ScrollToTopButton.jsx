import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Імпорт стилів

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Покажемо кнопку після прокрутки на 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <div className="scroll-to-top" onClick={scrollToTop}>
        <img src="/images/up.png" alt="Scroll to top" />
      </div>
    )
  );
};

export default ScrollToTopButton;
