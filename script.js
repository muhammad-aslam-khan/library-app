const library = new Array();
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const book1 = create_book("Laws of Life", "Mickle James", "375", true);
const book2 = create_book("Kungfu Panda", "Disney", "278", false);
const book3 = create_book("The Hobbit", "J.R.R. Tolkien", "237", false);
const book4 = create_book(
	"Wonderful ways of making a first sale",
	"Marketers Inc.",
	"54",
	true,
);

library.push(book1, book2, book3, book4);
for (const book of library) {
	display_book(book["title"], book["author"], book["pages"], book["read"]);
}

function create_book(title_info, author_info, pages, read_status = false) {
	const book = new Book(title_info, author_info, pages, read_status);
	library.push(book);
}

function display_book(title_info, author_info, pages, read_status = false) {
	// Reference of main container
	const container = document.querySelector(".container");

	// Creating book card
	const book_card = document.createElement("div");
	const book_card_classes = ["book-card", "blinker-regular", "font"];
	for (const entry of book_card_classes) {
		book_card.classList.add(entry);
	}

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
	book_card.append(book_info_div, create_btn("edit-btn"));

	// inserting the book-card into main container
	container.appendChild(book_card);
}

function create_btn(btn) {
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
			className: "blinker-regular",
			textContent: "Edit",
		});
		return edit_btn;
	}
}

function create_book_info_div(title_info, author_info) {
	// Create a div for book title and author name as second element of 'div inside book-card'
	const book_info_div = document.createElement("div");
	const title = Object.assign(document.createElement("h3"), {
		className: "book-title",
		textContent: capitalizeWords(title_info),
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

function capitalizeWords(str) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
