const TOTAL_STEPS = 11;

const testimonials = [
  { name: "Maria S.", city: "München", text: "Altuva hat mein Leben verändert. Endlich verliere ich Gewicht ohne Hunger!", rating: 5 },
  { name: "Thomas K.", city: "Hamburg", text: "Schon nach 3 Wochen 4 kg weniger. Absolut empfehlenswert!", rating: 5 },
  { name: "Sabine W.", city: "Berlin", text: "Endlich ein Produkt, das wirklich hält, was es verspricht.", rating: 5 },
  { name: "Hans-Peter M.", city: "Köln", text: "Meine Frau und ich nutzen es beide. Wir sind begeistert!", rating: 5 },
  { name: "Claudia R.", city: "Frankfurt", text: "Mehr Energie, weniger Heißhunger – ich bin überzeugt.", rating: 5 },
  { name: "Werner B.", city: "Stuttgart", text: "Einfach anzuwenden und die Ergebnisse sprechen für sich.", rating: 5 },
];

const pricingPlans = [
  { packs: 1, perPack: "29,99 €", total: "29,99 €", popular: false },
  { packs: 3, perPack: "19,99 €", total: "59,97 €", popular: true },
  { packs: 6, perPack: "14,99 €", total: "89,94 €", popular: false },
];

const state = {
  step: 1,
  answers: {},
  height: 170,
  weight: 80,
  target: 65,
  selectedPlan: 1,
};

const $ = (id) => document.getElementById(id);

function getQueryStep() {
  const q = new URLSearchParams(window.location.search).get("q");
  const n = parseInt(q, 10);
  return n >= 1 && n <= TOTAL_STEPS ? n : 1;
}

function setQueryStep(step) {
  const url = new URL(window.location.href);
  url.searchParams.set("q", String(step));
  history.pushState({ step }, "", url);
}

function updateChrome() {
  $("step-counter").textContent = `${state.step}/${TOTAL_STEPS}`;
  $("progress-fill").style.width = `${(state.step / TOTAL_STEPS) * 100}%`;
  renderTestimonial(state.step - 1);
}

function renderTestimonial(index) {
  const t = testimonials[index % testimonials.length];
  $("testimonial").innerHTML = `
    <div class="testimonial-stars">${"★".repeat(t.rating)}</div>
    <p class="testimonial-text">"${t.text}"</p>
    <p class="testimonial-author">${t.name} – ${t.city}</p>
  `;
}

function backButton() {
  return state.step > 1
    ? `<button type="button" class="back-btn" id="back-btn">← Zurück</button>`
    : "";
}

function bindBack() {
  const btn = $("back-btn");
  if (btn) btn.onclick = () => goToStep(state.step - 1);
}

function optionButtons(opts, key) {
  return `<div class="options">${opts
    .map(
      (o, i) =>
        `<button type="button" class="option-btn" data-key="${key}" data-value="${i}">${o}</button>`
    )
    .join("")}</div>`;
}

function bindOptions(onSelect) {
  document.querySelectorAll(".option-btn[data-key]").forEach((btn) => {
    btn.onclick = () => {
      const key = btn.dataset.key;
      const val = btn.dataset.value;
      state.answers[key] = val;
      onSelect();
    };
  });
}

function renderSliderStep({ key, title, subtitle, min, max, unit, value }) {
  const pct = ((value - min) / (max - min)) * 100;
  $("quiz-content").innerHTML = `
    <div class="fade-in">
      ${backButton()}
      <h1 class="quiz-title">${title}</h1>
      <p class="quiz-subtitle">${subtitle}</p>
      <div class="slider-section">
        <div class="slider-value" id="slider-display">${value}</div>
        <div class="slider-unit">${unit}</div>
        <input type="range" class="altuva-range" id="slider" min="${min}" max="${max}" value="${value}" style="--val:${pct}%" />
        <button type="button" class="next-btn" id="next-btn">Weiter</button>
      </div>
    </div>
  `;
  bindBack();
  const slider = $("slider");
  const display = $("slider-display");
  slider.oninput = () => {
    const v = Number(slider.value);
    state[key] = v;
    const p = ((v - min) / (max - min)) * 100;
    slider.style.setProperty("--val", `${p}%`);
    display.textContent = v;
  };
  $("next-btn").onclick = () => {
    state.answers[key] = state[key];
    goToStep(state.step + 1);
  };
}

