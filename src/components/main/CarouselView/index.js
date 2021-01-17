import React, { useState, useCallback } from "react";
import clsx from "clsx";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
} from "mdbreact";

import carouselItem from "./CarouselItem";

import Circular from "../../common/Circular";

const CarouselView = () => {
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <MDBCarousel
      activeItem={1}
      length={carouselItem.length}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        {carouselItem.map((item, index) => (
          <MDBCarouselItem itemId={index + 1} key={index}>
            {loading && (
              <Circular
                container={{
                  width: "100%",
                  paddingTop: "75%",
                  position: "relative",
                }}
                inside={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: "auto",
                }}
              />
            )}
            <MDBView>
              <img
                src={item.src}
                alt={item.alt}
                onLoad={onLoad}
                className={clsx(loading ? "d-none" : "d-block w-100")}
              />
            </MDBView>
          </MDBCarouselItem>
        ))}
      </MDBCarouselInner>
    </MDBCarousel>
  );
};

export default CarouselView;
