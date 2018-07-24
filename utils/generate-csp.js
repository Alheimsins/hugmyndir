const crypto = require('crypto')
const builder = require('content-security-policy-builder')
const styleHash = crypto.createHash('sha256')
const scriptHash = crypto.createHash('sha256')
const bundleSha = `'sha512-W9v//pH1ri99xpxFqM1rO2Wp3KnXj36iUE7RKu4BSA0Y0u0lMF6xqX1yfkbnxc/O1kEI4/ZSWmMDqPl6X2pSSw=='`

let config = {
  directives: {
    defaultSrc: [`'none'`],
    connectSrc: [`'self'`, 'wss://gundb.alheimsins.net'],
    scriptSrc: [`'strict-dynamic'`],
    styleSrc: [`'self'`],
    formAction: [`'self'`],
    objectSrc: [`'self'`],
    frameAncestors: [`'self'`],
    baseUri: [`'self'`]
  }
}

const style = 'html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0;}h1{font-size:2em;margin:.67em 0;}hr{box-sizing:content-box;height:0;overflow:visible;}button,input,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible;}button{text-transform:none;}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0;}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText;}textarea{overflow:auto;}a,body,code,div,dt,form,h1,h2,h3,h4,h5,h6,html,input[type=email],input[type=number],input[type=password],input[type=tel],input[type=text],input[type=url],main,p,pre,textarea{box-sizing:border-box;}.bn{border-style:none;border-width:0;}.shadow-3{box-shadow:2px 2px 4px 2px rgba(0,0,0,.2);}.flex{display:flex;}.flex-column{flex-direction:column;}.w-50{width:50%;}.w-100{width:100%;}.black{color:#000;}.white{color:#fff;}.bg-white{background-color:#fff;}.pa3{padding:1rem;}.mb3{margin-bottom:1rem;}.mt3{margin-top:1rem;}.tc{text-align:center;}.f-5,.f-subheadline{font-size:5rem;}.f3{font-size:1.5rem;}.pointer:hover{cursor:pointer;}'
const script = ';(function(a){"use strict";var b=function(b,c,d){function e(a){return h.body?a():void setTimeout(function(){e(a)})}function f(){i.addEventListener&&i.removeEventListener("load",f),i.media=d||"all"}var g,h=a.document,i=h.createElement("link");if(c)g=c;else{var j=(h.body||h.getElementsByTagName("head")[0]).childNodes;g=j[j.length-1]}var k=h.styleSheets;i.rel="stylesheet",i.href=b,i.media="only x",e(function(){g.parentNode.insertBefore(i,c?g:g.nextSibling)});var l=function(a){for(var b=i.href,c=k.length;c--;)if(k[c].href===b)return a();setTimeout(function(){l(a)})};return i.addEventListener&&i.addEventListener("load",f),i.onloadcssdefined=l,l(f),i};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b})("undefined"!=typeof global?global:this);;(function(a){if(a.loadCSS){var b=loadCSS.relpreload={};if(b.support=function(){try{return a.document.createElement("link").relList.supports("preload")}catch(b){return!1}},b.poly=function(){for(var b=a.document.getElementsByTagName("link"),c=0;c<b.length;c++){var d=b[c];"preload"===d.rel&&"style"===d.getAttribute("as")&&(a.loadCSS(d.href,d,d.getAttribute("media")),d.rel=null)}},!b.support()){b.poly();var c=a.setInterval(b.poly,300);a.addEventListener&&a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}),a.attachEvent&&a.attachEvent("onload",function(){a.clearInterval(c)})}}})(this);'

scriptHash.update(script)
styleHash.update(style)

const scriptSha = `'sha256-${scriptHash.digest('base64')}'`
const styleSha = `'sha256-${styleHash.digest('base64')}'`

config.directives.scriptSrc.push(scriptSha)
config.directives.scriptSrc.push(bundleSha)
config.directives.styleSrc.push(styleSha)

const policy = builder(config)

console.log(policy)
