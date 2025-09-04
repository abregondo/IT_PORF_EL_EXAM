import './style.css'
import { renderTodoForm } from "./components/todoForm/todoForm";
import { renderTodoList } from "./components/todoList/todoList";


async function renderTodos() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(renderTodoForm());
  app.appendChild(await renderTodoList());
}

renderTodos();

document.addEventListener("todosUpdated",
  renderTodos);