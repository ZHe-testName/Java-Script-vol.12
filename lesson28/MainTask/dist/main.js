!function(e){var t={};function s(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);var o=()=>{let e=document.querySelector("#timer-hours"),t=document.querySelector("#timer-minutes"),s=document.querySelector("#timer-seconds");setInterval(()=>{let o=(()=>{let e=(new Date).getFullYear(),t=(new Date).getMonth(),s=(new Date).getDate()+1,o=(new Date(e,t,s).getTime()-(new Date).getTime())/1e3,r=Math.floor(o%60),n=Math.floor(o/60%60);return{hours:Math.floor(o/60/60),minutes:n,seconds:r}})();e.textContent=o.hours<10?"0"+o.hours:o.hours,t.textContent=o.minutes<10?"0"+o.minutes:o.minutes,s.textContent=o.seconds<10?"0"+o.seconds:o.seconds},1e3)};var r=()=>{const e=document.querySelector("menu"),t=document.querySelector("main"),s=()=>{e.classList.toggle("active-menu")};e.addEventListener("click",e=>{let t=e.target.closest("a");if(t)if(t.classList.contains("close-btn"))s();else if(t.closest("li")){e.preventDefault(),s();let o=t.getAttribute("href").substr(1);o.includes("-")&&(o=o.substr(0,o.indexOf("-"))),document.querySelector("."+o).scrollIntoView({block:"start",behavior:"smooth"})}}),t.addEventListener("click",t=>{let o=t.target;(o.closest(".menu")||o.closest("main")&&e.classList.contains("active-menu"))&&s()})};var n=()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),s=document.querySelector(".popup-content");let o=10;function r(){if(document.documentElement.clientWidth>768){e.style.display="block",s.style.left="10px";let t,r=(document.documentElement.clientWidth-s.offsetWidth)/2+50;const n=function(){o+=20,t=requestAnimationFrame(n),o<Math.ceil(r)?s.style.left=o+"px":(cancelAnimationFrame(t),s.style.left="",o=10)};n()}else e.style.display="block"}t.forEach(e=>e.addEventListener("click",r)),e.addEventListener("click",t=>{let s=t.target;s.classList.contains("popup-close")?e.style.display="none":(s=s.closest(".popup-content"),s||(e.style.display="none"))})};var a=()=>{const e=document.querySelector("main>a");e.addEventListener("click",t=>{t.preventDefault();let s=e.getAttribute("href").substr(1);document.querySelector("#"+s).scrollIntoView({block:"start",behavior:"smooth"})})};var c=()=>{const e=document.querySelector(".service-header"),t=document.querySelectorAll(".service-header-tab"),s=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{let o=e.target;o=o.closest(".service-header-tab"),o&&t.forEach((e,r)=>{e===o&&(e=>{for(let o=0;o<s.length;o++)e===o?(s[o].classList.remove("d-none"),t[o].classList.add("active")):(s[o].classList.add("d-none"),t[o].classList.remove("active"))})(r)})})};var l=()=>{const e=document.querySelectorAll(".portfolio-item"),t=document.querySelector(".portfolio-content"),s=document.querySelector(".portfolio-dots");let o,r,n=0;const a=(e,t,s)=>{e[t].classList.remove(s)},c=(e,t,s)=>{e[t].classList.add(s)},l=e=>{s.innerHTML="";for(let t=0;t<e+1;t++){let e=document.createElement("li");e.classList.add("dot"),s.append(e)}r=document.querySelectorAll(".dot")},i=()=>{a(e,n,"portfolio-item-active"),n++,n>=e.length&&(n=0),l(n),c(e,n,"portfolio-item-active"),c(r,n,"dot-active")},u=(e=2e3)=>{o=setInterval(i,e)};u(),l(n),c(r,n,"dot-active"),t.addEventListener("click",t=>{t.preventDefault();let s=t.target;s.matches(".portfolio-btn, .dot")&&(a(e,n,"portfolio-item-active"),s.matches("#arrow-left")?n--:s.matches("#arrow-right")?n++:s.matches(".dot")&&r.forEach((e,t)=>{e===s&&(n=t)}),n>=e.length?n=0:n<0&&(n=e.length-1),l(n),c(e,n,"portfolio-item-active"),c(r,n,"dot-active"))}),t.addEventListener("mouseover",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(o)}),t.addEventListener("mouseout",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&u()})};var i=()=>{const e=document.getElementById("command");let t;e.addEventListener("mouseover",e=>{let s=e.target;t=s.src,s.matches(".command__photo")&&(s.src=s.dataset.img)}),e.addEventListener("mouseout",e=>{let s=e.target;s.matches(".command__photo")&&(s.src=t)})};var u=()=>{document.querySelectorAll("input.calc-item").forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/\D/,"")})})};var d=(e=100)=>{const t=document.querySelector(".calc-block"),s=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),r=document.querySelector(".calc-count"),n=document.querySelector(".calc-day"),a=document.getElementById("total"),c=()=>{let t=0,c=1,l=1;const i=s.options[s.selectedIndex].value,u=+o.value;r.value>1&&(c+=(r.value-1)/10),n.value&&n.value<5?l*=2:n.value&&n.value<10&&(l*=1.5),i&&u&&(t=Math.floor(e*i*u*c*l),(e=>{let t=0,s=setInterval(()=>{e>=t?(a.textContent=t,t+=100):e<t&&clearInterval(s)},10)})(t)),a.textContent=t};t.addEventListener("change",e=>{let t=e.target;(t.matches("select")||t.matches("input"))&&c()})};var m=class{constructor(e){this.form=document.querySelector(e),this.errorMessage="Что-то пошло не так...",this.successMessage="Спасибо! Мы скоро с Вами свяжемся.",this.statusMessage=document.createElement("div"),this.statusMessage.classList.add("preloader-wrap")}init(){this.form.addEventListener("submit",e=>{e.preventDefault(),this.form.appendChild(this.statusMessage),this.statusMessage.innerHTML='<div class="load-container">\n                                                <div class="dash uno"></div>\n                                                <div class="dash dos"></div>\n                                                <div class="dash tres"></div>\n                                                <div class="dash cuatro"></div>\n                                            </div>',this.formData=new FormData(this.form),this.body={},this.formData.forEach((e,t)=>{this.body[t]=e}),this.postData(this.body).then(e=>{if(200!==e.status)throw new Error("Network status is not 200.");this.showResMessage(this.successMessage),console.log(e)}).catch(e=>{this.showResMessage(this.errorMessage),console.error(e)})}),this.form.addEventListener("input",e=>{this.target=e.target,"user_phone"===this.target.name?this.numsValidator(this.target):"user_name"!==this.target.name&&"user_message"!==this.target.name||this.wordsValidator(this.target)}),this.postData=e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"aplication/json"},body:JSON.stringify(e)}),this.showResMessage=e=>{this.statusMessage.innerHTML=`<p>${e}</p>`,this.clearInputs()},this.clearInputs=()=>{this.formElems=this.form.elements;for(let e of this.formElems)"input"===e.tagName.toLowerCase()&&(e.value="")},this.numsValidator=e=>{this.value=e.value,e.value=this.value.replace(/[^+\d]/,"")},this.wordsValidator=e=>{this.val=e.value,e.value=this.val.replace(/[^а-я\s\.]/,"")}}};const h=new m("#form1"),v=new m("#form2"),f=new m("#form3");o(),r(),n(),a(),c(),l(),i(),u(),d(100),h.init(),v.init(),f.init()}]);