import React, {useEffect, useCallback}  from 'react';

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
        window.location.href=`intent://search?query=${encodeURI('갯마을바지락칼국수보쌈')}&appname=https://wslee950920.github.io/gatmauel-user-front#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`
      }else if(IorA.indexOf("iphone") !== -1){
        // iphone 일 때
        window.location.href = `nmap://search?query=${encodeURI('갯마을바지락칼국수보쌈')}&appname=https://wslee950920.github.io/gatmauel-user-front`;
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
    }, [])

    useEffect(()=>{
      if (window.Kakao) {
        const kakao = window.Kakao
        // 중복 initialization 방지
        if (!kakao.isInitialized()) {
          kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
        }
        kakao.Link.createDefaultButton({
          // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
          container: '#kakao-link-btn',
          objectType: 'feed',
          content: {
            title: '갯마을바지락칼국수보쌈',
            description: '#칼국수 #보쌈 #당수동 #맛집',
            imageUrl: 'https://raw.githubusercontent.com/wslee950920/gatmauel-user-front/master/public/images/icons/logo192.png', //추후 s3에서 가져오자
            link: {
              mobileWebUrl: process.env.REACT_APP_COMM_URL,
              webUrl: process.env.REACT_APP_COMM_URL,
            },
          },
          buttons: [
            {
              title: '홈페이지 방문하기',
              link: {
                mobileWebUrl: process.env.REACT_APP_COMM_URL,
                webUrl: process.env.REACT_APP_COMM_URL,
              },
            },
          ],
        })
      }
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
          {...(!platform?
            {
              href:process.env.REACT_APP_NAVER_MAP_URL,
              target:'self'
            }:{})
          }
        >
            <img 
              src="images/icons/naver_map.png" 
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
          {...(!platform?
            {
              href:process.env.REACT_APP_KAKAO_MAP_URL,
              target:'self'
            }:{})
          }
        >
            <img 
              src="images/icons/kakao_map.png" 
              alt="kakao-navi-icon" 
            />
        </Button>
        <Button 
          id="kakao-link-btn" 
          className={classes.btn} 
          classes={{ root:classes.btnRoot, text: classes.kakaoBtn }} 
          size='small'
        >
            <img 
              src="images/icons/kakaolink_btn_small.png" 
              alt="kakao-share-icon" 
            />
        </Button>  
      </div>
    )
}

export default React.memo(KakaoBtn);