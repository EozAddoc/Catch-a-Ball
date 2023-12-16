import React from 'react';
import { Carousel } from "@material-tailwind/react";
import Home from '../pages/MyCarousel';
import ProfilePage from '../pages/ProfilePage';
import Deck from '../pages/Deck';
function SimpleCarousel() {
  return (
    <div className='h-screen w-screen'>
      <Carousel
        className=" h-full"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <div alt=" home 1">
        <Home></Home>
       
        </div>
        <div alt="profilePage2">
        <ProfilePage></ProfilePage>
        </div>
        <div alt="Deck 3">
        <Deck></Deck>
        </div>
      </Carousel>
    </div>
  );
}

export default SimpleCarousel;
