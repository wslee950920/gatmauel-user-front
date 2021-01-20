import React, {useCallback}  from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles=makeStyles((theme)=>({
  root:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    margin:theme.spacing(1),
  },
  kakaoBtn: {
    padding: 0,
  },
  btnRoot:{
    minWidth:0
  },
  btn:{
    margin:theme.spacing(0, 0.5),
  }
}))

const KakaoBtn=({platform})=>{
    const classes=useStyles();
    
    const naverMap=useCallback(()=>{
      const clickedAt = +new Date();
      const IorA = navigator.userAgent.toLowerCase();

      if(IorA.indexOf("android") !== -1){
        // android 일 때
        window.location.href=`intent://search?query=${encodeURI('갯마을바지락칼국수보쌈')}&appname=${process.env.REACT_APP_COMM_URL}#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`
      }else if(IorA.indexOf("iphone") !== -1){
        // iphone 일 때
        window.location.href = `nmap://search?query=${encodeURI('갯마을바지락칼국수보쌈')}&appname=${process.env.REACT_APP_COMM_URL}`;
      }

      setTimeout(function() {
        if (+new Date() - clickedAt < 2000) {
          window.location.href = 'http://itunes.apple.com/app/id311867728?mt=8';
        }
      }, 1500);
    }, [])
    const kakaoMap=useCallback(()=>{
      const clickedAt = +new Date();
      const IorA = navigator.userAgent.toLowerCase();

      window.location.href='kakaomap://place?id=1299223701';

      setTimeout(function() {
        if (+new Date() - clickedAt < 2000) {
          if(IorA.indexOf("android") !== -1){
            // android 일 때
            window.location.href='market://details?id=net.daum.android.map'
          }else if(IorA.indexOf("iphone") !== -1){
            // iphone 일 때
            window.location.href = 'https://apps.apple.com/us/app/id304608425';
          }
        }
      }, 1500);
    }, []);
    const kakaoShare=useCallback(()=>{
      window.Kakao.Link.sendCustom({
        templateId:45367,
        installTalk:true
      })
    }, []);

    return(
      <div className={classes.root}>
        <Button 
          className={classes.btn} 
          classes={{ root:classes.btnRoot, text: classes.kakaoBtn }} 
          size='small'
          onClick={()=>{
            if(platform){
              naverMap();
            }
          }}
          {...(!platform&&
            {
              href:process.env.REACT_APP_NAVER_MAP_URL,
              target:'self'
            })
          }
        >
            <img 
              src="/images/icons/naver_map.png" 
              alt="naver-navi-icon" 
            />
        </Button>
        <Button 
          className={classes.btn} 
          classes={{ root:classes.btnRoot, text: classes.kakaoBtn }} 
          size='small'
          onClick={()=>{
            if(platform){
              kakaoMap();
            }
          }}
          {...(!platform&&
            {
              href:process.env.REACT_APP_KAKAO_MAP_URL,
              target:'self'
            })
          }
        >
            <img 
              src="/images/icons/kakao_map.png" 
              alt="kakao-navi-icon" 
            />
        </Button>
        <Button 
          className={classes.btn} 
          classes={{ root:classes.btnRoot, text: classes.kakaoBtn }} 
          size='small'
          onClick={()=>{
            kakaoShare();
          }}
        >
            <img 
              src="/images/icons/kakaolink_btn_small.png" 
              alt="kakao-share-icon" 
            />
        </Button>  
      </div>
    )
}

export default React.memo(KakaoBtn);