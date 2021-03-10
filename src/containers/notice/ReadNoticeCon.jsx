import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getNotices, setSearch, initResults } from "../../modules/notices";
import { readPush } from "../../modules/push";

import { usePreloader } from "../../lib/PreloadContext";

import ReadNotice from "../../components/notice/ReadNotice";

const ReadNoticeCon = ({ match, history }) => {
  const dispatch = useDispatch();
  const { notices, loading, error, search, result } = useSelector((state) => ({
    notices: state.notices.notices,
    loading: state.loading["notices/GET"],
    error: state.notices.error,
    search: state.notices.search,
    result: state.notices.result,
  }));

  usePreloader(() => dispatch(getNotices()));

  useEffect(() => {
    if (notices.length > 0) return;
    if (loading) return;
    if (error) return;

    dispatch(getNotices());
  }, [dispatch, notices, loading, error]);
  useEffect(() => {
    return history.listen((location, action) => {
      if (location.pathname.indexOf("/notice") < 0) {
        dispatch(initResults());
        dispatch(setSearch(""));
      }
    });
  }, [history, dispatch]);
  useEffect(() => {
    dispatch(readPush());
  }, [dispatch]);

  const { index } = match.params;
  if (
    search
      ? result.docs.length < 1 || !result.docs[index]
      : notices.length < 1 || !notices[index]
  )
    return null;
  return <ReadNotice notice={search ? result.docs[index] : notices[index]} />;
};

export default React.memo(ReadNoticeCon);
