import "./style/main.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
/*          DOM VARIABLES     */

const input: HTMLInputElement = document.querySelector("input")!;
const form: HTMLFormElement = document.querySelector("form")!;
const todoList: HTMLUListElement = document.querySelector("ul")!;
const clearAll = document.querySelector(".clear");

// HANDLER FUNCTION

function handlerSubmit() {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const value = input.value;
		if (!value) alert("Iltimos so'z kiriting");
		todoList.innerHTML += `<li class="list">${value} <button class="btn btn-danger">del</button></li>`;
		input.value = "";
		handlerDeleteCell();
	});
}

function handlerDeleteAllLists() {
	clearAll.addEventListener("click", () => {
		todoList.innerHTML = "";
	});
}
function handlerDeleteCell() {
	const delButtons = document.querySelectorAll(".btn");
	delButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const listItem = btn.closest("li");
			listItem.remove();
		});
	});
}

//LOGICAL FUNCTION
function init() {
	handlerSubmit();
	handlerDeleteAllLists();
}
init();
