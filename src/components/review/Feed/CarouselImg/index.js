import React from "react";

import Carousel from "react-bootstrap/Carousel";

import carouselItem from "./CarouselItem";

const CarouselImg = ({ activeIndex, handleSelect }) => {
  return (
    <Carousel
      indicators={false}
      interval={20000}
      activeIndex={activeIndex}
      onSelect={handleSelect}
    >
      {carouselItem.map((item) => (
        <Carousel.Item key={item.id}>
          <img className="d-block w-100" src={item.src} alt={item.alt} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default React.memo(CarouselImg);
