import React, { useCallback } from "react";

import Carousel from "react-bootstrap/Carousel";

const CarouselImg = ({ activeIndex, handleSelect, imgs, measure }) => {
  const onError = useCallback((e, src) => {
    const target = e.target;
    target.src = "/images/icons/loading.gif";

    setTimeout(() => {
      target.src = process.env.REACT_APP_CF_DOMAIN_NAME + src;
    }, 1500);
  }, []);

  return (
    <Carousel
      indicators={false}
      interval={20000}
      activeIndex={activeIndex}
      onSelect={handleSelect}
      controls={imgs.split("||").length > 1}
    >
      {imgs.split("||").map((src, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={process.env.REACT_APP_CF_DOMAIN_NAME + src}
            alt="피드 이미지"
            onError={(e) => onError(e, src)}
            style={{
              width: "100%",
              height: "auto",
            }}
            onLoad={measure}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default React.memo(CarouselImg);
