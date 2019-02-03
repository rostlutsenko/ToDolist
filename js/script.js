/*eslint-env browser*/

const data = (localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')) : {
    todo: [],
    completed: [],
};

const toggle = document.querySelector('#toggle');

renderList();

document.querySelector('#mode').addEventListener('click', function () {
    if (toggle.style.left == '65px') {
        toggle.style.left = '5px';
        changeMode(false);
    } else {
        toggle.style.left = '65px';
        changeMode(true);
    }
});

document.querySelector('#add').addEventListener('click', () => {
    const value = document.querySelector('#inputNote').value;
    if (value) {
        addNote(value);
        document.querySelector('#inputNote').value = '';
        data.todo.push(value);
        saveList();
    }
});

document.querySelector('#inputNote').addEventListener('keydown', e => {
    const value = document.querySelector('#inputNote').value;
    if (e.keyCode == 13 && value) {
        e.preventDefault();
        addNote(value);
        document.querySelector('#inputNote').value = '';
        data.todo.push(value);
        saveList();
    } else if (e.keyCode == 13) {
        e.preventDefault();
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

function changeMode(statement) {

    const add         = document.querySelector('#add'),
          inputNote   = document.querySelector('#inputNote'),
          mode        = document.querySelector('#mode'),
          noteList    = document.querySelector('#noteList'),
          completedNoteList = document.querySelector('#completedNoteList'),
          note        = document.getElementsByClassName('note'),
          complete    = document.getElementsByClassName('complete'),
          completeBox = document.getElementsByClassName('completeBox'),
          noteText    = document.getElementsByClassName('noteText'),
          close       = document.getElementsByClassName('close');

    if (statement == true) {

        document.body.classList.add('dark_body');
        inputNote.classList.add('dark_input');
        add.classList.add('dark_add');
        mode.classList.add('dark_mode');
        toggle.classList.add('dark_toggle');
        noteList.classList.add('dark_noteList');
        completedNoteList.classList.add('dark_completedNoteList');

        if (data.todo.length) {
            for (let i = 0; i < note.length; i++) {
                note[i].classList.add('dark_note');
                complete[i].classList.add('dark_complete');
                completeBox[i].classList.add('dark_completeBox');
                noteText[i].classList.add('dark_noteText');
                close[i].classList.add('dark_close');
            }
        }

    } else {

        document.body.classList.remove('dark_body');
        inputNote.classList.remove('dark_input');
        add.classList.remove('dark_add');
        mode.classList.remove('dark_mode');
        toggle.classList.remove('dark_toggle');
        noteList.classList.remove('dark_noteList');
        completedNoteList.classList.remove('dark_completedNoteList');

        for (let j = 0; j < note.length; j++) {
            note[j].classList.remove('dark_note');
            complete[j].classList.remove('dark_complete');
            completeBox[j].classList.remove('dark_completeBox');
            noteText[j].classList.remove('dark_noteText');
            close[j].classList.remove('dark_close');
        }
    }
}

function saveList() {
    localStorage.setItem('taskList', JSON.stringify(data));
}

function renderList() {
    if (!data.todo.length && !data.completed.length) return;

    for (let m = 0; m < data.todo.length; m++) {
        addNote(data.todo[m]);
    }

    for (let n = 0; n < data.completed.length; n++) {
        addNote(data.completed[n], true);
    }
}

function addNote(text, completed) {
    const noteList  = document.querySelector('#noteList'),
        completedNoteList = document.querySelector('#completedNoteList'),
        note        = document.createElement('li'),
        complete    = document.createElement('div'),
        completeBox = document.createElement('div'),
        noteText    = document.createElement('p'),
        close       = document.createElement('div');

    note.classList.add('note');
    complete.classList.add('complete');
    noteText.classList.add('noteText');
    close.classList.add('close');
    completeBox.classList.add('completeBox');

    note.appendChild(complete);
    note.appendChild(noteText);
    note.appendChild(close);
    complete.appendChild(completeBox);

    noteText.innerText = text;
    if (completed == true) {
        completedNoteList.insertBefore(note, completedNoteList.childNodes[0]);
        note.classList.add('completed');
        complete.addEventListener('click', finishTask);
    } else {
        complete.addEventListener('click', finishTask);
        noteList.insertBefore(note, noteList.childNodes[0]);
    }

    if (toggle.style.left == '65px') {
        note.classList.add('dark_note');
        noteText.classList.add('dark_noteText');

        complete.classList.add('dark_complete');
        close.classList.add('dark_close');

        complete.firstChild.classList.add('dark_completeBox');
    }
    close.addEventListener('click', removeNote);
}


function finishTask() {
    const item = this.parentNode,
        text = this.parentNode.innerText,
        completed = item.classList.contains('completed'),
        noteList = document.querySelector('#noteList'),
        completedNoteList = document.querySelector('#completedNoteList');

    if (item.classList.contains('completed')) {
        completedNoteList.removeChild(item);
        noteList.appendChild(item);
        item.classList.remove('completed');

    } else {
        completedNoteList.appendChild(item);
        item.classList.add('completed');
    }

    if (!completed) {
        data.todo.splice(data.todo.indexOf(text), 1);
        data.completed.push(text);

    } else {
        data.completed.splice(data.completed.indexOf(text), 1);
        data.todo.push(text);
    }
    saveList();
}

function removeNote() {
    const item = this.parentNode,
        text = this.parentNode.innerText,
        completed = item.classList.contains('completed');

    if (completed) {
        data.completed.splice(data.completed.indexOf(text), 1);
    } else {
        data.todo.splice(data.todo.indexOf(text), 1);
    }
    item.parentNode.removeChild(item);
    saveList();
}