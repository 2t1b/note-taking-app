const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");

  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  textarea.value = content;
  textarea.placeholder = "Empty Sticky Note";

  const updateButton = document.createElement("button");
  updateButton.innerHTML = "Update";
  updateButton.addEventListener("click", () => {
    updateNote(id, textarea.value);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, noteContainer);
    }
  });

  noteContainer.appendChild(textarea);
  noteContainer.appendChild(updateButton);
  noteContainer.appendChild(deleteButton);

  return noteContainer;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.find((note) => note.id == id);

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, noteContainer) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(noteContainer);
}