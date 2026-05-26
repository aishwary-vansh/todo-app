// ─────────────────────────────────────────────
//  API Layer  —  REST-style Task Endpoints
//
//  GET    /api/tasks          → getTasks()
//  POST   /api/tasks          → addTask()
//  PATCH  /api/tasks/:id      → toggleTask()
//  DELETE /api/tasks/:id      → deleteTask()
// ─────────────────────────────────────────────
const BASE_URL = 'https://todo-app-k41s.onrender.com';
/**
 * @typedef {{ id:string, name:string, description:string,
 *             completed:boolean, createdAt:string }} Task
 * @typedef {{ status:number, data?:any, error?:string }} ApiResponse
 */

const API = {
  /**
   * GET /api/tasks
   * Fetch all tasks from the database.
   * @returns {Promise<ApiResponse>}
   */
  async getTasks() {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const data = await res.json();
      return { status: res.status, data };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  },

  /**
   * POST /api/tasks
   * Create a new task.
   * @param {string} name
   * @param {string} description
   * @returns {Promise<ApiResponse>}
   */
  async addTask(name, description) {
    if (!name.trim()) return { status: 400, error: "Task name is required." };

    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      const data = await res.json();
      return { status: res.status, data: res.ok ? data : undefined, error: res.ok ? undefined : data.error };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  },

  /**
   * PATCH /api/tasks/:id
   * Toggle a task's completed status.
   * @param {string} id
   * @returns {Promise<ApiResponse>}
   */
  async toggleTask(id) {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/${id}`, { method: 'PATCH' });
      const data = await res.json();
      return { status: res.status, data: res.ok ? data : undefined, error: res.ok ? undefined : data.error };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  },

  /**
   * DELETE /api/tasks/:id
   * Remove a task by ID.
   * @param {string} id
   * @returns {Promise<ApiResponse>}
   */
  async deleteTask(id) {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      return { status: res.status, data: res.ok ? data : undefined, error: res.ok ? undefined : data.error };
    } catch (err) {
      return { status: 500, error: err.message };
    }
  },
};

export default API;
