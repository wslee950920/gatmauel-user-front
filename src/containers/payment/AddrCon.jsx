import React, {useState, useCallback, useRef} from 'react';
import axios from 'axios';

import AddrDialog from '../../components/common/Address/AddrDialog'

const AddrCon=({open, handleClose, addrOnClick})=>{
    const [loading, setLoading] = useState(false);
    const [kakao, setKakao] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [query, setQuery] = useState("");
    const source=useRef(null);

    const getAddress = useCallback((query, page) => {
        setLoading(true);

        if(source.current){
          source.current.cancel("consecutive requests");
        }
        const CancelToken = axios.CancelToken;
        source.current = CancelToken.source();
    
        axios.get("https://dapi.kakao.com/v2/local/search/address.json", {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
            },
            params: {
              query,
              page,
            },
            cancelToken:source.current.token
          }).then((response) => {
            if (page === 1) {
              setKakao(response.data.documents);
            } else {
              setKakao((prev) => [...prev, ...response.data.documents]);
            }
            setHasNextPage(!response.data.meta.is_end);
          }).catch((error) => {
            if (axios.isCancel(error)) {
              console.log('Request cancelled', error.message);
            } else{
              if (error.response.status === 400) {
                setHasNextPage(false);
              }
            }
          }).finally(()=>{
            setLoading(false);
          })
    }, []);
    const loadNextPage = useCallback(({ startIndex }) => {
        const page = Math.ceil(startIndex / 10) + 1;
        getAddress(query, page);
    }, [query, getAddress]);
    const queryOnChange = useCallback((e) => {
        const { value } = e.target;
        setQuery(value);
        getAddress(value, 1);
    },[getAddress]);

    return(
        <AddrDialog
          open={open}
          handleClose={handleClose}
          kakao={kakao}
          loadNextPage={loadNextPage}
          loading={loading}
          hasNextPage={hasNextPage}
          queryOnChange={queryOnChange}
          query={query}
          addrOnClick={addrOnClick}
        />
    )
}

export default React.memo(AddrCon);