# Library App

A simple browser-based library application built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript) JavaScript curriculum.

## Live Preview

[View Live Demo](https://muhammad-aslam-khan.github.io/library-app/)

## Features

- **Add Books:** Add new books by entering the title, author, number of pages, and read status through a form.
- **Edit Book Details:** Update the information of an existing book.
- **Remove Books:** Remove individual books from the library.
- **Track Reading Status:** Mark books as read or unread using a checkbox.
- **Unique Book IDs:** Assign a unique identifier to each book to manage individual records.
- **Dynamic Display:** Create, update, and remove book cards dynamically using JavaScript.
- **Form Validation:** Use built-in HTML form validation to ensure required information is provided.

## Built With

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Google Fonts

## Core Concepts Implemented

- Creating objects using a constructor function.
- Managing a collection of objects using an array.
- Generating unique identifiers with `crypto.randomUUID()`.
- Retrieving and updating individual objects using their IDs.
- Creating, selecting, and manipulating DOM elements dynamically.
- Handling events for adding, editing, removing, and updating books.
- Working with HTML forms, the `FormData` API, and form validation.
- Using the native HTML `<dialog>` element for modal forms.
- Keeping the data stored in JavaScript objects synchronized with the displayed interface.

## Credits

- [Google Fonts](https://fonts.google.com/) for typography.
- [The Odin Project](https://www.theodinproject.com/) for the project assignment and learning resources.
- ChatGPT for README drafting.

## Note

This project uses an in-memory JavaScript array to store book records. Books added or modified during a session are not persisted after the page is reloaded.

The application was implemented using vanilla HTML, CSS, and JavaScript without external JavaScript frameworks or libraries.
