// ─────────────────────────────────────────────
//  Component: TaskList
//  Renders filtered task cards or empty state
// ─────────────────────────────────────────────

import { C, CARD_COLORS } from "../constants/colors";
import { cycle } from "../utils/helpers";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, filter, loading, deletingId, onToggle, onDelete }) {
  if (loading) {
    return (
      <div style={{ padding:"2.5rem", textAlign:"center", color: C.inkLight, fontFamily:"'DM Mono', monospace", fontSize:13 }}>
        Loading tasks…
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div style={{
        padding:      "3rem 2rem",
        textAlign:    "center",
        border:       `2px dashed ${C.peachDark}`,
        borderRadius: 18,
        background:   "#fffdf9",
      }}>
        <div style={{ fontSize:36, marginBottom:8 }}>🌿</div>
        <p style={{ margin:0, fontSize:15, color: C.inkMid, fontFamily:"'Playfair Display', serif", fontStyle:"italic" }}>
          {filter === "All"
            ? "Nothing here yet — add your first task!"
            : `No ${filter.toLowerCase()} tasks right now.`}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {tasks.map((task, i) => (
        <TaskCard
          key={task.id}
          task={task}
          accentBg={cycle(CARD_COLORS, i)}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          isDeleting={deletingId === task.id}
        />
      ))}
    </div>
  );
}
