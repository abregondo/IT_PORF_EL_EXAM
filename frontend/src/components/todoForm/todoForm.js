import { addTodo } from "../../api/todoApi";
import "./todoForm.css";

export function renderTodoForm() {
  const form = document.createElement("form");
  form.className = "todo-form";

  form.innerHTML = `
    <input type="text" placeholder="Enter todo" required />
    <button type="submit">Add</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input.value.trim() !== "") {
      await addTodo(input.value);
      input.value = "";
      // refresh todo list
      const event = new Event("todosUpdated");
      document.dispatchEvent(event);
    }
  });

  return form;
}