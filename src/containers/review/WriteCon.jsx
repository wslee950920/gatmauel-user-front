import React, {useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
    closeDialog, 
    changeField, 
    removeImage, 
    openDialog, 
    addImage,
    writeReview 
    } from '../../modules/review'

import Write from '../../components/review/FullScreenDialog/Write'

const WriteCon=({history})=>{
    const { content, imgs, loading } = useSelector(state => (
        {
          content:state.review.content,
          imgs:state.review.imgs,
          loading:state.loading['write/WRITE_REVIEW'],
        }
    ));
    const dispatch=useDispatch();
    let formData=new FormData();
    const [progress, setProgress]=useState(0);

    const handleClose = useCallback(() => {
        history.push('/review');
        dispatch(closeDialog());
    }, [history, dispatch]);
    const onChange=useCallback(e=>{
        const {value, name}=e.target;

        dispatch(changeField({
            key:name,
            value
        }))
    }, [dispatch]);
    const handleFileRemove = useCallback((index) => {
        dispatch(removeImage(index));
    }, [dispatch]);
    const onCamera=useCallback(()=>{
        history.push('/review/camera');
        dispatch(openDialog());
      }, [history, dispatch]);
    const handleFileOnChange = useCallback(
        (e) => {
          e.preventDefault();
    
          if (imgs.length < 5) {
            const files = e.target.files;
            try {
              for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                  dispatch(addImage({
                    file: files[i],
                    previewURL: reader.result,
                  }))        
                };
                reader.readAsDataURL(files[i]);
              }
            } catch (e) {
              console.error(e);
            }
          } else {
            alert("이미지는 5개까지만 추가할 수 있습니다.");
            return;
          }
        },
        [imgs, dispatch]
    );
    const onSubmit = useCallback(
        async (e) => {
          e.preventDefault();

          if (content === '' && imgs.length === 0) return;
    
          await formData.append("content", content);
          await imgs.forEach((img) => {
            formData.append("imgs", img.file);
          });
          await dispatch(writeReview({formData, setProgress}));
        },
        [content, formData, imgs, dispatch]
      );

    return (
        <Write 
            content={content} 
            handleClose={handleClose} 
            imgs={imgs} 
            onChange={onChange}
            handleFileRemove={handleFileRemove}
            onCamera={onCamera}
            handleFileOnChange={handleFileOnChange}
            onSubmit={onSubmit}
            loading={loading}
            progress={progress}
        />
    );
};

export default withRouter(WriteCon);
