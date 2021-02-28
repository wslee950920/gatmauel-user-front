import React, { useEffect } from "react";

import querystring from "querystring";

import { user as userAPI } from "../../lib/api/client";

const ReasonCon = ({ history, location, match }) => {
  useEffect(() => {
    if (match.params.reason === "cancel" || match.params.reason === "fail") {
        const query = querystring.parse(location.search.split("?")[1]);
        if (!query.orderId) {
            alert('데이터가 없습니다.');
            history.push("/");
            return;
        }

        userAPI
            .get(`/order/reason/${query.orderId}`)
            .then(() => {
                if (match.params.reason === "cancel") {
                    alert("결제가 취소되었습니다.");
                    history.push("/order");
                    return;
                } else if (match.params.reason === "fail") {
                    alert("결제를 실패하였습니다. 잠시 후 다시 시도해주십시오.");
                    history.push("/order");
                    return;
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert("데이터를 찾을 수 없습니다.");
                    history.push("/");
                    return;
                } else{
                    alert('오류가 발생하였습니다. 관리자에게 문의해주세요.');
                    history.push('/');
                    return
                }
            });
    } else{
        history.push("/");

        return;
    }
  }, [history, location, match]);

  return <div />;
};

export default React.memo(ReasonCon);
