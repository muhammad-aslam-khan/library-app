const library = new Array();
function Book(title, author, pages, read, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}
// Defined read_status update method on 'prototype' property of Book constructor
Book.prototype.toggle_read = function (read_status) {
	this.read = read_status;
};

// These are the books already in created and pushed in library
const book1 = create_book(
	"Laws of Life",
	"Mickle James",
	"375",
	false,
	crypto.randomUUID(),
);
const book2 = create_book(
	"Kungfu Panda",
	"Disney",
	"278",
	true,
	crypto.randomUUID(),
);
const book3 = create_book(
	"The Hobbit",
	"J.R.R. Tolkien",
	"237",
	false,
	crypto.randomUUID(),
);

for (const book of library) {
	display_book(
		book["title"],
		book["author"],
		book["pages"],
		book["read"],
		book["id"],
	);
}

// Being used inside eventListener methods attached with update-book-btn
// and edit-btn. It is used to retrieve the unique Id of the book from
// book array which is also the value of id attribute of .book-card.
// This way it helps to pickup the current .book-card from the DOM.
let selected_book_index;

// Global references are only of the elements of input form and their buttons.
// The references of elements inside each .book-card are picked up on triggers from
// edit-btn, remove-book-btn, and read-status-checkbox from inside each .book-card.
// Therefore, there reference needs to link with the current .book-card and as each
// .book-card has a unique id attribute, which is the same as the unique id of each
// book object inside library array. That book.id is used to pickup the reference
// of the .book-card which is currently in focus.
const modal = document.getElementsByTagName("dialog")[0];
const form = document.getElementsByTagName("form")[0];
const add_book_heading = document.getElementById("add-new-book-heading");
const edit_book_heading = document.getElementById("edit-book-heading");
const title_input = document.getElementsByName("book-title")[0];
const author_input = document.getElementsByName("author")[0];
const pages_input = document.getElementsByName("pages")[0];
const read_status_checkbox = document.getElementsByName("read")[0]; // It is of form, not the one in each .book-card element.

const open_modal_btn = document.getElementsByTagName("button")[0]; // It happens to be the first button of the DOM
const add_book_btn = document.getElementById("add-new-book-btn");
const update_book_btn = document.getElementById("update-book-btn");

// It opens the modal from API and not JS, but its eventListener  is required
// to remove some and display some form elements as the same form is being
// used for adding new book and updating existing.
open_modal_btn.addEventListener("click", () => {
	edit_book_heading.style.display = "none";
	update_book_btn.style.display = "none";

	add_book_heading.style.display = "block";
	add_book_btn.style.display = "block";
});

add_book_btn.addEventListener("click", (e) => {
	e.preventDefault();

	let form_data = new FormData(form);
	let values = form_data.values(); // To get all form element values
	let values_array = [];
	for (const entry of values) {
		let val = entry == "true" ? true : entry;
		val != "" ? values_array.push(val) : "";
	}
	if (values_array.length > 2) {
		create_book(
			values_array[0],
			values_array[1],
			values_array[2],
			(read_status = values_array[3]),
			(id = crypto.randomUUID()),
		);

		// As this book is just added, it will be at the end of the library array
		display_book(
			library.at(-1).title,
			library.at(-1).author,
			library.at(-1).pages,
			library.at(-1).read,
			library.at(-1).id,
		);

		form.reset();
		modal.close();
	}

	// form_data = new FormData(form);
	// values = form_data.values(); // To get all form element values
	// for (const entry of values) {
	// 	let val = entry == "true" ? true : entry;
	// 	console.log(val);
	// }

	// const book_name = document.getElementById("book-title");
	// const author_name = document.getElementById("author");
	// const pages = document.getElementById("pages");
	// const read_status = document.getElementById("read");
	// console.log(book_name.value, author_name.value, pages.value, read_status.checked);
});

update_book_btn.addEventListener("click", (e) => {
	// Selected_book_index is already set by call to get_selected_book_references() method by clicking 'Edit' button
	// Book needs to be update in library array and also on the html page.
	e.preventDefault();
	const selected_book = library[selected_book_index];
	selected_book["title"] = title_input.value;
	selected_book["author"] = author_input.value;
	selected_book["pages"] = pages_input.value;
	selected_book["read"] = read_status_checkbox.checked;

	const selected_book_card = document.getElementById(selected_book["id"]);
	const displayed_title = selected_book_card.getElementsByTagName("h3")[0];
	const displayed_author = selected_book_card.getElementsByTagName("h4")[0];
	const displayed_pages = selected_book_card.getElementsByTagName("span")[1];
	const displayed_read_label =
		selected_book_card.getElementsByTagName("label")[0];
	const displayed_read_checkBox =
		selected_book_card.getElementsByTagName("input")[0];

	displayed_title.textContent = title_input.value;
	displayed_author.textContent = author_input.value;
	displayed_pages.textContent = pages_input.value;
	displayed_read_label.textContent = read_status_checkbox.checked
		? "Book is read"
		: "Not read Yet!";
	displayed_read_checkBox.checked = read_status_checkbox.checked;

	form.reset(); // Reset form inputs
	modal.close();
});

// Creates a Book type object and pushes it into library array at the end
function create_book(book_title, book_author, pages, read_status = false, id) {
	book_title = capitalize(book_title);
	book_author = capitalize(book_author);
	const book = new Book(book_title, book_author, pages, read_status, id);
	library.push(book);
}

