// ─────────────────────────────────────────────
//  Component: ApiLog
//  Live view of recent API request calls
// ─────────────────────────────────────────────

import { C, METHOD_COLORS } from "../constants/colors";

export default function ApiLog({ entries }) {
  if (!entries.length) return null;

  return (
    <div style={{
      border:       `1.5px solid ${C.creamDark}`,
      borderRadius: 14,
      overflow:     "hidden",
      background:   "#fffdf9",
    }}>
      {/* Header */}
      <div style={{
        padding:       "8px 14px",
        background:    C.sage,
        borderBottom:  `1.5px solid ${C.sageDark}`,
        display:       "flex",
        alignItems:    "center",
        gap:           8,
      }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background: C.brown }} />
        <p style={{ margin:0, fontSize:11, fontFamily:"'DM Mono', monospace", fontWeight:500, color: C.inkMid, letterSpacing:"0.08em", textTransform:"uppercase" }}>
          API Request Log
        </p>
      </div>

      {/* Entries */}
      <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:5 }}>
        {entries.map((e, i) => {
          const methodColor = METHOD_COLORS[e.method] || C.brown;
          const statusColor = e.status >= 400 ? "#A32D2D" : "#3B6D11";
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"'DM Mono', monospace", fontSize:12 }}>
              <span style={{ color: C.inkLight, minWidth:70 }}>{e.time}</span>
              <span style={{
                fontWeight:   500,
                color:        methodColor,
                background:   `${methodColor}18`,
                padding:      "1px 6px",
                borderRadius: 4,
                minWidth:     50,
                textAlign:    "center",
              }}>
                {e.method}
              </span>
              <span style={{ color: C.ink, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {e.endpoint}
              </span>
              <span style={{ fontWeight:700, color: statusColor }}>{e.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
