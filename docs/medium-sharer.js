!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t,e){e=function t(e){if(arguments.length<=0)throw new Error("Missing arguments in extend function");let n=e||{};for(let e=1;e<arguments.length;e++){let i=arguments[e]||{};for(let e in i)"object"!=typeof n[e]||isDomElement(n[e])?n[e]=n[e]||i[e]:n[e]=t(n[e],i[e])}return n}(e,n.defaultOptions),this.element=t,this.buttons=e.buttons}n.prototype={constructor:n,window:window,diffLeft:0,diffTop:-10,init:function(){},getMenuElement:function(){return this.menu||(this.menu=document.getElementById("Toolbar")),this.menu},isDisplayed:function(){return this.getMenuElement().classList.contains("share-menu-active")},showMenu:function(){this.isDisplayed()||this.getMenuElement().classList.add("share-menu-active")},hideMenu:function(){this.isDisplayed()&&this.getMenuElement().classList.remove("share-menu-active")},getMenuWidth:function(){let t=this.getMenuElement();return t.style.left="0",t.style.right="initial",t.offsetWidth},getMenuHeight:function(){let t=this.getMenuElement();return t.style.left="0",t.style.right="initial",t.offsetHeight},getBoundary:function(t){let e=t.getRangeAt(0),n=e.getBoundingClientRect();return(!n||0===n.height&&0===n.width&&e.startContainer===e.endContainer)&&(n=e.startContainer.getBoundingClientRect()),n},positionMenu:function(t){let e=this.getBoundary(t),n=this.window.innerWidth;const i=this.getMenuElement(),o=this.getMenuWidth(),r=this.getMenuHeight();let u,s=o/2,l=this.diffLeft-s,f=document.getElementById("Container"),a={};["absolute","fixed"].indexOf(window.getComputedStyle(f).getPropertyValue("position"))>-1?console.log("Container is absolute"):a.top=this.window.pageYOffset,u=e.left+e.width/2,a.top+=e.top-r,e.top<50?(i.classList.add("share-menu-arrow-over"),i.classList.remove("share-menu-arrow-under"),a.top+=50+e.height-this.diffTop):(i.classList.add("share-menu-arrow-under"),i.classList.remove("share-menu-arrow-over"),a.top+=this.diffTop),u<s?(a.left=l+s,a.right="initial"):n-u<s?(a.left="auto",a.right="0"):(a.left=l+u,a.right="initial"),this.setToolbarPosition(a)},setToolbarPosition:function(t){["top","left","right"].forEach(function(e){this.getMenuElement().style[e]=t[e]+(isNaN(t[e])?"":"px")}.bind(this))}},n.defaultOptions={element:"body",buttons:["twitter","facebook","linkedin","pinterest"]},function(){let t=new n;document.addEventListener("mouseup",function(){setTimeout(function(){window.getSelection().toString()?(t.positionMenu(window.getSelection()),t.showMenu()):t.hideMenu()},0)})}()}]);