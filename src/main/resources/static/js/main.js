document.addEventListener("DOMContentLoaded", () => {
    initToggle("btnMenuMovil", "menuMovil");
    initVerMas();
    bindForm("loginForm", validateLogin);
    bindForm("registroForm", validateRegistro);
    bindForm("resenaForm", validateResena);
});

/* Control global para visibilidad Toggle (Menú Móvil) */
const initToggle = (btnId, targetId) => {
    const btn = document.getElementById(btnId), target = document.getElementById(targetId);
    if (btn && target) btn.addEventListener("click", () => target.classList.toggle("hidden"));
};

/* Despliegue de juegos adicionales */
function initVerMas() {
    const btn = document.getElementById("btnVerMas"), panel = document.getElementById("masJuegos");
    const icon = document.getElementById("btnVerMasIcon"), txt = document.getElementById("btnVerMasTexto");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
        panel.classList.toggle("hidden");
        const isExp = !panel.classList.contains("hidden");
        if (txt) txt.textContent = isExp ? "Ver menos juegos" : "Ver más juegos";
        if (icon) icon.classList.toggle("rotate-180", isExp);
    });
}

/* Helpers de validación y mensajería */
const setError = (id, msg) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("hidden", !msg);
};

const showStatus = (id, msg, success = true) => {
    const st = document.getElementById(id);
    if (!st) return;
    st.className = `text-center text-sm p-2 rounded ${success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'}`;
    st.textContent = msg;
    st.classList.remove("hidden");
};

const bindForm = (id, handler) => {
    const f = document.getElementById(id);
    if (f) f.addEventListener("submit", (e) => { e.preventDefault(); handler(f); });
};

/* Lógica de validación por formulario */
function validateLogin() {
    const e = document.getElementById("loginEmail").value.trim();
    const p = document.getElementById("loginPassword").value.trim();
    let valid = true;

    setError("errLoginEmail", !e.includes("@") ? "Correo inválido" : "");
    setError("errLoginPassword", p.length < 6 ? "Mínimo 6 caracteres" : "");
    valid = e.includes("@") && p.length >= 6;

    if (valid) {
        showStatus("loginStatus", "¡Éxito! Redireccionando...");
        setTimeout(() => window.location.href = "index.html", 1200);
    }
}

function validateRegistro(f) {
    const n = document.getElementById("nombre").value.trim();
    const e = document.getElementById("email").value.trim();
    const p = document.getElementById("password").value.trim();

    setError("errNombre", n.length < 3 ? "Mínimo 3 caracteres" : "");
    setError("errEmail", !e.includes("@") ? "Correo inválido" : "");
    setError("errPassword", p.length < 6 ? "Mínimo 6 caracteres" : "");

    if (n.length >= 3 && e.includes("@") && p.length >= 6) {
        showStatus("registroStatus", "¡Registro completado!");
        f.reset();
    }
}

function validateResena(f) {
    const j = document.getElementById("juegoNombre").value.trim();
    const c = document.getElementById("calificacion").value;
    const txt = document.getElementById("comentario").value.trim();

    setError("errJuegoNombre", !j ? "Selecciona un juego" : "");
    setError("errCalificacion", !c ? "Selecciona nota" : "");
    setError("errComentario", txt.length < 10 ? "Mínimo 10 caracteres" : "");

    if (j && c && txt.length >= 10) {
        const list = document.getElementById("listaResenas");
        if (list) {
            const card = document.createElement("article");
            card.className = "bg-slate-900 p-4 rounded border border-slate-800 fade-in";
            card.innerHTML = `<div class="flex justify-between font-bold text-cyan-400"><h3>${j}</h3><span>${'⭐'.repeat(c)} ${c}/5</span></div><p class="text-sm text-slate-300 mt-1">${txt}</p>`;
            list.prepend(card);
        }
        showStatus("resenaStatus", "¡Reseña publicada!");
        f.reset();
        setTimeout(() => document.getElementById("resenaStatus").classList.add("hidden"), 2500);
    }
}