import React from "react";

import Carousel from "react-bootstrap/Carousel";
import Container from "@material-ui/core/Container";

import carouselItem from "./CarouselItem";

const CarouselImg = ({ index, handleSelect }) => {
  return (
    <Container>
      <Carousel
        indicators={false}
        interval={20000}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {carouselItem.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.src} alt={item.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default React.memo(CarouselImg);
