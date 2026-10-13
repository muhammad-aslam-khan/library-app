function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read ? "read" : "not read yet";
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
	};
}
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", "237", false);

// console.log(hobbit.info());

function add_book(book_title, book_author, pages, read = false) {
	const div = document.createElement("div");
	const span = document.createElement("span");
	const btn = document.createElement("button");
	const check_box = document.createElement("input");

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

	// Create close Button as first element of 'div inside book-card'
	const close_btn = Object.assign(document.createElement("button"), {
		className: "close-btn",
		textContent: "×",
		ariaLabel: "Remove Book",
	});

	// Create a div for book title and author name as second element of 'div inside book-card'
	const title_div = document.createElement("div");
	const title = Object.assign(document.createElement("h3"), {
		className: "book-title",
		textContent: "Book Title",
	});
	const author = Object.assign(document.createElement("h4"), {
		className: "author",
		textContent: "By Author",
	});
	title_div.append(title, author);

	// Create Pages div as third element of 'div inside book-card'
	const pages_info = document.createElement("div");
	const pages_label = Object.assign(document.createElement("span"), {
		textContent: "Pages",
	});
	const pages_number = Object.assign(document.createElement("span"), {
		textContent: "457",
	});
	pages_info.append(pages_label, pages_number);

	// Create read-status div as fourth element of 'div inside book-card'
	const read_status = document.createElement("div");
	const read_status_label = Object.assign(document.createElement("span"), {
		textContent: "Book is unread",
	});
	const read_checkBox = Object.assign(document.createElement("input"), {
		type: "checkbox",
		name: "is-read",
		id: "is-read",
	});
	read_status.append(read_status_label, read_checkBox);

	// Create edit-button as fifth element of 'div inside book-card'
	const edit_btn = Object.assign(document.createElement("button"), {
		className: "blinker-regular",
		textContent: "Edit",
	});

	book_info_div.append(close_btn, title_div, pages_info, read_status); // Inserting components in first div of book-card
	book_card.append(book_info_div, edit_btn); // Inserting div and edit-button in book-card
	container.appendChild(book_card); // inserting the book-card into main container
}

const add_book_btn = document.querySelector(".add-book");
add_book_btn.addEventListener("click", add_book);
