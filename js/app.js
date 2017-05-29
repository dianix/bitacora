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
	var publicacion = new Publicacion('texto');
	publicacion.publTitulo();
	publicacion.publContenido('contenido', 'p', 'flow-text')
	areaPublicaciones.insertBefore(publicacion.cajaPublicacion,areaPublicaciones.firstChild);
	limpiarModal('modalTexto');	
}

function publicarImagen(){
    var publicacion = new Publicacion('imagen');
    publicacion.publTitulo();
    var archivo = document.getElementById('imagen')
    loadFiles(archivo);
    areaPublicaciones.insertBefore(publicacion.cajaPublicacion,areaPublicaciones.firstChild);    limpiarModal('modalImagen');
}

function publicarMedia(){
    
}

function loadFiles(archivo) {
    console.log(archivo)
    var lector = new FileReader();
    switch (archivo.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
            lector.readAsDataURL(archivo);
            lector.onload = readImage;
            break;
        case 'text/plain':
            lector.readAsText(archivo, 'UTF-8');
            lector.onload = readText;
            break;
        case 'audio/*':
            lector.readAsArrayBuffer(archivo);
            lector.onload = readAudio;
            break;
        case 'video/mpeg':
        case 'video/mp4':
        case 'video/quicktime':
            lector.readAsArrayBuffer(archivo);
            lector.onload = readVideo;
            break;
        default:
            break;
    }
}

// *** publicaciones tipo evento ***
function publicarEvento(){
	var publicacion = new Publicacion('evento');
	publicacion.publTitulo();
	var id = publicacion.titulo.trim().split(' ')[0];
	publicacion.publContenido('fecha', 'p', 'flow-text');
	var cajaMapa = document.createElement('div');
	cajaMapa.classList.add('s12', 'map-container');
	cajaMapa.id = 'mapa-' + id;
	publicacion.cajaPublicacion.appendChild(cajaMapa);
	areaPublicaciones.insertBefore(publicacion.cajaPublicacion,areaPublicaciones.firstChild);
	crearMapa(id);
	limpiarModal('modalEvento');
}

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
// *** publicaciones tipo evento - fin ***


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