!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(2)},function(t,e,n){},function(t,e){var n,i,r,o,a,s=function(t,e,n,i){var r,o,a,s,c=(r=e||t,a=(o=n||t)[0]-r[0],s=o[1]-r[1],{length:Math.sqrt(Math.pow(a,2)+Math.pow(s,2)),angle:Math.atan2(s,a)}),f=c.angle+(i?Math.PI:0),u=.25*c.length;return[t[0]+Math.cos(f)*u,t[1]+Math.sin(f)*u]},c=function(t){var e=t.reduce(function(t,e,n,i){return 0===n?"M ".concat(e[0],",").concat(e[1]):"".concat(t," ").concat(function(t,e,n){var i=s(n[e-1],n[e-2],t),r=s(t,n[e-1],n[e+1],!0);return"C ".concat(i[0],",").concat(i[1]," ").concat(r[0],",").concat(r[1]," ").concat(t[0],",").concat(t[1])}(e,n,i))},"");return'<path d="'.concat(e,'" fill="none" />')},f="https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&utf8=&format=json&srlimit=500&srsearch=",u="https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&prop=text&page=",l=document.querySelector("#round-svg"),d=document.querySelector("#title"),h=document.querySelector("#link"),p=(document.querySelector("#resultDiv"),document.querySelector("#userinput")),m=new Date,g=2,v=!1,y=!0,w=.8,b=.65,O=[];function S(){y?((n=p.value)&&("muchete make a card please"==n?(p.value=i,n=i,console.log("manual Print!"),v=!0,C()):function(t){y=!1,q(),M(!0),A(),function(t){var e=f+t;$.getJSON(e,T)}(t)}(n)),i=n):($("#title").add("#title .term").addClass("warn"),setTimeout(function(){$("#title").add("#title .term").removeClass("warn")},500))}function M(t){$("#resultDiv").fadeOut("fast",function(){t&&$(this).empty()})}function k(){$("#resultDiv").fadeIn({duration:"fast",start:function(){D()}})}function x(t,e){d.innerText=t,$("#title").fadeIn("fast",e)}function q(t){$("#title").fadeOut("fast",t)}function T(t){if(t.query.search.length){var e=t.query.search.length-Math.floor((i=b,a=w,(Math.random()*(+a-+i)+ +i)*t.query.search.length));r=t.query.search[e].title,o=r,t.query.search[0].title,x(r,function(){var t;r=r.replace(/\s+/g,"_"),h.href="https://en.wikipedia.org/wiki/"+r,t={title:r,cardTitle:o,term:n,home:!1},window.history.pushState(t,"");var e=u+r;$.getJSON(e,j)})}else x("No results. Sorry!"),h.href="#",y=!0;var i,a}function j(t){var e=t.parse.text["*"];$("#resultDiv").html(e).promise().done(I)}function I(){$(this).find("a").each(function(t,e){var n=$(this).attr("href");n&&"/wiki"==n.substring(0,5)&&($(this).attr("href","#"),$(this).click(function(t){if($(this).attr("title")){var e=$(this).attr("title");$("#title").fadeOut({duration:"fast",start:function(){M(),A()},complete:function(){d.innerText=e,$("#title").fadeIn({complete:function(){var t=e.replace(/\s+/g,"_");h.href="https://en.wikipedia.org/wiki/"+t;var n=u+t;$.getJSON(n,j)}})}})}}))}),$(this).find("style").add(".mw-empty-elt").remove(),$(this).find("*").each(function(t,e){"none"==$(this).css("display")&&$(this).remove(),$(this).removeAttr("bgcolor"),$(this).removeAttr("style")}),$(this).find("img").removeAttr("width").removeAttr("height"),$(this).add("#title").mark(n,{element:"span",className:"term"}),$(this).prepend('<div class="left-lane"></div>'),$(this).find(".infobox").add(".toc").add(".tright").add(".vertical-navbox").appendTo(".left-lane"),$("#copyright").clone().removeAttr("style").appendTo(this),$(".mw-parser-output > p:first").addClass("first-p"),D(),$("img").on("load",D),$("#resultDiv").find("*").on("load",D);var t=0,e=$(this).find("img").length;e?$("img").on("load",function(n){++t==e&&(C(),y=!0,k())}):(y=!0,k())}function C(){var t,e,i;if($("#resultDiv").find("img").each(function(n,i){var r=$(this).attr("src");r.includes("/thumb")&&(r=(r=r.replace(/\/thumb/g,"")).substring(0,r.lastIndexOf("/"))),r.match(/.(jpg|jpeg|png|gif)$/i)&&(t?$(this).width()>t.width()&&(t=$(this),e=r):(t=$(this),e=r))}),t){(a=$(".first-p").remove(".reference").text()).endsWith("\n")&&(a=a.substring(0,a.lastIndexOf("\n")));var r=n.charAt(0).toUpperCase()+n.slice(1);((i=new Date)-m>60*g*1e3?(console.log("card '"+n+"' is being printed now: "+i),m=i,1):v&&(v=!1,1))&&setTimeout(function(){!function(t,e,n){$("#cardAlert").fadeIn({duration:"fast",start:function(){_.publish("/cardInfo","https:"+t+"|"+e+"|"+n)},complete:function(){setTimeout(function(){$("#cardAlert").fadeOut("fast")},3e3)}})}(e,r,a)},1e3)}}function A(){$("#svgContainer").fadeOut("fast",function(){$(this).find("svg").empty()})}function D(){O=[];var t=$("input.search"),e=$("body"),n=t.offset().left-e.offset().left+t.width()/2,i=t.position().top-e.offset().top+t.height()/2;O.push([n,i]),$("span.term").each(function(r,o){t=$(this),n=t.offset().left-e.offset().left+t.width()/2,i=t.offset().top-e.offset().top+t.height()/2,O.push([n,i])}),l.innerHTML=c(O),$("#svgContainer").fadeIn("fast")}window.history.pushState({home:!0},""),$.fn.random=function(){return this.eq(Math.floor(Math.random()*this.length))},$("#userinput").keypress(function(t){"13"==(t.keyCode?t.keyCode:t.which)&&S()}),$("#search-button").click(S),window.onpopstate=function(t){var e,n;console.log(t),t.state&&(M(),A(),t.state.home?q():(p.value=t.state.term,e=t.state.cardTitle,n=function(){var e=u+t.state.title;$.getJSON(e,j)},$("#title").fadeOut("fast",function(){x(e,n)})))},window.onresize=function(t){D()};var _=mqtt.connect("wss://lc-sender:1c99172350e3efc0@broker.shiftr.io",{clientId:"lc-card-sender"});_.on("connect",function(){console.log("SHIFTR: client has connected!")})}]);