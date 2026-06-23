const TOTAL_STEPS = 11;
const AGE_OPTS = ["Unter 20", "20–30", "30–40", "40–50", "50–60", "60–70", "70+"];
const ASSETS = "https://getaltuva.com/assets";

const testimonials = [
  { name: "Maria S.", city: "München", text: "Altuva hat mein Leben verändert. Endlich verliere ich Gewicht ohne Hunger!", rating: 5 },
  { name: "Thomas K.", city: "Hamburg", text: "Schon nach 3 Wochen 4 kg weniger. Absolut empfehlenswert!", rating: 5 },
  { name: "Sabine W.", city: "Berlin", text: "Endlich ein Produkt, das wirklich hält, was es verspricht.", rating: 5 },
  { name: "Hans-Peter M.", city: "Köln", text: "Meine Frau und ich nutzen es beide. Wir sind begeistert!", rating: 5 },
  { name: "Claudia R.", city: "Frankfurt", text: "Mehr Energie, weniger Heißhunger – ich bin überzeugt.", rating: 5 },
  { name: "Werner B.", city: "Stuttgart", text: "Einfach anzuwenden und die Ergebnisse sprechen für sich.", rating: 5 },
];

const reviews = [
  { author: "Bea K.", avatar: `${ASSETS}/woman_1-BH6yw1fe.jpg`, text: "Ich kann es immer noch nicht glauben — 8 Kilo in 6 Wochen! 🎉 Mein Mann denkt, ich gehe heimlich ins Fitnessstudio. Dabei klebe ich mir nur jeden Morgen ein Pflaster auf!", likes: 423, time: "vor 6 Std." },
  { author: "Sabine L.", avatar: `${ASSETS}/woman_2-BpvMVXjQ.jpg`, text: "8 kg in 6 Wochen?! Klingt zu schön um wahr zu sein... ist so schneller Gewichtsverlust nicht ungesund?", likes: 28, time: "vor 5 Std." },
  { author: "Team Altuva", text: "Die Wirkstoffe arbeiten mit Ihrem natürlichen Stoffwechsel – die gesündeste Art abzunehmen. Anders als bei Crash-Diäten bleibt die Muskelmasse erhalten. Studien bestätigen: kein Jo-Jo-Effekt! 💪", likes: 156, time: "vor 5 Std.", isTeam: true, reply: "Sabine L." },
  { author: "Michael R.", avatar: `${ASSETS}/man_1-CLcoqCIT.jpg`, text: "Als Mann war ich erst skeptisch. Aber nach 4 Wochen: 7 kg weg, der Bierbauch schrumpft endlich! 💪 Die Pflaster sind unter dem Hemd super diskret.", likes: 289, time: "vor 4 Std." },
  { author: "David H.", avatar: `${ASSETS}/man_3-DyYxfHjM.jpg`, text: "Funktioniert das auch für Männer über 50? Mein Stoffwechsel steht komplett still...", likes: 19, time: "vor 3 Std." },
  { author: "Team Altuva", text: "Berberin zeigt seine Stärke gerade bei langsamem Stoffwechsel! Es reaktiviert die Fettverbrennung auf zellulärer Ebene. Viele unserer erfolgreichsten Kunden sind über 50.", likes: 94, time: "vor 3 Std.", isTeam: true, reply: "David H." },
  { author: "Jessica W.", avatar: `${ASSETS}/woman_3-UNOZK7v0.jpg`, text: "Ich habe wirklich alles probiert – Weight Watchers, Intervallfasten, Low Carb... nichts hat langfristig funktioniert. Diese Pflaster sind das Erste, was bei mir wirkt! 8 kg in 5 Wochen, und ich habe trotzdem Schokolade gegessen 😅", likes: 512, time: "vor 3 Std." },
  { author: "Denise M.", avatar: `${ASSETS}/woman_5-B60i17Ac.jpg`, text: "Ich bin 62 und hatte fast die Hoffnung verloren. Nach den Wechseljahren ging einfach nichts mehr. Aber jetzt: 6 kg in 4 Wochen! Ich bin überglücklich 😭❤️", likes: 378, time: "vor 2 Std." },
  { author: "Penny P.", avatar: `${ASSETS}/woman_6-CUYfBUNX.jpg`, text: "Ich bin Krankenschwester und arbeite Schicht – keine Zeit oder Energie für das Fitnessstudio. Die Pflaster sind perfekt! Morgens drauf und fertig. 6 kg in 6 Wochen, ohne Aufwand 🏥", likes: 445, time: "vor 30 Min." },
  { author: "Melanie C.", avatar: `${ASSETS}/woman_4-gfTYNniC.jpg`, text: "8-Wochen-Update: insgesamt 11 kg weniger!!! 😱 Hätte ich nie gedacht. Das Beste: Ich musste mich nicht einmal einschränken. Altuva ist absolut sein Geld wert!", likes: 634, time: "vor 10 Min." },
];

const state = {
  step: 1,
  answers: {},
  height: 170,
  weight: 80,
  target: 65,
  resultsTimer: null,
};

const $ = (id) => document.getElementById(id);

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function parseAge(label) {
  if (!label) return 40;
  const t = String(label).replace(/\s/g, "");
  const plus = t.match(/(\d+)\+/);
  if (plus) return Number(plus[1]) + 3;
  const under = t.match(/^[^\d]+(\d+)$/);
  if (under) return Math.max(16, Number(under[1]) - 3);
  const range = t.match(/(\d+)[^\d]+(\d+)/);
  if (range) return Math.round((Number(range[1]) + Number(range[2])) / 2);
  const single = t.match(/(\d+)/);
  return single ? Number(single[1]) : 40;
}

function computeProfile() {
  const gender = state.answers.gender === "male" ? "male" : "female";
  const ageLabel = AGE_OPTS[Number(state.answers.age)] || "40–50";
  const ageYears = clamp(parseAge(ageLabel), 16, 90);
  const heightCm = clamp(state.height, 130, 230);
  const currentKg = clamp(state.weight, 35, 220);
  let goalKg = clamp(state.target, 35, 220);
  if (goalKg > currentKg) goalKg = currentKg;

  const hm = heightCm / 100;
  const bmi = currentKg / (hm * hm);
  const lossKg = Math.max(currentKg - goalKg, 0);
  const weeks = clamp(Math.round(lossKg / 0.65), 6, 26);
  const goalDateObj = new Date();
  goalDateObj.setDate(goalDateObj.getDate() + weeks * 7);
  const goalDate = goalDateObj.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });

  const male = gender === "male" ? 1 : 0;
  const targetBmi = goalKg / (hm * hm);
  const bodyFatBefore = clamp(1.2 * bmi + 0.23 * ageYears - 10.8 * male - 5.4, 8, 55);
  const bodyFatAfter = clamp(1.2 * targetBmi + 0.23 * ageYears - 10.8 * male - 5.4, 8, 55);
  const waistDeltaCm = clamp(Math.round(lossKg / 0.7), 3, 25);
  const bmiBoost = bmi >= 30 ? 8 : bmi >= 27 ? 6 : bmi >= 25 ? 4 : bmi >= 23 ? 1 : -2;
  const metabolicAge = clamp(ageYears + bmiBoost, 16, 99);

  return {
    gender,
    currentKg: Math.round(currentKg),
    goalKg: Math.round(goalKg),
    bmi: bmi.toFixed(1),
    metabolicAge,
    waistDeltaCm,
    bodyFatBefore: Math.round(bodyFatBefore),
    bodyFatAfter: Math.round(bodyFatAfter),
    lossKg: Math.round(lossKg),
    goalDate,
  };
}

function getQueryParam() {
  const q = new URLSearchParams(window.location.search).get("q");
  if (q === "results") return "results";
  const n = parseInt(q, 10);
  return n >= 1 && n <= TOTAL_STEPS ? n : 1;
}

function setQueryParam(value) {
  const url = new URL(window.location.href);
  url.searchParams.set("q", String(value));
  history.pushState({ step: value }, "", url);
}

function setQuizHeader(showBack, showStep) {
  $("header-left").innerHTML = showBack
    ? `<button type="button" class="header-back" id="header-back">← Zurück</button>`
    : "";
  $("header-right").innerHTML = showStep
    ? `<div class="step-counter" id="step-counter">${state.step}/${TOTAL_STEPS}</div>`
    : "";
  if (showBack) {
    $("header-back").onclick = () => {
      if (state.step === "results") goToStep(10);
      else goToStep(state.step - 1);
    };
  }
  $("progress-track").classList.toggle("hidden", !showStep);
}

