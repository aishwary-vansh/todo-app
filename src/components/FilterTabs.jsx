// ─────────────────────────────────────────────
//  Component: FilterTabs
//  Switches between All / Active / Done views
// ─────────────────────────────────────────────

import { C } from "../constants/colors";

const TABS = [
  { label:"All",    bg: C.cream, border: C.creamDark, activeBg: C.creamDark },
  { label:"Active", bg: C.peach, border: C.peachDark, activeBg: C.peachDark },
  { label:"Done",   bg: C.sage,  border: C.sageDark,  activeBg: C.sageDark  },
];

export default function FilterTabs({ filter, counts, onChange }) {
  return (
    <div style={{ display:"flex", gap:8, marginBottom:"1.25rem" }}>
      {TABS.map((tab) => {
        const active = filter === tab.label;
        return (
          <button
            key={tab.label}
            className="filter-btn"
            onClick={() => onChange(tab.label)}
            style={{
              background:    active ? tab.activeBg : tab.bg,
              border:        `1.5px solid ${tab.border}`,
              borderRadius:  99,
              padding:       "6px 16px",
              fontSize:      13,
              fontFamily:    "'DM Mono', monospace",
              fontWeight:    active ? 500 : 400,
              color:         C.ink,
              cursor:        "pointer",
              boxShadow:     active ? "0 2px 8px rgba(124,74,45,0.15)" : "none",
              transition:    "all 0.15s",
            }}
          >
            {tab.label}{" "}
            <span style={{ opacity:0.6 }}>({counts[tab.label]})</span>
          </button>
        );
      })}
    </div>
  );
}