function renderStep() {
  const s = state.step;
  $("trust-section").classList.remove("hidden");
  $("testimonial").classList.remove("hidden");

  if (s === 1) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        <h1 class="quiz-title">Was ist Ihr Hauptziel?</h1>
        ${optionButtons(
          [
            "1–10 kg dauerhaft abnehmen",
            "11–20 kg dauerhaft abnehmen",
            "20+ kg dauerhaft abnehmen",
            "Gewicht halten und fitter werden",
            "Ich bin mir noch nicht sicher",
          ],
          "goal"
        )}
      </div>`;
    bindOptions(() => goToStep(2));
  } else if (s === 2) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        ${backButton()}
        <h1 class="quiz-title">Was ist Ihr Geschlecht?</h1>
        <p class="quiz-subtitle">Geschlecht und Hormone beeinflussen Ihren Stoffwechsel.</p>
        <div class="options">
          <button type="button" class="option-btn" data-key="gender" data-value="male">👨 Männlich</button>
          <button type="button" class="option-btn" data-key="gender" data-value="female">👩 Weiblich</button>
        </div>
      </div>`;
    bindBack();
    bindOptions(() => goToStep(3));
  } else if (s === 3) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        ${backButton()}
        <h1 class="quiz-title">Wie alt sind Sie?</h1>
        ${optionButtons(["Unter 20", "20–30", "30–40", "40–50", "50–60", "60–70", "70+"], "age")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(4));
  } else if (s === 4) {
    renderSliderStep({
      key: "height",
      title: "Wie groß sind Sie?",
      subtitle: "Schieben Sie den Regler auf Ihre Körpergröße",
      min: 140,
      max: 220,
      unit: "cm",
      value: state.height,
    });
  } else if (s === 5) {
    renderSliderStep({
      key: "weight",
      title: "Was ist Ihr aktuelles Gewicht?",
      subtitle: "Schieben Sie den Regler auf Ihr aktuelles Gewicht",
      min: 50,
      max: 200,
      unit: "kg",
      value: state.weight,
    });
  } else if (s === 6) {
    const maxTarget = Math.max(45, state.weight - 5);
    if (state.target > maxTarget) state.target = maxTarget;
    renderSliderStep({
      key: "target",
      title: "Was ist Ihr Zielgewicht?",
      subtitle: "Schieben Sie den Regler auf Ihr Zielgewicht",
      min: 45,
      max: maxTarget,
      unit: "kg",
      value: state.target,
    });
  } else if (s === 7) {
    $("quiz-content").innerHTML = `
      <div class="fade-in info-page">
        ${backButton()}
        <h1 class="quiz-title">⚠️ Warum Diäten scheitern (und Altuva funktioniert)</h1>
        <p class="info-intro">Studien zeigen: 73 % aller Diätenden erleben den Jo-Jo-Effekt.</p>
        <ul class="info-bullets">
          <li>✅ Kein Hunger: Fettverbrennung ohne Kalorienbeschränkung.</li>
          <li>✅ Beschleunigter Stoffwechsel: Maximaler Fettabbau rund um die Uhr.</li>
          <li>✅ Kein Jo-Jo-Effekt: Langfristiger Gewichtsverlust durch direkte Wirkstoffaufnahme.</li>
        </ul>
        <p class="info-emphasis">Der Altuva-Unterschied: In klinischen Studien verloren 7 von 10 Teilnehmern im Schnitt 6,5 kg im ersten Monat.</p>
        <button type="button" class="next-btn" id="next-btn">Weiter</button>
      </div>`;
    bindBack();
    $("next-btn").onclick = () => goToStep(8);
  } else if (s === 8) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        ${backButton()}
        <h1 class="quiz-title">Wo lagert sich bei Ihnen das meiste Fett ab?</h1>
        ${optionButtons(["Bauch", "Taille / Hüften", "Oberschenkel", "Gesäß", "Gleichmäßig verteilt"], "fatLocation")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(9));
  } else if (s === 9) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        ${backButton()}
        <h1 class="quiz-title">Was ist Ihre größte Herausforderung beim Abnehmen?</h1>
        ${optionButtons(
          ["Heißhunger und Snacking", "Keine Zeit für Sport oder gesundes Kochen", "Langsamer Stoffwechsel"],
          "challenge"
        )}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(10));
  } else if (s === 10) {
    $("quiz-content").innerHTML = `
      <div class="fade-in">
        ${backButton()}
        <h1 class="quiz-title">Wären Sie bereit, einmal täglich ein diskretes Pflaster zu tragen, um Ihr Ziel schneller zu erreichen?</h1>
        <p class="quiz-subtitle">Eine einfache tägliche Routine, die wirkt, während Sie Ihren Tag bestreiten.</p>
        ${optionButtons(["Ja, absolut!", "Vielleicht – Ich möchte mehr erfahren"], "patch")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(11));
  } else if (s === 11) {
    $("trust-section").classList.add("hidden");
    $("testimonial").classList.add("hidden");
    renderLoading();
  }
  updateChrome();
}

function renderLoading() {
  let seconds = 14;
  $("quiz-content").innerHTML = `
    <div class="fade-in loading-page">
      <div class="loading-spinner"></div>
      <h2 class="loading-title">Antworten werden ausgewertet...</h2>
      <p class="loading-meta">35 Personen sehen sich dieses Angebot gerade an</p>
      <p class="loading-meta">Dieses Angebot läuft ab in:</p>
      <div class="loading-timer" id="countdown">14:00</div>
      <p class="loading-stock">Nur noch 23 Packungen auf Lager!</p>
    </div>`;

  const timer = setInterval(() => {
    seconds -= 1;
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    const el = $("countdown");
    if (el) el.textContent = `${m}:${sec}`;
    if (seconds <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function calcBMI(w, h) {
  const hm = h / 100;
  return (w / (hm * hm)).toFixed(1);
}

function goalDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

function showResults() {
  $("app").classList.add("hidden");
  const page = $("results-page");
  page.classList.remove("hidden");

  const bmi = calcBMI(state.weight, state.height);
  const metabolicAge = Math.max(18, Math.round(Number(state.answers.age || 2) * 8 + 22));
  const waist = Math.round(state.weight * 0.45);

  page.innerHTML = `
    <div class="results-header">Über 76.000 Erfolgsgeschichten!</div>
    <div class="results-body">
      <h1 class="results-title">Unsere Berechnungen zeigen, dass Sie mit Altuva ein Gewicht von ${state.target} kg erreichen können. Sie könnten Ihr Ziel bis zum ${goalDate()} erreichen.</h1>
      <p class="results-disclaimer">Ergebnisse können variieren. Individuelle Resultate hängen von Lebensstil und Konsequenz ab.</p>

      <div class="metrics-grid">
        <div class="metric-card"><div class="metric-label">Aktueller BMI</div><div class="metric-value">${bmi}</div></div>
        <div class="metric-card"><div class="metric-label">Stoffwechselalter</div><div class="metric-value">${metabolicAge}</div><div class="metric-note">Optimierungsbedarf</div></div>
        <div class="metric-card"><div class="metric-label">Geschätzte Taille</div><div class="metric-value">${waist} cm</div><div class="metric-note">Reduktion in 8 Wochen</div></div>
        <div class="metric-card"><div class="metric-label">Körperfett</div><div class="metric-value">${Math.round(bmi * 1.2)}%</div></div>
      </div>

      <div class="body-comparison">
        <div class="body-stat"><div class="body-stat-label">Aktuell</div><div class="body-stat-value">${state.weight} kg</div></div>
        <div class="body-stat"><div class="body-stat-label">Ziel</div><div class="body-stat-value" style="color:var(--secondary)">${state.target} kg</div></div>
      </div>

      <div class="doctor-card">
        <div class="doctor-name">Dr. Sarah Mitchell, Allgemeinmedizinerin</div>
        <div class="doctor-role">Hausärztin, Berlin</div>
        <p class="doctor-quote">"Berberin ist einer der am besten erforschten natürlichen Wirkstoffe für den Stoffwechsel. Die transdermale Aufnahme über Pflaster umgeht das Verdauungssystem und ermöglicht eine gleichmäßige Wirkstoffabgabe über den ganzen Tag."</p>
        <div class="doctor-verified">✅ Verifizierte Ärztin • 15+ Jahre Erfahrung</div>
      </div>

      <div class="study-box">Klinische Studien zum Altuva-Pflaster zeigten, dass 8 von 10 Anwendern durchschnittlich 8 kg pro Monat verloren. 99 % der Teilnehmer bestätigten zudem eine deutliche Beschleunigung der Fettverbrennung.</div>

      <div class="pricing-section">
        <h2>Ihre persönliche Produktempfehlung</h2>
        <span class="guarantee-badge">60 Tage Geld-zurück-Garantie</span>
        <div class="pricing-cards" id="pricing-cards">
          ${pricingPlans
            .map(
              (p, i) => `
            <div class="pricing-card ${i === state.selectedPlan ? "selected" : ""} ${p.popular ? "popular" : ""}" data-plan="${i}">
              ${p.popular ? '<span class="popular-badge">AM BELIEBTESTEN</span>' : ""}
              <div class="pricing-packs">${p.packs === 1 ? "1 Packung" : `${p.packs} Packungen`}</div>
              <div class="pricing-per">${p.perPack} pro Packung</div>
              <div class="pricing-total">Gesamtpreis: ${p.total}</div>
            </div>`
            )
            .join("")}
        </div>
        <button type="button" class="cta-button">🛒 Jetzt bestellen</button>
        <p class="low-stock">Nur noch 23 Packungen auf Lager!</p>
      </div>
    </div>`;

  document.querySelectorAll(".pricing-card").forEach((card) => {
    card.onclick = () => {
      state.selectedPlan = Number(card.dataset.plan);
      document.querySelectorAll(".pricing-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
    };
  });
}

function goToStep(step) {
  if (step < 1) return;
  if (step > TOTAL_STEPS) {
    showResults();
    return;
  }
  state.step = step;
  setQueryStep(step);
  renderStep();
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", (e) => {
  if (e.state?.step) {
    state.step = e.state.step;
    renderStep();
  } else {
    state.step = getQueryStep();
    renderStep();
  }
});

state.step = getQueryStep();
history.replaceState({ step: state.step }, "", window.location.href);
renderStep();
