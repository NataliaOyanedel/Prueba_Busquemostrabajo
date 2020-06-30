

const base_url = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?'; 


$('#tipo-busqueda').change(function() {  
    let tipoBusqueda = $('#tipo-busqueda').val(); 
    if(tipoBusqueda == 'ubicacion') { 
        $('#form2').show();
    
        $('#check').show();
        $('#boton').show();
        
    }  else {   
        $('#form2').hide();
    
        $('#check').hide();
        $('#boton').hide();
    }
    
});


$('#form1')[0].reset();

let buscar = class dataBusqueda{  
    constructor (tipoBusqueda, location, onlyFulltime){
        this.tipoBusqueda = tipoBusqueda;
        this.location = location;
      
        this.onlyFulltime = onlyFulltime;
    }
   
}

const validar = (data) => { 
    if(data.tipoBusqueda == 'ubicacion') {
        if(data.location == "") {
            Swal.fire({   
                title: 'Error!',
                text: 'Debe ingresar un lugar a buscar',
                icon: 'error'
              });
              return false;
        }
    } else if(data.tipoBusqueda == 'lat') { 
        if(data.lat == "" || data.long == "") {
            Swal.fire({
                title: 'Error!',
                text: 'Los valores de latitud y longitud no pueden ser vacíos',
                icon: 'error'
              });
              return false;
        }
    }
    return true;
}

let getCardHTML = (element) => {
    let tipo = element.type.replace("\n", '');
    let titulo = element.title;
    let company = element.company;
    let ciudad =  element.location;
    let urlImagen = element.company_logo;
    let descripcion = element.description;
    descripcion = jQuery.trim(descripcion).substring(0, 400).split(" ").slice(0, -1).join(" ") + "...";
    
    
    return '<div class="card">'
            +    '<div class="card-header border-0 text-center font-weight-bold">'
            +        titulo
            +    '</div>'
            +    '<div class="row no-gutters">'
            +        '<div class="col-sm-12 col-md-8">'
            +            '<div class="card-block px-2">'
            +                '<ul class="list-group list-group-flush">'
            +                   '<li class="list-group-item">Compañía: '+company +'</li>'
            +                    '<li class="list-group-item">Ciudad: '+ciudad+'</li>'
            +                    '<li class="list-group-item">Tipo:'+tipo+'</li>'
            +                    '<li class="list-group-item descripcion">'+descripcion+'</li>'
            +                '</ul>'
            +            '</div>'
            +        '</div>'
            +        '<div class="col-sm-12 col-md-4 ">'
            +            '<img src="'+urlImagen+'" class="img-fluid imagen-empresa rounded" alt="">'
            +       ' </div>'
            +    '</div>'
            +    '<div class="card-footer w-100 text-muted">'
            +        element.how_to_apply
            +    '</div>'
            + '</div>';
}


const getEmpleos = async (data) => {
    let url = getUrl(data);
    let response = await fetch(url)
    .then((resp) => resp.json()) 
    .then((jobs) => {
        $('#cargando').hide();
        $('#empleos').empty();
        if(jQuery.isEmptyObject(jobs)) {
            $('#empleos').append('<div class="alert alert-light" role="alert">No hay resultados para su búsqueda!!</div>'); 
        } else {
            jobs.forEach(element => {
                htmlCard = getCardHTML(element);
                $('#empleos').append(htmlCard);
            });
        }
        
    }).catch((error) => {
        Swal.fire({
            title: 'Error con la API de Github Jobs',
            text: error,
            icon: 'error'
          });
    });
    
}

$('#button').click( () => { 
         
    let tipoBusqueda = $('#tipo-busqueda').val(); 

    let location = '';

    if(tipoBusqueda == 'ubicacion') {
        location = $('#ubicacion').val(); 
    } 
    let onlyFulltime = $('#fulltime').is(':checked'); 

    let dataBusqueda = new buscar (
        tipoBusqueda,
        location,
    
        onlyFulltime,
    );        
    
    if (validar(dataBusqueda)) {
        $('#cargando').show();
        getEmpleos(dataBusqueda);
    }
    
});


const getUrl = (data) => { 
    let url = "";
    if(data.location != ""){
        url+= 'location=' + data.location.replace(/\s/g, '+'); 
    }



    if(data.onlyFulltime != ""){ 
        if(url!="") {
            url+='&';
        }
        url+= 'full_time='+data.onlyFulltime;
    }
    return base_url+url;
}







