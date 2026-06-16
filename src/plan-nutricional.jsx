import { useState } from "react";

// ---- Core numbers ----
const BASE = { kcal: 1770, protein: 198, fat: 64, carbs: 89 };
const TARGET = { kcal: 2480, protein: 219, fat: 80, carbs: 220 };
const TARGET_LENT = { kcal: 2465, protein: 197, fat: 75, carbs: 255 };

const metrics = [
  { key: "kcal", label: "Calorías", unit: "kcal", base: BASE.kcal, target: TARGET.kcal },
  { key: "protein", label: "Proteína", unit: "g", base: BASE.protein, target: TARGET.protein },
  { key: "fat", label: "Grasa", unit: "g", base: BASE.fat, target: TARGET.fat },
  { key: "carbs", label: "Carbohidratos", unit: "g", base: BASE.carbs, target: TARGET.carbs },
];

const tabs = [
  {
    id: "resumen",
    color: "#f59e0b",
    label: "RESUMEN",
    title: "TU DÍA",
    subtitle: "Objetivo diario — recomposición",
    tag: "META",
    type: "summary",
  },
  {
    id: "desayuno",
    color: "#22c55e",
    label: "AM",
    title: "DESAYUNO",
    subtitle: "Base + energía de arranque",
    tag: "06:00–08:00",
    type: "meal",
    items: [
      { name: "Huevos enteros", portion: "3 unid", note: "Revueltos o cocidos — sin afán, sin aceite extra" },
      { name: "Cuajada", portion: "40 g", note: "Un trozo del tamaño de una caja de fósforos" },
      { name: "Avena en hojuelas (cocida)", portion: "40 g", note: "Cocina con canela — no necesita azúcar" },
      { name: "Banano", portion: "1 unid", note: "Mediano, ~120g — va dentro o al lado de la avena" },
      { name: "Whey Best Elite", portion: "1 scoop", note: "Con agua o leche descremada" },
    ],
    macros: { kcal: 700, p: 59, f: 27, c: 58 },
  },
  {
    id: "almuerzo",
    color: "#eab308",
    label: "MID",
    title: "ALMUERZO",
    subtitle: "Pollo o lentejas + arroz + verde",
    tag: "12:00–15:00",
    type: "meal",
    variantLabel: "5 días/semana — Pollo",
    items: [
      { name: "Pechuga de pollo cocida", portion: "150 g", note: "Plancha, parrilla o sudada — sin frituras" },
      { name: "Arroz blanco cocido", portion: "1.5–2 tazas", note: "Sí, más de lo que comes ahora — esto es la clave" },
      { name: "Verduras cocidas (brócoli + zanahoria)", portion: "1 taza", note: "Al vapor 5-7 min, no las hiervas de más" },
      { name: "Aceite (para cocción)", portion: "1 cdta", note: "" },
      { name: "Whey Best Elite", portion: "1 scoop", note: "🆕 Post-entreno — inmediato al terminar" },
    ],
    macros: { kcal: 830, p: 83, f: 12, c: 91 },
    alt: {
      label: "2 días/semana — Lentejas (ahorra presupuesto de pollo)",
      items: [
        { name: "Lentejas cocidas", portion: "1.5 tazas", note: "Remoja la noche anterior — cocinan más rápido" },
        { name: "Arroz blanco cocido", portion: "1 taza", note: "" },
        { name: "Verduras cocidas", portion: "1 taza", note: "" },
        { name: "Aceite (para cocción)", portion: "1 cdta", note: "" },
        { name: "Whey Best Elite", portion: "1 scoop", note: "Post-entreno" },
      ],
      macros: { kcal: 815, p: 61, f: 7, c: 126 },
    },
  },
  {
    id: "merienda",
    color: "#a855f7",
    label: "SNACK",
    title: "MERIENDA",
    subtitle: "El reemplazo real del mecato",
    tag: "16:00–18:00",
    type: "meal",
    variantLabel: "✅ Tu combo de hoy — perfecto, repítelo",
    items: [
      { name: "Piña en trozos", portion: "1 taza", note: "" },
      { name: "Yogur natural sin azúcar (fresa)", portion: "170 g", note: "" },
      { name: "Arepa de maíz con semillas", portion: "1 unid", note: "" },
    ],
    macros: { kcal: 360, p: 22, f: 6, c: 56 },
    swaps: [
      "Banano + yogur natural + 2 cdas de avena cruda mezclada",
      "Manzana + yogur natural + arepa de maíz",
      "Mango + yogur natural + arepa de maíz",
    ],
  },
  {
    id: "cena",
    color: "#3b82f6",
    label: "PM",
    title: "CENA",
    subtitle: "Como el desayuno, con verde en vez de banano",
    tag: "19:00–21:00",
    type: "meal",
    items: [
      { name: "Huevos enteros", portion: "3 unid", note: "" },
      { name: "Cuajada", portion: "40 g", note: "" },
      { name: "Aguacate", portion: "½ unidad", note: "" },
      { name: "Ensalada (lechuga + tomate + cebolla)", portion: "1 plato", note: "Limón + sal + 1 cdta aceite de oliva — así sí sabe a algo" },
      { name: "Whey Best Elite", portion: "1 scoop", note: "" },
    ],
    macros: { kcal: 590, p: 55, f: 35, c: 15 },
  },
  {
    id: "findesemana",
    color: "#ef4444",
    label: "FINDE",
    title: "FIN DE SEMANA",
    subtitle: "1 comida libre, no 1 día libre",
    tag: "SÁB / DOM",
    type: "guidelines",
    items: [
      "Una sola comida libre por semana — no medio sábado completo de picoteo.",
      "Pide la proteína sola: hamburguesa o pollo sin combo + agua, en vez de combo con papas + gaseosa. Ahí está el 80% de las calorías de más.",
      "Si es pizza: 3-4 porciones + algo de ensalada, no la caja completa solo.",
      "El resto del findesemana sigue el plan normal — el domingo de descanso del gym no es descanso de la comida.",
    ],
  },
  {
    id: "presupuesto",
    color: "#14b8a6",
    label: "$",
    title: "PRESUPUESTO",
    subtitle: "Estimado mensual — Cali, COP",
    tag: "MES",
    type: "budget",
    rows: [
      { item: "Whey Best Elite (3 scoops/día)", cost: "210.000", note: "Ya cubierto — fijo" },
      { item: "Huevos (6/día = 6 panales)", cost: "≈102.000", note: "Bajaste de 8→6 — ahorras ~34k vs antes" },
      { item: "Pollo (5 días/semana)", cost: "45.000", note: "Tu meta — ajusta la porción si rinde menos" },
      { item: "Lentejas (2 días/semana)", cost: "≈12.000", note: "Muy barato, fibra + proteína extra" },
      { item: "Arroz, avena, banano, verduras, arepa, yogur, piña, aguacate", cost: "≈75.000–90.000", note: "Estimado — varía por mercado, pero es lo más barato por caloría" },
    ],
    total: "≈ 445.000 – 460.000 / mes",
    note: "La comida libre del fin de semana es aparte — es lo que ya gastas en mecato, solo que ahora 1x/semana en vez de varias veces.",
  },
];

