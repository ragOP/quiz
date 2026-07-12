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

const LOGO_SVG = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%202048%20505.76'%3e%3cpath%20d='M188.21,42.4h104.2l169.42,439.38h-96.54l-31.33-85.33h-189.87l-30.69,85.33H18.15L188.21,42.4ZM303.93,315.59l-64.57-176.39-65.21,176.39h129.78Z'/%3e%3cpath%20d='M458.63,415.56c21.1-8.91,40.92-19.74,58.81-33.12-33.88-49.67-53.06-115.89-53.06-190.4,0-113.35,51.15-176.39,127.86-176.39s121.47,57.31,121.47,155.38c0,76.41-28.77,151.55-78.63,210.14,20.46,13.37,43.48,20.38,69.05,20.38h19.82v80.23h-24.29c-49.23,0-92.7-15.29-128.51-42.03-24.29,17.19-51.14,31.84-80.55,42.03l-31.97-66.22ZM580.11,318.77c30.68-43.3,47.94-94.24,47.94-147.73,0-49.04-14.06-75.15-37.08-75.15-24.93,0-40.92,28.66-40.92,90.42,0,50.31,10.87,96.16,30.05,132.45Z'/%3e%3cpath%20d='M787.22,379.27v-146.46h-51.78v-75.78h29.41c17.26,0,26.85-8.91,26.85-26.11v-60.49h78.64v86.6h75.44v75.78h-75.44v132.45c0,25.47,15.98,40.75,42.83,40.75h32.61v75.78h-44.75c-74.8,0-113.8-35.66-113.8-102.52Z'/%3e%3cpath%20d='M983.47,365.26v-208.23h83.12v184.03c0,41.39,26.85,68.14,67.12,68.14,42.84,0,71.61-27.38,71.61-69.41v-182.75h83.11v217.14c0,17.19,10.22,27.38,27.49,27.38h6.39v80.23h-23.66c-43.47,0-72.24-15.29-85.66-45.21-24.94,34.38-61.37,52.85-106.77,52.85-73.52,0-122.75-49.03-122.75-124.17Z'/%3e%3cpath%20d='M1312.71,157.03h94.62l84.39,222.24,40.28-100.61c17.9-49.03,25.57-87.88,18.54-121.63h85.03c7.67,36.94,0,82.78-23.66,138.82l-78,185.94h-86.31l-134.9-324.76Z'/%3e%3cpath%20d='M1647.7,319.41c0-96.8,68.41-170.03,159.19-170.03,43.48,0,79.92,17.2,106.13,45.85v-38.2h83.11v217.14c0,17.19,9.6,27.38,27.49,27.38h6.4v80.23h-23.66c-44.75,0-73.52-15.92-86.31-47.13-26.22,33.75-65.85,54.76-113.16,54.76-90.78,0-159.19-73.23-159.19-170.02ZM1913.02,319.41c0-50.95-38.36-89.79-90.14-89.79s-89.51,38.84-89.51,89.79,38.36,89.79,89.51,89.79,90.14-38.84,90.14-89.79Z'/%3e%3c/svg%3e";

const PACK_IMAGES = [
  `${ASSETS}/altuva-render-H9K1E0Rh.png`,
  "https://assets.nutriveno.com/original/altuva/products/altuva_2_sub_1778550030254.webp",
  "https://assets.nutriveno.com/original/altuva/products/altuva_3_sub_1778550030424.webp",
  "https://assets.nutriveno.com/original/altuva/products/altuva_4_sub_1778550030630.webp",
];

const PRICING = {
  subscribe: [
    { packs: 4, patches: 120, was: 199.96, now: 59.96, perPack: 14.99, discount: 70, popular: true },
    { packs: 3, patches: 90, was: 149.97, now: 53.97, perPack: 17.99, discount: 64 },
    { packs: 2, patches: 60, was: 99.98, now: 49.98, perPack: 24.99, discount: 50 },
    { packs: 1, patches: 30, was: 49.99, now: 29.99, perPack: 29.99, discount: 40 },
  ],
  oneTime: [
    { packs: 4, patches: 120, was: 199.96, now: 99.96, perPack: 24.99, discount: 50, popular: true },
    { packs: 3, patches: 90, was: 149.97, now: 89.97, perPack: 29.99, discount: 40 },
    { packs: 2, patches: 60, was: 99.98, now: 69.98, perPack: 34.99, discount: 30 },
    { packs: 1, patches: 30, was: 49.99, now: 49.99, perPack: 49.99, discount: 0 },
  ],
};

