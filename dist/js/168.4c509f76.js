"use strict";(self["webpackChunkbah"]=self["webpackChunkbah"]||[]).push([[168],{3168:function(e,t,n){n.r(t),n.d(t,{startTapClick:function(){return i}});var o=n(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i=e=>{let t,n,i,v,f=10*-u,p=0;const h=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),m=new WeakMap,L=()=>void 0!==t&&null!==t.parentElement,E=e=>{f=(0,o.u)(e),T(e)},w=e=>{f=(0,o.u)(e),R(e)},b=e=>{const t=(0,o.u)(e)-u;f<t&&T(e)},g=e=>{const t=(0,o.u)(e)-u;f<t&&R(e)},k=e=>{R(e)},S=()=>{clearTimeout(v),v=void 0,n&&(x(!1),n=void 0)},T=e=>{n||L()||(t=void 0,C(s(e),e))},R=e=>{C(void 0,e)},C=(e,t)=>{if(e&&e===n)return;clearTimeout(v),v=void 0;const{x:i,y:s}=(0,o.q)(t);if(n){if(m.has(n))throw new Error("internal error");n.classList.contains(c)||q(n,i,s),x(!0)}if(e){const t=m.get(e);t&&(clearTimeout(t),m.delete(e));const n=a(e)?0:d;e.classList.remove(c),v=setTimeout((()=>{q(e,i,s),v=void 0}),n)}n=e},q=(e,t,n)=>{p=Date.now(),e.classList.add(c);const o=h&&r(e);o&&o.addRipple&&(y(),i=o.addRipple(t,n))},y=()=>{void 0!==i&&(i.then((e=>e())),i=void 0)},x=e=>{y();const t=n;if(!t)return;const o=l-Date.now()+p;if(e&&o>0&&!a(t)){const e=setTimeout((()=>{t.classList.remove(c),m.delete(t)}),l);m.set(t,e)}else t.classList.remove(c)},B=document;B.addEventListener("ionScrollStart",(e=>{t=e.target,S()})),B.addEventListener("ionScrollEnd",(()=>{t=void 0})),B.addEventListener("ionGestureCaptured",S),B.addEventListener("touchstart",E,!0),B.addEventListener("touchcancel",w,!0),B.addEventListener("touchend",w,!0),B.addEventListener("mousedown",b,!0),B.addEventListener("mouseup",g,!0),B.addEventListener("contextmenu",k,!0)},s=e=>{if(!e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const n=t[e];if(!(n instanceof ShadowRoot)&&n.classList.contains("ion-activatable"))return n}}},a=e=>e.classList.contains("ion-activatable-instant"),r=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},c="ion-activated",d=200,l=200,u=2500}}]);
//# sourceMappingURL=168.4c509f76.js.map