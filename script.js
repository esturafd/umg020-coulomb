
var localpath = window.location.pathname.split("/");
var nameDoc = localpath[localpath.length -1];
var selectPage = null;
var isContest = true;
if (nameDoc == "presentacion.html") {
	selectPage = document.getElementById("presentacion");
} else if (nameDoc == "teoria.html") {
	selectPage = document.getElementById("teoria");
} else if (nameDoc == "ejemplo.html") {
	selectPage = document.getElementById("ejemplo");
	muestraEjemplo();
} else if (nameDoc == "explicacion.html") {
	selectPage = document.getElementById("explicacion");
} else {
	selectPage = document.getElementById("preguntas");
}
selectPage.classList.add("select");

function muestraEjemplo() {
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

	var partInterval = window.setInterval(function() {
		if (partMov.classList.contains("ejem-mov")) {
			partMov.classList.remove("ejem-mov");
			partMov.classList.add("ejem-mov-p");
		} else {
			partMov.classList.remove("ejem-mov-p");
			partMov.classList.add("ejem-mov");
		}
	}, 800);

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
			var limite = document.getElementById("divStat").offsetLeft - 175;
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
			window.clearInterval(partInterval);
			if (partMov.classList.contains("ejem-mov-p")) {
				partMov.classList.remove("ejem-mov-p");
				partMov.classList.add("ejem-mov");
			}
		}
	}, true);

	part1.addEventListener('keyup', function(e) {
		funClik(e);
	}, true);

	part1.addEventListener('keyup', function(e) {
		funClik(e);
	}, true);
}

function show(elemento, isSound) {
	if (isContest) {
		if (isSound) {
			document.getElementById('correcto').play();
		} else {
			document.getElementById('incorrecto').play();
		}
		isContest = false;
		var respuesta = document.getElementById(elemento);
		respuesta.style.display = 'block';
		document.getElementById('arrow').style.display = 'block';
	}
}
