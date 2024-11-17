import React, { useState, useEffect } from 'react';

const WelcomeSplash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(false);

  useEffect(() => {
    // Automatically close splash after 3.5 seconds
    const timer = setTimeout(() => {
      closeSplash();
    }, 3500);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const closeSplash = () => {
    setHasAnimationCompleted(true);
    // Wait for exit animation to complete before unmounting
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  // Early return if splash should not be visible
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95
        ${hasAnimationCompleted ? 'animate-fadeOut' : 'animate-fadeIn'} 
        transition-opacity duration-500`}
    >
      <div 
        className={`text-center space-y-8 p-10 rounded-3xl 
          bg-black/50 backdrop-blur-md
          ${hasAnimationCompleted ? 'animate-slideOut' : 'animate-slideIn'}
          transition-all duration-500 transform`}
      >
        {/* Logo Container */}
        <div className="relative group w-40 h-40 mx-auto">
          <div className="absolute -inset-1 rounded-full blur-lg bg-gradient-to-r from-blue-500 to-purple-500 
            opacity-75 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300" />
          <img
            src="/api/placeholder/160/160"
            alt="Study With Rishika Logo"
            className="relative w-40 h-40 rounded-full animate-float 
              hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
          bg-clip-text text-transparent animate-fadeIn">
          Welcome to Study With Rishika!
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-300 animate-fadeIn delay-200">
          Your journey to academic excellence begins here
        </p>

        {/* Button */}
        <button
          onClick={closeSplash}
          className="group relative px-8 py-3 text-lg font-bold 
            hover:scale-105 transition-transform duration-300"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 
            ease-out transform translate-x-1 translate-y-1 bg-purple-500 
            group-hover:-translate-x-0 group-hover:-translate-y-0" />
          <span className="absolute inset-0 w-full h-full bg-blue-600 
            border-2 border-white/20 group-hover:bg-purple-600 
            transition-colors duration-300" />
          <span className="relative text-white group-hover:text-white">
            Get Started
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeSplash;