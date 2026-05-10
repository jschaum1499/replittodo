import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  }

  function toggleComplete(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addTodo();
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-bg">
      <div className="card">
        <header className="card-header">
          <h1 className="title">My Tasks</h1>
          {todos.length > 0 && (
            <span className="counter">
              {remaining} of {todos.length} remaining
            </span>
          )}
        </header>

        <div className="input-row">
          <input
            data-testid="todo-input"
            className="task-input"
            type="text"
            placeholder="Add a new task…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            data-testid="add-btn"
            className="add-btn"
            onClick={addTodo}
            disabled={!input.trim()}
          >
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 && (
            <li className="empty-state">No tasks yet. Add one above!</li>
          )}
          {todos.map((todo, index) => (
            <li key={todo.id} className={`todo-item${todo.completed ? " completed" : ""}`}>
              <button
                data-testid={`complete-${index}`}
                className={`check-btn${todo.completed ? " checked" : ""}`}
                onClick={() => toggleComplete(todo.id)}
                aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
              >
                {todo.completed && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                data-testid={`delete-${index}`}
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
