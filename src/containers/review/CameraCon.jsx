import React, { useCallback, useRef, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {closeDialog, addImage} from '../../modules/review';

import Camera from '../../components/review/FullScreenDialog/Camera';

const CameraCon=({history})=>{
    const dispatch=useDispatch();
    const [loading, setLoading]=useState(true);
    const video = useRef(null);

    const handleClose=useCallback(()=>{
        dispatch(closeDialog());
        history.push('/review');
    }, [dispatch, history]);
    const getCapture=useCallback(()=>{
        setLoading(true);

        const temp=video.current;

        const videoCanvas=document.createElement('canvas');
        videoCanvas.height = temp.videoHeight;
        videoCanvas.width = temp.videoWidth;

        const videoContext = videoCanvas.getContext('2d');
        videoContext.drawImage(temp, 0, 0);

        videoCanvas.toBlob((imgData)=>{
          try{
            const imgFile=new File(
              [imgData], 
              `${Date.now()}_${parseInt(imgData.size*Math.random())}.${imgData.type.split('/')[1]}`
            );
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(addImage({
                  file: imgFile,
                  uri: reader.result,
                }));
                history.push('/review/write');
            };
            reader.readAsDataURL(imgFile);
          }catch(e){
            setLoading(false);
            alert(e.message);
          }
        });
    }, [history, dispatch]);

    useEffect(() => {
        const cleanup=video.current;

        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: { exact: "environment" },
              width: { min: 640, ideal:1080, max:1350},
              height: { min: 640, ideal:1080, max:1350 },
              aspectRatio: {
                exact:1
              },
            },
            audio: false,
          })
          .then((stream) => {    
            video.current.srcObject = stream;
            setLoading(false);
          })
          .catch((e) => {
            alert(e.message);
          });
    
        return () => {
          try{
            cleanup.srcObject.getVideoTracks()
              .map((track) => track.stop());
          } catch(e){
            alert(e.message);
          }
        };
      }, []);

    return (
      <>
        <Camera 
            handleClose={handleClose} 
            loading={loading} 
            setLoading={setLoading} 
            video={video}
            getCapture={getCapture}
        />
      </>
    );
};

export default React.memo(CameraCon);