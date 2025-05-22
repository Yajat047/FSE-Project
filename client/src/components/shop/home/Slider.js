import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-switch slides every 3 seconds
  useEffect(() => {
    if (!data.sliderImages || data.sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setDirection("right");
      setAnimating(true);
      setTimeout(() => {
        setSlide((prev) => (prev + 1) % data.sliderImages.length);
        setAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.sliderImages]);

  // Manual navigation handlers
  const handlePrev = () => {
    setDirection("left");
    setAnimating(true);
    setTimeout(() => {
      setSlide((prev) =>
        prev === 0 ? data.sliderImages.length - 1 : prev - 1
      );
      setAnimating(false);
    }, 300);
  };
  const handleNext = () => {
    setDirection("right");
    setAnimating(true);
    setTimeout(() => {
      setSlide((prev) => (prev + 1) % data.sliderImages.length);
      setAnimating(false);
    }, 300);
  };

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2 flex flex-col items-center">
        {data.sliderImages.length > 0 ? (
          <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: "256px" }}>
            <svg
              onClick={handlePrev}
              className="z-10 absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 text-gray-700 cursor-pointer hover:text-yellow-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <img
              className={`h-64 w-auto max-w-full object-contain mx-auto transition-transform duration-300 ${animating ? (direction === 'right' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 'translate-x-0 opacity-100'}`}
              src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
              alt="sliderImage"
              style={{ transition: 'transform 0.3s, opacity 0.3s' }}
            />
            <svg
              onClick={handleNext}
              className="z-10 absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 text-gray-700 cursor-pointer hover:text-yellow-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ) : (
          ""
        )}

        {data?.sliderImages?.length > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="#shop"
              style={{ background: "#303031" }}
              className="cursor-pointer box-border text-2xl text-white px-4 py-2 rounded"
            >
              Shop Now
            </a>
          </div>
        ) : null}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
