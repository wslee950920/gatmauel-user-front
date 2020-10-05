import React from "react";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Header from "../../components/header";
import Notice from "../../components/notice";
import SearchBar from "../../components/common/SearchBar";

const NoticePage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Header />
      {!matches && <SearchBar />}
      <Notice />
    </>
  );
};

export default NoticePage;
