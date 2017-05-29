$(document).ready(function () {
    $(document).ready(function () {
        $('.modal').modal();
    });

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        onStart: () => {
            $('.picker').appendTo('body');
        }
    });
    
    $('[data-publication]').on('click', identificar);
    
   
})
//------------------------------------

var areaPublicaciones = document.getElementById("publicaciones");

// constructor de publicaciones
function Publicacion(tipo) {
	this.tipo = tipo;
	this.cajaPublicacion = document.createElement("div");
	this.cajaPublicacion.classList.add('card-panel', 'hoverable');
	this.cajaPublicacion.draggable = true;

	this.publTitulo = function() {
		var titulo = document.getElementById(this.tipo + '-titulo').value;
		var contTitulo = document.createElement('h3');
        contTitulo.appendChild(document.createTextNode(titulo));
        console.log(contTitulo)
		this.cajaPublicacion.appendChild(contTitulo);
		this.titulo = titulo;
	}

	this.publFecha = function() {
		var fecha = document.getElementById(this.type + '-fecha').value;
		var contFecha = document.createElement('p');
		contFecha.appendChild(document.createTextNode(fecha));
		this.cajaPublicacion.appendChild(contFecha);
	}
    
    this.publContenido = function(...args) {
        if (args.length < 1) return null;

		var texto = (document.getElementById(this.tipo + '-' + args[0]) && document.getElementById(this.tipo + '-' + args[0]).value) || args[0];

		var elemento = document.createElement('p');
		elemento.appendChild(document.createTextNode(texto));
		if (args.length >= 2) {
			for (var i = 2; i < args.length; i++) {
				typeof args[i] === 'string' && elemento.classList.add(args[i]);
			}
		}
		this.cajaPublicacion.appendChild(elemento);
	};
}

// *** identificar tipo de publicación ***
function identificar(){
    var tipoPubl = $(event.currentTarget).data('publication');
    //console.log(tipoPubl)
    publicar(tipoPubl);
}


function publicar(tipo) {
    switch (tipo) {
	case 'texto':
		{
            publicarTexto(tipo);
			break;
		}
	case 'imagen':
		{
			publicarImagen();
			break;
		}
	case 'media':
		{
			publicarhMedia();
			break;
		}
	case 'evento':
		{
			publicarEvento();
			break;
		}
	default:
		break;
	}
}

function publicarTexto(tipo) {
    console.log(tipo, areaPublicaciones);
	
	var publicacion = new Publicacion('texto');
	publicacion.publTitulo();
	publicacion.publContenido('contenido', 'p', 'flow-text')
	areaPublicaciones.appendChild(publicacion.cajaPublicacion);
	limpiarModal('modalTexto');
	
}

function publicarImagen(){
    
}

function publicarMedia(){
    
}

function publicarEvento(){
	var publicacion = new Publicacion('evento');
	publicacion.publTitulo();
	var id = publicacion.titulo.trim().split(' ')[0];
    console.log(id)
	publicacion.publContenido('fecha', 'p', 'flow-text');

	var cajaMapa = document.createElement('div');
	cajaMapa.classList.add('s12', 'map-container');
	cajaMapa.id = 'mapa-' + id;

	publicacion.cajaPublicacion.appendChild(cajaMapa);
	areaPublicaciones.appendChild(publicacion.cajaPublicacion);
	crearMapa(id);
	limpiarModal('modalEvento');
	 
}


// *** Mapa para publicaciones tipo evento ***
function crearMapa(id) {
	navigator.geolocation.getCurrentPosition(initMap);

	function initMap(position) {
		var miUbicacion = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		var mapa = new google.maps.Map(document.getElementById('mapa-' + id), {
			zoom: 16,
			center: miUbicacion
		});
		var marcador = new google.maps.Marker({
			position: miUbicacion,
			map: mapa
		});
	}
}


function limpiarModal(id) {
	var inputs = document.querySelectorAll('#' + id + ' input');
	for (var input of inputs) {
		input.value = '';
	}
	inputs = document.querySelectorAll('#' + id + ' textarea');
	for (var input of inputs) {
		input.value = '';
	}
	$('#' + id).modal('close');
}