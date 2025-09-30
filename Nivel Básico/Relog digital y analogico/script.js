// DOM
let spanHora = document.querySelector(".hora")
let spanMinutos = document.querySelector(".minutos")
let spanSegundos = document.querySelector(".segundos")

// variables
let fechaHoraActual;
let dias = ['lunes','martes','miércoles','jueves','viernes','sábado','domingo']
let meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
// funciones
function actualizarHora(){

    // fecha actual
    fechaHoraActual = new Date()

    // hora-minutos-segundos
    var hora = String( fechaHoraActual.getHours()).padStart(2,0);
    var minutos = String( fechaHoraActual.getMinutes()).padStart(2,0);
    var segundos = String( fechaHoraActual.getSeconds()).padStart(2,0);

    // modificar los spans
    spanHora.textContent = hora
    spanMinutos.textContent = minutos
    spanSegundos.textContent = segundos

}

function actualizarDia(){
    fechaHoraActual = new Date()

    var dia = dias[(fechaHoraActual.getDay() + 6) % 7];
    var diaNumero = fechaHoraActual.getDate()
    var mes = meses[fechaHoraActual.getMonth()]
    var año = fechaHoraActual.getFullYear()

    document.querySelector(".fecha").textContent = `${dia} ${diaNumero}, ${mes} ${año}`;
}

// actualizar reloj
actualizarHora();
setInterval(actualizarHora,1000)

actualizarDia()
setInterval(actualizarDia,60000)