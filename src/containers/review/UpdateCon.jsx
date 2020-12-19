import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
    closeDialog, 
    changeField,   
    updateReview,
    initialize 
} from '../../modules/review'

import Write from '../../components/review/FullScreenDialog/Write'

const UpdateCon=({history, match})=>{
    const { content, reviews } = useSelector(state => (
        {
          content:state.review.content,
          reviews:state.reviews.reviews
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
    
          dispatch(updateReview({id:reviews[match.params.index].id, content}));
        },
        [content, reviews, match.params.index, dispatch]
      );

    return (
        <Write 
            content={content} 
            handleClose={handleClose} 
            onChange={onChange}
            onSubmit={onSubmit}
            review={reviews[match.params.index]}
        />
    );
};

export default withRouter(UpdateCon);
