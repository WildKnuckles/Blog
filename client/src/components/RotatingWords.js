import React, { useState, useEffect } from 'react';

const RotatingWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % 6);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const words = [
    'gramáticas',
    'vocabulários',
    'planos de aulas',
    'mais culturas',
    'topónimos',
    'antropónimos',
  ];

  return (
    <div style={{
      width: '200px',
      height: '50px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {words.map((word, index) => (
        <div
          key={word}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%', 
            opacity: index === currentIndex ? '1' : '0',
            transform: index === currentIndex ? 'translateX(0)' : 'translateY(100%)',
            transition: 'opacity 0.5s, transform 0.5s',
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default RotatingWords;