function updateChrome() {
  if (state.step === "results") return;
  const counter = $("step-counter");
  if (counter) counter.textContent = `${state.step}/${TOTAL_STEPS}`;
  $("progress-fill").style.width = `${(state.step / TOTAL_STEPS) * 100}%`;
  renderTestimonial(state.step - 1);
  setQuizHeader(state.step > 1, true);
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
    .map((o, i) => `<button type="button" class="option-btn" data-key="${key}" data-value="${i}">${o}</button>`)
    .join("")}</div>`;
}

function bindOptions(onSelect) {
  document.querySelectorAll(".option-btn[data-key]").forEach((btn) => {
    btn.onclick = () => {
      state.answers[btn.dataset.key] = btn.dataset.value;
      onSelect();
    };
  });
}

function renderSliderStep({ key, title, subtitle, min, max, unit, value }) {
  const pct = ((value - min) / (max - min)) * 100;
  $("quiz-content").innerHTML = `
    <div class="quiz-inner fade-in">
      ${backButton()}
      <h1 class="quiz-title">${title}</h1>
      <p class="quiz-subtitle">${subtitle}</p>
      <div class="slider-section">
        <div class="slider-value" id="slider-display">${value}</div>
        <div class="slider-unit">${unit}</div>
        <input type="range" class="altuva-range" id="slider" min="${min}" max="${max}" value="${value}" style="--val:${pct}%" />
        <button type="button" class="next-btn" id="next-btn">Weiter</button>
      </div>
    </div>`;
  bindBack();
  const slider = $("slider");
  const display = $("slider-display");
  slider.oninput = () => {
    const v = Number(slider.value);
    state[key] = v;
    slider.style.setProperty("--val", `${((v - min) / (max - min)) * 100}%`);
    display.textContent = v;
  };
  $("next-btn").onclick = () => {
    state.answers[key] = state[key];
    goToStep(state.step + 1);
  };
}

function renderStep() {
  if (state.step === "results") {
    showResults();
    return;
  }

  $("trust-section").classList.remove("hidden");
  $("testimonial").classList.remove("hidden");
  const s = state.step;

  if (s === 1) {
    $("quiz-content").innerHTML = `
      <div class="quiz-inner fade-in">
        <h1 class="quiz-title">Was ist Ihr Hauptziel?</h1>
        ${optionButtons([
          "1–10 kg dauerhaft abnehmen",
          "11–20 kg dauerhaft abnehmen",
          "20+ kg dauerhaft abnehmen",
          "Gewicht halten und fitter werden",
          "Ich bin mir noch nicht sicher",
        ], "goal")}
      </div>`;
    bindOptions(() => goToStep(2));
  } else if (s === 2) {
    $("quiz-content").innerHTML = `
      <div class="quiz-inner fade-in">
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
      <div class="quiz-inner fade-in">
        ${backButton()}
        <h1 class="quiz-title">Wie alt sind Sie?</h1>
        ${optionButtons(AGE_OPTS, "age")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(4));
  } else if (s === 4) {
    renderSliderStep({ key: "height", title: "Wie groß sind Sie?", subtitle: "Schieben Sie den Regler auf Ihre Körpergröße", min: 140, max: 220, unit: "cm", value: state.height });
  } else if (s === 5) {
    renderSliderStep({ key: "weight", title: "Was ist Ihr aktuelles Gewicht?", subtitle: "Schieben Sie den Regler auf Ihr aktuelles Gewicht", min: 50, max: 200, unit: "kg", value: state.weight });
  } else if (s === 6) {
    const maxTarget = Math.max(45, state.weight - 5);
    if (state.target > maxTarget) state.target = maxTarget;
    renderSliderStep({ key: "target", title: "Was ist Ihr Zielgewicht?", subtitle: "Schieben Sie den Regler auf Ihr Zielgewicht", min: 45, max: maxTarget, unit: "kg", value: state.target });
  } else if (s === 7) {
    $("quiz-content").innerHTML = `
      <div class="quiz-inner fade-in info-page">
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
      <div class="quiz-inner fade-in">
        ${backButton()}
        <h1 class="quiz-title">Wo lagert sich bei Ihnen das meiste Fett ab?</h1>
        ${optionButtons(["Bauch", "Taille / Hüften", "Oberschenkel", "Gesäß", "Gleichmäßig verteilt"], "fatLocation")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(9));
  } else if (s === 9) {
    $("quiz-content").innerHTML = `
      <div class="quiz-inner fade-in">
        ${backButton()}
        <h1 class="quiz-title">Was ist Ihre größte Herausforderung beim Abnehmen?</h1>
        ${optionButtons(["Heißhunger und Snacking", "Keine Zeit für Sport oder gesundes Kochen", "Langsamer Stoffwechsel"], "challenge")}
      </div>`;
    bindBack();
    bindOptions(() => goToStep(10));
  } else if (s === 10) {
    $("quiz-content").innerHTML = `
      <div class="quiz-inner fade-in">
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
  let seconds = 5;
  $("quiz-content").innerHTML = `
    <div class="quiz-inner fade-in loading-page">
      <div class="loading-spinner"></div>
      <h2 class="loading-title">Antworten werden ausgewertet...</h2>
      <p class="loading-meta">35 Personen sehen sich dieses Angebot gerade an</p>
      <p class="loading-meta">Dieses Angebot läuft ab in:</p>
      <div class="loading-timer" id="countdown">0:05</div>
      <p class="loading-stock">Nur noch 23 Packungen auf Lager!</p>
    </div>`;

  const timer = setInterval(() => {
    seconds -= 1;
    const el = $("countdown");
    if (el) el.textContent = `0:0${seconds}`;
    if (seconds <= 0) {
      clearInterval(timer);
      goToStep("results");
    }
  }, 1000);
}

