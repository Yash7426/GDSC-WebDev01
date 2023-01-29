let addBtn = document.getElementById("addBtn");
let addtitle = document.getElementById("addTitle");
let addTime = document.getElementById("addTime");
let addTxt = document.getElementById("addTxt");
// console.log(addBtn);
// console.log(addTime);
// console.log(addTxt);
// console.log(addtitle);

showNotes();

function fname()
{
     // fetch notes from local storage 
     let notes = localStorage.getItem("notes"); // key = "notes" 
     // console.log(notes);
     if(notes==null) // initially notes == null
     {
         // we will store notes in notesobj
         notesobj = [];
     }else
     {
        // get item returns in the format of string 
        // so converting it into object format using JSON.parse
        notesobj = JSON.parse(notes);  // string -> Object 
     }

     // initialising a obj with new values 
     let newobj = 
     {
        title: addtitle.value,
        text: addTxt.value,
        time: addTime.value,
     };
     console.log(newobj);

     // so all the 3 fields are now stored in the form of an object

     // pushing this newobj in the already stored notes 
     notesobj.push(newobj);
     localStorage.setItem("notes",JSON.stringify(notesobj)); // object -> string
     // empty 
     addTxt.value = "";
     addtitle.value = "" ;
     addTime.value = "";

    //  shownotes function 
    showNotes();
}

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
      html += ` 
          <div class="noteCard my-2 mx-3 card">
          <div class="container-fluid card-body">
              <h3 class="card-title">${element.title}</h3>
              <p class="card-text" id='${index}'>${element.text}</p>
              <h3 class="card-title">${element.time}</h3>
              <button id="${index}" onclick="deleteNote(this.id)" class="classic-btn">Delete Note</button>
          </div>
       </div> `;
      //  this.id is used to give the id of that particular element
    });


    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) 
    {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `<div class="alert alert-primary no-note-warning" role="alert">
          No notes found. Please enter a note above
        </div>`;
    }
  }

// Event Listener's
addBtn.addEventListener("click",fname)


function deleteNote(index)
{
    let notes  = localStorage.getItem("notes");
    if(notes==null)
    {
        notesobj =[];
    }else 
    {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1); // deletes exactly one element at index
    localStorage.setItem("notes",JSON.stringify(notesobj));
    showNotes();
}