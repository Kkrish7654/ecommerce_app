"use client";

import React, { useState } from "react";
import Featured from "./segments/Featured";

const Carousel = ({ children }: { children: React.ReactNode }) => {
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
    <div className="relative w-full min-h-[50vh] overflow-hidden">
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

const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>;
};

const Home = () => {
  return (
    <main className=" w-full h-full flex flex-col items-center justify-center">
      <Carousel>
        <CarouselItem>
          <div className="w-full h-full  bg-blue-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[50vh] bg-red-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[50vh] bg-green-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 3</h2>
          </div>
        </CarouselItem>
      </Carousel>

      <section>{<Featured />}</section>
    </main>
  );
};

export default Home;