function startResultsTimer() {
  if (state.resultsTimer) clearInterval(state.resultsTimer);
  let m = 14;
  let s = 59;
  const update = () => {
    const el = $("urgency-timer");
    const footer = $("offer-timer");
    const text = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    if (el) el.textContent = text;
    if (footer) footer.textContent = text;
    const progress = $("urgency-progress");
    if (progress) progress.style.width = `${((m * 60 + s) / (15 * 60)) * 100}%`;
    if (s > 0) s -= 1;
    else if (m > 0) { m -= 1; s = 59; }
  };
  update();
  state.resultsTimer = setInterval(update, 1000);
}

function showResults() {
  $("trust-section").classList.add("hidden");
  $("testimonial").classList.add("hidden");
  setQuizHeader(true, false);

  const p = computeProfile();
  const isFemale = p.gender === "female";
  const currentEmoji = isFemale ? "🧍‍♀️" : "🧍";
  const goalEmoji = isFemale ? "🚶‍♀️" : "🚶";

  $("quiz-content").innerHTML = `
    <div class="fade-in">
      <section class="results-section tight-top">
        <div class="urgency-bar">
          <div class="urgency-stats">
            <div class="urgency-stat"><span class="urgency-icon">🕐</span><span class="urgency-value" id="urgency-timer">14:59</span></div>
            <div class="urgency-stat"><span class="urgency-icon">👁</span><span class="urgency-value">35 <span style="font-size:.625rem;font-weight:400;opacity:.8">👀</span></span></div>
            <div class="urgency-stat"><span class="urgency-icon">📦</span><span class="urgency-value">23 <span style="font-size:.625rem;font-weight:400;opacity:.8">📦</span></span></div>
          </div>
          <div class="urgency-progress"><div class="urgency-progress-fill" id="urgency-progress" style="width:99%"></div></div>
        </div>
      </section>

      <section class="results-section">
        <h1 class="results-headline">Unsere Berechnungen zeigen, dass Sie mit Altuva ein Gewicht von ${p.goalKg} kg erreichen können. Sie könnten Ihr Ziel bis zum ${p.goalDate} erreichen.</h1>
        <p class="results-disclaimer">Ergebnisse können variieren. Individuelle Resultate hängen von Lebensstil und Konsequenz ab.</p>
      </section>

      <section class="results-section">
        <div class="metrics-row">
          <div class="metric-card"><div class="metric-value">${p.bmi}</div><div class="metric-label">Aktueller BMI</div></div>
          <div class="metric-card"><div class="metric-value">${p.metabolicAge}</div><div class="metric-label">Stoffwechselalter</div><div class="metric-note">Optimierungsbedarf</div></div>
          <div class="metric-card"><div class="metric-value">−${p.waistDeltaCm}cm</div><div class="metric-label">Geschätzte Taille</div><div class="metric-note">Reduktion in 8 Wochen</div></div>
        </div>
      </section>

      <section class="results-section">
        <div class="body-card">
          <div class="body-grid">
            <div class="body-panel">
              <div class="body-figure current">
                <span class="body-badge current">Aktuell</span>
                <span class="body-emoji">${currentEmoji}</span>
              </div>
              <div class="body-kg">${p.currentKg} kg</div>
              <div class="body-fat">Körperfett: ~${p.bodyFatBefore}%</div>
            </div>
            <div class="body-panel">
              <div class="body-figure goal">
                <span class="body-badge goal">Ziel</span>
                <span class="body-emoji">${goalEmoji}</span>
                ${p.lossKg > 0 ? `<span class="body-loss">↓ −${p.lossKg} kg</span>` : ""}
              </div>
              <div class="body-kg">${p.goalKg} kg</div>
              <div class="body-fat">Körperfett: ~${p.bodyFatAfter}%</div>
            </div>
          </div>
        </div>
      </section>

      <section class="results-section">
        <div class="doctor-card">
          <div class="doctor-header">
            <img class="doctor-photo" src="${ASSETS}/doctor-sarah-0SbqD00u.jpg" alt="Dr. Sarah Mitchell" loading="lazy" />
            <div>
              <div class="doctor-name">Dr. Sarah Mitchell, Allgemeinmedizinerin</div>
              <div class="doctor-role">Hausärztin, Berlin</div>
            </div>
          </div>
          <p class="doctor-quote">"Berberin ist einer der am besten erforschten natürlichen Wirkstoffe für den Stoffwechsel. Die transdermale Aufnahme über Pflaster umgeht das Verdauungssystem und ermöglicht eine gleichmäßige Wirkstoffabgabe über den ganzen Tag."</p>
          <div class="doctor-verified">✅ Verifizierte Ärztin • 15+ Jahre Erfahrung</div>
        </div>
      </section>

      <section class="results-section">
        <div class="study-card"><p>Klinische Studien zum Altuva-Pflaster zeigten, dass 8 von 10 Anwendern durchschnittlich 8 kg pro Monat verloren. 99 % der Teilnehmer bestätigten zudem eine deutliche Beschleunigung der Fettverbrennung.</p></div>
      </section>

      <section class="results-section">
        <div class="pricing-card">
          <div class="guarantee-row">🛡️ 60 Tage Geld-zurück-Garantie</div>
          <img class="product-img" src="${ASSETS}/altuva-render-H9K1E0Rh.png" alt="Altuva" loading="lazy" />
          <div class="price-was">49,99 €</div>
          <div class="price-now">29,99 €</div>
          <div class="price-discount">−40% — Nur noch 23 Packungen!</div>
          <button type="button" class="cta-button">🛒 Jetzt bestellen</button>
          <p class="low-stock-sm">Nur noch 23 Packungen!</p>
        </div>
      </section>

      <section class="results-section">
        <div class="reviews-header">
          <h2>⭐ Echte Bewertungen</h2>
          <div class="reviews-score"><strong>4.8</strong><span class="review-stars">★★★★★</span></div>
          <p class="reviews-count">Basierend auf 2,847 Bewertungen</p>
        </div>
        <div class="review-list">
          ${reviews.map((r) => `
            <div class="review-card ${r.isTeam ? "team" : ""}">
              <div class="review-author-row">
                ${r.isTeam
                  ? `<div class="review-avatar team">A</div>`
                  : `<img class="review-avatar" src="${r.avatar}" alt="${r.author}" loading="lazy" />`}
                <span class="review-author">${r.author}${r.reply ? ` → ${r.reply}` : ""}</span>
              </div>
              <p class="review-text">${r.text}</p>
              <div class="review-meta"><span>👍 ${r.likes}</span><span>${r.time}</span></div>
            </div>`).join("")}
        </div>
      </section>

      <section class="final-cta-section">
        <button type="button" class="cta-button">🛒 Sichern Sie sich jetzt 70% Rabatt</button>
        <div class="trust-footer">
          <p class="urgent">⏰ Angebot endet in <span id="offer-timer">14:59</span> — nur 23 Packungen übrig</p>
          <p>🔒 Ihre Daten sind 100% sicher und werden nicht weitergegeben.</p>
          <p>📦 Diskrete Verpackung • 60 Tage Geld-zurück-Garantie</p>
        </div>
      </section>

      <p class="legal-footer">Ergebnisse können variieren. Dieses Produkt dient nicht der Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten.</p>
      <div class="expert-footer"><span class="shield">🛡️</span>EMPFOHLEN VON FÜHRENDEN GESUNDHEITSEXPERTEN WELTWEIT</div>
      <p class="copyright">© 2026 Altuva. Alle Rechte vorbehalten.</p>
    </div>`;

  startResultsTimer();
  window.scrollTo(0, 0);
}

function goToStep(step) {
  if (step < 1) return;
  if (step === "results") {
    state.step = "results";
    setQueryParam("results");
    showResults();
    return;
  }
  if (step > TOTAL_STEPS) {
    goToStep("results");
    return;
  }
  if (state.resultsTimer) {
    clearInterval(state.resultsTimer);
    state.resultsTimer = null;
  }
  state.step = step;
  setQueryParam(step);
  renderStep();
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", (e) => {
  const param = e.state?.step ?? getQueryParam();
  if (param === "results") {
    state.step = "results";
    showResults();
  } else {
    state.step = param;
    renderStep();
  }
});

const initial = getQueryParam();
state.step = initial;
history.replaceState({ step: initial }, "", window.location.href);
renderStep();
