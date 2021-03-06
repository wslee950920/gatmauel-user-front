import React, { useCallback, useState } from "react";
import clsx from "clsx";

import Carousel from "react-bootstrap/Carousel";

import Circular from "../../../common/Circular";

const CarouselImg = ({ activeIndex, handleSelect, imgs, measure }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => {
    setLoading(false);
    measure();
  }, [measure]);
  const onError = useCallback((e, src) => {
    setError(true);

    const target = e.target;
    setTimeout(() => {
      target.src = process.env.REACT_APP_CF_DOMAIN_NAME + src;
      setError(false);
    }, 4000);
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
          {!error && (
            <img
              className={clsx(
                loading ? "d-none w-100 h-auto" : "d-block w-100 h-auto"
              )}
              src={process.env.REACT_APP_CF_DOMAIN_NAME + src}
              alt="피드 이미지"
              onLoad={onLoad}
              onError={(e) => onError(e, src)}
            />
          )}
          {(loading || error) && (
            <Circular
              container={{
                width: "100%",
                paddingTop: "100%",
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
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default React.memo(CarouselImg);
