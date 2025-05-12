 let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
  let selectedBook = null;

  function saveBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function addBookmark() {
    const book = document.getElementById("bookName").value.trim();
    const page = document.getElementById("pageNumber").value;
    const line = document.getElementById("lineNumber").value;

    if (!book || !page || !line) {
      alert("Please fill out all fields.");
      return;
    }

    bookmarks[book] = { page, line };
    saveBookmarks();
    renderBookList();
    showDetails(book);

    // Reset form
    selectedBook = null;
    document.getElementById("bookName").value = "";
    document.getElementById("pageNumber").value = "";
    document.getElementById("lineNumber").value = "";
  }

  function renderBookList() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";
    for (let book in bookmarks) {
      const div = document.createElement("div");
      div.className = "book";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = book;
      titleSpan.style.marginRight = "10px";
      titleSpan.style.cursor = "pointer";
      titleSpan.onclick = () => {
        showDetails(book);
        loadForEdit(book);
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.style.background = "none";
      deleteBtn.style.border = "none";
      deleteBtn.style.color = "#065465";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.fontWeight = "bold";
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        delete bookmarks[book];
        saveBookmarks();
        renderBookList();
        document.getElementById("details").innerHTML = "";
      };

      div.appendChild(titleSpan);
      div.appendChild(deleteBtn);
      list.appendChild(div);
    }
  }

  function showDetails(book) {
    const data = bookmarks[book];
    document.getElementById("details").innerHTML =
      `<strong>${book}</strong><br>📄 Page: ${data.page}, 📌 Line: ${data.line}`;
  }

  function loadForEdit(book) {
    const data = bookmarks[book];
    document.getElementById("bookName").value = book;
    document.getElementById("pageNumber").value = data.page;
    document.getElementById("lineNumber").value = data.line;
    selectedBook = book;
  }

  // Initial load
  renderBookList();