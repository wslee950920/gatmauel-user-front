import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSearch, initResults, getNotices } from "../../modules/notices";
import { readPush } from "../../modules/push";

import { usePreloader } from "../../lib/PreloadContext";
import { admin as adminAPI } from "../../lib/api/client";

import ReadNotice from "../../components/notice/ReadNotice";

const ReadNoticeCon = ({ match, history }) => {
  const dispatch = useDispatch();
  const { notices, search, result } = useSelector((state) => ({
    notices: state.notices.notices,
    search: state.notices.search,
    result: state.notices.result,
  }));
  const [read, setRead] = useState(null);
  const [loading, setLoading] = useState(false);

  usePreloader(() => dispatch(getNotices()));

  useEffect(() => {
    setLoading(true);

    const index = (search ? result.docs : notices).findIndex((value) => {
      return value.id === parseInt(match.params.id);
    });
    if (index >= 0) {
      setRead((search ? result.docs : notices)[index]);

      setLoading(false);
    } else {
      adminAPI
        .get(`/notice/read/${match.params.id}`)
        .then(({ data }) => {
          setRead(data);

          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 404) {
              alert("데이터가 없습니다.");
            }
          } else {
            alert(err.message);
          }
          history.push("/notice");
        });
    }
  }, [search, result, notices, match, history]);
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

  return !loading && read ? <ReadNotice notice={read} /> : null;
};

export default React.memo(ReadNoticeCon);
