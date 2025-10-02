// DOM
let spanHora = document.querySelector(".hora")
let switchClockType = document.querySelector(".switchClockType")
let relojDigital = document.querySelector(".digital")
let relojAnalogico = document.querySelector(".analogico")

// variables
let fechaHoraActual;
let dias = ['lunes','martes','miércoles','jueves','viernes','sábado','domingo']
let meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

// funciones
function actualizarRelojDigital(){

    // fecha actual
    fechaHoraActual = new Date()

    // hora-minutos-segundos
    var hora = String( fechaHoraActual.getHours()).padStart(2,0);
    var minutos = String( fechaHoraActual.getMinutes()).padStart(2,0);
    var segundos = String( fechaHoraActual.getSeconds()).padStart(2,0);

    // modificar los spans
    spanHora.textContent = hora + ":" + minutos + ":" + segundos

}

function actualizarRelojAnalogico(){
    var horaActual = new Date()
    var hora = horaActual.getHours()
    var minutos = horaActual.getMinutes()
    var segundos = horaActual.getSeconds()

    var manecillaHoras = (hora % 12) * 30 + (minutos / 2)
    var manecillaMinutos = minutos * 6 + (segundos / 10)
    var manecillaSegundos = segundos * 6

    document.querySelector(".manecillaHoras").style.transform = `translate(-50%, -100%) rotate(${manecillaHoras}deg)`;
document.querySelector(".manecillaMinutos").style.transform = `translate(-50%, -100%) rotate(${manecillaMinutos}deg)`;
document.querySelector(".manecillaSegundos").style.transform = `translate(-50%, -100%) rotate(${manecillaSegundos}deg)`;
}

function actualizarDia(){
    fechaHoraActual = new Date()

    var dia = dias[(fechaHoraActual.getDay() + 6) % 7];
    var diaNumero = fechaHoraActual.getDate()
    var mes = meses[fechaHoraActual.getMonth()]
    var año = fechaHoraActual.getFullYear()

    document.querySelector(".fecha").textContent = `${dia} ${diaNumero}, ${mes} ${año}`;
}

function cambiarTipoReloj(){
    if(relojDigital.classList.contains("show")){
        relojDigital.classList.remove("show")
        relojAnalogico.classList.add("show")

        relojDigital.classList.add("unshow")
        relojAnalogico.classList.remove("unshow")
    }
    else{
        relojDigital.classList.remove("unshow")
        relojAnalogico.classList.add("unshow")

        relojDigital.classList.add("show")
        relojAnalogico.classList.remove("show")
    }

    var textoBoton = switchClockType.textContent

    if(textoBoton == "Digital"){
        switchClockType.textContent = "Analogico"
    }
    else{
        switchClockType.textContent = "Digital"
    }

}

// actualizar reloj digital
actualizarRelojDigital();
setInterval(actualizarRelojDigital,1000)

// actualizar reloj analogico
actualizarRelojAnalogico();
setInterval(actualizarRelojAnalogico,1000)

//actualiza fecha
actualizarDia()
setInterval(actualizarDia,60000)

// añadir evento para cambiar de reloj
switchClockType.addEventListener("click", cambiarTipoReloj);