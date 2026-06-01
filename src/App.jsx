import { useState } from "react";

const days = [
  {
    id: "lunes",
    color: "#22c55e",
    label: "LUN",
    title: "TORSO A",
    subtitle: "Fuerza Bruta",
    tag: "FUERZA",
    exercises: [
      { num: "01", name: "Press Inclinado con Mancuernas", sets: "4", reps: "6–8", note: "Target: 30kg — foco en el pecho alto" },
      { num: "02", name: "Press Banca Plano (Mancuernas)", sets: "3", reps: "8–10", note: "Control en la bajada, 2 segundos" },
      { num: "03", name: "Remo con Barra 45°", sets: "4", reps: "6–8", note: "Espalda de gorila — codos pegados al cuerpo" },
      { num: "04", name: "Jalón al Pecho Agarre Abierto", sets: "3", reps: "10–12", note: "Pecho hacia la barra, no cabeza hacia abajo" },
      { num: "05", name: "Press Militar con Mancuernas", sets: "3", reps: "8–10", note: "Core apretado, sin arquear lumbar" },
      { num: "06", name: "Brazos — Superserie", sets: "3", reps: "10 + 8–10", note: "Curl barra Z (10 reps) + Fondos máquina asistida — 2 RIR, no al fallo" },
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
    title: "PIERNA A",
    subtitle: "Isquios & Cadena Posterior",
    tag: "POSTERIOR",
    exercises: [
      { num: "01", name: "Peso Muerto Rumano", sets: "4", reps: "8–10", note: "Foco en el estiramiento del femoral — barra cerca del cuerpo" },
      { num: "02", name: "Prensa 45° (Pies altos y separados)", sets: "4", reps: "10–12", note: "Rango completo, no bloquear la rodilla arriba" },
      { num: "03", name: "Curl Femoral Acostado", sets: "4", reps: "12–15", note: "Pausa de 1 segundo en la contracción" },
      { num: "04", name: "Gemelos Parado (Smith o Máquina)", sets: "4", reps: "15", note: "Rango completo — estiramiento abajo, pausa arriba" },
      { num: "05", name: "Aductores en Máquina", sets: "3", reps: "15", note: "Movimiento controlado, no rebote" },
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
    title: "TORSO B",
    subtitle: "Hipertrofia & Detalle",
    tag: "HIPERTROFIA",
    exercises: [
      { num: "01", name: "Press Inclinado en Máquina / Smith", sets: "4", reps: "10–12", note: "Contracción en el tope — no bloquear codos" },
      { num: "02", name: "Aperturas en Pec Deck", sets: "3", reps: "15", note: "Sostén 1 segundo al cerrar — siente el pecho" },
      { num: "03", name: "Face Pulls (Polea Alta)", sets: "3", reps: "15", note: "🆕 AÑADIDO — rear delt + salud del hombro. Codos arriba" },
      { num: "04", name: "Remo Gironda (Polea Baja)", sets: "3", reps: "12", note: "Pecho afuera, codos hacia atrás, no hacia los lados" },
      { num: "05", name: "Jalón Agarre Cerrado (Triángulo)", sets: "3", reps: "12–15", note: "Codos apuntan al suelo al final del recorrido" },
      { num: "06", name: "Elevaciones Laterales (Polea o Mancuerna)", sets: "4", reps: "12–15", note: "Peso que cueste las últimas 3 reps — no reps vacías" },
      { num: "07", name: "Remate de Brazos — Superserie", sets: "3", reps: "12 + 12–15", note: "Curl Predicador (3×12) + Tríceps Copa (4×12–15) — 2 RIR" },
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
    title: "PIERNA B",
    subtitle: "Cuádriceps & Salvación",
    tag: "ANTERIOR",
    exercises: [
      { num: "01", name: "Sentadilla Hack", sets: "4", reps: "8–10", note: "Pesado, abajo, rompiendo los 90° — rodillas siguen los pies" },
      { num: "02", name: "Zancadas con Mancuernas", sets: "3", reps: "12 por pierna", note: "Paso largo, rodilla trasera casi al suelo" },
      { num: "03", name: "Hip Thrust", sets: "3", reps: "10–12", note: "Target: 60kg — aprieta glúteo en el tope 1 segundo" },
      { num: "04", name: "Extensión de Cuádriceps", sets: "3", reps: "15 + Drop Set", note: "Drop set solo en la última serie — pausa 1 seg en extensión" },
      { num: "05", name: "Gemelos Sentado", sets: "4", reps: "20", note: "Rango completo — este músculo vive en el volumen alto" },
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
      { num: "01", name: "Circuito A — Kettlebell Swing", sets: "4", reps: "20", note: "Explosivo desde la cadera — no es una sentadilla, es una bisagra" },
      { num: "02", name: "Circuito A — Remo en Máquina (Ergómetro)", sets: "4", reps: "250m sprint", note: "Máxima potencia — descansa 60 seg entre rondas del circuito" },
      { num: "03", name: "Circuito B — Battle Ropes", sets: "3", reps: "30 seg", note: "Ondas alternadas — codos semiflexionados, core apretado" },
      { num: "04", name: "Circuito B — Box Step-Up con Mancuernas", sets: "3", reps: "12 por pierna", note: "Rodilla al 90° en el cajón — controla la bajada" },
      { num: "05", name: "Circuito B — Press de Hombro en TRX / Máquina Funcional", sets: "3", reps: "15", note: "Tempo controlado — no es fuerza, es resistencia muscular" },
      { num: "06", name: "Farmer's Walk (Caminata del Granjero)", sets: "4", reps: "30m", note: "Peso que te obligue a mantener postura — hombros atrás, core duro" },
    ],
    additions: [
      { icon: "🔥", text: "LISS final: Caminata inclinada o bicicleta estática 30–40 min a ritmo conversacional (zona 2)" },
      { icon: "💧", text: "Hidratación: Este día exige más — mínimo 500ml extra vs días normales" },
      { icon: "⏱️", text: "Estructura: Circuito A (4 rondas) → descanso 3 min → Circuito B (3 rondas) → Farmer's Walk → LISS" },
    ],
  },
];

const tagColors = {
  FUERZA: "#22c55e",
  POSTERIOR: "#3b82f6",
  HIPERTROFIA: "#eab308",
  ANTERIOR: "#ef4444",
};

export default function App() {
  const [active, setActive] = useState("lunes");
  const day = days.find((d) => d.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
      color: "#f0f0f0",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .day-tab {
          cursor: pointer;
          padding: 12px 8px;
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          text-align: center;
          flex: 1;
          letter-spacing: 0.05em;
        }
        .day-tab:hover { background: rgba(255,255,255,0.04); }
        .day-tab.active { border-bottom-color: var(--accent); background: rgba(255,255,255,0.05); }

        .exercise-row {
          display: grid;
          grid-template-columns: 36px 1fr auto;
          gap: 12px;
          align-items: start;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .exercise-row:hover { background: rgba(255,255,255,0.03); }
        .exercise-row:last-child { border-bottom: none; }

        .addition-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: #aaa;
        }

        .badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 2px 7px;
          border-radius: 2px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s infinite;
          flex-shrink: 0;
          margin-top: 5px;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .new-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #22c55e;
          border: 1px solid #22c55e;
          border-radius: 2px;
          padding: 1px 4px;
          margin-left: 6px;
          vertical-align: middle;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 20px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#666",
          }}>PROGRAMA</div>
          <div style={{
            width: "1px", height: "12px",
            background: "#333",
          }} />
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#666",
          }}>4 DÍAS / SEMANA</div>
        </div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(28px, 7vw, 42px)",
          fontWeight: 900,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          lineHeight: 1,
          color: "#fff",
        }}>
          KILLMONGER<br />
          <span style={{ color: "#555", fontWeight: 300 }}>PHYSIQUE PROGRAM</span>
        </h1>
        <div style={{
          marginTop: "12px",
          display: "flex",
          gap: "16px",
          fontFamily: "'Barlow', sans-serif",
          fontSize: "13px",
          color: "#777",
        }}>
          <span>183 cm · 88 kg</span>
          <span>·</span>
          <span>Recomposición + Volumen</span>
        </div>
      </div>

      {/* Day Tabs */}
      <div style={{
        display: "flex",
        background: "#111",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        "--accent": day.color,
      }}>
        {days.map((d) => (
          <div
            key={d.id}
            className={`day-tab ${active === d.id ? "active" : ""}`}
            style={{ "--accent": d.color }}
            onClick={() => setActive(d.id)}
          >
            <div style={{
              fontSize: "13px",
              fontWeight: active === d.id ? 800 : 500,
              letterSpacing: "0.08em",
              color: active === d.id ? d.color : "#555",
              transition: "color 0.2s",
            }}>{d.label}</div>
            <div style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: active === d.id ? "#888" : "#333",
              marginTop: "2px",
            }}>{d.title}</div>
          </div>
        ))}
      </div>

      {/* Day Header */}
      <div style={{
        background: "#111",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "22px",
            fontWeight: 900,
            letterSpacing: "0.05em",
            color: "#fff",
            lineHeight: 1,
          }}>{day.title}</div>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "13px",
            color: "#666",
            marginTop: "2px",
          }}>{day.subtitle}</div>
        </div>
        <div>
          <span
            className="badge"
            style={{
              background: `${day.color}22`,
              color: day.color,
              border: `1px solid ${day.color}44`,
            }}
          >{day.tag}</span>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ background: "#0f0f0f" }}>
        {day.exercises.map((ex) => (
          <div key={ex.num} className="exercise-row">
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "18px",
              fontWeight: 900,
              color: day.color,
              opacity: 0.7,
              lineHeight: 1.2,
            }}>{ex.num}</div>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#e8e8e8",
                lineHeight: 1.2,
              }}>
                {ex.name}
                {ex.note && ex.note.startsWith("🆕") && (
                  <span className="new-badge">NEW</span>
                )}
              </div>
              {ex.note && (
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "12px",
                  color: "#555",
                  marginTop: "3px",
                  lineHeight: 1.4,
                }}>
                  {ex.note.replace("🆕 AÑADIDO — ", "")}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "16px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}>{ex.sets}<span style={{ color: "#444", fontSize: "12px", fontWeight: 400 }}> x</span></div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: day.color,
                marginTop: "2px",
              }}>{ex.reps}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Additions */}
      {day.additions.length > 0 && (
        <div style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.05)",
          margin: "12px",
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "8px 16px",
            background: "rgba(255,255,255,0.02)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#444",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>PROTOCOLO ADICIONAL</div>
          {day.additions.map((a, i) => (
            <div key={i} className="addition-row">
              <div className="pulse-dot" style={{ "--accent": day.color }} />
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Weekly Overview */}
      <div style={{
        margin: "12px",
        padding: "14px 16px",
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "6px",
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#444",
          marginBottom: "10px",
        }}>SEMANA COMPLETA</div>
        <div style={{ display: "flex", gap: "8px" }}>
          {days.map((d) => (
            <div
              key={d.id}
              onClick={() => setActive(d.id)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: "4px",
                background: active === d.id ? `${d.color}18` : "rgba(255,255,255,0.02)",
                border: `1px solid ${active === d.id ? d.color + "44" : "rgba(255,255,255,0.05)"}`,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "13px",
                fontWeight: 800,
                color: active === d.id ? d.color : "#555",
              }}>{d.label}</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: active === d.id ? "#888" : "#333",
                marginTop: "2px",
              }}>{d.subtitle.split(" ")[0].toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: "12px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
          fontFamily: "'Barlow', sans-serif",
          fontSize: "12px",
          color: "#555",
        }}>
          <div>✅ MAR: Descanso activo</div>
          <div>✅ DOM: Recuperación total</div>
          <div>🔄 Manguito: LUN + JUE calentamiento</div>
          <div>💪 Core: MIÉ + VIE al final</div>
          <div>🔥 Fat Burn: SÁB circuito + LISS</div>
          <div>💧 Zona 2: SÁB cardio 30–40 min</div>
        </div>
      </div>

      <div style={{
        padding: "16px 20px 32px",
        fontFamily: "'Barlow', sans-serif",
        fontSize: "11px",
        color: "#333",
        textAlign: "center",
        letterSpacing: "0.05em",
      }}>
        2 RIR = 2 reps en el tanque · No al fallo en ejercicios compuestos
      </div>
    </div>
  );
}
