import React, { useState, useEffect } from 'react';

const WelcomeSplash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeSplash();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const closeSplash = () => {
    setHasAnimationCompleted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1100] bg-black flex items-center justify-center
      ${hasAnimationCompleted ? 'animate-fadeOut' : 'animate-fadeIn'}`}
    >
      <div className={`text-center space-y-6 p-8 rounded-2xl bg-black/50 backdrop-blur-sm
        ${hasAnimationCompleted ? 'animate-slideOut' : 'animate-slideIn'}`}>
        <div className="relative">
          <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 group-hover:opacity-100 transition duration-200" />
          <img
            src="assets/LOGO/BACK.png"
            alt="Study With Rishika Logo"
            className="relative w-32 h-32 mx-auto animate-float hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Welcome to Study With Rishika!
        </h1>

        <p className="text-xl text-gray-300">
          Your journey to academic excellence begins here
        </p>

        <button
          onClick={closeSplash}
          className="group relative px-8 py-3 text-lg font-semibold"
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-purple-500 group-hover:-translate-x-0 group-hover:-translate-y-0" />
          <span className="absolute inset-0 w-full h-full bg-blue-600 border-2 border-black group-hover:bg-purple-600" />
          <span className="relative text-white group-hover:text-white">
            Get Started
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeSplash;