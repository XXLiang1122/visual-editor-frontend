(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{179:function(e,t,n){},316:function(e,t,n){},318:function(e,t,n){"use strict";n.r(t);var i,o,r=n(0),a=n.n(r),c=n(30),s=n.n(c),l=(n(179),n(14)),d=n(11),h=n(3);function u(){return Object(h.jsx)(x,{children:Object(h.jsx)(b,{src:"/logo.webp"})})}var x=d.a.header(i||(i=Object(l.a)(["\n  height: 56px;\n  display: flex;\n  align-items: center;\n  padding-left: 20px;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd;\n"]))),b=d.a.img(o||(o=Object(l.a)(["\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n"]))),f=n(41),p=n(52),g=n(156),y=n.n(g).a.create({baseURL:"https://pixabay.com/api",timeout:1e4});y.interceptors.response.use((function(e){return e.data}));var j,v=y,O=n(326),m=n(329),w=n(325),M=n(328),k=n(67),S=n(10),L={global:{width:1280,height:720},background:{color:"#fff"},layers:[{id:"1",type:"image",width:510,height:340,position:{x:100,y:100},rotate:0,reverse:{x:1,y:1},source:{imageUrl:"https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg"},zIndex:1},{id:"2",type:"text",width:380,height:72,position:{x:100,y:500},rotate:0,source:{content:"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57"},style:{font:"Microsoft Yahei",fontSize:60,lineHeight:1.2,color:"#000",textAlign:"left",fontWeight:400,underline:!1},zIndex:2}]};!function(e){e.EMPTY="empty",e.IMAGE="image",e.TEXT="text",e.BACKGROUND="background"}(j||(j={}));var C=n(28),E=Object.assign(L,{layers:L.layers.map((function(e){return Object(p.a)(Object(p.a)({},e),{},{isSelected:!1,isEditing:!1,isHover:!1,scale:1})}))}),T=localStorage.getItem("TEMPLATE");T&&(E=JSON.parse(T));var z=Object(S.n)({template:E,layerType:j.EMPTY,needUpdateLayerHeight:!1,isMoving:!1,get layers(){return this.template.layers},getTemplate:function(){var e=Object(C.cloneDeep)(z.template);return e.layers=e.layers.map((function(e){return"text"===e.type&&e.style&&e.scale&&(e.style.fontSize*=e.scale),delete e.isSelected,delete e.isEditing,delete e.scale,e})),e},setTemplate:function(e){this.template=e},setLayers:function(e){this.template.layers=e},setLayer:function(e){var t=this.layers.findIndex((function(t){return t.id===e.id}));t>-1&&(this.layers[t]=e)},addLayer:function(e){this.layers.push(e),"image"===e.type?this.setLayerType(j.IMAGE):"text"===e.type&&this.setLayerType(j.TEXT)},removeLayer:function(e){var t=this.layers.findIndex((function(t){return t.id===e}));t>-1&&(this.layers.splice(t,1),this.setLayerType(j.EMPTY))},setLayerLevel:function(e,t){var n=this.layers.findIndex((function(t){return t.id===e}));n>-1&&(this.layers[n].zIndex=t)},selectLayer:function(e){var t=this;this.layers.forEach((function(n){n.isSelected=n.id===e,n.isSelected&&("image"===n.type?t.setLayerType(j.IMAGE):"text"===n.type&&t.setLayerType(j.TEXT))})),document.dispatchEvent(new Event("mousedown"))},hoverLayer:function(e){this.layers.forEach((function(t){t.isHover=!!e&&t.id===e}))},setLayerType:function(e){this.layerType=e},editTextLayer:function(e){this.layers.forEach((function(t){t.isEditing=t.id===e}))},resetSelectStatus:function(){this.layers.forEach((function(e){e.isSelected=!1})),this.setLayerType(j.EMPTY)},resetEditStatus:function(){this.layers.forEach((function(e){e.isEditing=!1}))},setBackgroundColor:function(e){this.template.background.color=e},setNeedUpdateLayerHeight:function(e){this.needUpdateLayerHeight=e},setIsMoving:function(e){this.isMoving=e}},{setTemplate:S.f.bound,getTemplate:S.f.bound,setLayers:S.f.bound,setLayer:S.f.bound,addLayer:S.f.bound,removeLayer:S.f.bound,selectLayer:S.f.bound,setLayerLevel:S.f.bound,hoverLayer:S.f.bound,setLayerType:S.f.bound,editTextLayer:S.f.bound,resetSelectStatus:S.f.bound,resetEditStatus:S.f.bound,setBackgroundColor:S.f.bound,setNeedUpdateLayerHeight:S.f.bound,setIsMoving:S.f.bound});Object(S.o)((function(){return z.layers.map((function(e){return e.isSelected})).join("")}),(function(){z.resetEditStatus();var e=z.layers.findIndex((function(e){var t;return"text"===e.type&&!(null===(t=e.source.content)||void 0===t?void 0:t.replaceAll(/\n/g,""))}));e>-1&&z.removeLayer(z.layers[e].id)}));Object(S.o)((function(){var e=Object(C.cloneDeep)(z.template);return e.layers=e.layers.map((function(e){return delete e.isSelected,delete e.isEditing,delete e.isHover,e})),JSON.stringify(e)}),(function(){var e=Object(C.cloneDeep)(z.template);e.layers=e.layers.map((function(e){return e.isSelected=!1,e.isEditing=!1,e.isHover=!1,e})),localStorage.setItem("TEMPLATE",JSON.stringify(e))}),{delay:500});var I,D,B,R=n(31),N=Object(R.a)((function(e){var t=e.image,n=z.template,i=z.layers,o=z.addLayer,r=z.resetSelectStatus;return Object(h.jsx)(P,{style:{flexBasis:"".concat(100*t.webformatWidth/t.webformatHeight,"px")},onClick:function(){var e={id:String(Date.now()),type:"image",width:t.webformatWidth,height:t.webformatHeight,position:{x:(n.global.width-t.webformatWidth)/2,y:(n.global.height-t.webformatHeight)/2},rotate:0,reverse:{x:1,y:1},source:{imageUrl:t.webformatURL},zIndex:i.length?i[i.length-1].zIndex+1:1,isSelected:!0,isEditing:!1,scale:1};r(),o(e)},children:Object(h.jsx)("img",{src:t.webformatURL,alt:""})})})),P=d.a.div(I||(I=Object(l.a)(["\n  position: relative;\n  margin: 0 10px 10px 0;\n  background-color: #f0f1f4;\n  overflow: hidden;\n  flex-grow: 1;\n\n  img {\n    min-width: 100%;\n    height: 100px;\n    object-fit: cover;\n  }\n"]))),A=Object(R.a)((function(){var e=z.template,t=z.layers,n=z.addLayer,i=z.resetSelectStatus,o=z.editTextLayer;return Object(h.jsx)(k.a,{size:"large",style:{width:"100%"},onClick:function(){var r={id:String(Date.now()),type:"text",width:380,height:72,position:{x:(e.global.width-300)/2,y:(e.global.height-72)/2},rotate:0,source:{content:"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57"},style:{font:"\u5fae\u8f6f\u96c5\u9ed1",fontSize:60,lineHeight:1.2,color:"#000",textAlign:"left",fontWeight:400,underline:!1},zIndex:t.length?t[t.length-1].zIndex+1:1,isSelected:!0,isEditing:!0,scale:1};i(),n(r),o(r.id)},children:"\u6dfb\u52a0\u6587\u672c"})})),H=O.a.Panel,U=w.a.Search,X=!1,q=!1;function W(){var e=Object(r.useState)([]),t=Object(f.a)(e,2),n=t[0],i=t[1],o=Object(r.useState)({page:1,per_page:20,image_type:"all",q:"",orientation:"all",safesearch:!0}),a=Object(f.a)(o,2),c=a[0],s=a[1],l=Object(r.useState)(!1),d=Object(f.a)(l,2),u=d[0],x=d[1];Object(r.useEffect)((function(){var e;(e=c,v({url:"/",params:Object(p.a)({key:"24178889-8dbe9fccf0c585814c1dcb342",lang:"zh"},e)})).then((function(e){i(q?function(t){return t.concat(e.hits)}:e.hits)})).finally((function(){X=!1}))}),[c]);return Object(h.jsx)(F,{children:Object(h.jsxs)(O.a,{defaultActiveKey:["1"],collapsible:"header",children:[Object(h.jsx)(H,{header:Object(h.jsx)("div",{style:{width:"300px"},children:"\u56fe\u7247"}),extra:function(){var e=function(e){e&&(q=!1,s(Object.assign({},c,{q:e,page:1})),x(!1))};return Object(h.jsx)(M.a,{content:function(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(U,{placeholder:"\u641c\u7d22",onSearch:e,style:{width:200}})})},title:"\u7b5b\u9009",trigger:"click",visible:u,onVisibleChange:function(e){return x(e)},children:Object(h.jsx)(m.a,{onClick:function(e){e.stopPropagation(),x(!0)}})})}(),children:Object(h.jsxs)(G,{children:[n.map((function(e){return Object(h.jsx)(N,{image:e},e.id)})),Object(h.jsx)(k.a,{style:{width:"100%",marginTop:"20px"},onClick:function(){if(!X){X=!0;var e=c.page;q=!0,s(Object.assign({},c,{page:e?e+1:1}))}},children:"\u52a0\u8f7d\u66f4\u591a"})]})},"1"),Object(h.jsx)(H,{header:Object(h.jsx)("div",{style:{width:"300px"},children:"\u6587\u5b57"}),children:Object(h.jsx)(G,{children:Object(h.jsx)(A,{})})},"2")]})})}var Y,F=d.a.aside(D||(D=Object(l.a)(["\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  width: 400px;\n  height: 100%;\n  background-color: #fff;\n  border-right: 1px solid #ddd;\n  overflow-y: scroll;\n\n  ::-webkit-scrollbar {\n    width: 8px;\n    background: #fff;\n\n    &:horizontal {\n      height: 8px;\n    }\n  }\n\n  ::-webkit-scrollbar-track {\n    background: #fff;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: #fff;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: #c4c4c4;\n    border: 8px solid rgba(0, 0, 0, 0);\n    border-radius: 9999px;\n\n    &:hover {\n      background: #adadad;\n    }\n  }\n\n  .ant-collapse {\n    border: 0;\n    background-color: #fff;\n  }\n"]))),G=d.a.div(B||(B=Object(l.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 10px;\n  user-select: none;\n\n  &:after {\n    content: '';\n    display: block;\n    flex-grow: 99999;\n  }\n"]))),K=n(322);function J(e){var t=e.scale,n=e.setScale;return Object(h.jsxs)(_,{children:[Object(h.jsx)(K.a,{className:"slider",tipFormatter:null,defaultValue:100*t,min:10,max:500,onChange:function(e){n(e/100)}}),Object(h.jsxs)("div",{className:"scale",children:[Math.round(100*t),"%"]})]})}var _=d.a.footer(Y||(Y=Object(l.a)(["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  width: 100%;\n  height: 44px;\n  padding-right: 40px;\n  background-color: #fff;\n  border-top: 1px solid #ddd;\n\n  .slider {\n    width: 240px;\n  }\n\n  .scale {\n    width: 100px;\n    padding-left: 20px;\n  }\n"]))),V=Object(r.createContext)(1),Q=Object(r.createContext)(null),Z=n(160),$=function e(t,n,i){var o=this;Object(Z.a)(this,e),this.handleMove=function(e){},this.handleUp=function(){},this.startCoords={x:0,y:0},this.preCoords={x:0,y:0},this.mouseUp=function(){document.onmousemove=null,document.onmouseup=null,o.handleUp()},this.mouseMove=function(e){var t=e.clientX-o.preCoords.x,n=e.clientY-o.preCoords.y;o.preCoords={x:e.clientX,y:e.clientY},o.handleMove({diff:{x:t,y:n},startCoords:o.startCoords,curCoords:o.preCoords})},this.mouseDown=function(e){o.startCoords={x:e.clientX,y:e.clientY},o.preCoords={x:e.clientX,y:e.clientY},document.onmousemove=o.mouseMove,document.onmouseup=o.mouseUp},this.mouseDown(t),this.handleMove=n,i&&(this.handleUp=i)};var ee,te,ne,ie,oe,re,ae,ce,se,le,de,he=function(e,t){return{x:e.x+(t.x-e.x)/2,y:e.y+(t.y-e.y)/2}},ue=function(e,t,n){return n/=180/Math.PI,{x:(e.x-t.x)*Math.cos(n)-(e.y-t.y)*Math.sin(n)+t.x,y:(e.x-t.x)*Math.sin(n)+(e.y-t.y)*Math.cos(n)+t.y}},xe=n.p+"static/media/rotate.a7cc796d.svg";!function(e){e.TL="topLeft",e.TR="topRight",e.BL="bottomLeft",e.BR="bottomRight",e.T="top",e.B="bottom",e.L="left",e.R="right"}(de||(de={}));var be,fe=10,pe=10,ge=[0,45,90,135],ye=[{start:0,end:23,cursor:"nwse-resize"},{start:338,end:360,cursor:"nwse-resize"},{start:23,end:68,cursor:"ns-resize"},{start:68,end:113,cursor:"nesw-resize"},{start:113,end:158,cursor:"ew-resize"},{start:158,end:203,cursor:"nwse-resize"},{start:203,end:248,cursor:"ns-resize"},{start:248,end:293,cursor:"nesw-resize"},{start:293,end:338,cursor:"ew-resize"}],je=Object(R.a)((function(e){var t=e.info,n=Object(r.useContext)(V),i=z.layers,o=z.setLayer,a=z.isMoving,c=z.setIsMoving,s=Object(r.useState)([]),l=Object(f.a)(s,2),d=l[0],u=l[1],x=function(e,r){e.stopPropagation(),0===t.rotate?function(e,r){var a=i.findIndex((function(e){return e.id===t.id}));a>-1&&new $(e,(function(e){var t=Object(C.cloneDeep)(i[a]),s=e.diff,l=s.x,d=s.y,h=t.width/t.height,u=t.position,x=u.x,b=u.y,f=t.width,p=t.height;switch(r){case de.TL:var g=t.height;x+=l/n,b-=(p=(f-=l/n)/h)-g;break;case de.TR:var y=t.height;b-=(p=(f+=l/n)/h)-y;break;case de.BL:x+=l/n,p=(f-=l/n)/h;break;case de.BR:p=(f+=l/n)/h;break;case de.T:p-=d/n,b+=d/n;break;case de.B:p+=d/n;break;case de.L:f-=l/n,x+=l/n;break;case de.R:f+=l/n}(f>fe&&p>pe||f>t.width||p>t.height)&&("text"===t.type&&t.height!==p&&t.scale&&(t.scale*=p/t.height),t.width=f,t.height=p,t.position.x=x,t.position.y=b),o(t),c(!0)}),(function(){c(!1)}))}(e,r):function(e,r){var a,s,l=(t.position.x+t.width/2)*n,d=(t.position.y+t.height/2)*n,h=null===(a=e.target)||void 0===a?void 0:a.getBoundingClientRect(),u=null===(s=document.querySelector("#layerControl"))||void 0===s?void 0:s.getBoundingClientRect(),x={x:h.left-Number(u.left)+h.width/2,y:h.top-Number(u.top)+h.height/2},b={x:l-(x.x-l),y:d-(x.y-d)},f=t.width/t.height,p=i.findIndex((function(e){return e.id===t.id}));new $(e,(function(e){var a=e.curCoords,s=Object(C.cloneDeep)(i[p]),l={x:a.x-Number(u.left),y:a.y-Number(u.top)},d=s.height;switch(r){case de.TL:var h=he(l,b),g=ue(l,h,-t.rotate),y=ue(b,h,-t.rotate),j=y.x-g.x,v=y.y-g.y;j/v>f?g.x+=Math.abs(j-v*f):g.y+=Math.abs(v-j/f);var O=ue(g,h,t.rotate);h=he(O,b),g=ue(O,h,-t.rotate),j=(y=ue(b,h,-t.rotate)).x-g.x,v=y.y-g.y,j/n>fe&&v/n>pe&&(s.width=j/n,s.height=v/n,s.position.y=g.y/n,s.position.x=g.x/n);break;case de.TR:var m=he(l,b),w=ue(l,m,-t.rotate),M=ue(b,m,-t.rotate),k=w.x-M.x,S=M.y-w.y;k/S>f?w.x-=Math.abs(k-S*f):w.y+=Math.abs(S-k/f);var L=ue(w,m,t.rotate);m=he(L,b),w=ue(L,m,-t.rotate),M=ue(b,m,-t.rotate),k=w.x-M.x,S=M.y-w.y,k/n>fe&&S/n>pe&&(s.width=k/n,s.height=S/n,s.position.y=w.y/n,s.position.x=M.x/n);break;case de.BR:var E=he(l,b),T=ue(l,E,-t.rotate),z=ue(b,E,-t.rotate),I=T.x-z.x,D=T.y-z.y;I/D>f?T.x-=Math.abs(I-D*f):T.y-=Math.abs(D-I/f);var B=ue(T,E,t.rotate);E=he(B,b),T=ue(B,E,-t.rotate),z=ue(b,E,-t.rotate),I=T.x-z.x,D=T.y-z.y,I/n>fe&&D/n>pe&&(s.width=I/n,s.height=D/n,s.position.y=z.y/n,s.position.x=z.x/n);break;case de.BL:var R=he(l,b),N=ue(l,R,-t.rotate),P=ue(b,R,-t.rotate),A=P.x-N.x,H=N.y-P.y;A/H>f?N.x+=Math.abs(A-H*f):N.y-=Math.abs(H-A/f);var U=ue(N,R,t.rotate);R=he(U,b),N=ue(U,R,-t.rotate),A=(P=ue(b,R,-t.rotate)).x-N.x,H=N.y-P.y,A/n>fe&&H/n>pe&&(s.width=A/n,s.height=H/n,s.position.y=P.y/n,s.position.x=N.x/n);break;case de.T:case de.B:var X=ue(l,x,-t.rotate),q=ue({x:x.x,y:X.y},x,t.rotate),W=Math.sqrt(Math.pow(q.x-b.x,2)+Math.pow(q.y-b.y,2)),Y={x:q.x-(q.x-b.x)/2,y:q.y+(b.y-q.y)/2},F=!1,G=(t.rotate+360)%360;r===de.T&&(G>=0&&G<=90||G>=270&&G<=360?q.y>=b.y&&(F=!0):q.y<=b.y&&(F=!0)),r===de.B&&(G>=90&&G<=270?q.y>=b.y&&(F=!0):q.y<=b.y&&(F=!0)),W/n>pe&&!F&&(s.height=W/n,s.position.y=(Y.y-W/2)/n,s.position.x=Y.x/n-s.width/2);break;case de.L:case de.R:var K=ue(l,x,-t.rotate),J=ue({x:K.x,y:x.y},x,t.rotate),_=Math.sqrt(Math.pow(J.x-b.x,2)+Math.pow(J.y-b.y,2)),V={x:J.x-(J.x-b.x)/2,y:J.y+(b.y-J.y)/2},Q=!1,Z=(t.rotate+360)%360;r===de.L&&(Z>=0&&Z<=90||Z>=270&&Z<=360?J.x>=b.x&&(Q=!0):J.x<=b.x&&(Q=!0)),r===de.R&&(Z>=90&&Z<=270?J.x>=b.x&&(Q=!0):J.x<=b.x&&(Q=!0)),_/n>fe&&!Q&&(s.width=_/n,s.position.y=V.y/n-s.height/2,s.position.x=(V.x-_/2)/n)}"text"===s.type&&s.height!==d&&s.scale&&(s.scale*=s.height/d),o(s),c(!0)}),(function(){c(!1)}))}(e,r)},b=Object(r.useCallback)((function(){var e=t.rotate;e<0&&(e+=360);var n=[];ge.forEach((function(t){var i=(t+e)%360,o=ye.find((function(e){return e.start<=i&&e.end>=i}));o&&n.push(o.cursor)})),u(n)}),[t.rotate]);return Object(r.useEffect)((function(){b()}),[b]),Object(h.jsxs)(ve,{style:{width:t.width*n,height:t.height*n,transform:"translate(".concat(t.position.x*n,"px, ").concat(t.position.y*n,"px) rotate(").concat(t.rotate,"deg)")},className:["border-control",a?"moving":""].join(" "),children:[Object(h.jsx)(ke,{style:{cursor:d[0]},onMouseDown:function(e){return x(e,de.BR)}}),t.width*n>30&&t.height*n>30&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(me,{style:{cursor:d[0]},onMouseDown:function(e){return x(e,de.TL)}}),Object(h.jsx)(we,{style:{cursor:d[2]},onMouseDown:function(e){return x(e,de.TR)}}),Object(h.jsx)(Me,{style:{cursor:d[2]},onMouseDown:function(e){return x(e,de.BL)}}),Object(h.jsx)(Ce,{style:{cursor:d[3]},onMouseDown:function(e){return x(e,de.L)}}),Object(h.jsx)(Ee,{style:{cursor:d[3]},onMouseDown:function(e){return x(e,de.R)}}),"text"!==t.type&&Object(h.jsx)(Se,{style:{cursor:d[1]},onMouseDown:function(e){return x(e,de.T)}}),"text"!==t.type&&Object(h.jsx)(Le,{style:{cursor:d[1]},onMouseDown:function(e){return x(e,de.B)}})]}),Object(h.jsx)(Te,{className:"rotate-point",icon:xe,onMouseDown:function(e){e.stopPropagation();var n=e.target.closest(".border-control");if(n){var r=n.getBoundingClientRect(),a={x:r.left+r.width/2,y:r.top+r.height/2};new $(e,(function(e){var n=e.curCoords,r=n.y-a.y,s=n.x-a.x,l=180*Math.atan2(r,s)/Math.PI,d=i.findIndex((function(e){return e.id===t.id})),h=Object(C.cloneDeep)(i[d]);h.rotate=(l-90+360)%360,o(h),c(!0)}),(function(){c(!1)}))}}})]})})),ve=d.a.div(ee||(ee=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n\n  &.moving .rotate-point {\n    opacity: 0;\n  }\n\n  &.moving span {\n    opacity: 0;\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    border: 2px solid #00c4cc;\n  }\n"]))),Oe=d.a.span(te||(te=Object(l.a)(["\n  position: absolute;\n  display: block;\n  background: transparent;\n  z-index: 1;\n  pointer-events: auto;\n  width: 18px;\n  height: 18px;\n  user-select: none;\n  transition: opacity 200ms;\n\n  ::before {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    border-radius: 6px;\n    background: #fff;\n    box-shadow: 0 0 5px 1px rgb(57 76 96 / 15%), 0 0 0 1px rgb(53 71 90 / 20%);\n  }\n"]))),me=Object(d.a)(Oe)(ne||(ne=Object(l.a)(["\n  top: -9px;\n  left: -9px;\n  cursor: nwse-resize;\n"]))),we=Object(d.a)(Oe)(ie||(ie=Object(l.a)(["\n  top: -9px;\n  right: -9px;\n  cursor: nesw-resize;\n"]))),Me=Object(d.a)(Oe)(oe||(oe=Object(l.a)(["\n  bottom: -9px;\n  left: -9px;\n  cursor: nesw-resize;\n"]))),ke=Object(d.a)(Oe)(re||(re=Object(l.a)(["\n  bottom: -9px;\n  right: -9px;\n  cursor: nwse-resize;\n"]))),Se=Object(d.a)(Oe)(ae||(ae=Object(l.a)(["\n  width: calc(100% - 24px);\n  height: 12px;\n  top: -6px;\n  left: 12px;\n  cursor: ns-resize;\n\n  ::before {\n    width: 16px;\n    height: 4px;\n  }\n"]))),Le=Object(d.a)(Oe)(ce||(ce=Object(l.a)(["\n  width: calc(100% - 24px);\n  height: 12px;\n  bottom: -6px;\n  left: 12px;\n  cursor: ns-resize;\n\n  ::before {\n    width: 16px;\n    height: 4px;\n  }\n"]))),Ce=Object(d.a)(Oe)(se||(se=Object(l.a)(["\n  width: 12px;\n  height: calc(100% - 24px);\n  top: 12px;\n  left: -6px;\n  cursor: ew-resize;\n\n  ::before {\n    width: 4px;\n    height: 16px;\n  }\n"]))),Ee=Object(d.a)(Oe)(le||(le=Object(l.a)(["\n  width: 12px;\n  height: calc(100% - 24px);\n  top: 12px;\n  right: -6px;\n  cursor: ew-resize;\n\n  ::before {\n    width: 4px;\n    height: 16px;\n  }\n"]))),Te=d.a.div({position:"absolute",left:"50%",bottom:"-50px",width:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate(-50%, -50%)",pointerEvents:"auto",borderRadius:"50%",boxShadow:"0 0 5px 1px rgb(57 76 96 / 15%), 0 0 0 1px rgb(57 76 96 / 15%)",userSelect:"none",cursor:"grab"},(function(e){return{background:"#fff url(".concat(e.icon,") no-repeat center / 18px 18px")}}));function ze(e){var t=e.info,n=Object(r.useContext)(V);return Object(h.jsx)(Be,{style:{width:t.width*n,height:t.height*n,transform:"translate(".concat(t.position.x*n,"px, ").concat(t.position.y*n,"px) rotate(").concat(t.rotate,"deg)")}})}var Ie,De,Be=d.a.div(be||(be=Object(l.a)(["\nposition: absolute;\ntop: 0;\nleft: 0;\npointer-events: none;\n\n&:after {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  right: -1px;\n  bottom: -1px;\n  border: 2px solid #00c4cc;\n}\n"]))),Re=Object(R.a)((function(e){var t,n,i=e.children,o=e.info,a=Object(r.useContext)(V),c=z.template,s=z.layers,l=z.setLayer,d=z.selectLayer,u=z.hoverLayer,x=z.isMoving,b=z.setIsMoving,f=Object(r.useContext)(Q).setIsSelectedBackground,g=function(){var e={x:0,y:0,width:0,height:0,rotate:0},t={x:0,y:0,width:0,height:0},n="",i=[],o=1,r={width:0,height:0},a=4,c=document.querySelector("#verticalLine"),s=document.querySelector("#horizontalLine"),l=0,d=0,h=function(n,i){Math.abs(n-(t.x+t.width))<=a&&(i.x=n-e.width,i.x+=(e.width-t.width)/2,l=2),Math.abs(n-(t.x+t.width/2))<=a&&(i.x=n-e.width/2,l=1),Math.abs(n-t.x)<=a&&(i.x=n,i.x-=(e.width-t.width)/2,l=0)},u=function(n,i){Math.abs(n-(t.y+t.height))<=a&&(i.y=n-e.height,i.y-=(t.height-e.height)/2,d=2),Math.abs(n-(t.y+t.height/2))<=a&&(i.y=n-e.height/2,d=1),Math.abs(n-t.y)<=a&&(i.y=n,i.y+=(t.height-e.height)/2,d=0)},x=function(n){if(c&&s){if(n.x!==e.x){var i=0;0===l&&(i=n.x+(e.width-t.width)/2),1===l&&(i=n.x+e.width/2),2===l&&(i=n.x+(e.width-t.width)/2+t.width),c.style.transform="translateX(".concat(i*o,"px)"),c.style.visibility="visible"}else c.style.visibility="hidden";if(n.y!==e.y){var r=0;0===d&&(r=n.y-(t.height-e.height)/2),1===d&&(r=n.y+e.height/2),2===d&&(r=n.y-(t.height-e.height)/2+t.height),s.style.transform="translateY(".concat(r*o,"px)"),s.style.visibility="visible"}else s.style.visibility="hidden"}};return{getRect:function(){return e},init:function(c,s,l,d,h){n=s,i=l,a=4/(o=d),r=h;var u=(e=c).rotate*Math.PI/180,x=Math.abs(e.width*Math.cos(u))+Math.abs(e.height*Math.sin(u)),b=Math.abs(e.height*Math.cos(u))+Math.abs(e.width*Math.sin(u));t.width=x,t.height=b,t.x=e.x+(e.width-x)/2,t.y=e.y-(b-e.height)/2},move:function(o){var a=o.x,c=o.y;e.x=a,e.y=c;var s={x:e.x,y:e.y};return t.x=e.x+(e.width-t.width)/2,t.y=e.y-(t.height-e.height)/2,i.forEach((function(e){var t=e.rotate*Math.PI/180,i=Math.abs(e.width*Math.cos(t))+Math.abs(e.height*Math.sin(t)),o=Math.abs(e.height*Math.cos(t))+Math.abs(e.width*Math.sin(t)),r=e.position.x+(e.width-i)/2,a=e.position.y-(o-e.height)/2;e.id!==n&&(h(r+i,s),h(r+i/2,s),h(r,s),u(a+o,s),u(a+o/2,s),u(a,s))})),h(r.width,s),h(r.width/2,s),h(0,s),u(r.height,s),u(r.height/2,s),u(0,s),x(s),s}}}(),y=g.getRect,j=g.init,v=g.move,O=function(e){var t=e.diff,n=Object(C.cloneDeep)(o),i=v({x:y().x+t.x/a,y:y().y+t.y/a});n.position=i,l(n),b(!0)},m=function(){document.querySelector("#verticalLine").style.visibility="hidden",document.querySelector("#horizontalLine").style.visibility="hidden",b(!1)};return Object(h.jsxs)(Ye,{style:{width:o.width,height:o.height,transform:"translate(".concat(o.position.x,"px, ").concat(o.position.y,"px) rotate(").concat(o.rotate,"deg)"),zIndex:o.zIndex},onMouseDown:function(e){e.stopPropagation(),o.isEditing||(d(o.id),f(!1),new $(e,O,m),j(Object(p.a)(Object(p.a)({},o.position),{},{width:o.width,height:o.height,rotate:o.rotate}),o.id,s,a,Object(p.a)({},c.global)))},onMouseEnter:function(e){e.stopPropagation(),u(o.id)},onMouseOut:function(e){e.stopPropagation(),u()},className:[x?"moving":"",o.isEditing?"edit":""].join(" "),children:[Object(h.jsx)(Fe,{style:{transform:"scale(".concat((null===(t=o.reverse)||void 0===t?void 0:t.x)||1,", ").concat((null===(n=o.reverse)||void 0===n?void 0:n.y)||1,")")},children:i}),o.isSelected&&Object(h.jsx)(Ne,{children:Object(h.jsx)(je,{info:o})}),!o.isSelected&&!x&&o.isHover&&Object(h.jsx)(Ne,{children:Object(h.jsx)(ze,{info:o})})]})}));function Ne(e){var t=e.children;return Object(c.createPortal)(t,document.querySelector("#layerControl"))}var Pe,Ae,He,Ue,Xe,qe,We,Ye=d.a.div(Ie||(Ie=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  pointer-events: auto;\n  user-select: none;\n  cursor: default;\n\n  &.moving {\n    cursor: all-scroll;\n  }\n\n  &.edit {\n    cursor: text;\n  }\n"]))),Fe=d.a.div(De||(De=Object(l.a)(["\n  width: 100%;\n  height: 100%;\n  transition: transform 250ms;\n"]))),Ge=(n(251),n(252),n(161)),Ke=n.n(Ge),Je=Object(R.a)((function(e){var t,n=e.layer,i=Object(r.useRef)(null),o=z.editTextLayer,a=z.setLayer,c=z.needUpdateLayerHeight,s=z.setNeedUpdateLayerHeight,l=z.isMoving,d=Object(r.useContext)(V),u=Object(r.useState)(null),x=Object(f.a)(u,2),b=x[0],p=x[1],g=null===(t=document.querySelector("#textControl"))||void 0===t?void 0:t.getBoundingClientRect(),y=Object(r.useCallback)((function(){if(b){var e=Object(C.cloneDeep)(n),t=b.getText();if(e.source.content=t,i.current){var o=i.current.getBoundingClientRect(),r=n.rotate%180*Math.PI/180,c=Math.abs((o.height-n.width*d*Math.sin(r))/Math.cos(r));if(c/d!==n.height){e.height=c/d;var s={x:o.left+o.width/2-g.left,y:o.top+o.height/2-g.top},l=s.x/d-n.width/2,h=(s.y-c/2)/d;e.position={x:l,y:h}}}a(e)}}),[b,n,a,d,g]);Object(r.useEffect)((function(){if(c&&i.current){var e=Object(C.cloneDeep)(n),t=i.current.getBoundingClientRect(),o=n.rotate%180*Math.PI/180,r=Math.abs((t.height-n.width*d*Math.sin(o))/Math.cos(o));if(r/d!==n.height){e.height=r/d;var l={x:t.left+t.width/2-g.left,y:t.top+t.height/2-g.top},h=l.x/d-n.width/2,u=(l.y-r/2)/d;e.position={x:h,y:u},a(e)}s(!1)}}),[g,n,c,d,a,s]),Object(r.useEffect)((function(){if(l&&i.current){var e=i.current.getBoundingClientRect(),t=n.rotate%180*Math.PI/180,o=Math.abs((e.height-n.width*d*Math.sin(t))/Math.cos(t));if(Math.abs(o/d-n.height)>1){var r=Object(C.cloneDeep)(n);r.height=o/d,a(r)}}}),[n,d,l,g,a]);return Object(r.useEffect)((function(){if(i.current&&!b){var e=new Ke.a(i.current);p(e)}}),[b]),Object(r.useEffect)((function(){b&&n.source.content&&b.setText(n.source.content)}),[b]),Object(r.useEffect)((function(){b&&(b.enable(n.isEditing),n.isEditing&&b.setSelection(0,1e3))}),[b,n.isEditing]),Object(r.useEffect)((function(){return b&&b.on("text-change",y),function(){null===b||void 0===b||b.off("text-change",y)}}),[b,y]),Object(h.jsx)(_e,{style:{transform:"scale(".concat(n.scale,")"),width:"".concat(n.width/(n.scale||1),"px"),height:"".concat(n.height/(n.scale||1),"px")},children:Object(h.jsx)(Ve,{data:n.style,onDoubleClick:function(){o(n.id)},children:Object(h.jsx)(Qe,{ref:i,spellCheck:"false"})})})})),_e=d.a.div(Pe||(Pe=Object(l.a)(["\n  transform-origin: 0 0;\n"]))),Ve=d.a.div({},(function(e){return{fontFamily:'"'.concat(e.data.font,'"'),fontSize:e.data.fontSize,color:e.data.color,lineHeight:e.data.lineHeight,textAlign:e.data.textAlign,fontWeight:e.data.fontWeight,textDecorationLine:e.data.underline?"underline":"none"}})),Qe=d.a.div(Ae||(Ae=Object(l.a)(["\n  font-family: inherit;\n  font-size: inherit;\n\n  .ql-editor {\n    padding: 0;\n    overflow: visible;\n    font-family: inherit;\n    line-height: inherit;\n    text-align: inherit;\n    white-space: break-spaces;\n    /* user-select: text; */\n    line-break: anywhere;\n\n    &>* {\n      cursor: inherit;\n    }\n  }\n"]))),Ze=Object(R.a)((function(){var e=z.template,t=z.resetSelectStatus,n=z.setLayerType,i=e.global,o=e.background,a=Object(r.useContext)(V),c=Object(r.useContext)(Q),s=c.isSelectedBackground,l=c.setIsSelectedBackground;return Object(h.jsxs)(lt,{width:i.width,height:i.height,scale:a,children:[Object(h.jsxs)(dt,{width:i.width,height:i.height,scale:a,children:[Object(h.jsx)(st,{color:o.color,onClick:function(e){e.stopPropagation(),l(!0),t(),n(j.BACKGROUND)}}),e.layers.map((function(e){return"image"===e.type?Object(h.jsx)(Re,{info:e,children:Object(h.jsx)(ct,{src:Object(S.q)(e.source.imageUrl),draggable:"false"})},e.id):"text"===e.type?e.isEditing?Object(h.jsx)($e,{children:Object(h.jsx)(Re,{info:e,children:Object(h.jsx)(Je,{layer:Object(S.q)(e)})})},e.id):Object(h.jsx)(Re,{info:e,children:Object(h.jsx)(Je,{layer:Object(S.q)(e)})},e.id):Object(h.jsx)(h.Fragment,{})}))]}),Object(h.jsxs)(ut,{id:"layerControl",width:i.width,height:i.height,scale:a,children:[s&&Object(h.jsx)(xt,{}),Object(h.jsx)(bt,{id:"verticalLine"}),Object(h.jsx)(ft,{id:"horizontalLine"})]}),Object(h.jsx)(ht,{id:"textControl",width:i.width,height:i.height,scale:a})]})}));function $e(e){var t=e.children;return Object(c.createPortal)(t,document.querySelector("#textControl"))}var et,tt,nt,it,ot,rt,at,ct=d.a.img(He||(He=Object(l.a)(["\n  width: 100%;\n  height: 100%;\n"]))),st=d.a.div({position:"relative",zIndex:-1,width:"100%",height:"100%"},(function(e){return{backgroundColor:e.color}})),lt=d.a.div({flex:"none",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",pointerEvents:"none"},(function(e){return{width:e.width*e.scale+100,height:e.height*e.scale+100}})),dt=d.a.div({flex:"none",position:"relative",overflow:"hidden",backgroundColor:"#fff",userSelect:"none",pointerEvents:"auto"},(function(e){return{width:e.width,height:e.height,transform:"scale(".concat(e.scale,")")}})),ht=Object(d.a)(dt)(Ue||(Ue=Object(l.a)(["\n  position: absolute;\n  top: 50;\n  left: 50;\n  z-index: 1;\n  pointer-events: none;\n  overflow: visible;\n  background-color: transparent;\n"]))),ut=d.a.div({position:"absolute",top:50,left:50,zIndex:2,pointerEvents:"none"},(function(e){return{width:e.width*e.scale,height:e.height*e.scale}})),xt=d.a.div(Xe||(Xe=Object(l.a)(["\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  right: -1px;\n  bottom: -1px;\n  border: 2px solid #00c4cc;\n  background: transparent;\n  pointer-events: none;\n"]))),bt=d.a.div(qe||(qe=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 100%;\n  border-left: 1px dashed #c228ff;\n  visibility: hidden;\n  z-index: 2;\n"]))),ft=d.a.div(We||(We=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n  border-top: 1px dashed #c228ff;\n  visibility: hidden;\n  z-index: 2;\n"]))),pt=n(321),gt=n(327),yt=n(324),jt=n(330),vt=n(331),Ot=n(332),mt=n(333),wt=n(334),Mt=n(335),kt=n(336),St=n(168),Lt=[{name:"\u5b8b\u4f53",value:"SimSun"},{name:"\u9ed1\u4f53",value:"SimHei"},{name:"\u5fae\u8f6f\u96c5\u9ed1",value:"Microsoft Yahei"},{name:"\u6977\u4f53",value:"KaiTi"},{name:"\u534e\u6587\u6977\u4f53",value:"STKaiti"},{name:"\u7fe9\u7fe9\u4f53-\u7b80",value:"Hanzipen SC"},{name:"\u5a03\u5a03\u4f53-\u7b80",value:"Wawati SC"},{name:"\u5706\u4f53-\u7b80",value:"Yuanti SC"},{name:"\u5170\u4ead\u9ed1-\u7b80",value:"Lantinghei SC"}],Ct=[6,8,10,12,14,16,18,20,22,24,28,32,36,42,48,56,64,72,80,88,96,104,120,144],Et=pt.a.Option,Tt=Object(R.a)((function(){var e,t,n,i,o,r,a=z.template,c=z.layerType,s=z.layers,l=z.setLayerType,d=z.setLayer,u=z.setLayers,x=z.setLayerLevel,b=z.removeLayer,f=z.setBackgroundColor,p=z.setNeedUpdateLayerHeight,g=s.find((function(e){return e.isSelected})),y=(null===g||void 0===g?void 0:g.scale)||1,v="";c===j.TEXT?v=(null===g||void 0===g||null===(r=g.style)||void 0===r?void 0:r.color)||"":c===j.BACKGROUND&&(v=a.background.color);var O=(null===g||void 0===g||null===(e=g.style)||void 0===e?void 0:e.font)||"",m=(null===g||void 0===g||null===(t=g.style)||void 0===t?void 0:t.fontSize)||0,w=(null===g||void 0===g||null===(n=g.style)||void 0===n?void 0:n.textAlign)||"left",k=(null===g||void 0===g||null===(i=g.style)||void 0===i?void 0:i.fontWeight)||400,S=(null===g||void 0===g||null===(o=g.style)||void 0===o?void 0:o.underline)||!1,L={min:1,max:100,current:1};g&&(L.current=s.findIndex((function(e){return e.id===g.id}))+1,L.max=s.length);var E=function(e){var t=Object(C.cloneDeep)(g);(null===t||void 0===t?void 0:t.reverse)&&("x"===e&&(t.reverse.x=1===t.reverse.x?-1:1),"y"===e&&(t.reverse.y=1===t.reverse.y?-1:1),d(t))};return Object(h.jsxs)(zt,{children:[Object(h.jsxs)(It,{children:[[j.BACKGROUND,j.TEXT].includes(c)&&Object(h.jsx)(Dt,{children:Object(h.jsx)(M.a,{content:Object(h.jsx)(St.a,{color:v,onChange:function(e){var t="rgba(".concat(e.rgb.r,", ").concat(e.rgb.g,", ").concat(e.rgb.b,", ").concat(e.rgb.a,")");if(c===j.TEXT){var n=Object(C.cloneDeep)(g);"text"===(null===n||void 0===n?void 0:n.type)&&n.style&&(n.style.color=t,d(n))}c===j.BACKGROUND&&f(t)}}),trigger:"click",children:Object(h.jsx)(Bt,{style:{backgroundColor:v}})})}),[j.TEXT].includes(c)&&Object(h.jsx)(Dt,{children:Object(h.jsx)(pt.a,{value:O,style:{width:140},placeholder:"\u9009\u62e9\u5b57\u4f53",onChange:function(e){var t=Object(C.cloneDeep)(g);"text"===(null===t||void 0===t?void 0:t.type)&&t.style&&(t.style.font=e,d(t))},children:Lt.map((function(e){return Object(h.jsx)(Et,{value:e.value,children:Object(h.jsx)("span",{style:{fontFamily:e.value},children:e.name})},e.value)}))})}),[j.TEXT].includes(c)&&Object(h.jsx)(Dt,{children:Object(h.jsx)(pt.a,{value:(m*y).toFixed(0),style:{width:100,textAlign:"center"},placeholder:"\u5b57\u4f53\u5927\u5c0f",onChange:function(e){var t=Number(e);if(!isNaN(t)){var n=Object(C.cloneDeep)(g);"text"===(null===n||void 0===n?void 0:n.type)&&n.style&&(n.style.fontSize=t/y,d(n),p(!0))}},children:Ct.map((function(e){return Object(h.jsx)(Et,{value:e,children:e},e)}))})}),[j.TEXT].includes(c)&&Object(h.jsx)(Dt,{className:700===k?"active":"",onClick:function(){var e=Object(C.cloneDeep)(g);"text"===(null===e||void 0===e?void 0:e.type)&&e.style&&(e.style.fontWeight=700===e.style.fontWeight?400:700,d(e))},children:Object(h.jsx)(jt.a,{style:{fontSize:24}})}),[j.TEXT].includes(c)&&Object(h.jsx)(Dt,{className:S?"active":"",onClick:function(){var e=Object(C.cloneDeep)(g);"text"===(null===e||void 0===e?void 0:e.type)&&e.style&&(e.style.underline=!e.style.underline,d(e))},children:Object(h.jsx)(vt.a,{style:{fontSize:24}})}),[j.TEXT].includes(c)&&Object(h.jsxs)(Dt,{onClick:function(){var e="left";"left"===w&&(e="center"),"center"===w&&(e="right"),"right"===w&&(e="left");var t=Object(C.cloneDeep)(g);"text"===(null===t||void 0===t?void 0:t.type)&&t.style&&(t.style.textAlign=e,d(t))},children:["left"===w&&Object(h.jsx)(Ot.a,{style:{fontSize:24}}),"center"===w&&Object(h.jsx)(mt.a,{style:{fontSize:24}}),"right"===w&&Object(h.jsx)(wt.a,{style:{fontSize:24}})]}),[j.IMAGE].includes(c)&&Object(h.jsx)(Dt,{children:Object(h.jsx)(gt.a,{overlay:Object(h.jsxs)(yt.a,{style:{width:120},children:[Object(h.jsx)(yt.a.Item,{style:{padding:"10px"},icon:Object(h.jsx)(Mt.a,{}),onClick:function(){return E("x")},children:"\u6c34\u5e73\u7ffb\u8f6c"},"x"),Object(h.jsx)(yt.a.Item,{style:{padding:"10px"},icon:Object(h.jsx)(Mt.a,{style:{transform:"rotate(90deg)"}}),onClick:function(){return E("y")},children:"\u5782\u76f4\u7ffb\u8f6c"},"y")]}),trigger:["click"],children:Object(h.jsx)("span",{className:"text",children:"\u7ffb\u8f6c"})})})]}),Object(h.jsxs)(It,{children:[[j.IMAGE,j.TEXT].includes(c)&&Object(h.jsx)(Dt,{children:Object(h.jsx)(M.a,{content:Object(h.jsx)(K.a,{value:L.current,min:L.min,max:L.max,style:{width:180},onChange:function(e){e>L.current?(s.forEach((function(t,n){n+1>L.current&&n+1<=e&&x(t.id,t.zIndex-1)})),g&&x(g.id,g.zIndex+(e-L.current))):(s.forEach((function(t,n){n+1>=e&&n+1<L.current&&x(t.id,t.zIndex+1)})),g&&x(g.id,g.zIndex-(L.current-e))),u(Object(C.cloneDeep)(s).sort((function(e,t){return e.zIndex-t.zIndex})))}}),trigger:"click",placement:"bottomRight",children:Object(h.jsx)("span",{className:"text",children:"\u5c42\u7ea7\u8c03\u6574"})})}),[j.IMAGE,j.TEXT].includes(c)&&Object(h.jsx)(Dt,{onClick:function(){var e=s.find((function(e){return e.isSelected}));e&&(b(e.id),l(j.EMPTY))},children:Object(h.jsx)(kt.a,{style:{fontSize:24}})}),[j.EMPTY].includes(c)&&Object(h.jsx)(Dt,{onClick:function(){u([])},children:Object(h.jsx)("span",{className:"text",children:"\u6e05\u7a7a\u753b\u5e03"})})]})]})})),zt=d.a.div(et||(et=Object(l.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  height: 46px;\n  padding: 0 10px;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd;\n  user-select: none;\n"]))),It=d.a.div(tt||(tt=Object(l.a)(["\n  display: flex;\n  align-items: center;\n"]))),Dt=d.a.div(nt||(nt=Object(l.a)(['\n  display: flex;\n  align-items: center;\n  margin-right: 10px;\n  padding: 4px;\n  border-radius: 4px;\n  cursor: pointer;\n\n  &.active {\n    background-color: rgba(64,87,109,.07);\n  }\n\n  &:hover {\n    background-color: rgba(64,87,109,.07);\n  }\n\n  .text {\n    padding: 0 10px;\n    font-size: 16px;\n  }\n\n  input[type="search"] {\n    text-align: center;\n  }\n']))),Bt=d.a.div(it||(it=Object(l.a)(["\n  width: 28px;\n  height: 28px;\n  border: 2px solid #666;\n  border-radius: 4px;\n"]))),Rt=Object(R.a)((function(){var e=Object(r.useState)(1),t=Object(f.a)(e,2),n=t[0],i=t[1],o=Object(r.useRef)(null),a=z.template,c=z.resetSelectStatus,s=z.removeLayer,l=Object(r.useState)(!1),d=Object(f.a)(l,2),u=d[0],x=d[1];Object(r.useEffect)((function(){var e=o.current,t=a.global.width,n=a.global.height,r=1;e&&e.clientWidth<t+100&&(r=(e.clientWidth-100)/t),e&&e.clientHeight<n*r+100&&(r=(e.clientHeight-100)/n),i(r)}),[a.global.width,a.global.height]);var b=Object(r.useCallback)((function(e){if((document.activeElement===document.body||null===document.activeElement)&&("Backspace"===e.key||"Delete"===e.key)){var t=a.layers.find((function(e){return e.isSelected}));t&&s(t.id)}}),[s,a.layers]);Object(r.useEffect)((function(){return document.addEventListener("keydown",b),function(){document.removeEventListener("keydown",b)}}),[b]);return Object(h.jsxs)(Nt,{children:[Object(h.jsx)(Tt,{}),Object(h.jsx)(Pt,{ref:o,id:"CanvasWrapper",onMouseDown:function(e){"CanvasWrapper"===e.target.id&&(c(),x(!1))},children:Object(h.jsx)(Q.Provider,{value:{isSelectedBackground:u,setIsSelectedBackground:x},children:Object(h.jsx)(V.Provider,{value:n,children:Object(h.jsx)(Ze,{})})})}),Object(h.jsx)(J,{scale:n,setScale:function(e){return i(e)}})]})})),Nt=d.a.div(ot||(ot=Object(l.a)(["\n  position: relative;\n  flex: 1;\n  overflow: hidden;\n"]))),Pt=d.a.div(rt||(rt=Object(l.a)(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: calc(100% - 88px);\n  overflow: scroll;\n\n  ::-webkit-scrollbar {\n    width: 8px;\n    background: #eef2f8;\n\n    &:horizontal {\n      height: 8px;\n    }\n  }\n\n  ::-webkit-scrollbar-track {\n    background: #eef2f8;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: #eef2f8;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: #c4c4c4;\n    border: 8px solid rgba(0, 0, 0, 0);\n    border-radius: 9999px;\n\n    &:hover {\n      background: #adadad;\n    }\n  }\n"])));function At(){return Object(h.jsxs)(Ht,{children:[Object(h.jsx)(W,{}),Object(h.jsx)(Rt,{})]})}var Ht=d.a.main(at||(at=Object(l.a)(["\n  display: flex;\n  height: calc(100vh - 56px);\n  background-color: #eef2f8;\n  overflow: hidden;\n"])));n(316);var Ut=function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(u,{}),Object(h.jsx)(At,{})]})},Xt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,337)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),i(e),o(e),r(e),a(e)}))};n(317);s.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(Ut,{})}),document.getElementById("root")),Xt()}},[[318,1,2]]]);
//# sourceMappingURL=main.3e8df366.chunk.js.map