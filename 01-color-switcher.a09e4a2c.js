const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let n=null;e.addEventListener("click",(function(o){e.disabled=!0,t.disabled=!1,n=setInterval((function(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(function(d){clearInterval(n),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.a09e4a2c.js.map