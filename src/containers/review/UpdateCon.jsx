import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    closeDialog, 
    changeField,
    updateReview,
    initialize 
} from '../../modules/review'

import Write from '../../components/review/FullScreenDialog/Write'

const UpdateCon=({match, history, reviews})=>{
    const { content, loading } = useSelector(state => (
        {
          content:state.review.content,
          loading:state.loading['update/UPDATE_REVIEW']
        }
    ));
    const dispatch=useDispatch();

    const handleClose = useCallback(() => {
        dispatch(initialize());
        dispatch(closeDialog());
        history.push('/review');
    }, [dispatch, history]);
    const onChange=useCallback(e=>{
        const {value, name}=e.target;

        dispatch(changeField({
            key:name,
            value
        }));
    }, [dispatch]);
    const onSubmit = useCallback(
        (e) => {
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
            loading={loading}
        />
    );
};

export default React.memo(UpdateCon);
