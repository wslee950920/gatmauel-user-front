import React, { useEffect, useCallback, useState } from 'react';
import {withRouter} from 'react-router-dom';

import {getReviews} from '../modules/reviews';
import {useSelector, useDispatch} from 'react-redux';

import Review from '../components/review';

const ReviewCon=({history})=>{
    const dispatch=useDispatch();
    const {reviews, user}=useSelector(state=>(
        {
            reviews:state.reviews.reviews,
            user:state.user.user 
        }
    ));
    const [imgs, setImgs] = useState([]);
    const [content, setContent] = useState("");
    let formData = new FormData();

    const handleFileOnChange = useCallback(
        (e) => {
          e.preventDefault();
    
          if (imgs.length < 10) {
            const files = e.target.files;
            try {
              for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                  setImgs((prev) => {
                    if (prev.length < 10) {
                      return [
                        ...prev,
                        {
                          file: files[i],
                          previewURL: reader.result,
                        },
                      ];
                    } else {
                      alert("이미지는 10개까지만 추가할 수 있습니다.");
                      return prev;
                    }
                  });
                };
                reader.readAsDataURL(files[i]);
              }
            } catch (e) {
              console.error(e);
            }
          } else {
            alert("이미지는 10개까지만 추가할 수 있습니다.");
            return;
          }
        },
        [imgs]
      );
      const handleFileRemove = useCallback((index) => {
        setImgs(prev=>prev.filter((v, i)=>index!==i));
      }, []);
      const onChange = useCallback((e) => {
        const { value } = e.target;
        setContent(value);
      }, []);
      const onSubmit = useCallback(
        async (e) => {
          e.preventDefault();
          if(content===''&&imgs.length===0) return;
    
          await formData.append("content", content);
          await imgs.forEach((img) => {
            formData.append("img", img);
          });
        },
        [content, formData, imgs]
      );

    useEffect(()=>{
        if(reviews) return;

        dispatch(getReviews());
    }, [dispatch, reviews]);

    return (reviews&&
      <Review 
        reviews={reviews} 
        history={history}
        user={user}
        content={content}
        imgs={imgs}
        handleFileOnChange={handleFileOnChange}
        handleFileRemove={handleFileRemove}
        onChange={onChange}
        onSubmit={onSubmit}
      />)
}

export default withRouter(ReviewCon);