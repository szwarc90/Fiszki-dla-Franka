class NoteCard {
    constructor(id, title, priority, content, done) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.content = content;
        this.done = done;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
        this.saveToLocalStorage();
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
        this.saveToLocalStorage();
    }

    updateContent(newContent) {
        this.content = newContent;
        this.saveToLocalStorage();
    }

    toggleDone() {
        this.done = !this.done;
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    removeFromLocalStorage() {
        localStorage.removeItem(this.id);
    }

    generateHTML() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const controlsElement = document.createElement('div');
        controlsElement.classList.add('card-controls');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = this.title;
        titleInput.addEventListener('input', (event) => this.updateTitle(event.target.value));
        controlsElement.appendChild(titleInput);

        const priorityInput = document.createElement('input');
        priorityInput.type = 'number';
        priorityInput.min = '1';
        priorityInput.max = '5';
        priorityInput.value = this.priority;
        priorityInput.addEventListener('input', (event) => this.updatePriority(event.target.value));
        controlsElement.appendChild(priorityInput);

        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = this.done ? 'Undone' : 'Done';
        toggleButton.addEventListener('click', () => {
            this.toggleDone();
            toggleButton.innerHTML = this.done ? 'Undone' : 'Done';
        });
        controlsElement.appendChild(toggleButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            this.removeFromLocalStorage();
            cardElement.remove();
        });
        controlsElement.appendChild(deleteButton);

        cardElement.appendChild(controlsElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('card-content');

        const contentTextarea = document.createElement('textarea');
        contentTextarea.value = this.content;
        contentTextarea.addEventListener('input', (event) => this.updateContent(event.target.value));
        contentElement.appendChild(contentTextarea);

        cardElement.appendChild(contentElement);

        return cardElement;
    }
}

// Load existing note cards from local storage
function loadNoteCards() {
    const noteCards = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('notecard-')) {
            const data = JSON.parse(localStorage.getItem(key));
            const noteCard = new NoteCard(data.id, data.title, data.priority, data.content, data.done);
            noteCards.push(noteCard);
        }
    }
    return noteCards;
}

// Add new note card
function addNoteCard(title, priority, content) {
    const id = 'notecard-' + Date.now();
    const noteCard = new NoteCard(id, title, priority, content, false);
    noteCard.saveToLocalStorage();
    return noteCard;
}

// Example usage:
const noteBox = document.getElementById('notatki');
const noteCards = loadNoteCards();
noteCards.forEach(noteCard => {
    const cardElement = noteCard.generateHTML();
    noteBox.appendChild(cardElement);
});

// Add a new note card
const newNoteCard = addNoteCard('New Note', 3, 'Content of the new note.');
const newCardElement = newNoteCard.generateHTML();
noteBox.appendChild(newCardElement);