const FUNNEL = {
  headline: "Vergiss den Heißhunger…",
  scratchCta: "HIER KRATZEN",
  discountIntro: "Du erhältst",
  discountPrimary: "50 % RABATT",
  discountSecondary: "+ zusätzliche 10 % Rabatt!",
  claimDiscount: "RABATT SICHERN",
  emailDiscountPrimary: "Hol dir 50 % RABATT",
  emailDiscountSecondary: "+ zusätzliche 10 % Rabatt!",
  stickItForget: "Aufkleben, vergessen, fertig.",
  emailPlaceholder: "Deine E-Mail-Adresse",
  emailButton: "WEITER",
  maybeLater: "Vielleicht später",
  phoneDiscountPrimary: "Du hast zusätzliche 10 % Rabatt",
  phonePlaceholder: "Deine Telefonnummer",
  phoneButton: "WEITER",
  privacyNote: "Mit deiner Eingabe stimmst du Marketing-Nachrichten zu. Zustimmung ist freiwillig und keine Kaufvoraussetzung.",
  finalTitle: "ziel: aktiviert",
  finalBody: "Hier sind zusätzliche 10 % Rabatt auf deine erste Bestellung. Aufkleben, vergessen, fertig.",
  codeLabel: "CODE",
  finalButton: "JETZT PFLASTER SICHERN",
  promoCode: "ALTV10",
};

const state = {
  step: 1,
  answers: {},
  height: 170,
  weight: 80,
  target: 65,
  resultsTimer: null,
  pricingMode: "subscribe",
  pricingPack: 0,
  funnelStep: 0,
  exitShown: false,
  funnelShown: false,
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

function euro(n) {
  return `${n.toFixed(2).replace(".", ",")} €`;
}

function packLabel(n) {
  return n === 1 ? "1 Packung" : `${n} Packungen`;
}

function renderPricingSection() {
  const plans = PRICING[state.pricingMode];
  const selected = state.pricingPack;
  return `
    <section class="results-section" id="pricing-section">
      <h2 class="pricing-heading">Ihre persönliche Produktempfehlung</h2>
      <p class="pricing-sub">Wählen Sie Ihr Paket</p>
      <div class="pricing-mode-toggle">
        <button type="button" class="mode-btn ${state.pricingMode === "subscribe" ? "active" : ""}" data-mode="subscribe">
          <span class="radio-dot"></span> Abonnieren &amp; Sparen
          <span class="save-badge">bis zu 70%</span>
        </button>
        <button type="button" class="mode-btn ${state.pricingMode === "oneTime" ? "active" : ""}" data-mode="oneTime">
          <span class="radio-dot"></span> Einmalig kaufen
        </button>
      </div>
      <div class="pack-grid">
        ${plans.map((plan, i) => `
          <button type="button" class="pack-card ${i === selected ? "selected" : ""}" data-pack="${i}">
            ${plan.popular ? '<span class="pack-popular">AM BELIEBTESTEN</span>' : ""}
            <span class="pack-radio"></span>
            <div class="pack-info">
              <div class="pack-title">${packLabel(plan.packs)}</div>
              <div class="pack-patches">${plan.patches} Pflaster</div>
              <img class="pack-img" src="${PACK_IMAGES[plan.packs - 1] || PACK_IMAGES[0]}" alt="" loading="lazy" />
              <div class="pack-price">${euro(plan.perPack)}</div>
              <div class="pack-per">pro Packung</div>
              ${plan.discount > 0 ? `<span class="pack-discount">−${plan.discount}%</span>` : ""}
              <div class="pack-total">Gesamtpreis: ${plan.was !== plan.now ? `<s>${euro(plan.was)}</s> ` : ""}<strong>${euro(plan.now)}</strong></div>
            </div>
          </button>`).join("")}
      </div>
      <button type="button" class="cta-button cta-order" data-cta="order">🛒 Jetzt bestellen — ${euro(plans[selected].now)}</button>
      <p class="low-stock-sm">Nur noch 23 Packungen!</p>
      <div class="pricing-trust-row">
        <span>🚚 Gratis ab 49,99 €</span>
        <span>🛡️ 60 Tage Rückgabe</span>
        <span>🔒 Sichere Zahlung</span>
      </div>
    </section>`;
}

function bindPricingEvents() {
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.onclick = () => {
      state.pricingMode = btn.dataset.mode;
      state.pricingPack = 0;
      const section = $("pricing-section");
      if (section) {
        section.outerHTML = renderPricingSection();
        bindPricingEvents();
        bindCtaButtons();
      }
    };
  });
  document.querySelectorAll(".pack-card").forEach((card) => {
    card.onclick = () => {
      state.pricingPack = Number(card.dataset.pack);
      document.querySelectorAll(".pack-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      const orderBtn = document.querySelector(".cta-order");
      const plan = PRICING[state.pricingMode][state.pricingPack];
      if (orderBtn) orderBtn.textContent = `🛒 Jetzt bestellen — ${euro(plan.now)}`;
    };
  });
}

