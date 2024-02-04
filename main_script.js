let noteTitle = [];
let noteText = [];

load();

function render() {
  let container = document.getElementById("content");
  container.innerHTML = "";
  container.innerHTML = generateContentHTML();

  for (let i = 0; i < noteTitle.length; i++) {
    const title = noteTitle[i];
    const text = noteText[i];
    document.getElementById("yourNotes").innerHTML += /*html*/ `
            <div class="note">
                <div>  
                    <h2>${title}</h2>       
                    <p>${text}</p>
                </div>
                <div class="delBtn_div">
                    <img src="./img/trash-bin.svg" class="deletenotebtn" onclick="deleteNote(${i})">
                </div>
            </div>
        `;
  }
}

function generateContentHTML(){
  return /*html*/`
        <div class="header"><img src="./img/noteIcon.svg" onclick="goToHomepage()" class="AppIcon"><h1>Deine Notizen</h1></div>
        <div class="mainArea">
            <div class="menu">
                <div>
                    <button  class="btn" onclick="loadDeletedNotes()"><div class="menubtn"><img src="./img/trash-bin.svg" class="deletenotebtn">Gelöschte Notitzen</div></button>
                </div>
            </div>
            <div class="subArea">
                <div class="creatorsArea">    
                    <div class="creator">
                        <div class="txt_inp">
                            <input class="inp_noteTitle" placeholder="Titel deiner Notiz" id="noteTitleInp"><br>
                            <textarea class="inp_txtArea" rows="6" placeholder="Notiztext hier..." id="noteTextarea"></textarea>
                        </div>
                        <button class="btn" onclick="addNote()" class="createnotebtn">Speichern</button>
                    </div>
                </div>
                <div class="notesArea" id="yourNotes"></div>
            </div>
        </div>
    `;
}

function addNote() {
  let titleInput = document.getElementById("noteTitleInp").value;
  let contentInput = document.getElementById("noteTextarea").value;

  if (!titleInput || !contentInput ) {
    alert(
      "Ihrer Notiz fehlt entweder den Title oder den Inhalt. Bitte fügen Sie diese in den ensprechenden Fehlder hinzu!"
    );
  } else {
    noteTitle.push(titleInput);
    noteText.push(contentInput);
  }
  render();
  save();
  load();
}

function save() {
  let noteTitleAsText = JSON.stringify(noteTitle);
  setArray("noteTitle", noteTitleAsText);

  let noteContentAsText = JSON.stringify(noteText);
  setArray("noteText", noteContentAsText);
}

function load() {
  let noteTitleAsText = getArray("noteTitle");
  let noteContentAsText = getArray("noteText");

  if (noteTitleAsText && noteContentAsText) {
    noteTitle = JSON.parse(noteTitleAsText);
    noteText = JSON.parse(noteContentAsText);
  }
  render();
}
