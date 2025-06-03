import React, { useEffect, useState } from "react";
import service from "./service";
import Users from "./useralist";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  async function getTodos() {
    setLoadingTasks(true);
    try {
      const todos = await service.getTasks();
      console.log("todos from server:", todos); // בדיקה
      if (Array.isArray(todos)) {
        setTodos(todos);
      } else {
        console.warn("Expected array but got:", typeof todos);
        setTodos([]);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoadingTasks(false);
    }
  }

  async function getUsers() {
    setLoadingUsers(true);
    try {
      const users = await service.getUsers();
      console.log("users from server:", users); // בדיקה
      if (Array.isArray(users)) {
        setUsers(users);
      } else {
        console.warn("Expected array but got:", typeof users);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    try {
      await service.addTask(newTodo);
      setNewTodo("");
      await getTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async function updateCompleted(todo, isComplete) {
    try {
      await service.setCompleted(todo.idItems, isComplete);
      await getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function deleteTodo(idItems) {
    try {
      await service.deleteTask(idItems);
      await getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  useEffect(() => {
    getTodos();
    getUsers();
  }, []);

  return (
    <div className="dashboard">
      {/* רשימת משימות */}
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={createTodo}>
            <input
              className="new-todo"
              placeholder="Well, let's take on the day"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </header>
        <section className="main" style={{ display: "block" }}>
          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : (
            <ul className="todo-list">
              {Array.isArray(todos) &&
                todos.map((todo) => (
                  <li
                    className={todo.isComplite ? "completed" : ""}
                    key={todo.idItems}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        defaultChecked={todo.isComplite}
                        onChange={(e) =>
                          updateCompleted(todo, e.target.checked)
                        }
                      />
                      <label>{todo.nameItem}</label>
                      <button
                        className="destroy"
                        onClick={() => deleteTodo(todo.idItems)}
                      ></button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </section>

      {/* רשימת משתמשים */}
     <Users users={users} loading={loadingUsers} />
    </div>
  );
}

export default App;
