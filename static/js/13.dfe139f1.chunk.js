(this["webpackJsonpuser-front"]=this["webpackJsonpuser-front"]||[]).push([[13],{268:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(32),r=n(1),c=function(){var e=window;return{width:e.innerWidth,height:e.innerHeight}};function i(){var e=Object(r.useState)(c()),t=Object(a.a)(e,2),n=t[0],i=t[1];return Object(r.useEffect)((function(){function e(){i(c())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}},271:function(e,t,n){"use strict";var a=n(1);t.a=function(){var e=Object(a.useRef)("win16|win32|win64|macintel|mac|");return Object(a.useMemo)((function(){return navigator.platform&&e.current.indexOf(navigator.platform.toLowerCase())<0}),[])}},347:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(22),i=n(184),o=n(88),u=n(23),l=n(323),s=n(268),m=n(5),f=n(129),b=n(16),d=n(237),p=n(28),O=n(180),h=n(243),j=n(80),E=Object(f.a)((function(e){return{inline:{display:"inline",fontFamily:"Roboto"},content:{fontFamily:"MaplestoryOTFBold"}}})),v=r.a.memo((function(e){var t=e.data,n=e.style,c=e.index,i=e.length,o=E(),u=Object(a.useMemo)((function(){return r.a.forwardRef((function(e,n){return r.a.createElement(b.b,Object.assign({to:t.to,ref:n},e))}))}),[t.to]),l=Object(a.useMemo)((function(){return c!==i-1}),[c,i]);return r.a.createElement("div",{style:n},r.a.createElement(j.b,null),r.a.createElement(h.a,{maxWidth:"sm"},r.a.createElement(O.a,{divider:l,button:!0,component:u},r.a.createElement(d.a,{primary:"\uacf5\uc9c0\uc0ac\ud56d \uc81c\ubaa9",secondary:r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{component:"span",variant:"caption",className:o.inline,color:"textPrimary"},"20/09/27"),r.a.createElement("br",null),t.text),secondaryTypographyProps:{variant:"body2",className:o.content,noWrap:!0}}))))})),w=n(94),g=n(271),y=Object(f.a)((function(e){return{root:Object(u.a)({},e.breakpoints.up("sm"),{marginTop:e.spacing(1)})}})),x=function(){var e=y(),t=Object(c.a)(),n=Object(i.a)(t.breakpoints.up("sm")),o=Object(s.a)(),u=o.height,f=o.width,b=Object(a.useRef)(new Array(20).fill({text:"Wish I could come, but I'm out of town this\u2026\uc8fc\ubc29 \uacf5\uc0ac\ud569\ub2c8\ub2e4.",to:"#"})),d=Object(g.a)(),p=Object(a.useCallback)((function(e){var t=e.index,n=e.style,a=e.data,c=a[t];return r.a.createElement(v,{data:c,style:n,index:t,length:a.length})}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{className:e.root,height:u-56-8-Object(m.a)(n?0:37.09)-8-Object(m.a)(d?0:57.43),itemCount:b.current.length,itemSize:100,width:f,itemData:b.current},p),d?null:r.a.createElement(w.a,null))},k=n(93);t.default=function(){var e=Object(c.a)(),t=Object(i.a)(e.breakpoints.up("sm"));return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,null),!t&&r.a.createElement(k.a,null),r.a.createElement(x,null))}}}]);
//# sourceMappingURL=13.dfe139f1.chunk.js.map