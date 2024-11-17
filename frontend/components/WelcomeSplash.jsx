import React, { useState, useEffect } from 'react';

const WelcomeSplash = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasAnimationCompleted, setHasAnimationCompleted] = useState(false);

    useEffect(() => {
        // Auto-close after 3.5 seconds
        const timer = setTimeout(() => {
            closeSplash();
        }, 3500);
        
        return () => clearTimeout(timer);
    }, []);

    const closeSplash = () => {
        setHasAnimationCompleted(true);
        // Wait for exit animation to complete
        setTimeout(() => {
            setIsVisible(false);
        }, 500);
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[1100] bg-[#1A202C] flex items-center justify-center 
            ${hasAnimationCompleted ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
            <div className={`text-center ${hasAnimationCompleted ? 'animate-slideOut' : 'animate-slideIn'}`}>
                <img
                    src="assets/LOGO/BACK.png"
                    alt="Study With Rishika Logo"
                    className="w-32 h-32 mx-auto mb-6 animate-float"
                />
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Welcome to Study With Rishika!
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                    Your journey to academic excellence begins here
                </p>
                <button
                    onClick={closeSplash}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 
                        transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default WelcomeSplash;