function openModal(content) {
  $("modal-root").innerHTML = `<div class="modal-overlay animate-fade-in" id="modal-overlay">
    <div class="modal-card animate-scale-in" id="modal-card">${content}</div>
  </div>`;
  $("modal-overlay").onclick = (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  };
}

function closeModal() {
  const root = $("modal-root");
  if (root) root.innerHTML = "";
}

function openExitModal() {
  if (state.exitShown) return;
  state.exitShown = true;
  openModal(`
    <button type="button" class="modal-close" id="modal-close">✕</button>
    <div class="exit-header">
      <div class="exit-icon">⏰</div>
      <h3>Moment — Ihr persönlicher Plan ist bereit!</h3>
    </div>
    <div class="exit-body">
      <p>Sie haben gerade Ihren <strong class="text-accent">persönlichen Abnehmplan</strong> erhalten. Wirklich zurücklassen?</p>
      <div class="exit-highlight">
        <p>⏰ Dieser Plan ist <strong>nur für kurze Zeit</strong> verfügbar</p>
        <p class="exit-bold">Der Vorrat geht zur Neige!</p>
        <p class="exit-small">Über 76.000 zufriedene Kunden haben nicht gewartet – Sie sollten es auch nicht!</p>
      </div>
      <button type="button" class="cta-button" id="exit-accept">✅ Ja, ich sichere mir meinen Plan!</button>
      <button type="button" class="modal-secondary" id="exit-decline">Nein danke, ich mache so weiter wie bisher</button>
    </div>`);
  $("modal-close").onclick = closeModal;
  $("exit-decline").onclick = closeModal;
  $("exit-accept").onclick = () => { closeModal(); openDiscountFunnel(); };
}

function renderFunnelStep(step) {
  const f = FUNNEL;
  if (step === 0) {
    return `
      <button type="button" class="modal-close" id="modal-close">✕</button>
      <h3 class="funnel-headline">${f.headline}</h3>
      <div class="scratch-wrap" id="scratch-wrap">
        <div class="scratch-reveal">
          <p class="scratch-intro">${f.discountIntro}</p>
          <p class="scratch-primary">${f.discountPrimary}</p>
          <p class="scratch-secondary">${f.discountSecondary}</p>
        </div>
        <canvas class="scratch-canvas" id="scratch-canvas" width="320" height="180"></canvas>
        <p class="scratch-hint" id="scratch-hint">${f.scratchCta}</p>
      </div>`;
  }
  if (step === 1) {
    return `
      <button type="button" class="modal-close" id="modal-close">✕</button>
      <div class="funnel-discount-box">
        <p>${f.discountIntro}</p>
        <p class="scratch-primary">${f.discountPrimary}</p>
        <p class="scratch-secondary">${f.discountSecondary}</p>
      </div>
      <button type="button" class="cta-button" id="funnel-next">${f.claimDiscount}</button>
      <button type="button" class="modal-secondary" id="funnel-later">${f.maybeLater}</button>`;
  }
  if (step === 2) {
    return `
      <button type="button" class="modal-close" id="modal-close">✕</button>
      <p class="funnel-email-title">${f.emailDiscountPrimary}</p>
      <p class="funnel-email-sub">${f.emailDiscountSecondary}</p>
      <p class="funnel-stick">${f.stickItForget}</p>
      <input type="email" class="funnel-input" id="funnel-email" placeholder="${f.emailPlaceholder}" />
      <button type="button" class="cta-button" id="funnel-next">${f.emailButton}</button>
      <button type="button" class="modal-secondary" id="funnel-later">${f.maybeLater}</button>
      <p class="funnel-privacy">${f.privacyNote}</p>`;
  }
  if (step === 3) {
    return `
      <button type="button" class="modal-close" id="modal-close">✕</button>
      <p class="funnel-email-title">${f.phoneDiscountPrimary}</p>
      <input type="tel" class="funnel-input" id="funnel-phone" placeholder="${f.phonePlaceholder}" />
      <button type="button" class="cta-button" id="funnel-next">${f.phoneButton}</button>
      <button type="button" class="modal-secondary" id="funnel-later">${f.maybeLater}</button>
      <p class="funnel-privacy">${f.privacyNote}</p>`;
  }
  return `
    <button type="button" class="modal-close" id="modal-close">✕</button>
    <p class="funnel-final-title">${f.finalTitle}</p>
    <p class="funnel-final-body">${f.finalBody}</p>
    <div class="promo-code"><span>${f.codeLabel}</span><strong>${f.promoCode}</strong></div>
    <button type="button" class="cta-button" id="funnel-next">${f.finalButton}</button>`;
}

