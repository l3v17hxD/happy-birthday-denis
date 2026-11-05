const cancion = document.getElementById("cancion");
const btnSonido = document.getElementById("btn-sonido");
const puerta = document.getElementById("puerta");
const contenedorGlobos = document.getElementById("globos");

// Fondo que le toca a cada pantalla (clases de style.css)
const fondos = {
  inicio: "pagina-inicio",
  felicitaciones: "pagina-felicitaciones",
  mensaje: "pagina-mensaje",
  sorpresa: "pagina-sorpresa",
};

// ====== Cambiar de pantalla (la música NO se corta) ======
function mostrar(nombre) {
  document.querySelectorAll(".pantalla").forEach((p) => {
    p.classList.toggle("activa", p.id === nombre);
  });
  document.body.className = fondos[nombre];
  window.scrollTo(0, 0);

  if (nombre === "felicitaciones") iniciarGlobos();
  else detenerGlobos();
}

document.querySelectorAll("[data-ir]").forEach((boton) => {
  boton.addEventListener("click", () => mostrar(boton.dataset.ir));
});

// ====== La puerta: abre, empieza la música y pasa a felicitaciones ======
puerta.addEventListener("click", () => {
  puerta.classList.add("abierta");
  cancion.play().catch(() => {});
  btnSonido.hidden = false;
  setTimeout(() => mostrar("felicitaciones"), 900);
});

// ====== Botoncito 🔊/🔇 ======
cancion.addEventListener("play", () => (btnSonido.textContent = "🔊"));
cancion.addEventListener("pause", () => (btnSonido.textContent = "🔇"));
btnSonido.addEventListener("click", () => {
  if (cancion.paused) cancion.play();
  else cancion.pause();
});

// ====== Globos (solo en la pantalla de sorpresa) ======
const colores = ["#ff6b9d", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff", "#ff9a76"];
let intervaloGlobos = null;

function crearGlobo() {
  const globo = document.createElement("div");
  globo.className = "globo";
  const color = colores[Math.floor(Math.random() * colores.length)];
  globo.style.background = color;
  globo.style.borderBottomColor = color;
  globo.style.left = Math.random() * 95 + "vw";
  globo.style.animationDuration = 6 + Math.random() * 6 + "s";
  const escala = 0.7 + Math.random() * 0.8;
  globo.style.width = 60 * escala + "px";
  globo.style.height = 76 * escala + "px";
  contenedorGlobos.appendChild(globo);
  setTimeout(() => globo.remove(), 13000);
}

function iniciarGlobos() {
  if (intervaloGlobos) return;
  for (let i = 0; i < 8; i++) setTimeout(crearGlobo, i * 250);
  intervaloGlobos = setInterval(crearGlobo, 600);
}

function detenerGlobos() {
  clearInterval(intervaloGlobos);
  intervaloGlobos = null;
  contenedorGlobos.innerHTML = "";
}