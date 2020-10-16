import React, { useState, useCallback, useRef, useEffect } from "react";

import MenuBar from "./MenuBar";
import MenuList from "./MenuList";
import CardDialog from "../common/CardDialog";
import Footer from "../footer";

//Forwarding refs in higher-order components
//https://ko.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
const RenderMenuBar = React.forwardRef((props, ref) => (
  <MenuBar forwardedRef={ref} {...props} />
));
const RenderMenuList = React.forwardRef((props, ref) => (
  <MenuList forwardedRef={ref} {...props} />
));

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
  const list = useRef(null);
  const [yOffset, setYoffset] = useState(0);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  //listitem으로 스크롤하기
  //https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
  useEffect(() => {
    setYoffset(list.current.getBoundingClientRect().top);
  }, []);
  useEffect(() => {
    const y =
      list.current.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [value, yOffset]);

  return (
    <>
      <RenderMenuBar
        categories={categories.current}
        handleChange={handleChange}
        value={value}
      />
      <RenderMenuList
        handleOpen={handleOpen}
        categories={categories.current}
        ref={list}
        value={value}
      />
      <Footer />
      <CardDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Menu;
