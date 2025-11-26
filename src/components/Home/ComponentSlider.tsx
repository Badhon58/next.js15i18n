"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
type ComponentSliderProps = {
  component: React.ComponentType<any>[];
};
const ComponentSlider = ({ component }: ComponentSliderProps) => {
  const [componentIndex, setcomponentIndex] = useState(0);
  const prevFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setcomponentIndex((index) => {
      if (index == 0) return component.length - 1;
      return index - 1;
    });
  };
  const nextFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setcomponentIndex((index) => {
      if (index == component.length - 1) return 0;
      return index + 1;
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setcomponentIndex((index) => {
        if (index == component.length - 1) return 0;
        return index + 1;
      });
    }, 4000);
    return () => clearInterval(intervalId);
  }, [componentIndex]);
  return (
    <div className="relative ">
      {" "}
      <div className="flex w-full h-full overflow-hidden">
        {component.map((Comp, index) => {
          return (
            <div
              key={index}
              style={{ translate: `${-100 * componentIndex}%` }}
              className="block object-contain w-full h-full flex-shrink-0 flex-grow-0 transition-[translate] duration-300 ease-[ease-in-out]"
            >
              <Comp />
            </div>
          );
        })}
      </div>
      <button
        className="absolute p-1.5 bg-white rounded-full lg:top-[46%] top-[48%]"
        onClick={prevFunction}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextFunction}
        className="absolute right-0 p-1.5 bg-white rounded-full lg:top-[46%] top-[48%]"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ComponentSlider;
