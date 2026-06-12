import { useState } from "react";

const days = [
  {
    id: "lunes",
    color: "#22c55e",
    label: "LUN",
    title: "UPPER A",
    subtitle: "Fuerza + Brazos Pesado",
    tag: "UPPER",
    exercises: [
      { num: "01", name: "Press Inclinado con Mancuernas", sets: "4", reps: "6–8", note: "Target: 30kg — foco en el pecho alto", section: "PECHO" },
      { num: "02", name: "Press Banca Plano (Mancuernas)", sets: "3", reps: "8–10", note: "Control en la bajada, 2 segundos", section: "PECHO" },
      { num: "03", name: "Remo con Barra 45°", sets: "4", reps: "6–8", note: "Espalda de gorila — codos pegados, espalda baja neutral", section: "ESPALDA" },
      { num: "04", name: "Jalón al Pecho Agarre Abierto", sets: "3", reps: "10–12", note: "Pecho hacia la barra, no cabeza hacia abajo", section: "ESPALDA" },
      { num: "05", name: "Press Militar con Mancuernas", sets: "3", reps: "8–10", note: "Core apretado, sin arquear lumbar", section: "HOMBRO" },
      { num: "06", name: "Elevaciones Laterales (Polea o Mancuerna)", sets: "3", reps: "12–15", note: "Ligero — activación deltoides medial. Frecuencia 2 para anchura de hombros", section: "HOMBRO" },
      { num: "07", name: "Curl Barra Z", sets: "4", reps: "8–10", note: "Codos fijos, no balancees el torso — 2 RIR", section: "BRAZOS" },
      { num: "08", name: "Curl Martillo (Mancuernas)", sets: "3", reps: "10–12", note: "Pulgar arriba — braquial + braquiorradial — grosor y altura al bícep", section: "BRAZOS" },
      { num: "09", name: "Extensiones Tríceps en Polea (Cuerda)", sets: "4", reps: "12–15", note: "Abre la cuerda al final — cabeza lateral del tríceps", section: "BRAZOS" },
      { num: "10", name: "Fondos en Máquina Asistida", sets: "3", reps: "10–12", note: "Codos pegados al cuerpo — 2 RIR, no al fallo", section: "BRAZOS" },
    ],
    additions: [
      { icon: "🔄", text: "Calentamiento: Band Pull-Aparts o Rotación Externa en polea — 2×15 (manguito rotador)" },
      { icon: "🚶", text: "Cardio final: Caminata inclinada 10–15 min" },
    ],
  },
  {
    id: "miercoles",
    color: "#3b82f6",
    label: "MIÉ",
    title: "LOWER A",
    subtitle: "Isquios & Cadena Posterior",
    tag: "LOWER",
    exercises: [
      { num: "01", name: "Peso Muerto Rumano", sets: "4", reps: "8–10", note: "Foco en el estiramiento del femoral — barra cerca del cuerpo", section: "PIERNA" },
      { num: "02", name: "Prensa 45° (Pies altos y separados)", sets: "4", reps: "10–12", note: "Rango completo, no bloquear la rodilla arriba", section: "PIERNA" },
      { num: "03", name: "Curl Femoral Acostado", sets: "4", reps: "12–15", note: "Pausa de 1 segundo en la contracción", section: "PIERNA" },
      { num: "04", name: "Gemelos Parado (Smith o Máquina)", sets: "4", reps: "15", note: "Rango completo — estiramiento abajo, pausa arriba", section: "PIERNA" },
      { num: "05", name: "Aductores en Máquina", sets: "3", reps: "15", note: "Movimiento controlado, no rebote", section: "PIERNA" },
    ],
    additions: [
      { icon: "💪", text: "Core: Plancha 3×45 seg + Hollow Body o Crunch en cable 3×12" },
      { icon: "🔥", text: "Cardio: Caminata inclinada 30 min (pendiente alta, paso firme)" },
    ],
  },
  {
    id: "jueves",
    color: "#eab308",
    label: "JUE",
    title: "UPPER B",
    subtitle: "Hipertrofia + Brazos Detalle",
    tag: "UPPER",
    exercises: [
      { num: "01", name: "Press Inclinado en Máquina / Smith", sets: "4", reps: "10–12", note: "Contracción en el tope — no bloquear codos", section: "PECHO" },
      { num: "02", name: "Aperturas en Pec Deck", sets: "3", reps: "15", note: "Sostén 1 segundo al cerrar — siente el pecho, no el hombro", section: "PECHO" },
      { num: "03", name: "Face Pulls (Polea Alta)", sets: "3", reps: "15", note: "Rear delt + salud del hombro — codos al nivel de los hombros o más arriba", section: "HOMBRO" },
      { num: "04", name: "Remo con Mancuerna Unilateral", sets: "4", reps: "10–12 c/lado", note: "Reemplaza Remo Gironda — mejor rango, más carga, densidad espalda media", section: "ESPALDA" },
      { num: "05", name: "Jalón Agarre Cerrado (Triángulo)", sets: "3", reps: "12–15", note: "Codos apuntan al suelo al final — tirón vertical, complementa el remo", section: "ESPALDA" },
      { num: "06", name: "Elevaciones Laterales (Polea o Mancuerna)", sets: "4", reps: "12–15", note: "Peso que cueste las últimas 3 reps — construye anchura de hombros", section: "HOMBRO" },
      { num: "07", name: "Curl Predicador", sets: "4", reps: "10–12", note: "Aísla el bícep completamente — baja lento 3 seg, aprieta arriba", section: "BRAZOS" },
      { num: "08", name: "Curl Concentrado (Mancuerna)", sets: "3", reps: "12–15", note: "Máximo pico del bícep — codo apoyado en rodilla, gira la muñeca al subir", section: "BRAZOS" },
      { num: "09", name: "Extensiones Tríceps sobre Cabeza (Copa)", sets: "4", reps: "12–15", note: "Cabeza larga del tríceps — lo que da volumen al brazo de perfil", section: "BRAZOS" },
      { num: "10", name: "Reverse Curl en Polea (Barra recta)", sets: "3", reps: "12–15", note: "Agarre prono en polea — braquiorradial y antebrazo externo", section: "BRAZOS" },
    ],
    additions: [
      { icon: "🔄", text: "Calentamiento: Band Pull-Aparts o Rotación Externa en polea — 2×15 (manguito rotador)" },
      { icon: "🚶", text: "Cardio final: Caminata inclinada 10–15 min" },
    ],
  },
  {
    id: "viernes",
    color: "#ef4444",
    label: "VIE",
    title: "LOWER B",
    subtitle: "Cuádriceps & Anterior",
    tag: "LOWER",
    exercises: [
      { num: "01", name: "Sentadilla Hack", sets: "4", reps: "8–10", note: "Pesado, abajo rompiendo los 90° — rodillas siguen los pies", section: "PIERNA" },
      { num: "02", name: "Zancadas con Mancuernas", sets: "3", reps: "12 por pierna", note: "Paso largo, rodilla trasera casi al suelo", section: "PIERNA" },
      { num: "03", name: "Hip Thrust", sets: "3", reps: "10–12", note: "Target: 60kg — aprieta glúteo en el tope 1 segundo", section: "PIERNA" },
      { num: "04", name: "Extensión de Cuádriceps", sets: "3", reps: "15 + Drop Set", note: "Drop set solo en la última serie — pausa 1 seg en extensión", section: "PIERNA" },
      { num: "05", name: "Gemelos Sentado", sets: "4", reps: "20", note: "Rango completo — este músculo vive en el volumen alto", section: "PIERNA" },
    ],
    additions: [
      { icon: "💪", text: "Core: Plancha 3×45 seg + Crunch en cable 3×12" },
      { icon: "🔥", text: "Cardio: Caminata inclinada 30–45 min" },
    ],
  },
  {
    id: "sabado",
    color: "#a855f7",
    label: "SÁB",
    title: "METABÓLICO",
    subtitle: "Quema de Grasa & Resistencia",
    tag: "FAT BURN",
    exercises: [
      { num: "01", name: "Circuito A — Kettlebell Swing", sets: "4", reps: "20", note: "Explosivo desde la cadera — no es una sentadilla, es una bisagra", section: "CIRCUITO A" },
      { num: "02", name: "Circuito A — Remo en Máquina (Ergómetro)", sets: "4", reps: "250m sprint", note: "Máxima potencia — descansa 60 seg entre rondas del circuito", section: "CIRCUITO A" },
      { num: "03", name: "Circuito B — Battle Ropes", sets: "3", reps: "30 seg", note: "Ondas alternadas — codos semiflexionados, core apretado", section: "CIRCUITO B" },
      { num: "04", name: "Circuito B — Box Step-Up con Mancuernas", sets: "3", reps: "12 por pierna", note: "Rodilla al 90° en el cajón — controla la bajada", section: "CIRCUITO B" },
      { num: "05", name: "Circuito B — Press de Hombro Funcional", sets: "3", reps: "15", note: "Tempo controlado — no es fuerza, es resistencia muscular", section: "CIRCUITO B" },
      { num: "06", name: "Farmer's Walk (Caminata del Granjero)", sets: "4", reps: "30m", note: "Peso que te obligue a mantener postura — hombros atrás, core duro", section: "FINISHER" },
    ],
    additions: [
      { icon: "🔥", text: "LISS final: Caminata inclinada o bicicleta estática 30–40 min a ritmo conversacional (zona 2)" },
      { icon: "💧", text: "Si VIE fue muy pesado: omite el circuito y haz solo LISS 45–60 min. Escucha el cuerpo." },
      { icon: "⏱️", text: "Estructura: Circuito A (4 rondas) → 3 min descanso → Circuito B (3 rondas) → Farmer's Walk → LISS" },
    ],
  },
];

