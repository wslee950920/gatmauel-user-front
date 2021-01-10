import React, { useState, useCallback, useRef, useEffect } from "react";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import CardDialog from "../common/CardDialog";

const Menu = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [yOffset, setYoffset] = useState(null);
  const [index, setIndex] = useState(0);
  const [loadings, setLoadings] = useState(
    categories.map((category) => category.food.map(() => true))
  );

  const listRefs = useRef(categories.map(() => React.createRef()));
  const ticking = useRef(false);
  const jump = useRef(false);

  const onLoad = useCallback((r, c) => {
    setLoadings((prev) => {
      let copy = [...prev.map((row) => [...row])];
      copy[r][c] = false;

      return copy;
    });
  }, []);
  const handleOpen = useCallback((i) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClick = useCallback(
    (newValue) => {
      jump.current = true;
      setValue(newValue);

      window.scrollTo({
        top: yOffset[newValue].top - yOffset[0].top,
        behavior: "smooth",
      });
    },
    [yOffset]
  );
  const scrollCallback = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY + yOffset[0].top;
        if (
          Math.round(y) >= Math.round(yOffset[0].top) &&
          Math.round(y) < Math.round(yOffset[0].bottom)
        ) {
          if (!jump.current) {
            setValue(0);
          }
          if (Math.round(y) === Math.round(yOffset[0].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[1].top) &&
          Math.round(y) < Math.round(yOffset[1].bottom)
        ) {
          if (!jump.current) {
            setValue(1);
          }
          if (Math.round(y) === Math.round(yOffset[1].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[2].top) &&
          Math.round(y) < Math.round(yOffset[2].bottom)
        ) {
          if (!jump.current) {
            setValue(2);
          }
          if (Math.round(Math.round(y)) === Math.round(yOffset[2].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[3].top) &&
          Math.round(y) < Math.round(yOffset[3].bottom)
        ) {
          if (!jump.current) {
            setValue(3);
          }
          if (Math.round(y) === Math.round(yOffset[3].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[4].top) &&
          Math.round(y) < Math.round(yOffset[4].bottom)
        ) {
          if (!jump.current) {
            setValue(4);
          }
          if (Math.round(y) === Math.round(yOffset[4].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[5].top) &&
          Math.round(y) < Math.round(yOffset[5].bottom)
        ) {
          if (!jump.current) {
            setValue(5);
          }
          if (Math.round(y) === Math.round(yOffset[5].top))
            jump.current = false;
        } else if (
          Math.round(y) >= Math.round(yOffset[6].top) &&
          Math.round(y) < Math.round(yOffset[6].bottom)
        ) {
          if (!jump.current) {
            setValue(6);
          }
          if (Math.round(y) === Math.round(yOffset[6].top))
            jump.current = false;
        }

        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [yOffset]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setYoffset(
      listRefs.current.map((compo) => ({
        top: compo.current.getBoundingClientRect().top,
        bottom: compo.current.getBoundingClientRect().bottom,
      }))
    );
  }, []);
  useEffect(() => {
    if (yOffset) {
      window.addEventListener("scroll", scrollCallback);
    }

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, [yOffset, scrollCallback]);

  return (
    <>
      <MenuBar
        categories={categories}
        handleClick={handleClick}
        value={value}
      />
      <MenuList
        handleOpen={handleOpen}
        categories={categories}
        value={value}
        listRefs={listRefs}
        onLoad={onLoad}
        loadings={loadings}
        setValue={setValue}
      />
      {categories[value].food[index] && (
        <CardDialog
          open={open}
          handleClose={handleClose}
          food={categories[value].food[index]}
        />
      )}
    </>
  );
};

export default Menu;
