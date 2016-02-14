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

var s = Snap("#snapsvg");

var bigcircle = s.circle(60,60,100);
var bigrect = s.rect(100, 100, 100, 100);
var smallrect = s.rect(15,55,50,50);
var smallcircle = s.circle(20,40,20);
var masker = s.group(smallcircle, smallrect, bigrect);

bigcircle.attr({
	fill: "#91AECC"

});

masker.attr({
	fill: "#FFF"
});

bigcircle.attr({
	mask: masker
});

function mover(){
	bigrect.animate({transform: "r0,150,150"}, 2000, mina.easeinout, function(){
		bigrect.animate({transform: "r360,150,150"}, 4000, mina.easeinout);
	});
};

setInterval(mover, 5000);


var coin = document.getElementById("coin");
coin.onmousedown = function(){

	TweenLite.to(coin, 2, {left:"1000px", ease:Back.easeInOut, onComplete:complete});
}

function complete(){
	TweenLite.to(coin, 2, {left:"100px", ease:Back.easeInOut});
}
