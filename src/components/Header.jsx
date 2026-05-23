// ─────────────────────────────────────────────
//  Component: Header
//  Displays title, progress bar, and stat pills
// ─────────────────────────────────────────────

import { C } from "../constants/colors";

export default function Header({ counts }) {
  const total = counts.All;
  const pct   = total ? Math.round((counts.Done / total) * 100) : 0;

  return (
    <div style={{
      background:    C.peach,
      borderBottom:  `2px solid ${C.peachDark}`,
      padding:       "2rem 2rem 1.5rem",
      position:      "relative",
      overflow:      "hidden",
    }}>
      {/* Decorative circles */}
      <div style={{ position:"absolute", right:-40,  top:-40,   width:160, height:160, borderRadius:"50%", background: C.peachDark, opacity:0.35 }} />
      <div style={{ position:"absolute", right:60,   bottom:-60, width:200, height:200, borderRadius:"50%", background: C.creamDark, opacity:0.4  }} />

      <div style={{ position:"relative", maxWidth:640, margin:"0 auto" }}>

        {/* Title row */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
          <div style={{
            width:44, height:44, borderRadius:12,
            background: C.brown,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22,
          }}>✎</div>
          <div>
            <p style={{ margin:0, fontSize:11, fontFamily:"'DM Mono', monospace", letterSpacing:"0.12em", color: C.brownMid, textTransform:"uppercase" }}>
              Full-Stack · REST API · Persistent DB
            </p>
            <h1 style={{ margin:0, fontSize:34, fontFamily:"'Playfair Display', serif", fontWeight:900, color: C.ink, letterSpacing:"-0.5px", lineHeight:1.1 }}>
              My Task Board
            </h1>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:12, fontFamily:"'DM Mono', monospace", color: C.brownMid }}>
              {counts.Done} of {total} done
            </span>
            <span style={{ fontSize:12, fontFamily:"'DM Mono', monospace", fontWeight:500, color: C.brown }}>
              {pct}%
            </span>
          </div>
          <div style={{ height:8, borderRadius:99, background: C.peachDark, overflow:"hidden" }}>
            <div style={{
              height:"100%", borderRadius:99,
              background: `linear-gradient(90deg, ${C.brown}, ${C.brownLight})`,
              width:`${pct}%`, transition:"width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Stat pills */}
        <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
          {[
            { label:"Total",  val: counts.All,    bg: C.cream, bd: C.creamDark },
            { label:"Active", val: counts.Active,  bg: C.peach, bd: C.peachDark },
            { label:"Done",   val: counts.Done,    bg: C.sage,  bd: C.sageDark  },
          ].map((s) => (
            <div key={s.label} style={{
              background: s.bg, border:`1.5px solid ${s.bd}`,
              borderRadius:99, padding:"3px 12px",
              display:"flex", alignItems:"center", gap:6,
            }}>
              <span style={{ fontSize:16, fontWeight:700, color: C.ink, fontFamily:"'Playfair Display', serif" }}>{s.val}</span>
              <span style={{ fontSize:11, color: C.inkMid, fontFamily:"'DM Mono', monospace" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
