let deletedNoteTitles = [];
let deletedNoteContents = [];

loadDeletedNotes();

function deleteNote(i) {
    deletedNoteTitles.push(noteTitle[i]);
    deletedNoteContents.push(noteText[i]);

    noteTitle.splice(i, 1);
    noteText.splice(i, 1);

    render();
    save();
    load();
}

function saveDeletedNotes() {
    let deletedNoteTitlesAsText = JSON.stringify(deletedNoteTitles);
    setArray('deletedNoteTitles', deletedNoteTitlesAsText);

    let deletedNoteContentsAsText = JSON.stringify(deletedNoteContents);
    setArray('deletedNoteContents', deletedNoteContentsAsText);
}

function loadDeletedNotes() {
    let deletedNoteTitlesAsText = getArray('deletedNoteTitles');
    let deletedNoteContentsAsText = getArray('deletedNoteContents');

    if (deletedNoteTitlesAsText && deletedNoteContentsAsText) {
        deletedNoteTitles = JSON.parse(deletedNoteTitlesAsText);
        deletedNoteContents = JSON.parse(deletedNoteContentsAsText);
    }

    renderDeletedNotes();
}

function renderDeletedNotes() {
    let container = document.getElementById('content');
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <div class="header"><img src="./img/trash-bin.svg" onclick="goToHomepage()" class="AppIcon"><h1>Gelöschte Notizen</h1></div>        
        <div class="mainArea">
            <div class="menu">
                <div>
                    <button class="btn" onclick="goToHomepage()"><div class="menubtn"><img src="./img/noteIcon.svg" class="deletenotebtn">Zurück zu deine Notizen</div></button>
                </div>
            </div>
            <div class="subArea">    
                <div class="notesArea" id="yourDeletedNotes"></div>
            </div>
        </div>
    `;

    for (let i = 0; i < deletedNoteTitles.length; i++) {
        const deletedTitle = deletedNoteTitles[i];
        const deletedContents = deletedNoteContents[i];

        let delN_container = document.getElementById('yourDeletedNotes');
        delN_container.innerHTML += /*html*/`
            <div class="note">
                <div>
                    <h2>${deletedTitle}</h2>       
                    <p>${deletedContents}</p>
                </div>
                <div class="delBtn_div">
                    <img src="./img/trash-bin.svg" class="deletenotebtn" onclick="deleteNoteCompletely(${i})">
                </div>
            </div>
        `;
    }
}

function deleteNoteCompletely(i) {
    deletedNoteTitles.splice(i, 1);
    deletedNoteContents.splice(i, 1);
    
    renderDeletedNotes();
}
