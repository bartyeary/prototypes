var blender = document.getElementById("blender");
var liquid = document.querySelector(".liquid");
var liquidsvg = document.getElementById("liquidsvg");

var splatterA = document.getElementById("splatterA");
var splatterB = document.getElementById("splatterB");
var splatterC = document.getElementById("splatterC");

var foodA = document.querySelector(".foodA");
var foodAColor = "#87FF9C";
var letterA = document.getElementById("letterA");

var foodB = document.querySelector(".foodB");
var foodBColor = "#7D6DFF"; 
var letterB = document.getElementById("letterB");

var foodC = document.querySelector(".foodC");
var foodCColor = "#FC68FF";
var letterC = document.getElementById("letterC");

var chomper = document.querySelector(".chomper");

var square = document.getElementById("insideChomp");

var donut = document.querySelector(".mascot_donut");
var star = document.querySelector(".mascot_star");

star.style.visibility = "hidden";
donut.style.visibility = "hidden";
splatterA.style.visibility = "hidden";
splatterB.style.visibility = "hidden";
splatterC.style.visibility = "hidden";

var activeFood = null;
var activeLetter = null;

var activeFoodZ = 1;
var area = null;
var blendedFood = null;

var blendingElement = null;

var minVal = 100;
var maxVal = 600;

blender.addEventListener("animationend", endAnimation, false);
chomper.addEventListener("animationend", endAnimation, false);

disperse();

function disperse(){
	foodA.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodA.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodC.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodC.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodB.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
	foodB.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
}

function blendingFood(){
	console.log(activeFood);
	if (blendedFood !== null){
		blendedFood.style.top = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
		blendedFood.style.left = Math.floor(Math.random() * (maxVal + 1 - minVal) + minVal) +"px";
		blendedFood.style.visibility = "visible";
	}
}

function endAnimation(){
	splatterA.style.visibility = "hidden";
	splatterB.style.visibility = "hidden";
	splatterC.style.visibility = "hidden";
	blender.classList.remove("shake");
	chomper.classList.remove("spinner");
	blendingFood();
	// foodA.style.visibility = "visible";
	// foodB.style.visibility = "visible";
	// foodC.style.visibility = "visible";
	// disperse();
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
			chomper.classList.add("spinner");
			chomper.style.backgroundColor = foodAColor;
			splatterA.style.visibility = "visible";
			// liquidsvg.style.fill = foodAColor;
			// star.style.visibility = "hidden";
			// donut.style.visibility = "hidden";
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
		} else if (activeFood === foodB){
			activeFood.style.visibility = "hidden";
			blender.classList.add("shake");
			chomper.classList.add("spinner");
			chomper.style.backgroundColor = foodBColor;
			splatterB.style.visibility = "visible";
			// liquidsvg.style.fill = foodBColor;
			// star.style.visibility = "visible";
			// donut.style.visibility = "hidden";
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
		} else {
			activeFood.style.visibility = "hidden";
			blender.classList.add("shake");
			chomper.classList.add("spinner");
			chomper.style.backgroundColor = foodCColor;
			splatterC.style.visibility = "visible";
			// liquidsvg.style.fill = foodCColor;
			// star.style.visibility = "hidden";
			// donut.style.visibility = "visible";
			centerElementAt(activeFood, chomperCenter[0], chomperCenter[1]);
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
		console.log("true");
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