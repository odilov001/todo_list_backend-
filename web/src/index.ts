import { http } from "./server/http";
import "./style/main.css";

const inputText: HTMLInputElement = document.querySelector(".textInput");
const form: HTMLFormElement = document.forms[0];
const todoList: HTMLUListElement = document.querySelector(".todoList");
const clearAllBtn: HTMLButtonElement = document.querySelector(".clear");

//HANDLER FUNCTIONS

function handleSubmit() {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (inputText.value === "") return;

		const todoTitle = inputText.value;

		try {
			const response = await http(`/todos`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: todoTitle }),
			});

			if (!response.ok) {
				throw new Error("Malumotni yuborishda xatolik");
			}

			// const result = await response.json();
			// console.log(result);

			displayList(todoTitle);
			inputText.value = "";
		} catch (error) {
			console.error("Xatolik yuz berdi:", error.message);
		}
	});
}

function handleClearClick() {
	clearAllBtn.addEventListener("click", () => {
		todoList.innerHTML = "";
	});
}

function handleShowClick(listItem: HTMLLIElement) {
	const showBtn: HTMLButtonElement = listItem.querySelector(".show")!;
	showBtn.addEventListener("click", () => {
		// const listItemText = listItem.innerText;
		console.log("hello");
	});
}

function handleDelete(listItem: HTMLLIElement) {
	const deleteBtn: HTMLButtonElement = listItem.querySelector(".delete")!;
	deleteBtn.addEventListener("click", () => {
		listItem.remove();
	});
}


function displayList(text: string) {
	const listItem = document.createElement("li");
	listItem.textContent = text;

	const iconsDiv = document.createElement("div");
	iconsDiv.className = "icons";

	const showButton = createIconButton(
		"show",
		"https://cdn-icons-png.flaticon.com/128/12898/12898069.png"
	);
	const deleteButton = createIconButton(
		"delete",
		"https://cdn-icons-png.flaticon.com/128/12870/12870600.png"
	);

	iconsDiv.appendChild(showButton);
	iconsDiv.appendChild(deleteButton);

	listItem.appendChild(iconsDiv);

	todoList.appendChild(listItem);

	handleShowClick(listItem);
	handleDelete(listItem);
}

function createIconButton(className: string, imageUrl: string): HTMLButtonElement {
	const button = document.createElement("button");
	button.className = className;

	const img = document.createElement("img");
	img.src = imageUrl;
	img.alt = "";

	button.appendChild(img);

	return button;
}

//GET INFORMATION FROM API

async function getTodos() {
	const res = await http("/todos");
	const data = await res.json();
	return data;
}

async function init() {
	try {
		const todos = await getTodos();
		console.log("todos = ", todos);

		todos.forEach((todo: any) => {
			const listItem = createTodoListItem(todo.title);
			todoList.appendChild(listItem);
			handleShowClick(listItem);
			handleDelete(listItem);
		});
	} catch (error) {
		console.error("Error fetching todos:", error.message);
	}
}

function createTodoListItem(title: string): HTMLLIElement {
	const listItem = document.createElement("li");
	listItem.textContent = title;

	const iconsDiv = document.createElement("div");
	iconsDiv.className = "icons";

	const showButton = createIconButton(
		"show",
		"https://cdn-icons-png.flaticon.com/128/12898/12898069.png"
	);
	const deleteButton = createIconButton(
		"delete",
		"https://cdn-icons-png.flaticon.com/128/12870/12870600.png"
	);

	iconsDiv.appendChild(showButton);
	iconsDiv.appendChild(deleteButton);

	listItem.appendChild(iconsDiv);

	return listItem;
}

function init2() {
	// handleSubmit();
	handleClearClick();
	init();
}

init2();
