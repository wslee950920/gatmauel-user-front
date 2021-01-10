import React, { useState, useCallback, useRef, useEffect } from "react";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import CardDialog from "../common/CardDialog";

const Menu = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [yOffset, setYoffset] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const listRefs = useRef(categories.map(() => React.createRef()));
  const ticking = useRef(false);
  const jump = useRef(false);

  const handleOpen = useCallback((i) => {
    setOpen(true);
    setIndex(i);
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
          y >= Math.round(yOffset[0].top) &&
          y < Math.round(yOffset[0].bottom)
        ) {
          if (!jump.current) {
            setValue(0);
          }
          if (y === Math.round(yOffset[0].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[1].top) &&
          y < Math.round(yOffset[1].bottom)
        ) {
          if (!jump.current) {
            setValue(1);
          }
          if (y === Math.round(yOffset[1].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[2].top) &&
          y < Math.round(yOffset[2].bottom)
        ) {
          if (!jump.current) {
            setValue(2);
          }
          if (y === Math.round(yOffset[2].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[3].top) &&
          y < Math.round(yOffset[3].bottom)
        ) {
          if (!jump.current) {
            setValue(3);
          }
          if (y === Math.round(yOffset[3].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[4].top) &&
          y < Math.round(yOffset[4].bottom)
        ) {
          if (!jump.current) {
            setValue(4);
          }
          if (y === Math.round(yOffset[4].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[5].top) &&
          y < Math.round(yOffset[5].bottom)
        ) {
          if (!jump.current) {
            setValue(5);
          }
          if (y === Math.round(yOffset[5].top)) jump.current = false;
        } else if (
          y >= Math.round(yOffset[6].top) &&
          y < Math.round(yOffset[6].bottom)
        ) {
          if (!jump.current) {
            setValue(6);
          }
          if (y === Math.round(yOffset[6].top)) jump.current = false;
        }

        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [yOffset]);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);

      setYoffset(
        listRefs.current.map((compo) => ({
          top: compo.current.getBoundingClientRect().top,
          bottom: compo.current.getBoundingClientRect().bottom,
        }))
      );
    }
  }, [loading]);
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
        setValue={setValue}
        setLoading={setLoading}
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
