(this.webpackJsonpfakefrontend=this.webpackJsonpfakefrontend||[]).push([[0],{20:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(2),j=n.n(a),o=n(13),r=n.n(o),b=(n(20),n(3)),l=n(14),s=n.n(l),u=function(){var e=Object(a.useState)(""),t=Object(b.a)(e,2),n=t[0],j=t[1],o=Object(a.useState)(""),r=Object(b.a)(o,2),l=r[0],u=r[1],i=Object(a.useState)(""),O=Object(b.a)(i,2),x=O[0],h=O[1],d=Object(a.useState)(""),f=Object(b.a)(d,2),g=f[0],p=f[1];return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=(new Date).getFullYear(),c={tag:l,name:x,url:g,month:n};console.log("newlink frontend",c),s.a.put("/".concat(t),c).then((function(e){console.log(e),console.log("posted link to the server")})).catch((function(e){return console.log(e)})),console.log(n,l,x,g)},children:[Object(c.jsx)("label",{children:"Enter month"}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{value:n,onChange:function(e){j(e.target.value)}}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{children:"Enter tag"}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{value:l,onChange:function(e){u(e.target.value)}}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{children:"Enter name"}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{value:x,onChange:function(e){h(e.target.value)}}),Object(c.jsx)("br",{}),Object(c.jsx)("label",{children:"Enter url"}),Object(c.jsx)("br",{}),Object(c.jsx)("input",{value:g,onChange:function(e){p(e.target.value)}}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{type:"submit",children:"Save note"})]})})};r.a.render(Object(c.jsx)(j.a.StrictMode,{children:Object(c.jsx)(u,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.7044e080.chunk.js.map