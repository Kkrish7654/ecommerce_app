"use client";

import React, { useState } from "react";

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % React.Children.count(children)
    );
  };

  const prev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + React.Children.count(children)) %
        React.Children.count(children)
    );
  };

  return (
    <div className="relative w-full min-h-[50vh] overflow-hidden z-[-1]">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div className="w-full flex-shrink-0">{child}</div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black px-2 py-1"
        onClick={prev}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black px-2 py-1"
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>;
};
