const library = new Array();
function Book(title, author, pages, read, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}
// console.log(library);
const book1 = create_book(
	"Laws of Life",
	"Mickle James",
	"375",
	true,
	crypto.randomUUID(),
);
const book2 = create_book(
	"Kungfu Panda",
	"Disney",
	"278",
	false,
	crypto.randomUUID(),
);
const book3 = create_book(
	"The Hobbit",
	"J.R.R. Tolkien",
	"237",
	false,
	crypto.randomUUID(),
);
const book4 = create_book(
	"Wonderful ways of making a first sale",
	"Marketers Inc.",
	"54",
	true,
	crypto.randomUUID(),
);

const add_book_btn = document.getElementById("add-new-book-btn");
add_book_btn.addEventListener("click", (e) => {
	e.preventDefault();
	const modal = document.getElementsByTagName("dialog")[0];
	const form = document.getElementsByTagName("form")[0];
	let form_data = new FormData(form);
	let entries = form_data.entries(); // To get all entries
	let keys = form_data.keys(); // To get akk keys (form elements names)
	let values = form_data.values(); // To get all form element values
	let values_array = [];
	for (const entry of values) {
		let val = entry == "true" ? true : entry;
		val != "" ? values_array.push(val) : "";
		// console.log(val);
	}
	if (values_array.length > 2) {
		console.table(values_array);
		create_book(
			values_array[0],
			values_array[1],
			values_array[2],
			(read_status = values_array[3]),
			(id = crypto.randomUUID()),
		);

		display_book(
			library.at(-1).title,
			library.at(-1).author,
			library.at(-1).pages,
			library.at(-1).read,
			library.at(-1).id,
		);
		console.log(library.at(-1).id);

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

// const modal = document.getElementsByTagName("dialog")[0]; // Picking first element from returned list
// const open_modal_btn = document.getElementsByClassName("open-modal")[0];
// open_modal_btn.addEventListener("click", () => modal.show());

// const close_modal_btn = document.getElementsByClassName("close-modal")[0];
// close_modal_btn.addEventListener("click", () => modal.close());

function create_book(title_info, author_info, pages, read_status = false, id) {
	const book = new Book(title_info, author_info, pages, read_status, id);
	library.push(book);
}

for (const book of library) {
	display_book(
		book["title"],
		book["author"],
		book["pages"],
		book["read"],
		book["id"],
	);
}

function display_book(title_info, author_info, pages, read_status = false, id) {
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
		create_btn("close-btn"), // Create close Button as first element of 'div inside book-card'
		create_book_info_div(title_info, author_info), // Create a div for book title and author name as second element of 'div inside book-card'
		create_pages_info_div(pages), // Create Pages div as third element of 'div inside book-card'
		create_read_status_div(read_status), // Create read-status div as fourth element of 'div inside book-card'
	);

	// Inserting div and edit-button in book-card
	book_card.append(book_info_div, create_btn("edit-btn", id));

	// inserting the book-card into main container
	container.appendChild(book_card);
}

function create_btn(btn, id = "") {
	if (btn == "close-btn") {
		// Create close Button as first element of 'div inside book-card'
		const close_btn = Object.assign(document.createElement("button"), {
			className: "close-btn",
			textContent: "×",
			ariaLabel: "Remove Book",
		});
		return close_btn;
	} else if (btn == "edit-btn") {
		// Create edit-button as fifth element of 'div inside book-card'
		const edit_btn = Object.assign(document.createElement("button"), {
			id: id, // It is the same id as of the book unique id
			className: "blinker-regular",
			textContent: "Edit",
		});
		edit_btn.addEventListener("click", (e) => {
			console.log(e.target.id);
		});
		return edit_btn;
	}
}

function create_book_info_div(title_info, author_info) {
	// Create a div for book title and author name as second element of 'div inside book-card'
	const book_info_div = document.createElement("div");
	const title = Object.assign(document.createElement("h3"), {
		className: "book-title",
		textContent: title_info
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "), // capitalizing the first char of each word
	});
	const author = Object.assign(document.createElement("h4"), {
		className: "author",
		textContent: "By " + author_info,
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

function create_read_status_div(read_status) {
	// Create read-status div as fourth element of 'div inside book-card'
	const read_status_div = document.createElement("div");
	const read_status_label = Object.assign(document.createElement("span"), {
		textContent: read_status ? "Book is read" : "Not read Yet!",
	});
	const read_checkBox = Object.assign(document.createElement("input"), {
		type: "checkbox",
		name: "is-read",
		id: "is-read",
	});
	if (read_status) {
		read_checkBox.setAttribute("checked", "");
	}
	read_status_div.append(read_status_label, read_checkBox);

	return read_status_div;
}
