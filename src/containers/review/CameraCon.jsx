import React, { useCallback, useRef, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {closeDialog, addImage} from '../../modules/review';

import Camera from '../../components/review/FullScreenDialog/Camera';

const CameraCon=({history})=>{
    const dispatch=useDispatch();
    const [loading, setLoading]=useState(true);
    const video = useRef(null);
    const vStream = useRef(null);

    const handleClose=useCallback(()=>{
        history.push('/review');
        dispatch(closeDialog());
    }, [dispatch, history]);
    const getCapture=useCallback(()=>{
        setLoading(true);

        const vTrack=vStream.current.getVideoTracks()[0];
        let capturedImg=new window.ImageCapture(vTrack);
        const options={
            imageHeight:640, imageWidth:640, fillLightMode:'off'
        };

        return capturedImg.takePhoto(options).then(imgData=>{
            try{
                const oTrack = vStream.current.getTracks();
                oTrack.map((pTrack) => pTrack.stop());

                const imgFile=new File(
                  [imgData], 
                  `${vTrack.id}.${imgData.type.split('/')[1]}`
                );
                const reader = new FileReader();
                reader.onload = () => {
                    dispatch(addImage({
                      file: imgFile,
                      previewURL: reader.result,
                    }))
                };
                reader.readAsDataURL(imgFile);
              } catch(e){
                console.error(e);
              }
              history.push('/review/write');
        })
    }, [history, dispatch]);

    useEffect(() => {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: { exact: "environment" },
              width: { min: 640 },
              height: { min: 640 },
              aspectRatio: 1,
            },
            audio: false,
          })
          .then((pStream) => {
            vStream.current = pStream;
    
            video.current.srcObject = pStream;
            video.current.play();
            setLoading(false);
          })
          .catch((e) => {
            console.error(e);
          });
    
        return () => {
          try{
            const oTrack = vStream.current.getTracks();
            oTrack.map((pTrack) => pTrack.stop());
          } catch(e){
            console.error(e);
          }
        };
      }, []);

    return (
        <Camera 
            handleClose={handleClose} 
            loading={loading} 
            setLoading={setLoading} 
            video={video}
            getCapture={getCapture}
        />
    );
};

export default withRouter(CameraCon);