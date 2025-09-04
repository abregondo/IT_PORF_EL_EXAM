import {getTodos, completeTodo} from "../../api/todoApi";
import "./todoList.css";
import JSConfetti from "js-confetti";
export async function renderTodoList () {
    const container = document.createElement("div");
    container.className = "todo-list";

    const todos = await getTodos();
    const jsConfetti = new JSConfetti();

    container.innerHTML = `
    
        <table border = "1" cellpadding = "8">
            <tr><th>Todo</th><th>Status</th><th>Action</th></tr>
            ${todos.
                map(
                    (todo) => `
                <tr>
                    <td>${todo.text}</td>
                    <td>${todo.completed ? "Done" : "Pending"}</td>
                    <td>
                        ${
                            !todo.completed 
                            ? `<button data-id="${todo.id}"> Complete</button>`   
                            : ""
                        }
                    </td>
                </tr> 
                `
            ).join("")}
        </table>
    `;

    container.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", async () => {
            await completeTodo(Number(btn.dataset.id));
            const event = new Event("todosUpdated");
            document.dispatchEvent(event);
            jsConfetti.addConfetti();
        });
    });

    return container;
}