function MacroChips({ m, color }) {
  const chips = [
    { label: "kcal", val: m.kcal },
    { label: "P", val: m.p },
    { label: "F", val: m.f },
    { label: "C", val: m.c },
  ];
  return (
    <div style={{ display: "flex", gap: "8px", padding: "12px 16px" }}>
      {chips.map((c) => (
        <div key={c.label} style={{
          flex: 1,
          background: "#0d0d0d",
          border: `1px solid ${color}33`,
          borderRadius: "5px",
          padding: "8px 4px",
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{c.val}</div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: color, marginTop: "3px" }}>{c.label}{c.label !== "kcal" ? "g" : ""}</div>
        </div>
      ))}
    </div>
  );
}

export default function PlanNutricional() {
  const [active, setActive] = useState("resumen");
  const tab = tabs.find((t) => t.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Barlow Condensed', sans-serif", color: "#f0f0f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-btn {
          cursor: pointer; padding: 10px 3px; border-bottom: 3px solid transparent;
          transition: all 0.2s ease; text-align: center; flex: 1;
        }
        .tab-btn:hover { background: rgba(255,255,255,0.04); }
        .tab-btn.active { border-bottom-color: var(--accent); background: rgba(255,255,255,0.05); }
        .item-row {
          display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start;
          padding: 13px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .item-row:last-child { border-bottom: none; }
        .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
          animation: pulse 2s infinite; flex-shrink: 0; margin-top: 5px;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.65);} }
        .guideline-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-family:'Barlow',sans-serif; font-size: 13px; color: #aaa; line-height: 1.5; }
        .guideline-row:last-child { border-bottom: none; }
        .badge { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; padding: 2px 8px; border-radius: 2px; }
        .bar-track { background: rgba(255,255,255,0.05); border-radius: 4px; height: 10px; overflow: hidden; display: flex; }
        .budget-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .budget-row:last-child { border-bottom: none; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "24px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#444" }}>PLAN NUTRICIONAL</span>
          <span style={{ color: "#222", fontSize: "10px" }}>·</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#444" }}>88 → 83-84 KG</span>
        </div>
        <h1 style={{ fontSize: "clamp(26px, 7vw, 40px)", fontWeight: 900, letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1, color: "#fff" }}>
          RECOMPOSICIÓN<br />
          <span style={{ color: "#444", fontWeight: 300, fontSize: "0.7em" }}>SIN PASAR HAMBRE</span>
        </h1>
        <div style={{ marginTop: "10px", display: "flex", gap: "14px", flexWrap: "wrap", fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#666" }}>
          <span>~2.480 kcal/día</span><span>·</span><span>~219g proteína</span><span>·</span><span>Whey ya cubierta</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map((t) => (
          <div key={t.id} className={`tab-btn ${active === t.id ? "active" : ""}`} style={{ "--accent": t.color }} onClick={() => setActive(t.id)}>
            <div style={{ fontSize: "11px", fontWeight: active === t.id ? 800 : 500, color: active === t.id ? t.color : "#444" }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Header */}
      <div style={{ background: "#111", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{tab.title}</div>
            <span className="badge" style={{ background: `${tab.color}20`, color: tab.color, border: `1px solid ${tab.color}40`, fontSize: "9px" }}>{tab.tag}</span>
          </div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#555", marginTop: "3px" }}>{tab.subtitle}</div>
        </div>
      </div>

      {/* ===== RESUMEN ===== */}
      {tab.type === "summary" && (
        <>
          <div style={{ margin: "12px", padding: "14px 16px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#444", marginBottom: "12px" }}>LA BRECHA — DE TU BASE ACTUAL AL OBJETIVO</div>
            {metrics.map((m) => {
              const basePct = (m.base / m.target) * 100;
              const gap = m.target - m.base;
              return (
                <div key={m.key} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Barlow', sans-serif", fontSize: "11px", color: "#888", marginBottom: "4px" }}>
                    <span>{m.label}</span>
                    <span><span style={{ color: "#666" }}>{m.base}{m.unit !== "kcal" ? "g" : ""}</span> <span style={{ color: "#f59e0b", fontWeight: 700 }}>+{gap}{m.unit !== "kcal" ? "g" : ""}</span> <span style={{ color: "#fff", fontWeight: 700 }}>→ {m.target}{m.unit !== "kcal" ? "g" : ""}</span></span>
                  </div>
                  <div className="bar-track">
                    <div style={{ width: `${basePct}%`, background: "#3f3f46" }} />
                    <div style={{ width: `${100 - basePct}%`, background: "#f59e0b" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ margin: "12px", padding: "14px 16px", background: "#0d0d0d", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "6px", fontFamily: "'Barlow', sans-serif", fontSize: "13px", color: "#aaa", lineHeight: 1.6 }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#f59e0b", marginBottom: "8px" }}>💡 EL INSIGHT</div>
            Tu base limpia actual (huevos + pollo + arroz + whey, sin mecato) ya te da <strong style={{ color: "#fff" }}>~198g de proteína</strong> — eso está resuelto. Pero solo llega a <strong style={{ color: "#fff" }}>~1.770 kcal</strong>, muy por debajo de lo que necesitas entrenando 5 días/semana.
            <br /><br />
            Esa brecha de <strong style={{ color: "#f59e0b" }}>~710 kcal</strong> — sobre todo carbohidratos — la está llenando la comida chatarra, pero de forma descontrolada (un combo puede ser 1.000-1.500 kcal de una sola vez). Si llenas esa brecha con arroz, avena, banano, lentejas y verduras — lo más barato del mercado — el antojo bajo solo, porque ya no pasas el día corriendo en déficit.
          </div>

          <div style={{ margin: "12px", padding: "14px 16px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#444", marginBottom: "10px" }}>TOTAL DIARIO CON EL PLAN</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "5px", padding: "10px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#eab308", marginBottom: "6px" }}>DÍA CON POLLO (×5)</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#999", lineHeight: 1.6 }}>
                  2.480 kcal<br />219g P · 80g F · 220g C
                </div>
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "5px", padding: "10px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#a855f7", marginBottom: "6px" }}>DÍA CON LENTEJAS (×2)</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#999", lineHeight: 1.6 }}>
                  2.465 kcal<br />197g P · 75g F · 255g C
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== MEAL TABS ===== */}
      {tab.type === "meal" && (
        <>
          {tab.variantLabel && (
            <div style={{ padding: "10px 16px 0", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: tab.color }}>{tab.variantLabel}</div>
          )}
          <div style={{ background: "#0f0f0f", margin: "8px 12px 0", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden" }}>
            {tab.items.map((it, i) => (
              <div key={i} className="item-row">
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#e8e8e8", lineHeight: 1.3 }}>{it.name}</div>
                  {it.note && <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#555", marginTop: "3px", lineHeight: 1.4 }}>{it.note}</div>}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: tab.color, whiteSpace: "nowrap" }}>{it.portion}</div>
              </div>
            ))}
            <MacroChips m={tab.macros} color={tab.color} />
          </div>

          {tab.alt && (
            <>
              <div style={{ padding: "14px 16px 0", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#a855f7" }}>{tab.alt.label}</div>
              <div style={{ background: "#0f0f0f", margin: "8px 12px 0", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden" }}>
                {tab.alt.items.map((it, i) => (
                  <div key={i} className="item-row">
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#e8e8e8", lineHeight: 1.3 }}>{it.name}</div>
                      {it.note && <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#555", marginTop: "3px", lineHeight: 1.4 }}>{it.note}</div>}
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#a855f7", whiteSpace: "nowrap" }}>{it.portion}</div>
                  </div>
                ))}
                <MacroChips m={tab.alt.macros} color="#a855f7" />
              </div>
            </>
          )}

          {tab.swaps && (
            <div style={{ margin: "12px", padding: "12px 16px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#444", marginBottom: "8px" }}>OTRAS COMBINACIONES — MISMA IDEA</div>
              {tab.swaps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: i < tab.swaps.length - 1 ? "8px" : 0 }}>
                  <span style={{ color: tab.color, fontSize: "13px" }}>•</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "13px", color: "#999", lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== GUIDELINES (FIN DE SEMANA) ===== */}
      {tab.type === "guidelines" && (
        <div style={{ background: "#0f0f0f", margin: "12px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden" }}>
          {tab.items.map((g, i) => (
            <div key={i} className="guideline-row">
              <div className="pulse-dot" style={{ "--accent": tab.color }} />
              <span>{g}</span>
            </div>
          ))}
        </div>
      )}

      {/* ===== BUDGET ===== */}
      {tab.type === "budget" && (
        <>
          <div style={{ background: "#0f0f0f", margin: "12px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden" }}>
            {tab.rows.map((r, i) => (
              <div key={i} className="budget-row">
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "13px", color: "#ddd", lineHeight: 1.4 }}>{r.item}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "11px", color: "#555", marginTop: "2px" }}>{r.note}</div>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: tab.color, whiteSpace: "nowrap" }}>{r.cost}</div>
              </div>
            ))}
          </div>
          <div style={{ margin: "12px", padding: "14px 16px", background: `${tab.color}12`, border: `1px solid ${tab.color}30`, borderRadius: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", color: "#999" }}>TOTAL ESTIMADO / MES</span>
              <span style={{ fontSize: "18px", fontWeight: 900, color: tab.color }}>{tab.total}</span>
            </div>
          </div>
          <div style={{ margin: "12px", padding: "12px 16px", fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#666", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {tab.note}
          </div>
        </>
      )}

      <div style={{ padding: "16px 20px 32px", fontFamily: "'Barlow', sans-serif", fontSize: "11px", color: "#282828", textAlign: "center", letterSpacing: "0.05em" }}>
        3 huevos/comida (no 4) · arroz al ojo, no romano · ensalada simple &gt; ensalada sofisticada que no haces
      </div>
    </div>
  );
}
