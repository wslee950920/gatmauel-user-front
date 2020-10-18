import React from "react";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  //MDBContainer,
} from "mdbreact";

import carouselItem from "./CarouselItem";

const CarouselView = () => {
  return (
    <MDBCarousel
      activeItem={1}
      length={7}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        {carouselItem.map((item) => (
          <MDBCarouselItem itemId={item.id} key={item.id}>
            <MDBView>
              <img className="d-block w-100" src={item.src} alt={item.alt} />
            </MDBView>
          </MDBCarouselItem>
        ))}
      </MDBCarouselInner>
    </MDBCarousel>
  );
};

export default CarouselView;
