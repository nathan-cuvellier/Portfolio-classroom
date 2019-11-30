var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) 
    alert("I do not work in the past, please use a newer browser like google chrome or firefox");



var edge = ua.indexOf('Edge/');
if (edge > 0)
    alert("note: it is preferable to use a browser like google chrome or firefox");