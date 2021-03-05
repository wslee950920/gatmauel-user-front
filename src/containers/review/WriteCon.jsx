import React, {useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    closeDialog, 
    changeField, 
    removeImage, 
    addImage,
    writeReview 
    } from '../../modules/review'

import Write from '../../components/review/FullScreenDialog/Write'

const WriteCon=({history, rOnly})=>{
    const { content, imgs, loading } = useSelector(state => (
        {
          content:state.review.content,
          imgs:state.review.imgs,
          loading:state.loading['write/WRITE_REVIEW'],
        }
    ));
    const dispatch=useDispatch();
    const [progress, setProgress]=useState(0);

    const handleClose = useCallback(() => {
        dispatch(closeDialog());
        history.push('/review');
    }, [dispatch, history]);
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
      }, [history]);
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
                    uri: reader.result,
                  }))        
                };
                reader.readAsDataURL(files[i]);
              }
              if(files.length>5){
                alert("이미지는 5개까지만 추가할 수 있습니다.");
              }
            } catch (e) {
              alert(e.message);
            }
          }
        },
        [imgs, dispatch]
    );
    const onSubmit = useCallback(
        (e) => {
          e.preventDefault();

          if (content === '' && imgs.length === 0) return;
    
          const formData=new FormData();
          const promises=imgs.map((img)=>
            new Promise((resolve, reject)=>{
              try{
                formData.append("imgs", img.file);
                resolve();    
              } catch(e){
                reject(e);
              }
            })
          );
          promises.push(
            new Promise((resolve, reject)=>{
              try{
                formData.append("content", content);
                resolve();
              } catch(e){
                reject(e);
              }
            })
          );
          Promise.all(promises)
            .then(()=>{
              dispatch(writeReview({formData, setProgress}));
            })
            .catch((err)=>{
              alert(err.message);
            });
          },
        [content, imgs, dispatch]
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
            rOnly={rOnly}
        />
    );
};

export default React.memo(WriteCon);
