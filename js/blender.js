var blender = document.getElementById("blender");
var pitcherPour = document.getElementById("pitcherPour");
var pitcherLift = document.getElementById("pitcherLift");
var blend = document.querySelector(".submitbutton");
var liquidsvg = document.getElementById("liquidsvg");
var wave = document.querySelector(".wave");

var apple = document.querySelector(".apple");
var appleNum = 0;
var appleColor = "rgb(255,150,130)";

var banana = document.querySelector(".banana");
var bananaNum = 0;
var bananaColor = "rgb(255,220,130)";

var strawberry = document.querySelector(".strawberry");
var strawberryNum = 0;
var strawberryColor = "rgb(255,100,120)";

var addToMix = [];

var chomper = document.querySelector(".chomper");

var square = document.getElementById("insideChomp");

wave.style.fill = "#FFFFFF";
wave.style.visibility = "hidden";
liquidsvg.style.fill = "#FFFFFF";
liquidsvg.style.visibility = "hidden";
var combinedColor = "#FFF";

var activeFood = null;
var activeLetter = null;

var activeFoodZ = 150;
var area = null;

var blendingElement = null;

var minValX = 10;
var maxValX = 200;
var minValY = 500;
var maxValY = 650;

blender.addEventListener("animationend", endBlend, false);
pitcherPour.addEventListener("animationend", endPour, false);

disperse();

function disperse(){
	apple.style.visibility = "visible";
	banana.style.visibility = "visible";
	strawberry.style.visibility = "visible";
	apple.style.top = Math.floor(Math.random() * (maxValY + 1 - minValY) + minValY) +"px";
	apple.style.left = Math.floor(Math.random() * (maxValX + 1 - minValX) + minValX) +"px";
	strawberry.style.top = Math.floor(Math.random() * (maxValY + 1 - minValY) + minValY) +"px";
	strawberry.style.left = Math.floor(Math.random() * (maxValX + 1 - minValX) + minValX) +"px";
	banana.style.top = Math.floor(Math.random() * (maxValY + 1 - minValY) + minValY) +"px";
	banana.style.left = Math.floor(Math.random() * (maxValX + 1 - minValX) + minValX) +"px";
}

function refillFruit(){
	activeFood.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	activeFood.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
}

blend.onmousedown = blendIngredients;
function blendIngredients(event){
	console.log(addToMix);
	if(combinedColor != "#FFF"){
		liquidsvg.style.visibility = "visible";
		blender.classList.add("shake");
		wave.style.visibility = "visible";
		wave.classList.add("wavemover");
		wave.style.fill = combinedColor;
		liquidsvg.style.fill = combinedColor;
		apple.style.visibility = "hidden";
		banana.style.visibility = "hidden";
		strawberry.style.visibility = "hidden";
	}
}


function endBlend(){
	blender.classList.remove("shake");
	wave.style.visibility = "hidden";
	wave.classList.remove("wavemover");
	beginPour();
}

function beginPour(){
	pitcherPour.classList.add("pour");
	pitcherLift.classList.add("lift");
}

function endPour(){
	combinedColor = "#FFF";
	liquidsvg.style.visibility = "hidden";
	pitcherPour.classList.remove("pour");
	pitcherLift.classList.remove("lift");
	disperse();
}

function clickFood(event){
	event.preventDefault();
	activeFoodZ = activeFoodZ +1;
	activeFood = event.currentTarget;
	activeLetter = activeFood.dataset.letter;
	activeFood.style.height = "100px";
	activeFood.style.width = "100px";
	activeFood.style.zIndex = "201";
	
}

function dragFood(event){
	if (activeFood !== null){
		activeFood.style.top = event.pageY-20 +"px";
		activeFood.style.left = event.pageX +"px";
	} 
}

function dropFood(){
	activeFood.style.height = "70px";
	activeFood.style.width = "70px";
	activeFood.style.zIndex = activeFoodZ;
	chomperCenter = getCenter(chomper);
	liquidCenter = getCenter(liquidsvg);
	activeCenter = getCenter(activeFood);
	chomperArea = isInsideArea(chomper, activeCenter[0], activeCenter[1]);
	if (chomperArea === true){
		if (activeFood === apple){
			centerElementAt(activeFood, liquidCenter[0], liquidCenter[1]);
			addToMix.push("apple");
			appleNum += 1;
			getIngredients();
		} else if (activeFood === banana){
			centerElementAt(activeFood, liquidCenter[0], liquidCenter[1]-15);
			addToMix.push("banana");
			bananaNum += 1;
			getIngredients();
		} else {
			centerElementAt(activeFood, liquidCenter[0], liquidCenter[1]);
			addToMix.push("strawberry");
			strawberryNum += 1;
			getIngredients();
		}
		
	}
	activeFood = null;

}

function getIngredients(){
	if(strawberryNum >= 1 && bananaNum >= 1 && appleNum >= 1){
		combinedColor = "rgb(255,190,150)";
	} else if(strawberryNum >= 1  && bananaNum >= 1){
		combinedColor = "rgb(255,200,210)";
	} else if(bananaNum >= 1 && appleNum >= 1){
		combinedColor = "rgb(250,200,190)";
	} else if(appleNum >= 1 && strawberryNum >= 1){
		combinedColor = "rgb(255,140,150)";
	} else if(strawberryNum >= 1){
		combinedColor = strawberryColor;
	} else if(bananaNum >= 1){
		combinedColor = bananaColor;
	} else if(appleNum >= 1){
		combinedColor = appleColor;
	} 
}

/* This code snaps the food into the mouth if in proximity */
function centerElementAt(element, x, y){
	element.style.top = y + "px";
	element.style.left = x + "px";
}

/* This code finds the center point of the element */
function getCenter(element){
	var r = element.getBoundingClientRect();
	var cx = r.left + r.width /2;
	var cy = r.top + r.height/2;
	return [cx, cy];
}

/* This code finds the dimensions of the element and checks to see if the coordinates are within the area of the element */
function isInsideArea(element, x, y){
	area = element.getBoundingClientRect();
	if (x <= area.right && x >= area.left && y <= area.bottom && y >= area.top){
		return true;
	}
	return false;
}

apple.onmousedown = clickFood;
banana.onmousedown = clickFood;
strawberry.onmousedown = clickFood;

apple.onmouseup = dropFood;
banana.onmouseup = dropFood;
strawberry.onmouseup = dropFood;

window.onmousemove = dragFood;