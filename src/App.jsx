// ─────────────────────────────────────────────
//  App.jsx  —  Root Component
//  Wires together API, state, and all views
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import API from "./api/taskApi";
import { makeLogEntry } from "./utils/helpers";
import { C } from "./constants/colors";

import Header     from "./components/Header";
import TaskForm   from "./components/TaskForm";
import FilterTabs from "./components/FilterTabs";
import TaskList   from "./components/TaskList";
import ApiLog     from "./components/ApiLog";

const FILTERS = ["All", "Active", "Done"];

export default function App() {
  const [tasks,      setTasks]   = useState([]);
  const [loading,    setLoading] = useState(true);
  const [filter,     setFilter]  = useState("All");
  const [deletingId, setDelId]   = useState(null);
  const [apiLog,     setApiLog]  = useState([]);

  function pushLog(method, endpoint, status) {
    setApiLog((prev) => [makeLogEntry(method, endpoint, status), ...prev.slice(0, 4)]);
  }

  // GET /api/tasks on mount
  useEffect(() => {
    (async () => {
      const res = await API.getTasks();
      pushLog("GET", "/api/tasks", res.status);
      setTasks(res.data || []);
      setLoading(false);
    })();
  }, []);

  // POST /api/tasks
  async function handleAdd(name, desc) {
    const res = await API.addTask(name, desc);
    pushLog("POST", "/api/tasks", res.status);
    if (res.status === 201) {
      setTasks((prev) => [res.data, ...prev]);
      return null;           // no error
    }
    return res.error;        // return error string to form
  }

  // PATCH /api/tasks/:id
  async function handleToggle(id) {
    const res = await API.toggleTask(id);
    pushLog("PATCH", `/api/tasks/${id}`, res.status);
    if (res.status === 200)
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: res.data.completed } : t));
  }

  // DELETE /api/tasks/:id
  async function handleDelete(id) {
    setDelId(id);
    const res = await API.deleteTask(id);
    pushLog("DELETE", `/api/tasks/${id}`, res.status);
    if (res.status === 200)
      setTasks((prev) => prev.filter((t) => t.id !== id));
    setDelId(null);
  }

  const filtered = tasks.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Done")   return t.completed;
    return true;
  });

  const counts = {
    All:    tasks.length,
    Active: tasks.filter((t) => !t.completed).length,
    Done:   tasks.filter((t) =>  t.completed).length,
  };

  return (
    <div style={{ fontFamily:"'Palatino Linotype', 'Book Antiqua', Palatino, serif", background: C.cream, minHeight:"100vh", paddingBottom:"3rem" }}>
      <Header counts={counts} />

      <div style={{ maxWidth:640, margin:"0 auto", padding:"1.5rem 1rem 0" }}>
        <TaskForm onAdd={handleAdd} />

        <FilterTabs filter={filter} counts={counts} onChange={setFilter} />

        <div style={{ marginBottom:"2rem" }}>
          <TaskList
            tasks={filtered}
            filter={filter}
            loading={loading}
            deletingId={deletingId}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>

        <ApiLog entries={apiLog} />
      </div>
    </div>
  );
}
