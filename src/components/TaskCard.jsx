// ─────────────────────────────────────────────
//  Component: TaskCard
//  Single task row — toggle complete / delete
// ─────────────────────────────────────────────

import { useState } from "react";
import { C } from "../constants/colors";
import { formatDate } from "../utils/helpers";

export default function TaskCard({ task, accentBg, onToggle, onDelete, isDeleting }) {
  const [hovDel, setHovDel] = useState(false);

  // Derive accent strip color from the rotating card bg
  const stripColor = accentBg === C.sage
    ? C.sageDark
    : accentBg === C.peach
    ? C.peachDark
    : C.creamDark;

  return (
    <div
      className="task-card"
      style={{
        background:    task.completed ? C.sage : "#fff9f5",
        border:        `1.5px solid ${task.completed ? C.sageDark : C.peachDark}`,
        borderRadius:  16,
        padding:       "1rem 1.25rem",
        opacity:       isDeleting ? 0.4 : 1,
        transition:    "opacity 0.2s",
        position:      "relative",
        overflow:      "hidden",
      }}
    >
      {/* Left accent strip */}
      <div style={{
        position:     "absolute",
        left:0, top:0, bottom:0,
        width:        5,
        background:   task.completed ? C.sageDark : stripColor,
        borderRadius: "16px 0 0 16px",
      }} />

      <div style={{ display:"flex", alignItems:"flex-start", gap:12, paddingLeft:8 }}>

        {/* Checkbox toggle */}
        <button
          onClick={onToggle}
          className="check-btn"
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          style={{
            flexShrink:  0,
            width:       26, height:26,
            borderRadius:"50%",
            marginTop:   1,
            display:     "flex", alignItems:"center", justifyContent:"center",
            background:  task.completed ? C.brown : "transparent",
            border:      `2px solid ${task.completed ? C.brown : C.peachDark}`,
            cursor:      "pointer",
            padding:     0,
            transition:  "all 0.2s",
          }}
        >
          {task.completed && (
            <span style={{ color:"#fff", fontWeight:700, fontSize:13 }}>✓</span>
          )}
        </button>

        {/* Task content */}
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{
            margin:         "0 0 3px",
            fontSize:       16,
            fontFamily:     "'Playfair Display', serif",
            fontWeight:     700,
            color:          task.completed ? C.inkMid : C.ink,
            textDecoration: task.completed ? "line-through" : "none",
          }}>
            {task.name}
          </p>

          {task.description && (
            <p style={{
              margin:     "0 0 6px",
              fontSize:   13,
              color:      task.completed ? C.inkLight : C.inkMid,
              fontStyle:  "italic",
            }}>
              {task.description}
            </p>
          )}

          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {task.completed && (
              <span style={{
                fontSize:   10,
                fontFamily: "'DM Mono', monospace",
                background: C.sageDark,
                color:      C.inkMid,
                padding:    "2px 8px",
                borderRadius: 99,
              }}>
                done
              </span>
            )}
            <span style={{ fontSize:11, fontFamily:"'DM Mono', monospace", color: C.inkLight }}>
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="del-btn"
          aria-label="Delete task"
          onMouseEnter={() => setHovDel(true)}
          onMouseLeave={() => setHovDel(false)}
          style={{
            flexShrink:   0,
            width:        30, height:30,
            borderRadius: 8,
            display:      "flex", alignItems:"center", justifyContent:"center",
            fontSize:     14,
            cursor:       isDeleting ? "not-allowed" : "pointer",
            color:        hovDel ? C.brown : C.inkLight,
            border:       `1px solid ${hovDel ? C.peachDark : "transparent"}`,
            background:   hovDel ? C.peach : "transparent",
            transition:   "all 0.15s",
            padding:      0,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
