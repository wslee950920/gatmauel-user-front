import React, {useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
                    uri: reader.result,
                  }))        
                };
                reader.readAsDataURL(files[i]);
              }
            } catch (e) {
              alert(e.message);
            }
          } else {
            alert("이미지는 5개까지만 추가할 수 있습니다.");
            return;
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
                console.log('img file', img.file.type, img.file.name, img.uri);
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
            .catch((e)=>{
              alert(e.message);
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
        />
    );
};

export default React.memo(WriteCon);
