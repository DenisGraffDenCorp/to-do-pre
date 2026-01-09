const items = [
"Сделать проектную работу" ,
"Полить цветы" ,
"Пройти туториал по Реакту" ,
"Сделать фронт для своего проекта" ,
"Прогуляться по улице в солнечный день" ,
"Помыть посуду" ,
];

const listElement = document.querySelector(".to-do__list" );
const formElement = document.querySelector(".to-do__form" );
const inputElement = document.querySelector(".to-do__input" );

function loadTasks() {
	const saved = localStorage.getItem("tasks" );
	return saved ? JSON.parse(saved) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template" );
	const clone = template.content.querySelector(".to-do__item" ).cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text" );
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete" );
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate" );
	
	const editButton = clone.querySelector(".to-do__item-button_type_edit" );

	textElement.textContent = item;
	textElement.addEventListener("blur" , function() {
		textElement.setAttribute("contenteditable" , "false" );
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});

	deleteButton.addEventListener("click" , function() {
		clone.remove();
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});

	duplicateButton.addEventListener("click" , function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	editButton.addEventListener("click" , function() {
		textElement.setAttribute("contenteditable" , "true" );
		textElement.focus();
	});
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text" );

	const tasks = [];
	itemsNamesElements.forEach(function(element) {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks" , JSON.stringify(tasks));
}

formElement.addEventListener("submit" , function(event) {
	event.preventDefault();
	const taskText = inputElement.value.trim();
	if (taskText.length) {
		const newItem = createItem(taskText);
		const tasks = getTasksFromDOM();
		listElement.prepend(newItem);
		saveTasks(tasks);
		inputElement.value = "" ;
	}
});

const tasksItems = loadTasks();

tasksItems.forEach(function(item) {
	const itemElement = createItem(item);
	listElement.append(itemElement);
});