const UPPER_LOWER_COLOR = { "UPPER": "#f59e0b", "LOWER": "#60a5fa", "FAT BURN": "#a855f7" };

export default function GymRoutine() {
  const [active, setActive] = useState("lunes");
  const day = days.find((d) => d.id === active);

  const renderExercises = () => {
    let lastSection = null;
    return day.exercises.map((ex) => {
      const isArms = ex.section === "BRAZOS";
      const showDivider = isArms && lastSection !== "BRAZOS";
      lastSection = ex.section;
      return (
        <div key={ex.num}>
          {showDivider && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px 6px",
              background: "#0a0a0a",
            }}>
              <div style={{ flex: 1, height: "1px", background: "#f9741330" }} />
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "#f97316",
              }}>── BLOQUE BRAZOS ──</div>
              <div style={{ flex: 1, height: "1px", background: "#f9741330" }} />
            </div>
          )}
          <div className="exercise-row">
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "18px",
              fontWeight: 900,
              color: isArms ? "#f97316" : day.color,
              opacity: 0.85,
              lineHeight: 1.2,
            }}>{ex.num}</div>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#e8e8e8",
                lineHeight: 1.2,
              }}>{ex.name}</div>
              {ex.note && (
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "12px",
                  color: "#505050",
                  marginTop: "3px",
                  lineHeight: 1.4,
                }}>{ex.note}</div>
              )}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "16px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}>{ex.sets}<span style={{ color: "#333", fontSize: "11px", fontWeight: 400 }}> ×</span></div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: isArms ? "#f97316" : day.color,
                marginTop: "2px",
              }}>{ex.reps}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  // Frequency coverage summary per muscle
  const coverage = [
    { muscle: "Pecho", days: "LUN · JUE", freq: 2 },
    { muscle: "Espalda", days: "LUN · JUE", freq: 2 },
    { muscle: "Hombro", days: "LUN · JUE", freq: 2 },
    { muscle: "Bíceps", days: "LUN · JUE", freq: 2 },
    { muscle: "Tríceps", days: "LUN · JUE", freq: 2 },
    { muscle: "Cuádriceps", days: "MIÉ · VIE", freq: 2 },
    { muscle: "Isquios", days: "MIÉ · VIE", freq: 2 },
    { muscle: "Antebrazos", days: "JUE · SÁB", freq: 2 },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Barlow Condensed', sans-serif",
      color: "#f0f0f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .day-tab {
          cursor: pointer;
          padding: 12px 4px;
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          text-align: center;
          flex: 1;
        }
        .day-tab:hover { background: rgba(255,255,255,0.04); }
        .day-tab.active { border-bottom-color: var(--accent); background: rgba(255,255,255,0.05); }
        .exercise-row {
          display: grid;
          grid-template-columns: 36px 1fr auto;
          gap: 12px;
          align-items: start;
          padding: 13px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .exercise-row:hover { background: rgba(255,255,255,0.025); }
        .addition-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: #999;
        }
        .pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s infinite;
          flex-shrink: 0;
          margin-top: 5px;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.65); }
        }
        .badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 2px 8px;
          border-radius: 2px;
        }
        .freq-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
        }
        .freq-row:last-child { border-bottom: none; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "24px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#444" }}>UPPER / LOWER</span>
          <span style={{ color: "#222", fontSize: "10px" }}>·</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#444" }}>5 DÍAS / SEMANA</span>
          <span style={{ color: "#222", fontSize: "10px" }}>·</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#444" }}>MÁX 3H</span>
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(26px, 7vw, 40px)", fontWeight: 900, letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1, color: "#fff" }}>
          KILLMONGER<br />
          <span style={{ color: "#444", fontWeight: 300, fontSize: "0.7em" }}>PHYSIQUE PROGRAM v2</span>
        </h1>
        <div style={{ marginTop: "10px", display: "flex", gap: "14px", fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#666" }}>
          <span>183 cm · 88 kg</span>
          <span>·</span>
          <span>Recomposición + Volumen</span>
          <span>·</span>
          <span>~175g proteína/día ✓</span>
        </div>
      </div>

      {/* Day Tabs */}
      <div style={{ display: "flex", background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {days.map((d) => (
          <div key={d.id} className={`day-tab ${active === d.id ? "active" : ""}`} style={{ "--accent": d.color }} onClick={() => setActive(d.id)}>
            <div style={{ fontSize: "12px", fontWeight: active === d.id ? 800 : 500, color: active === d.id ? d.color : "#444", transition: "color 0.2s" }}>{d.label}</div>
            <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.08em", color: active === d.id ? "#777" : "#2a2a2a", marginTop: "3px" }}>{d.title}</div>
          </div>
        ))}
      </div>

      {/* Day Header */}
      <div style={{ background: "#111", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{day.title}</div>
            <span className="badge" style={{ background: `${day.color}20`, color: day.color, border: `1px solid ${day.color}40`, fontSize: "9px" }}>{day.tag}</span>
          </div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "#555", marginTop: "3px" }}>{day.subtitle}</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", color: "#333", textAlign: "right" }}>
          <div>{day.exercises.length} ejercicios</div>
          <div style={{ color: "#2a2a2a", fontSize: "10px" }}>+ protocolo</div>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ background: "#0f0f0f" }}>{renderExercises()}</div>

      {/* Additions */}
      {day.additions.length > 0 && (
        <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", margin: "12px", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ padding: "7px 16px", background: "rgba(255,255,255,0.015)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#333", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>PROTOCOLO ADICIONAL</div>
          {day.additions.map((a, i) => (
            <div key={i} className="addition-row">
              <div className="pulse-dot" style={{ "--accent": day.color }} />
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Frequency Coverage */}
      <div style={{ margin: "12px", padding: "14px 16px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "5px" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#333", marginBottom: "10px" }}>FRECUENCIA POR GRUPO MUSCULAR</div>
        {coverage.map((c) => (
          <div key={c.muscle} className="freq-row">
            <span style={{ color: "#666", fontWeight: 500 }}>{c.muscle}</span>
            <span style={{ color: "#333", fontSize: "11px" }}>{c.days}</span>
            <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "11px", letterSpacing: "0.05em" }}>×{c.freq}</span>
          </div>
        ))}
      </div>

      {/* Weekly Nav */}
      <div style={{ margin: "12px", padding: "14px 16px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "5px" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#333", marginBottom: "10px" }}>SEMANA</div>
        <div style={{ display: "flex", gap: "5px" }}>
          {days.map((d) => (
            <div key={d.id} onClick={() => setActive(d.id)} style={{
              flex: 1, padding: "8px 3px", borderRadius: "4px",
              background: active === d.id ? `${d.color}18` : "rgba(255,255,255,0.02)",
              border: `1px solid ${active === d.id ? d.color + "40" : "rgba(255,255,255,0.04)"}`,
              cursor: "pointer", textAlign: "center", transition: "all 0.2s",
            }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 800, color: active === d.id ? d.color : "#444" }}>{d.label}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "7px", fontWeight: 700, color: active === d.id ? "#666" : "#252525", marginTop: "2px", letterSpacing: "0.05em" }}>{d.title}</div>
            </div>
          ))}
          {["MAR", "DOM"].map((d) => (
            <div key={d} style={{
              flex: 1, padding: "8px 3px", borderRadius: "4px",
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.03)",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 800, color: "#252525" }}>{d}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "7px", color: "#1e1e1e", marginTop: "2px" }}>REST</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 20px 32px", fontFamily: "'Barlow', sans-serif", fontSize: "11px", color: "#282828", textAlign: "center", letterSpacing: "0.05em" }}>
        2 RIR = 2 reps en el tanque · No al fallo en compuestos · Proteína: ~175g/día ✓
      </div>
    </div>
  );
}
