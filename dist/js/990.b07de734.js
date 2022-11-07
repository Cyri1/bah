"use strict";(self["webpackChunkbah"]=self["webpackChunkbah"]||[]).push([[990],{8990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return i}});var r=n(6587),a=n(545),c=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const i=(t,e,n,i,o)=>{const s=t.ownerDocument.defaultView,u=(0,a.i)(t),h=t=>{const e=50,{startX:n}=t;return u?n>=s.innerWidth-e:n<=e},l=t=>u?-t.deltaX:t.deltaX,d=t=>u?-t.velocityX:t.velocityX,b=t=>h(t)&&e(),f=t=>{const e=l(t),n=e/s.innerWidth;i(n)},k=t=>{const e=l(t),n=s.innerWidth,a=e/n,c=d(t),i=n/2,u=c>=0&&(c>.2||e>i),h=u?1-a:a,b=h*n;let f=0;if(b>5){const t=b/Math.abs(c);f=Math.min(t,540)}o(u,a<=0?.01:(0,r.j)(0,a,.9999),f)};return(0,c.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:b,onStart:n,onMove:f,onEnd:k})}}}]);
//# sourceMappingURL=990.b07de734.js.map