// Creates and then displays the .book-card on the DOM, it creates the card
// piece by piece by calling other helper method on the way, they are
// defined after this function.
function display_book(book_title, book_author, pages, read_status = false, id) {
	// Reference of main container
	const container = document.querySelector(".container");

	// Creating book card, adding classes and assigning unique id
	const book_card = Object.assign(document.createElement("div"), {
		className: "book-card blinker-regular font",
		id: id,
	});

	// Create first 'div inside book-card'
	const book_info_div = document.createElement("div");

	// Inserting components in first div of book-card
	book_info_div.append(
		create_btn("remove-book-btn", id), // Create Remove-Book-Button as first element of 'div inside book-card'
		create_book_info_div(book_title, book_author), // Create a div for book title and author name as second element of 'div inside book-card'
		create_pages_info_div(pages), // Create Pages div as third element of 'div inside book-card'
		create_read_status_div(read_status, book_title), // Create read-status div as fourth element of 'div inside book-card'
	);

	// Inserting div and edit-button in book-card
	book_card.append(book_info_div, create_btn("edit-btn", id));

	// inserting the book-card into main container
	container.appendChild(book_card);
}

function create_btn(btn) {
	if (btn == "remove-book-btn") {
		// Create close Button as first element of 'div inside book-card'
		const remove_book_btn = Object.assign(
			document.createElement("button"),
			{
				// id: id, // It is the same id as of the book unique id
				className: "remove-book-btn",
				textContent: "×",
				ariaLabel: "Remove Book",
			},
		);
		remove_book_btn.addEventListener("click", (e) => {
			const [selected_book_card, selected_book_object] =
				get_selected_book_references(e.target.closest(".book-card").id);

			// Removing form library array
			const current_book_index = library.indexOf(selected_book_object);
			library.splice(current_book_index, 1);

			// Removing form DOM
			selected_book_card.remove();
		});
		return remove_book_btn;
	} else if (btn == "edit-btn") {
		// Create edit-button as fifth element of 'div inside book-card'
		const edit_btn = Object.assign(document.createElement("button"), {
			// id: id, // It is the same id as of the book unique id
			className: "blinker-regular",
			textContent: "Edit",
		});
		edit_btn.addEventListener("click", (e) => {
			const [selected_book_card, selected_book_object] =
				get_selected_book_references(e.target.closest(".book-card").id);

			let title = selected_book_object["title"];
			let author = selected_book_object["author"];
			let pages = selected_book_object["pages"];
			let read_status = selected_book_object["read"];

			// Opening book entry form in edit mode
			add_book_heading.style.display = "none";
			add_book_btn.style.display = "none";

			edit_book_heading.style.display = "block";
			update_book_btn.style.display = "block";

			modal.showModal();

			title_input.value = title;
			author_input.value = author;
			pages_input.value = pages;
			read_status_checkbox.checked = read_status;
		});
		return edit_btn;
	}
}

function create_book_info_div(book_title, book_author) {
	// Create a div for book title and author name as second element of 'div inside book-card'
	const book_info_div = document.createElement("div");
	const title = Object.assign(document.createElement("h3"), {
		className: "book-title",
		textContent: book_title,
	});
	const author = Object.assign(document.createElement("h4"), {
		className: "author",
		textContent: "By " + book_author,
	});
	book_info_div.append(title, author);
	return book_info_div;
}

function create_pages_info_div(pages) {
	// Create Pages div as third element of 'div inside book-card'
	const pages_info_div = document.createElement("div");

	const pages_label = Object.assign(document.createElement("span"), {
		textContent: "Pages",
	});
	const pages_number = Object.assign(document.createElement("span"), {
		textContent: pages,
	});
	pages_info_div.append(pages_label, pages_number);

	return pages_info_div;
}

function create_read_status_div(read_status, book_title) {
	// Create read-status div as fourth element of 'div inside book-card'
	const read_status_div = document.createElement("div");
	const read_status_label = Object.assign(document.createElement("label"), {
		textContent: read_status ? "Book is read" : "Not read Yet!",
	});
	read_status_label.setAttribute("for", book_title);
	const read_checkBox = Object.assign(document.createElement("input"), {
		type: "checkbox",
		name: "is-read",
		id: book_title,
	});
	read_checkBox.checked = read_status;
	read_checkBox.addEventListener("change", (e) => {
		const read_status = e.target.checked;

		const [selected_book_card, selected_book_object] =
			get_selected_book_references(e.target.closest(".book-card").id);

		const read_label = selected_book_card.getElementsByTagName("label")[0];
		read_label.textContent = read_status ? "Book is read" : "Not read Yet!";

		selected_book_object.toggle_read(read_status); // Calling the method ob Book object
		// console.log(selected_book_object)
	});

	read_status_div.append(read_status_label, read_checkBox);

	return read_status_div;
}

function capitalize(word) {
	return word
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" "); // capitalizing the first char of each word
}

function get_selected_book_references(id) {
	const selected_book_card = document.getElementById(id);
	for (const book of library) {
		if (book.id == id) {
			selected_book_index = library.indexOf(book);
			const selected_book_object = library[selected_book_index];
			return [selected_book_card, selected_book_object];
		}
	}
}
