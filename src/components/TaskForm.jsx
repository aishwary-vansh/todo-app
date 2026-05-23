// ─────────────────────────────────────────────
//  Component: TaskForm
//  POST /api/tasks — add a new task
// ─────────────────────────────────────────────

import { useState, useRef } from "react";
import { C } from "../constants/colors";

export default function TaskForm({ onAdd }) {
  const [name,       setName]    = useState("");
  const [desc,       setDesc]    = useState("");
  const [error,      setError]   = useState("");
  const [submitting, setSub]     = useState(false);
  const [hoverBtn,   setHover]   = useState(false);
  const nameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSub(true);
    const err = await onAdd(name, desc);
    if (err) {
      setError(err);
    } else {
      setName("");
      setDesc("");
      nameRef.current?.focus();
    }
    setSub(false);
  }

  const disabled = submitting || !name.trim();

  return (
    <div style={{
      background:   "#fff9f5",
      border:       `2px solid ${C.peachDark}`,
      borderRadius: 18,
      padding:      "1.4rem",
      marginBottom: "1.5rem",
      boxShadow:    "0 4px 24px rgba(124,74,45,0.08)",
    }}>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background: C.brownLight }} />
        <p style={{ margin:0, fontSize:11, fontFamily:"'DM Mono', monospace", color: C.brownMid, letterSpacing:"0.08em", textTransform:"uppercase" }}>
          POST /api/tasks
        </p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <input
          ref={nameRef}
          type="text"
          placeholder="What needs to be done? *"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          disabled={submitting}
        />
        <textarea
          placeholder="Add a description… (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          disabled={submitting}
        />
        {error && (
          <p style={{ margin:0, fontSize:13, fontFamily:"'DM Mono', monospace", color:"#a32d2d" }}>
            ✗ {error}
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={disabled}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            alignSelf:     "flex-start",
            background:    disabled ? C.peachDark : hoverBtn ? C.ink : C.brown,
            color:         "#fff9f5",
            border:        "none",
            borderRadius:  10,
            padding:       "10px 22px",
            fontSize:      14,
            fontFamily:    "'Playfair Display', serif",
            fontWeight:    700,
            cursor:        disabled ? "not-allowed" : "pointer",
            opacity:       disabled ? 0.6 : 1,
            transition:    "background 0.2s, transform 0.1s",
            transform:     hoverBtn && !disabled ? "scale(1.02)" : "scale(1)",
            letterSpacing: "0.02em",
          }}
        >
          {submitting ? "Adding…" : "+ Add Task"}
        </button>
      </div>
    </div>
  );
}
