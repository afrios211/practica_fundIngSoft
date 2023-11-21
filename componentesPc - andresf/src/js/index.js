//-----------------mostrar los componentes guardados en el api------------------------------------

//agregar un escuchador de eventos al documento
document.addEventListener('DOMContentLoaded', obtenerComponentesApi());

//traer los datos guardados de el api con la funcion obtenerComponentesApi
function obtenerComponentesApi() {
    fetch('http://localhost:3000/componentes')
        .then(Response => Response.json())
        .then(data => mostrarComponentes(data))
        .catch(
            function (error) {
                console.log(error);
            });
}

//ingresar datos en card y mostrarlos en html
function mostrarComponentes(listaComponentes) {
    let bodyCard = document.getElementById("bodyCard");
    let componentes = "";
    for (var contador = 0; contador < listaComponentes.length; contador++) {
        
        let componenteDisponible ="";
        if(listaComponentes[contador].disponible == true){
            componenteDisponible = 'DISPONIBLE'
        }
        else{
            componenteDisponible = 'AGOTADO'
        }
       
       
        let datosPorCard = `<div class="card mb-3 bg-dark-subtle border border-2 border-dark" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${listaComponentes[contador].url}" class="img-fluid rounded-start border border-1 border-dark" alt="imagen">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body text-center">
                                            <p class="card-text border border-2 border-dark">COMPONENTE: ${listaComponentes[contador].tipoComponente}</p>
                                            <p class="card-text border border-2 border-dark">MARCA: ${listaComponentes[contador].marca}</p>
                                            <p class="card-text border border-2 border-dark">REFERENCIA: ${listaComponentes[contador].referencia}</p>
                                            <p class="card-text border border-2 border-dark">PRECIO: ${listaComponentes[contador].precio}</p>
                                            <h5 class="card-title bg-secondary  border border-2 border-dark  ">${componenteDisponible} </h5>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        componentes += datosPorCard;
    }
    bodyCard.innerHTML = componentes
}