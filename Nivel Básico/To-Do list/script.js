var enviar = document.querySelector("#addTask");
var lista = document.querySelector("#taskList");
var filtro = document.querySelector("#filtro");
enviar.addEventListener("click", añadirTarea);
filtro.addEventListener("change", aplicarFiltro);

function añadirTarea(event) {
  event.preventDefault();
  var tarea = document.querySelector("#taskInput").value;

  if (tarea !== "") {
    var listElement = document.createElement("li");
    listElement.classList.add("activo");

    var listElementRemover = document.createElement("button");

    listElement.textContent = tarea;
    listElementRemover.textContent = "Eliminar Tarea";
    listElementRemover.classList.add("eliminarTarea")

    lista.appendChild(listElement);
    listElement.appendChild(listElementRemover);

    listElement.addEventListener("click", marcarCompletada);
    listElementRemover.addEventListener("click", function (e) {
      e.stopPropagation();
      eliminarTarea(listElement);
    });
  }

  document.querySelector("#taskInput").value = "";
  contadorTareasPendientes()
}

function aplicarFiltro() {
  var elementos = lista.querySelectorAll("li");

  elementos.forEach((li) => {
    if (filtro.value === "todas") {
      li.style.display = "";
    } else if (filtro.value === "activas" && !li.classList.contains("completada")) {
      li.style.display = "";
    } else if ( filtro.value === "completadas" && li.classList.contains("completada")) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

function marcarCompletada() {
  this.classList.toggle("completada");
  aplicarFiltro()
  contadorTareasPendientes()

}

function eliminarTarea(tarea) {
  tarea.remove();
  contadorTareasPendientes()
}

function contadorTareasPendientes(){
    var elementos = lista.querySelectorAll("li");
    contador = 0
    elementos.forEach(li=>{
      if(!li.classList.contains("completada")){
        contador++
      }
    })
    var contadorTareas = document.querySelector(".contador");
    contadorTareas.textContent=contador;
}
