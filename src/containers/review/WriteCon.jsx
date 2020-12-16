import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
    closeDialog, 
    changeField, 
    removeImage, 
    openDialog, 
    addImage,
    writeReview 
    } from '../../modules/write'

import Write from '../../components/review/FullScreenDialog/Write'

const WriteCon=({history})=>{
    const { content, imgs } = useSelector(state => (
        {
          content:state.write.content,
          imgs:state.write.imgs,
        }
    ));
    const dispatch=useDispatch();
    let formData=new FormData();

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
    
          if (imgs.length < 10) {
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
            alert("이미지는 10개까지만 추가할 수 있습니다.");
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
          await dispatch(writeReview(formData));
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
        />
    );
};

export default withRouter(WriteCon);
