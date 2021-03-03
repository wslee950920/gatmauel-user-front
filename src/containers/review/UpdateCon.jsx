import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    closeDialog, 
    changeField,
    updateReview,
    initialize 
} from '../../modules/review'

import Write from '../../components/review/FullScreenDialog/Write'

const UpdateCon=({history, match, hashtagUpdate})=>{
    const { content, reviews, loading } = useSelector(state => (
        {
          content:state.review.content,
          reviews:state.reviews.reviews,
          loading:state.loading['update/UPDATE_REVIEW']
        }
    ));
    const dispatch=useDispatch();

    const handleClose = useCallback(() => {
        dispatch(initialize());
        history.push('/review');
        dispatch(closeDialog());
    }, [history, dispatch]);
    const onChange=useCallback(e=>{
        const {value, name}=e.target;

        dispatch(changeField({
            key:name,
            value
        }));
    }, [dispatch]);
    const onSubmit = useCallback(
        async (e) => {
          e.preventDefault();
          if (content === '') return;
    
          hashtagUpdate(reviews[match.params.index].id, content);
          dispatch(updateReview({id:reviews[match.params.index].id, content}));
        },
        [content, reviews, match.params.index, dispatch, hashtagUpdate]
      );

    return (
        <Write 
            content={content} 
            handleClose={handleClose} 
            onChange={onChange}
            onSubmit={onSubmit}
            review={reviews[match.params.index]}
            loading={loading}
        />
    );
};

export default React.memo(UpdateCon);
