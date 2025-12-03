// ==========================
//  SCRIPT GLOBAL DEL SITIO
// ==========================

console.log("📦 script_global.js cargado");

document.addEventListener("DOMContentLoaded", () => {
    console.log("🌐 DOM listo:", window.location.pathname);

    aplicarTemaGlobal();
    activarBotonesGlobales();
    cargarComponentes();
    activarMenusDesplegables();
});


// ===============================
//   TEMA GLOBAL (Oscuro/Claro)
// ===============================
function aplicarTemaGlobal() {
    const tema = localStorage.getItem("tema");
    if (tema) {
        document.body.classList.add(tema);
    }
}


// ===============================
//   BOTONES GLOBALES
// ===============================
function activarBotonesGlobales() {
    const btnHome = document.getElementById("btn-home");
    if (btnHome) btnHome.onclick = () => irA("index.html");

    const btnTema = document.getElementById("btn-tema");
    if (btnTema) {
        btnTema.onclick = () => {
            document.body.classList.toggle("dark");
            if (document.body.classList.contains("dark"))
                localStorage.setItem("tema", "dark");
            else
                localStorage.removeItem("tema");
        };
    }
}


// ===============================
//   NAVEGACIÓN
// ===============================
function irA(ruta) {
    window.location.href = ruta;
}


// ===============================
//   CARGAR HEADER/FOOTER
// ===============================
function cargarComponentes() {
    const header = document.getElementById("global-header");
    const footer = document.getElementById("global-footer");

    if (header) {
        fetch("componentes/header.html")
            .then(res => res.text())
            .then(html => {
                header.innerHTML = html;
                activarMenusDesplegables(); // activar menú después de cargar HTML
            });
    }

    if (footer) {
        fetch("componentes/footer.html")
            .then(res => res.text())
            .then(html => footer.innerHTML = html);
    }
}


// ===============================
//   MENÚS DESPLEGABLES
// ===============================
function activarMenusDesplegables() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {
        const toggle = drop.querySelector(".dropdown-toggle");
        const menu = drop.querySelector(".dropdown-menu");

        if (!toggle || !menu) return;

        // Abrir/cerrar al hacer clic
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();

            // Cerrar otros menús
            document.querySelectorAll(".dropdown-menu.show").forEach(m => {
                if (m !== menu) m.classList.remove("show");
            });

            menu.classList.toggle("show");
        });
    });

    // Cerrar todos los menús al hacer clic fuera
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-menu.show").forEach(menu => {
            menu.classList.remove("show");
        });
    });
}


