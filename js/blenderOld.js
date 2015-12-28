var blender = document.getElementById("blender");
var blend = document.querySelector(".submitbutton");
var liquid = document.querySelector(".liquid");
var liquidsvg = document.getElementById("liquidsvg");
var wave = document.querySelector(".wave");

var foodA = document.querySelector(".foodA");
var foodA_RGB = [40,200,0];
var foodA_R = foodA_RGB[0];
var foodA_G = foodA_RGB[1];
var foodA_B = foodA_RGB[2];
var foodAColor = "rgb("+foodA_RGB+")";
var letterA = document.getElementById("letterA");

var foodB = document.querySelector(".foodB");
var foodB_RGB = [120,0,255];
var foodB_R = foodB_RGB[0];
var foodB_G = foodB_RGB[1];
var foodB_B = foodB_RGB[2];
var foodBColor = "rgb("+foodB_RGB+")";
var letterB = document.getElementById("letterB");

var foodC = document.querySelector(".foodC");
var foodC_RGB = [250,0,140];
var foodC_R = foodC_RGB[0];
var foodC_G = foodC_RGB[1];
var foodC_B = foodC_RGB[2];
var foodCColor = "rgb("+foodC_RGB+")";
var letterC = document.getElementById("letterC");

var rgbCombined = null;
var addToMix = [];

var chomper = document.querySelector(".chomper");

var square = document.getElementById("insideChomp");

var donut = document.querySelector(".mascot_donut");
var star = document.querySelector(".mascot_star");

wave.style.fill = "#FFFFFF";
liquidsvg.style.fill = "#FFFFFF";

star.style.visibility = "hidden";
donut.style.visibility = "hidden";

var activeFood = null;
var activeLetter = null;

var activeFoodZ = 1;
var area = null;
var blendedFood = null;

var blendingElement = null;

var minVal = 100;
var maxVal = 600;

blender.addEventListener("animationend", endAnimation, false);

disperse();

function disperse(){
	foodA.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodA.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodC.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodC.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodB.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodB.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
}

// function getRGBAverage(event){
// 	R_average = (foodA_R+foodB_R+foodC_R)/3; 
// 	G_average =(foodA_G+foodB_G+foodC_G)/3;
// 	B_average =(foodA_B+foodB_B+foodC_B)/3; 
// 	console.log("R:"+R_average+", G:"+G_average+", B:"+B_average+",");
// 	rgbCombined = "rgb("+R_average+","+G_average+","+B_average+")";
// }

function startBlender(event){
	console.log(addToMix);

}

blend.onmousedown = startBlender;

function endAnimation(){
	blender.classList.remove("shake");
	wave.style.visibility = "hidden";
	wave.classList.remove("wavemover");
	blendingFood();

}

function blendingFood(){
	if (blendedFood !== null){
		blendedFood.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
		blendedFood.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
		blendedFood.style.visibility = "visible";
	}
}

function clickFood(event){
	event.preventDefault();
	activeFood = event.currentTarget;
	activeLetter = activeFood.dataset.letter;
	if(activeLetter === "A"){
		letterA.style.top = "33px";
	} else if (activeLetter === "B"){
		letterB.style.top = "33px";
	} else {
		letterC.style.top = "33px";
	}
	activeFood.style.height = "100px";
	activeFood.style.width = "100px";
	activeFood.style.zIndex = "100";
	
}

function dragFood(event){
	if (activeFood !== null){
		activeFood.style.top = event.pageY +"px";
		activeFood.style.left = event.pageX +"px";
	} 
}

function dropFood(){
	letterA.style.top = "18px";
	letterB.style.top = "18px";
	letterC.style.top = "18px";
	activeFoodZ = activeFoodZ +1;
	activeFood.style.height = "70px";
	activeFood.style.width = "70px";
	activeFood.style.zIndex = activeFoodZ;
	chomperCenter = getCenter(chomper);
	activeCenter = getCenter(activeFood);
	chomperArea = isInsideArea(chomper, activeCenter[0], activeCenter[1]);
	blendedFood = activeFood;
	if (chomperArea === true){
		if (activeFood === foodA){
			activeFood.style.visibility = "hidden";
			blender.classList.add("shake");
			wave.style.visibility = "visible";
			wave.classList.add("wavemover");
			wave.style.fill = foodAColor;
			liquidsvg.style.fill = foodAColor;
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
			addToMix.push("A");
		} else if (activeFood === foodB){
			activeFood.style.visibility = "hidden";
			blender.classList.add("shake");
			wave.style.visibility = "visible";
			wave.classList.add("wavemover");
			wave.style.fill = foodBColor;
			liquidsvg.style.fill = foodBColor;
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
			addToMix.push("B");
		} else {
			activeFood.style.visibility = "hidden";
			blender.classList.add("shake");
			wave.style.visibility = "visible";
			wave.classList.add("wavemover");
			wave.style.fill = foodCColor;
			liquidsvg.style.fill = foodCColor;
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
			addToMix.push("C");
		}
		
	}
	activeFood = null;

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
	console.log("false");
	return false;
}

foodA.onmousedown = clickFood;
foodB.onmousedown = clickFood;
foodC.onmousedown = clickFood;

foodA.onmouseup = dropFood;
foodB.onmouseup = dropFood;
foodC.onmouseup = dropFood;

window.onmousemove = dragFood;