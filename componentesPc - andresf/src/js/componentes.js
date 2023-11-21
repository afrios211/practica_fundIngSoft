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

//ingresar datos en la tabla y mostrarlos en html
function mostrarComponentes(listaComponentes) {
    let tableBody = document.getElementById("tableBody");
    let componentes = "";
    for (var contador = 0; contador < listaComponentes.length; contador++) {
        
        let componenteDisponible ="";
        if(listaComponentes[contador].disponible == true){
            componenteDisponible = '<i class="bi bi-patch-check-fill fs-1 text-success "></i>'
        }
        else{
            componenteDisponible = '<i class="bi bi-patch-minus-fill fs-1 text-success"></i>'
        }
       
       
        let datosPorFila = `<tr>
                            <td> ${listaComponentes[contador].id} </td>
                            <td> ${listaComponentes[contador].tipoComponente} </td>
                            <td> ${listaComponentes[contador].marca} </td>
                            <td> ${listaComponentes[contador].referencia} </td>
                            <td> ${listaComponentes[contador].precio} </td>
                            <td> ${componenteDisponible}  </td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#eliminarModal" id="botonEliminar" onclick="obtenerComponenteAEliminar('${listaComponentes[contador].id}', '${listaComponentes[contador].tipoComponente}', '${listaComponentes[contador].marca}', '${listaComponentes[contador].referencia}')"><i class="bi bi-trash"></i></button>
                            </td>
                            <td>
                            <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="componenteAEditar('${listaComponentes[contador].id}'); datosActuales('${listaComponentes[contador].tipoComponente}', '${listaComponentes[contador].marca}', '${listaComponentes[contador].referencia}', ${listaComponentes[contador].precio},'${listaComponentes[contador].url}', ${listaComponentes[contador].disponible})"><i class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>`;
        componentes += datosPorFila;
    }
    tableBody.innerHTML = componentes
}


//----------------------------------crear componente-----------------------------------------------
const botonCrearComponente = document.getElementById('botonCrearComponente');
botonCrearComponente.addEventListener('click', CamposEnBlanco);

const guardarComponente = document.getElementById('guardarComponente');
guardarComponente.addEventListener('click', crearComponente);

//funcion para crear un nuevo componente
function crearComponente() {
    let tipoComponente = document.getElementById('tipoComponente').value;
    let marca = document.getElementById('marca').value;
    let referencia = document.getElementById('referencia').value;
    let precio = document.getElementById('precio').value;
    let url = document.getElementById('url').value;
    let disponible = document.getElementById('disponible').checked;


    if (tipoComponente === "" || marca === "" || referencia === "" || precio === "" || url === "") {
        alert('todos los campos deben estar llenos');
    }

    else {
        fetch('http://localhost:3000/componentes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                tipoComponente : tipoComponente,
                marca : marca,
                referencia : referencia,
                precio : precio,
                url : url,
                disponible : disponible
            })
        })

        .then(res => res.json())
        .then(res => {
            console.log(res);
            obtenerComponentesApi();
            cerrarModal('crearModal') 
            alert('componente creado correctamente');
        })
    
        .catch(
            function (error) {
                alert('error al tratar de crear el componente');
                console.log(error);
        });
    }
}


//----------------------------------eliminar componente--------------------------------------
//funcion obtenerComponenteAEliminar
let idComponenteAEliminar = "";
function obtenerComponenteAEliminar(id,tipoComponente, marca, referencia){
    idComponenteAEliminar = id;
    document.getElementById('eliminarComponenteSpanId').innerHTML = id;
    document.getElementById('eliminarComponenteSpanTipo').innerHTML = tipoComponente;
    document.getElementById('eliminarComponenteSpanMarca').innerHTML = marca;
    document.getElementById('eliminarComponenteSpanReferencia').innerHTML = referencia;
}

//escuchador de eventos para boton si eliminar
const botonSiEliminar =document.getElementById('botonSiEliminar');
botonSiEliminar.addEventListener('click', eliminarComponente);

//funcion eliminar componente
function eliminarComponente(){
    let id = idComponenteAEliminar;

    fetch('http://localhost:3000/componentes/'+ id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        obtenerComponentesApi();
        alert('componente eliminado correctamente')
    })
  
     .catch(
        function (error) {
            alert('error al tratar de eliminar el componente')
            console.log(error);
    });
}


//----------------------------------------------editar componente----------------------------------------------------
//obtener id de componente a editar
let idComponenteAEditar = "";
function componenteAEditar(id){
    idComponenteAEditar = id;
    console.log(id)
}

//agregar escuchador de eventos a boton actualizar
const botonActualizar = document.getElementById('botonActualizar');
botonActualizar.addEventListener('click', actualizarComponente);

//fucion para actualizar componente
function actualizarComponente(){
    let id = idComponenteAEditar;

    let tipoComponente = document.getElementById('tipoComponente2').value
    let marca = document.getElementById('marca2').value
    let referencia = document.getElementById('referencia2').value
    let precio = document.getElementById('precio2').value
    let url = document.getElementById('url2').value;
    let disponible = document.getElementById('disponible2').checked;
    

    if (tipoComponente === "" || marca === "" || referencia === "" || precio === "" || url === ""){
        alert('todos los campos deben estar llenos')
    }


    else {
        fetch('http://localhost:3000/componentes/'+ id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                tipoComponente : tipoComponente, 
                marca : marca, 
                referencia : referencia,
                precio : precio,
                url : url,
                disponible : disponible
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            obtenerComponentesApi();
            cerrarModal('editarModal');
            alert('componente actualizado correctamente')
        })
        .catch(
            function (error) {
                alert('error al tratar de actualizar el componente')
                console.log(error);
        });
    }   
}









//-----------------------------------------------------otras funciones--------------------------------------------------------
//funcion cerrar modal
function cerrarModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}


//funcion campos crear componente setearlos en blanco
function CamposEnBlanco(){
    let tipoComponente = document.getElementById('tipoComponente');
    let marca = document.getElementById('marca');
    let referencia =  document.getElementById('referencia');
    let precio =  document.getElementById('precio');
    let url = document.getElementById('url')
    let dispnible = document.getElementById('disponible')
    
    tipoComponente.value = "SELECCIONE TIPO DE COMPONENTE";
    marca.value = ""; 
    referencia.value = "";
    precio.value = "";
    url.value = "";
    dispnible.checked = false;
    
   
}

//funcion rellenar con datos actuales los campos del modal editar
function datosActuales(tipoComponente, marca, referencia, precio, url, disponible){
    document.getElementById('tipoComponente2').value = tipoComponente;
    document.getElementById('marca2').value = marca;
    document.getElementById('referencia2').value = referencia;
    document.getElementById('precio2').value = precio;
    document.getElementById('url2').value = url;
    document.getElementById('disponible2').checked = disponible;
}









