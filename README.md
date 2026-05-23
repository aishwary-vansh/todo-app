# 📝 Todo App — Full Stack

A full-stack To-Do List app built with a **React frontend**, a real **Express.js REST API**, and a **file-based JSON database** for persistent storage.

---

## 🗂️ Folder Structure

```
todo-app/
│
├── package.json                  # Project metadata & scripts
├── README.md                     # You are here
├── vite.config.js                # Vite configuration + API Proxy
│
├── backend/
│   ├── server.mjs                # Express.js REST API server
│   └── db.json                   # File-based database (auto-generated)
│
└── src/
    ├── App.jsx                   # Root component — wires all pieces together
    │
    ├── constants/
    │   └── colors.js             # Brand palette: Peach · Sage · Cream + tokens
    │
    ├── api/
    │   └── taskApi.js            # Frontend REST API calls via fetch()
    │
    ├── utils/
    │   └── helpers.js            # formatDate · makeLogEntry · cycle
    │
    ├── styles/
    │   └── global.css            # Global CSS: fonts, inputs, hover effects
    │
    └── components/
        ├── Header.jsx            # Title, progress bar, stat pills
        ├── TaskForm.jsx          # Add-task form (POST /api/tasks)
        ├── FilterTabs.jsx        # All / Active / Done switcher
        ├── TaskList.jsx          # Filtered list or empty state
        ├── TaskCard.jsx          # Single task — toggle + delete
        └── ApiLog.jsx            # Live API request log panel
```

---

## 🔧 API Endpoints (Express Backend)

| Method   | Endpoint          | Action                     | Status |
|----------|-------------------|----------------------------|--------|
| `GET`    | `/api/tasks`      | Fetch all tasks            | 200    |
| `POST`   | `/api/tasks`      | Create a task (name req'd) | 201    |
| `PATCH`  | `/api/tasks/:id`  | Toggle complete/incomplete | 200    |
| `DELETE` | `/api/tasks/:id`  | Remove a task              | 200    |

---

## 💾 Database

Tasks are persisted via a **local JSON file database** (`backend/db.json`).  
All tasks survive page refreshes and server restarts.

Schema per task:
```js
{
  id:          string,   // timestamp-based unique ID
  name:        string,   // required
  description: string,   // optional
  completed:   boolean,
  createdAt:   string,   // ISO 8601
}
```

---

## 🎨 Color Palette

| Variable       | Hex       | Used for                        |
|----------------|-----------|---------------------------------|
| `C.peach`      | `#f7e1d7` | Hero banner, Active tab, inputs |
| `C.sage`       | `#e9edc9` | Done tab, completed cards, log  |
| `C.cream`      | `#faedcd` | App background, All tab         |
| `C.brown`      | `#7c4a2d` | Buttons, checkboxes, progress   |

---

## 🚀 Getting Started

The app is set up to run both the Vite development server and the Express backend concurrently.

```bash
# 1. Install dependencies
npm install

# 2. Run both frontend and backend concurrently
npm run dev
```

Open [http://localhost:5175](http://localhost:5175) (or the port Vite outputs) in your browser.
