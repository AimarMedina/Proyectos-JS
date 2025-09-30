// ----- Selecciones del DOM -----
const slider = document.querySelector("#longitud");
const display = document.querySelector("#valorLongitud");
const opciones = document.querySelectorAll("#opciones"); // checkboxes
const generarBtn = document.querySelector(".generar");
const eliminarBtn = document.querySelector(".eliminarContraseña");

// ----- Arrays de caracteres -----
const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numeros = "0123456789".split("");
const simbolos = "!@#$%&*".split("");

// ----- Variables -----
let mensaje; // span del mensaje
let passwordBox; // contraseña

// ----- Slider y display -----
slider.addEventListener("input", () => {
  display.textContent = slider.value;
});

display.addEventListener("blur", () => {
  let valor = parseInt(display.textContent);
  if (isNaN(valor)) valor = slider.min;
  if (valor < slider.min) valor = slider.min;
  if (valor > slider.max) valor = slider.max;
  slider.value = valor;
  display.textContent = valor;
});

display.addEventListener("keypress", (e) => {
  if (e.key === "Enter") display.blur();
});

// ----- Botones -----
generarBtn.addEventListener("click", generarContraseña);
eliminarBtn.addEventListener("click", eliminarContraseña);



// ----- Funciones -----
function generarContraseña(event) {
  event.preventDefault();

  const viejo = document.querySelector(".contraseña");
  if (viejo) viejo.remove();

  let contraseña = "";
  let seleccionados = Array.from(opciones).filter(opcion => opcion.checked);

  if (seleccionados.length === 0) {
    alert("Debes seleccionar al menos una opción");
    return;
  }

  let caracteres = [];

  seleccionados.forEach(seleccionado => {
    switch (seleccionado.value) {
      case "letras":
        caracteres = caracteres.concat(letras);
        break;
      case "numeros":
        caracteres = caracteres.concat(numeros);
        break;
      case "simbolos":
        caracteres = caracteres.concat(simbolos);
        break;
    }
  });

  let longitud = parseInt(slider.value);

  for (let i = 0; i < longitud; i++) {
    let indice = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres[indice];
  }

  passwordBox = document.createElement("span")
  passwordBox.classList.add("contraseña")
  passwordBox.textContent = contraseña;
  document.querySelector(".contraseñaGenerada").appendChild(passwordBox)
  
  // ----- Mensaje y portapapeles -----
    passwordBox.addEventListener("mouseover", mostrarMensaje);
    passwordBox.addEventListener("mouseleave", quitarMensaje);
    passwordBox.addEventListener("click", copiarPortapapeles);
  
  // efecto visual
  passwordBox.classList.add("generada");
  setTimeout(() => passwordBox.classList.remove("generada"), 200);
}

function eliminarContraseña(event) {
  event.preventDefault();
  passwordBox.remove()
}

function mostrarMensaje() {
  if (!mensaje) {
    mensaje = document.createElement("span");
    mensaje.classList.add("mensaje", "show");
    mensaje.textContent = "Copiar 📋";
    mensaje.style.position = "absolute";
    document.body.appendChild(mensaje);
    document.addEventListener("mousemove", moverMensaje);
  }
}

function quitarMensaje() {
  if (mensaje) {
    mensaje.classList.remove("show");
    setTimeout(() => {
      if (mensaje) {
        mensaje.remove();
        mensaje = null;
      }
    }, 200);
    document.removeEventListener("mousemove", moverMensaje);
  }
}

function moverMensaje(event) {
  if (mensaje) {
    mensaje.style.left = event.clientX + 10 + "px";
    mensaje.style.top = event.clientY - 20 + "px";
  }
}

function copiarPortapapeles() {
  const texto = passwordBox.textContent;
  if (!texto) return;

  navigator.clipboard.writeText(texto)
    .then(() => {
      if (mensaje) mensaje.textContent = "Copiado ✅";
      setTimeout(() => {
        if (mensaje) mensaje.textContent = "Copiar 📋";
      }, 1000);
    })
    .catch(err => console.error("Error al copiar:", err));
}
