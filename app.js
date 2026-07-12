/* RedLocal — landing estática. Diagrama de señal + formulario conversacional. */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WA_NUMBER = "56945818860";

  function track(name, props) {
    if (typeof window.plausible === "function") {
      try { window.plausible(name, props ? { props: props } : undefined); } catch (e) {}
    }
  }

  /* ---------- Año del footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Navegación móvil ---------- */
  (function nav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    function close() { menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); }
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) { close(); } else { menu.hidden = false; toggle.setAttribute("aria-expanded", "true"); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  })();

  /* ---------- Reveal on scroll ---------- */
  (function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Track de enlaces con data-track ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (el) track(el.getAttribute("data-track"));
  });

  /* ---------- Copiar correo ---------- */
  (function copyEmail() {
    var link = document.getElementById("copy-email");
    if (!link || !navigator.clipboard) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      navigator.clipboard.writeText("hola@redlocal.cl").then(function () {
        var prev = link.textContent;
        link.textContent = "¡copiado!";
        setTimeout(function () { link.textContent = prev; }, 1400);
      }).catch(function () { window.location.href = "mailto:hola@redlocal.cl"; });
    });
  })();

  /* ===================================================================
     Diagrama de señal
     =================================================================== */
  (function signalFlow() {
    var svg = document.getElementById("signal-flow");
    if (!svg) return;

    var SOURCES = ["Sensor", "Servidor", "Precio", "Cliente", "Orden", "Documento"];
    var Y = [40, 96, 152, 208, 264, 320];
    var GATE_TAIL = " C 470,180 505,118 540,118";
    var SCENARIOS = [
      { source: 0, channel: "Telegram", action: "Aviso al operador" },
      { source: 2, channel: "WhatsApp", action: "Alerta al comercial" },
      { source: 3, channel: "CRM", action: "Oportunidad asignada" },
      { source: 1, channel: "SMS", action: "Escalamiento al jefe" }
    ];

    function toGate(i) { return "M120," + Y[i] + " C 235," + Y[i] + " 250,180 350,180"; }
    function signalPath(i) { return toGate(i) + GATE_TAIL; }

    function el(name, attrs) {
      var n = document.createElementNS(SVGNS, name);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }

    var gRoutes = svg.querySelector("#sf-routes");
    var gSources = svg.querySelector("#sf-sources");
    var gNoise = svg.querySelector("#sf-noise");
    var gSignal = svg.querySelector("#sf-signal");
    var chDot = svg.querySelector("#sf-ch-dot");
    var chLabel = svg.querySelector("#sf-ch-label");
    var actLabel = svg.querySelector("#sf-act-label");
    var vroute = svg.querySelector("#sf-vroute");

    var sourceDots = [];
    SOURCES.forEach(function (label, i) {
      gRoutes.appendChild(el("path", { d: toGate(i) }));
      var dot = el("circle", { cx: 118, cy: Y[i], r: 4, fill: "var(--ink-faint)" });
      var txt = el("text", { x: 106, y: Y[i] + 4, "text-anchor": "end", "font-size": 13, class: "sf-source-label" });
      txt.textContent = label;
      gSources.appendChild(dot);
      gSources.appendChild(txt);
      sourceDots.push(dot);
    });

    function render(sc) {
      sourceDots.forEach(function (d, i) {
        d.setAttribute("fill", i === sc.source ? "var(--signal)" : "var(--ink-faint)");
      });
      chLabel.textContent = sc.channel;
      actLabel.textContent = sc.action;
    }

    if (reduced) {
      render(SCENARIOS[0]);
      vroute.setAttribute("stroke", "var(--signal)");
      return;
    }

    var idx = -1;
    function cycle() {
      idx = (idx + 1) % SCENARIOS.length;
      var sc = SCENARIOS[idx];
      render(sc);

      // reset canal/acción y ruta vertical
      vroute.setAttribute("stroke", "var(--line-strong)");
      vroute.classList.remove("route-live");
      chDot.classList.remove("ch-live");

      // ruido: dots que se disipan en el filtro (todas las fuentes salvo la señal)
      gNoise.textContent = "";
      SOURCES.forEach(function (_, i) {
        if (i === sc.source) return;
        var d = el("circle", { r: 3, fill: "var(--ink-faint)" });
        d.style.offsetPath = "path('" + toGate(i) + "')";
        d.style.offsetRotate = "0deg";
        d.style.animation = "noise " + (2.6 + (i % 3) * 0.5) + "s linear " + (i * 0.4) + "s infinite";
        gNoise.appendChild(d);
      });

      // la señal
      gSignal.textContent = "";
      var sig = el("circle", { r: 5.5, fill: "var(--signal)" });
      sig.style.offsetPath = "path('" + signalPath(sc.source) + "')";
      sig.style.offsetRotate = "0deg";
      sig.style.animation = "travel 1.65s ease-in-out forwards";
      gSignal.appendChild(sig);

      // al llegar: canal vivo + ruta a acción activa
      setTimeout(function () {
        vroute.setAttribute("stroke", "var(--signal)");
        vroute.classList.add("route-live");
        chDot.classList.add("ch-live");
      }, 1650);
    }

    cycle();
    setInterval(cycle, 3600);
  })();

  /* ===================================================================
     Formulario conversacional (6 pasos) → WhatsApp
     =================================================================== */
  (function leadForm() {
    var form = document.getElementById("lead-form");
    if (!form) return;

    var LOCATIONS = ["Un sistema o software", "Una máquina o equipo", "Una página web", "Correo electrónico", "Una base de datos", "Un documento", "Un sensor", "CRM", "ERP", "Todavía no lo sé", "Otro"];
    var CHANNELS = ["WhatsApp", "Telegram", "SMS", "Email", "Un sistema interno", "No lo sé todavía"];
    var URGENCIES = ["Inmediata (minutos)", "El mismo día", "Puede esperar", "No lo sé"];
    var EXAMPLES = [
      "cuando una bomba deja de entregar presión",
      "cuando un producto baja de precio en la competencia",
      "cuando un cliente escribe fuera de horario y nadie responde",
      "cuando aparece una licitación de mi rubro",
      "cuando un servidor deja de responder",
      "cuando una orden queda detenida más de 2 horas"
    ];
    var STORAGE_KEY = "rl_lead_draft";
    var TOTAL = 6;

    var state = {
      eventDescription: "", location: "", locationDetail: "", audience: "",
      impact: "", channel: "", urgency: "", name: "", email: "",
      company: "", phone: "", consent: false, website: ""
    };
    var step = 0;
    var started = false;

    var steps = form.querySelectorAll(".step");
    var stepCount = document.getElementById("step-count");
    var progress = document.getElementById("progress");
    var errorEl = document.getElementById("form-error");
    var btnBack = document.getElementById("btn-back");
    var btnNext = document.getElementById("btn-next");
    var btnSubmit = document.getElementById("btn-submit");

    // Barra de progreso
    for (var i = 0; i < TOTAL; i++) { var s = document.createElement("span"); progress.appendChild(s); }
    var pips = progress.querySelectorAll("span");

    // Restaurar borrador (solo campos no sensibles)
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        ["eventDescription", "location", "locationDetail", "audience", "impact", "channel", "urgency"].forEach(function (k) {
          if (typeof saved[k] === "string") state[k] = saved[k];
        });
      }
    } catch (e) {}

    function saveDraft() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          eventDescription: state.eventDescription, location: state.location,
          locationDetail: state.locationDetail, audience: state.audience,
          impact: state.impact, channel: state.channel, urgency: state.urgency
        }));
      } catch (e) {}
    }

    function markStarted() { if (!started) { started = true; track("form_started"); } }

    // Inputs de texto
    function bindInput(id, key) {
      var input = document.getElementById(id);
      if (!input) return;
      if (state[key]) input.value = state[key];
      input.addEventListener("input", function () {
        state[key] = input.value; markStarted(); saveDraft(); hideError(); updateNav();
      });
    }
    ["eventDescription", "locationDetail", "audience", "impact", "name", "email", "company", "phone"].forEach(function (id) {
      var key = id;
      bindInput(id, key);
    });
    document.getElementById("consent").addEventListener("change", function (e) {
      state.consent = e.target.checked; updateNav();
    });
    document.getElementById("website").addEventListener("input", function (e) { state.website = e.target.value; });

    // Chips
    function buildChips(containerId, values, key, single) {
      var box = document.getElementById(containerId);
      values.forEach(function (val) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "chip"; b.textContent = val;
        b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
        b.setAttribute("aria-pressed", state[key] === val ? "true" : "false");
        if (state[key] === val) b.setAttribute("aria-checked", "true");
        b.addEventListener("click", function () {
          var already = state[key] === val;
          state[key] = already ? "" : val;
          box.querySelectorAll(".chip").forEach(function (c) {
            var on = c.textContent === state[key];
            c.setAttribute("aria-pressed", on ? "true" : "false");
            c.setAttribute("aria-checked", on ? "true" : "false");
          });
          markStarted(); saveDraft(); hideError(); updateNav();
          if (key === "channel" && state.channel) track("contact_channel_selected", { channel: state.channel });
        });
        box.appendChild(b);
      });
    }
    buildChips("loc-choices", LOCATIONS, "location", true);
    buildChips("ch-choices", CHANNELS, "channel", true);
    buildChips("urg-choices", URGENCIES, "urgency", true);

    // Placeholder rotativo del paso 1
    var descEl = document.getElementById("eventDescription");
    if (!reduced) {
      var exIdx = 0;
      setInterval(function () {
        exIdx = (exIdx + 1) % EXAMPLES.length;
        descEl.setAttribute("placeholder", "Por ejemplo: quiero enterarme " + EXAMPLES[exIdx] + "…");
      }, 3500);
    }

    var EMAIL_RE = /.+@.+\..+/;
    function stepValid(n) {
      switch (n) {
        case 0: return state.eventDescription.trim().length >= 10;
        case 1: return state.location !== "";
        case 2: return state.audience.trim().length >= 2;
        case 3: return state.impact.trim().length >= 2;
        case 4: return state.channel !== "";
        case 5: return state.name.trim().length >= 2 && EMAIL_RE.test(state.email) && state.consent;
        default: return false;
      }
    }

    function showError(msg) { errorEl.textContent = msg; errorEl.hidden = false; }
    function hideError() { errorEl.hidden = true; }

    function updateNav() {
      var last = step === TOTAL - 1;
      btnBack.disabled = step === 0;
      btnNext.hidden = last;
      btnSubmit.hidden = !last;
      var valid = stepValid(step);
      btnNext.disabled = !valid;
      btnSubmit.disabled = !valid;
    }

    function renderStep() {
      steps.forEach(function (fs) { fs.hidden = Number(fs.getAttribute("data-step")) !== step; });
      stepCount.textContent = "Paso " + (step + 1) + " de " + TOTAL;
      pips.forEach(function (p, i) { p.classList.toggle("on", i <= step); });
      updateNav();
      var active = form.querySelector('.step[data-step="' + step + '"]');
      var focusable = active && active.querySelector("textarea, input, .chip");
      if (focusable) { try { focusable.focus({ preventScroll: true }); } catch (e) {} }
    }

    btnNext.addEventListener("click", function () {
      if (!stepValid(step)) { showError("Completa este paso para continuar."); return; }
      track("form_step_completed", { step: step + 1 });
      step = Math.min(step + 1, TOTAL - 1); hideError(); renderStep();
    });
    btnBack.addEventListener("click", function () { step = Math.max(step - 1, 0); hideError(); renderStep(); });

    function buildMessage() {
      var where = state.locationDetail ? state.location + " — " + state.locationDetail : state.location;
      var lines = [
        "Hola RedLocal, quiero que me avisen de un evento.",
        "",
        "• Qué detectar: " + state.eventDescription,
        "• Dónde ocurre: " + where,
        "• Quién debe enterarse: " + state.audience,
        "• Impacto si nadie lo detecta: " + state.impact,
        "• Canal deseado: " + state.channel
      ];
      if (state.urgency) lines.push("• Urgencia: " + state.urgency);
      lines.push("", "— " + state.name + (state.company ? " · " + state.company : ""));
      lines.push(state.email + (state.phone ? " · " + state.phone : ""));
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (state.website) { done(); return; } // honeypot: bot → simular éxito, no hacer nada
      if (!stepValid(5)) { showError("Revisa tu nombre, correo y el consentimiento."); return; }

      var msg = buildMessage();
      var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
      track("form_submitted", { channel: state.channel });
      try { localStorage.removeItem(STORAGE_KEY); } catch (e2) {}
      window.open(waUrl, "_blank", "noopener");
      done(msg);
    });

    function done(msg) {
      var mailUrl = "mailto:hola@redlocal.cl?subject=" +
        encodeURIComponent("Quiero detectar un evento") +
        "&body=" + encodeURIComponent(msg || "");
      form.innerHTML =
        '<div class="form-done">' +
          '<p class="kicker">Recibido</p>' +
          '<h3>Abrimos WhatsApp con tu caso resumido.</h3>' +
          '<p class="section-lead">Solo tienes que presionar enviar. Si no se abrió, ' +
          'escríbenos por <a href="' + "https://wa.me/" + WA_NUMBER + '" target="_blank" rel="noopener">WhatsApp</a> ' +
          'o <a href="' + mailUrl + '">correo</a>. Te respondemos con una primera evaluación de factibilidad.</p>' +
        '</div>';
    }

    renderStep();
  })();
})();
