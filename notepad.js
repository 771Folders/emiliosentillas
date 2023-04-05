const saveButton = document.getElementById('save-btn');
const notepad = document.getElementById('notepad');
const notesList = document.getElementById('notes-list');

// Load any saved notes from Local Storage
let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
for (const note of savedNotes) {
  addNoteToList(note);
}

saveButton.addEventListener('click', () => {
  const data = notepad.value;
  const filename = 'notes.html';

  const blob = new Blob([data], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Save the note to Local Storage
  savedNotes.push(data);
  localStorage.setItem('notes', JSON.stringify(savedNotes));

  // Add the note to the list on the website
  addNoteToList(data);
});

function addNoteToList(note) {
  const li = document.createElement('li');
  li.textContent = note;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');
  editButton.addEventListener('click', () => {
    editNoteInList(li, note);
  });
  li.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    deleteNoteFromList(li, note);
  });
  li.appendChild(deleteButton);

  notesList.appendChild(li);
}

function editNoteInList(li, note) {
  const newNote = prompt('Enter a new note:', note);
  if (newNote !== null) {
    li.textContent = newNote;

    const index = savedNotes.indexOf(note);
    savedNotes[index] = newNote;
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  }
}

function deleteNoteFromList(li, note) {
  li.remove();

  const index = savedNotes.indexOf(note);
  savedNotes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(savedNotes));
}
