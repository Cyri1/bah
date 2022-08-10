"use strict";(self["webpackChunkbah"]=self["webpackChunkbah"]||[]).push([[78],{487:function(t,e,n){n.d(e,{a:function(){return l},b:function(){return h},g:function(){return a},s:function(){return f}});var o=n(587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r="ION-CONTENT",s="ion-content",c=".ion-content-scroll-host",i=`${s}, ${c}`,u=t=>t&&t.tagName===r,a=async t=>u(t)?(await new Promise((e=>(0,o.c)(t,e))),t.getScrollElement()):t,l=t=>t.closest(i),f=(t,e)=>{if(u(t)){const n=t;return n.scrollToTop(e)}return Promise.resolve(t.scrollTo({top:0,left:0,behavior:e>0?"smooth":"auto"}))},h=(t,e,n,o)=>{if(u(t)){const r=t;return r.scrollByPoint(e,n,o)}return Promise.resolve(t.scrollBy({top:n,left:e,behavior:o>0?"smooth":"auto"}))}},78:function(t,e,n){n.r(e),n.d(e,{startStatusTap:function(){return c}});var o=n(65),r=n(487),s=n(587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=()=>{const t=window;t.addEventListener("statusTap",(()=>{(0,o.wj)((()=>{const e=t.innerWidth,n=t.innerHeight,c=document.elementFromPoint(e/2,n/2);if(!c)return;const i=(0,r.a)(c);i&&new Promise((t=>(0,s.c)(i,t))).then((()=>{(0,o.Iu)((async()=>{i.style.setProperty("--overflow","hidden"),await(0,r.s)(i,300),i.style.removeProperty("--overflow")}))}))}))}))}}}]);
//# sourceMappingURL=78.9319c6ca.js.map