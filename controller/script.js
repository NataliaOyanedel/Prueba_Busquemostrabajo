boton.addEventListener("click", () => {

    let buscador1 = document.getElementById("buscador1").value;
    console.log(buscador1);
    const url = `https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?/${buscador1}`;
    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
    
        .then(json => {
        console.log(json);
        for (i=0;i<json.length;i++) {
            document.getElementById("mostrar").innerHTML = `${json[i].title}, ${json[i].company},${json[i].description}`
         };
        })



        .catch(err => {
            console.error(err);
            console.log('Hubo un problema con la petición Fetch:' + err.message);
        });

        
});












