import React, { useState, useCallback, useRef, useEffect } from "react";

import { useTheme } from "@material-ui/core/styles";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import CardDialog from "../common/CardDialog";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const categories = useRef([
    "칼국수",
    "보쌈",
    "특별메뉴",
    "만두",
    "계절메뉴",
    "추가메뉴",
  ]);
  const [yOffset, setYoffset] = useState(0);
  const listRefs = useRef(categories.current.map(() => React.createRef()));
  const theme = useTheme();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleClick = useCallback(
    (event, newValue) => {
      setValue(newValue);
      const y =
        listRefs.current[newValue].current.getBoundingClientRect().top +
        window.pageYOffset -
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [yOffset]
  );

  useEffect(() => {
    setYoffset(listRefs.current[0].current.getBoundingClientRect().top);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      listRefs.current.forEach((item, index) => {
        if (
          item.current.getBoundingClientRect().top <= yOffset * 1.2 &&
          item.current.getBoundingClientRect().top >= 0
        )
          setValue(index);
      });
    });
  }, [yOffset]);

  return (
    <>
      <MenuBar
        categories={categories.current}
        handleClick={handleClick}
        value={value}
      />
      <MenuList
        handleOpen={handleOpen}
        categories={categories.current}
        value={value}
        listRefs={listRefs}
      />
      {listRefs.current[5].current && (
        <div
          style={{
            height:
              window.innerHeight -
              listRefs.current[5].current.getBoundingClientRect().height -
              yOffset +
              (window.innerWidth - document.documentElement.clientWidth),
          }}
        />
      )}
      <CardDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Menu;
