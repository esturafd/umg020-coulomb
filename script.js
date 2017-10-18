
var localpath = window.location.pathname.split("/");
var nameDoc = localpath[localpath.length -1];
var selectPage = null;
if (nameDoc == "presentacion.html") {
	selectPage = document.getElementById("presentacion");
} else if (nameDoc == "teoria.html") {
	selectPage = document.getElementById("teoria");
} else if (nameDoc == "ejemplo.html") {
	selectPage = document.getElementById("ejemplo");
} else if (nameDoc == "explicacion.html") {
	selectPage = document.getElementById("explicacion");
} else {
	selectPage = document.getElementById("preguntas");
}
selectPage.classList.add("select");


var mousePosition = null;
var offset = 0;
var isDown = false;
var partMov = document.getElementById("divMov");
var partStat = document.getElementById("divStat");
var contenedor = document.getElementById("contenedor");
var distancia = document.getElementById("distancia");
var resultado = document.getElementById("resultado");
var part1 = document.getElementById("carga1");
var part2 = document.getElementById("carga2");
var valDistancia = 0;

partMov.addEventListener('mousedown', function(e) {
	isDown = true;
	offset = (partMov.offsetLeft - e.clientX);
}, true);

document.addEventListener('mouseup', function() {
	isDown = false;
}, true);

var funClik = function(e) {
	if (valDistancia == 0) {
		resultado.innerHTML = "N/A";
	} else {
		var foo = (9*10**9)*(part1.value*10**-6)*(part2.value*10**-6)/(valDistancia**2);
		resultado.innerHTML = foo.toExponential(4) + ' N';
	}
} 

document.addEventListener('mousemove', function(e) {
	e.preventDefault();
	if (isDown) {
		mousePosition = e.clientX;
		var particula = mousePosition + offset;
		var limite = partStat.offsetLeft - 175;
		if (particula < limite) {
			particula = limite;
		}
		limite += (contenedor.offsetWidth - partMov.offsetWidth);
		if (particula > limite) {
			particula = limite;
		}
		partMov.style.left = particula + 'px';
		valDistancia = (particula + 175 - partStat.offsetLeft) / 10
		distancia.innerHTML = valDistancia;
		funClik(e);
	}
}, true);

part1.addEventListener('keyup', function(e) {
	funClik(e);
}, true);

part1.addEventListener('keyup', function(e) {
	funClik(e);
}, true);