function initScratchCanvas() {
  const canvas = $("scratch-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#f2cd6e");
  grad.addColorStop(0.5, "#d5a834");
  grad.addColorStop(1, "#e6bf6b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  for (let i = 0; i < 20; i++) ctx.fillRect(i * 18, 0, 8, h);
  ctx.globalCompositeOperation = "destination-out";
  let scratched = 0;
  const scratch = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    scratched += 1;
    if (scratched > 12) revealScratch();
  };
  const revealScratch = () => {
    canvas.style.opacity = "0";
    $("scratch-hint").style.display = "none";
    setTimeout(() => { state.funnelStep = 1; showFunnelStep(); }, 400);
  };
  canvas.onpointerdown = (e) => {
    const r = canvas.getBoundingClientRect();
    scratch(e.clientX - r.left, e.clientY - r.top);
  };
  canvas.onpointermove = (e) => {
    if (e.buttons) {
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    }
  };
  $("scratch-hint").onclick = revealScratch;
}

function showFunnelStep() {
  openModal(renderFunnelStep(state.funnelStep));
  const close = $("modal-close");
  if (close) close.onclick = closeModal;
  const later = $("funnel-later");
  if (later) later.onclick = closeModal;
  const next = $("funnel-next");
  if (state.funnelStep === 0) {
    setTimeout(initScratchCanvas, 50);
  } else if (next) {
    next.onclick = () => {
      if (state.funnelStep === 2) {
        const email = $("funnel-email")?.value?.trim();
        if (!email || !email.includes("@")) { $("funnel-email")?.focus(); return; }
      }
      if (state.funnelStep === 3) {
        const phone = $("funnel-phone")?.value?.trim();
        if (!phone || phone.length < 6) { $("funnel-phone")?.focus(); return; }
      }
      if (state.funnelStep >= 4) { closeModal(); return; }
      state.funnelStep += 1;
      showFunnelStep();
    };
  }
}

function openDiscountFunnel() {
  state.funnelStep = 0;
  showFunnelStep();
}

function bindCtaButtons() {
  document.querySelectorAll("[data-cta]").forEach((btn) => {
    btn.onclick = () => openDiscountFunnel();
  });
}

function setupExitIntent() {
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && state.step === "results") openExitModal();
  });
}

function initLogo() {
  const img = $("logo-img");
  if (img) {
    img.src = LOGO_SVG;
    img.onload = () => { img.style.display = "block"; document.querySelector(".fallback-logo").style.display = "none"; };
    img.onerror = () => { img.style.display = "none"; };
  }
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
            <div class="urgency-stat"><span class="urgency-icon pulse">🕐</span><span class="urgency-value" id="urgency-timer">14:59</span></div>
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

      ${renderPricingSection()}

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
        <button type="button" class="cta-button" data-cta="final">🛒 Sichern Sie sich jetzt 70% Rabatt</button>
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
  bindPricingEvents();
  bindCtaButtons();
  setupExitIntent();
  if (!state.funnelShown) {
    state.funnelShown = true;
    setTimeout(() => openDiscountFunnel(), 2000);
  }
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
initLogo();
renderStep();
