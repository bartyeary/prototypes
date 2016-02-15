//adds a horizontal bar beneath the logo/header when scrolled
// $(window).scroll(function() {     
//     var scroll = $(window).scrollTop();
//     if (scroll > 0) {
//         $("#nav").addClass("active");
//     }
//     else {
//         $("#nav").removeClass("active");
//     }
// });

// var s = Snap("#snapsvg");

// var bigcircle = s.circle(60,60,100);
// var bigrect = s.rect(100, 100, 100, 100);
// var smallrect = s.rect(15,55,50,50);
// var smallcircle = s.circle(20,40,20);
// var masker = s.group(smallcircle, smallrect, bigrect);

// bigcircle.attr({
// 	fill: "#91AECC"

// });

// masker.attr({
// 	fill: "#FFF"
// });

// bigcircle.attr({
// 	mask: masker
// });

// function mover(){
// 	bigrect.animate({transform: "r0,150,150"}, 2000, mina.easeinout, function(){
// 		bigrect.animate({transform: "r360,150,150"}, 4000, mina.easeinout);
// 	});
// };

// setInterval(mover, 5000);


var coin = document.getElementById("coin");

coin.onmousedown = function(){
	TweenMax.to(coin, .2, {scale:.8, onComplete:fullsizecoin});
}

coin.onmouseup = function(){
	TweenMax.to(coin, 2, {left:1000, ease:Back.easeOut.config(1), onComplete:returncoin});
}

function fullsizecoin(){
	TweenMax.to(coin, .2, {scale:1});
}

function returncoin(){
	TweenMax.to(coin, 2, {left:100, ease:Back.easeInOut});
}

//FISHERMAN
var fishermanHead = document.getElementById("fisherman_head");	
var fishermanHeadMove = TweenMax.to(fishermanHead, 1.2, {left:21, rotation:-7, transformOrigin:'35% 300%', ease:Sine.easeInOut, repeat:-1, yoyo:true});

var fishermanBubble = document.getElementById("fisherman_bubble");
var fishermanEyes = document.getElementById("fisherman_eyesOpen");
var fishermanPipe = document.getElementById("fisherman_pipe");

var fishermantl = new TimelineMax({repeat:-1});
fishermantl.to(fishermanEyes, .5, {scaleY:.1, transformOrigin: '50% 50%'})
	.to(fishermanEyes, .7, {scaleY:1, transformOrigin: '50% 50%'})
	.to(fishermanPipe, .4, {rotation:'4deg', ease:Quad.easeIn, transformOrigin: '50% 22%'} )
	.to(fishermanPipe, .4, {rotation:'0deg', transformOrigin: '50% 22%'} )
	.from(fishermanBubble, 1, {scale:0, opacity:0, transformOrigin: '26% 64%'})
	.to(fishermanBubble, 1, {scale:1.4, opacity:0, top:-20})
	.to(fishermanEyes, .7, {scaleY:1, transformOrigin: '50% 50%'})
	.to(fishermanEyes, .5, {scaleY:.1, transformOrigin: '50% 50%'})
	.to(fishermanEyes, .7, {scaleY:1, transformOrigin: '50% 50%'})
	.from(fishermanBubble, 1, {scale:0, opacity:0, transformOrigin: '26% 64%'})
	.to(fishermanBubble, 1, {scale:1.8, opacity:0, top:-25});

//COP
var copHead = document.getElementById("cop_head");
var copHeadMove = TweenMax.to(copHead, .3, {top:2, transformOrigin:'50% 50%', ease:Sine.easeInOut, repeat:-1, yoyo:true});
var copSmile = document.getElementById("cop_smile")
var copSmileMove = TweenMax.to(copSmile, 1, {scaleY:.5, transformOrigin:'50% 60%', ease:Sine.easeInOut, repeat:-1, yoyo:true});


var copMustache = document.getElementById("cop_mustache");
var copEyes = document.getElementById("cop_eyes");

var coptl = new TimelineMax({repeat:-1});
coptl.to(copMustache, .2, {rotation:'6deg'})
	.to(copMustache, .2, {rotation:'-6deg'})
	.to(copMustache, .2, {rotation:'0deg'})
	.to(copEyes, .2, {scaleY:0})
	.to(copEyes, .2, {scaleY:1})
	.to(copMustache, .2, {rotation:'6deg'})
	.to(copMustache, .2, {rotation:'-6deg'})
	.to(copMustache, .2, {rotation:'2deg'})
	.to(copMustache, .2, {rotation:'-2deg'})
	.to(copMustache, .2, {rotation:'0deg'})
