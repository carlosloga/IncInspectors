var pictureSource;
var destinationType;
var aGlobalCarrers = null;

// -------- Al INICIAR -----------------------------------------------------------------------
window.addEventListener('load', function () {
    if (phoneGapRun()) {
        document.addEventListener("deviceReady", deviceReady, false);
    } else {
        deviceReady();
    }
}, false);

function deviceReady() {
    if (phoneGapRun()) {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
    else
    {
        $('#labelInfo').text($('#labelInfo').text() + '\nAtenció : Phonegap no soportat');
    }

    //Hay localstorage ?
    if( ! $.jStorage.storageAvailable() )
    {
        $('#labelInfo').text($('#labelInfo').text() + '\nAtenció : localStorage no soportat');
        return;
    }
    else
    {
        try{
                cargaConfigEnArray();
            }
            catch(e){ mensaje('exception carregant llista de carrers : ' + e.message,'error'); }
    }
}

// -------- COMUNES -----------------------------------------------------------------------

function abrirPagina(sPag, bBack) {
    $.mobile.changePage('../paginas/' + sPag + '.html', { transition: "slide", reverse: false, changeHash: bBack });

    switch(sPag)
    {
        case 'pageNuevaIncidencia' :
            //Abrir el acordeón para actualizar el plano
            $("#collapsibleLocalizacion").trigger("expand");
            $('#divMapaAlta').show();
            //espero a que esté cargado el div para que se renderice bien el plano ...
            setTimeout(inicioPaginaNuevaIncidencia,1000);
            break;

        case 'pageConsultaIncidencias' :
            inicioPaginaConsultaIncidencias();
            //espero a que esté cargado el div para que se renderice bien el plano ...
            setTimeout(mostrarEnPlano,1000);
            break;

        case 'pageZoomFoto' :
            var imagen = document.getElementById('imgZoomFoto');
            imagen.style.display = 'block';
            imagen.src = "data:image/jpeg;base64," + sFoto;
            break;
    }
}

function limpiaVariables(sPag){
    switch(sPag)
    {
        case 'pageNuevaIncidencia' :
            sFoto = '';
            sDireccionAlta = '';
            posAlta = '';
            mapAlta = null;
            $('#labelObservacionesInformadas').text('');
            $('#textareaObservaciones').val('');
            $('#inputNUM').val('');
            $('#labelLoaclizacionInformada').text('');
            $('#selectCARRER').text('');
            break;

        case 'pageConsultaIncidencias' :
            sDireccionConsulta = '';
            posConsulta = '';
            mapConsulta = null;
            break;

    }
}

//--------------------------- OTRAS ------------------------------------
function calculaMD5(cadenaEncriptada , cadenaNOencriptada){
    //var cadenaEncriptada = "9E-49-33-50-9E-3C-E7-6D-D4-ED-1F-5C-E1-7D-FF-1B";
    //var cadenaNOencriptada = $('#textPruebaMD5').val();

    if(md5(cadenaNOencriptada).toUpperCase() == cadenaEncriptada.replace(/-/g, ""))
        return true;
    else
        return false;
}







