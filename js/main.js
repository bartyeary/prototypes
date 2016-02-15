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
	TweenMax.to(coin, .2, {scale:.8, onComplete:fullsizecoin})
}

coin.onmouseup = function(){
	TweenMax.to(coin, 2, {left:1000, ease:Back.easeOut.config(3), onComplete:returncoin});
}

function fullsizecoin(){
	TweenMax.to(coin, .2, {scale:1})
}

function returncoin(){
	TweenMax.to(coin, 2, {left:100, ease:Back.easeInOut});
}


var fishermanHead = document.getElementById("fisherman_head");	
var fishermanHeadMove = TweenMax.to(fishermanHead, 1, {left:21, rotation:-7, transformOrigin:'35% 300%', ease:Sine.easeInOut, repeat:-1, yoyo:true});

var fishermanEyes = document.getElementById("fisherman_eyesOpen");
var fishermanEyesMove = TweenMax.to(fishermanEyes, .4, {scaleY:.1, transformOrigin: '50% 50%', repeat:-1, yoyo:true})

var fishermanSmoke = document.getElementById("fisherman_smoke");
var fishermanSmokeMove = TweenMax.to(fishermanSmoke, 1, {scale:1.4, opacity:.1, top:-20, repeat:-1 })



