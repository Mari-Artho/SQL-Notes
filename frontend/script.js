const HOST = 'http://localhost:3000/'

loginScreen();

function tinyMCEInit() {
    tinymce.init({
        selector: '#textContent',
        plugins: "code",
        toolbar: " undo redo forecolor backcolor stylesselect | bold | italic alignleft alignright code",
        readonly : 1,
    
        setup: function(editor){
            editor.on("change", function(){
                editor.save();
            })
        }
    })    
}

//Page to show in the browser when log in is successful
function setLoggedInScreen(data) {
  let userName = data.userName;
  let userId = data.id;
  let upperName = userName.toUpperCase();
  loginResult.textContent = `Logged in user : ${upperName} (ID: ${userId})  `;
  // get list of all documents from that user

  fetch(HOST + 'documents/' + userId, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then(res => res.json()) // parse result
  .then(data => {    
      if (data.length == 0)
          return;
      let p = document.createElement("p");
      p.innerText = "Your documents:"
      documents.append(p)
      let list = document.createElement("ul")
      data.forEach(doc => {
        console.log(doc)
        let li = document.createElement("li")
        let docId = doc.documentID
        let button = document.createElement("button")
        button.innerText = "View"
        let div = document.createElement("div")
        div.append(doc.title + " ")
        div.append(button)
        li.append(div)
        button.addEventListener("click", (e) => {
            e.preventDefault();

            console.log("View doc " + docId)
            const newDiv = document.createElement("div");
            newDiv.setAttribute("id", "newDocument");
            document.body.innerHTML = `
  <p>Title</p>
  <p id="textTitle"></p>
  <div id="textContent"></div>
  <button id="editBtn">Edit</button>`
            let title = document.getElementById("textTitle")
            title.innerText = doc.title
            let text = document.getElementById("textContent")
            text.innerHTML = doc.content
            let editBtn = document.getElementById("editBtn")
            editBtn.addEventListener("click", (e) => {
                document.body.innerHTML = `
                <p>Title</p>
                <textarea id="textTitle"></textarea>
                <textarea id="textContent"></textarea>
                <button id="saveBtn">SAVE</button>`
                let title = document.getElementById("textTitle")
                title.innerText = doc.title
                let text = document.getElementById("textContent")
                text.innerHTML = doc.content
                //tinymce, WYSIWYG
                tinyMCEInit()
    //tinymce, WYSIWYG event button => SAVE
    document.getElementById("saveBtn").addEventListener("click", function(){
    
    //send data to database.
    let title = document.getElementById("textTitle").value;
    let content = document.getElementById("textContent").value;
    let newText = {
        id: docId,
        title: title,
        content: content
    };
    console.log(newText)
    fetch(HOST + 'documents/update', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
    })
})
            })
        }
        )
        list.append(li)
      })
      documents.append(list)
    })

  //create new document button.
  const newDocumentBtn = document.createElement("button");
  newDocumentBtn.innerText = " + Create a new document";
  const newDocument = document.getElementById('newDocument');
  newDocument.append(newDocumentBtn);
  //add id to subscribe btn.
  newDocumentBtn.setAttribute("id", "newDocumentBtn");

  //css, message
  loginResult.style.display = "flex";
  loginResult.style.flexDirection = "column";
  loginResult.style.fontFamily = "Rubik";
  //css, subscribe button
  newDocumentBtn.style.height = "30px";
  newDocumentBtn.style.width = "200px";
  newDocumentBtn.style.margin = "30px";

  //click button => create new doument
  const setNewDocument = document.getElementById("newDocumentBtn");
  setNewDocument.addEventListener("click", (e)=>{

     e.preventDefault();

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "newDocument");
  const newContent = document.createTextNode(`新しいドキュメントを書いてね`);
  document.body.innerHTML = `
  <p>Title</p>
  <textarea id="textTitle"></textarea>
  <textarea id="textContent"></textarea>
  <button id="saveBtn">SAVE</button>
  <div id="textTitleResult"></div>
  <div id="textResult"></div>`;
  newDocument.appendChild(newContent);

  //tinymce, WYSIWYG
  tinyMCEInit()
    //tinymce, WYSIWYG event butoon => SAVE
    document.getElementById("saveBtn").addEventListener("click", function(){
        document.getElementById("textTitleResult").innerHTML = document.getElementById("textTitle").value;
        document.getElementById("textResult").innerHTML = document.getElementById("textContent").value;
    
    
    //send data to database.
    let title = document.getElementById("textTitle").value;
    let content = document.getElementById("textContent").value;
    let newText = {
        userId: userId,
        title: title,
        content: content
    };
    console.log(newText)
    fetch(HOST + 'documents/new', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
    })
    .then(data => {
        console.log(data);
    });
  });
})


  //create back to page button.
  const backBtn = document.createElement("button");
  backBtn.innerText = "Log out"
  backBtn.id = "backLink"
  backBtn.addEventListener("click", backBtnClick)
  loginResult.append(backBtn);

  //back button
  function backBtnClick() {
      location.href = "index.html"
  }

  //css, backBtn
  backBtn.style.height = "30px";
  backBtn.style.width = "90px";
  backBtn.style.margin = "30px";
  const backLink = document.getElementById("backLink");
  backLink.style.textDecoration = "none";
  backLink.style.color = "black";
}

function loginFailMessage(){
    alert("Log in failed. Please try again.");
}

//show login screen
function loginScreen(){
    document.body.innerHTML = 
    `<div id="adminMessage"></div>
    <div id="loginResult">
        <h2>Log in</h2>
        <form>
            <input type="text" id="userName" placeholder="username">
            <input type="password" id="password" placeholder="password">
            <input type="submit" id="loginBtn" value="Log In">
        </form>
    </div>
    <div id="documents"></div>
    <div id="newDocument"></div>
    `
    //Log in button
    document.getElementById('loginBtn').addEventListener('click', (e)=>{

        e.preventDefault();

        let userName = document.getElementById('userName').value;
        let password = document.getElementById('password').value;

        let user = {
            userName: userName,
            password: password
        };

        fetch(HOST + 'login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json()) // parse result
        .then(data => {
            if (data.userName != ""){ 
                // empty user data <=> login failed
                setLoggedInScreen(data);
            } else {
                loginFailMessage();
            }
        });
    });
}
