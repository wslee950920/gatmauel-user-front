import React, { useState, useCallback, useRef, useEffect } from "react";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import CardDialog from "../common/CardDialog";
import Footer from "../footer";

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
      <Footer />
      <CardDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Menu;
