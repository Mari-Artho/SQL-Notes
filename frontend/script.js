const loggedIn = localStorage.getItem('loggedIn')

const HOST = 'http://localhost:3000/'

loginScreen();

//Page to show in the browser when log in is successful
function setLoggedInScreen(data) {
  let userName = data.userName;
  let upperName = userName.toUpperCase();
  loginResult.textContent = `Log in user : ${upperName}   `;
  //create new document button.
  const newDocumentBtn = document.createElement("button");
  newDocumentBtn.innerText = " + Create a new document";
  loginResult.append(newDocumentBtn);
  //add id to subscribe btn.
  newDocumentBtn.setAttribute("id", "newDocument");

  //css, message
  loginResult.style.display = "flex";
  loginResult.style.flexDirection = "column";
  loginResult.style.fontFamily = "Rubik";
  //css, subscribe button
  newDocumentBtn.style.height = "30px";
  newDocumentBtn.style.width = "200px";
  newDocumentBtn.style.margin = "30px";

  //click button => create new doument
  const setNewDocument = document.getElementById("newDocument");
  setNewDocument.addEventListener("click", setttingNewDocument);

  //SettingNewDocument button
  function setttingNewDocument(){
    //newDocumentBtn.disabled = "disabled";
    //newDocumentBtn.innerText = "Write here!!" ;

    fetch(HOST + 'users', {
        method: 'put',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
  }

  //create back to page button.
  const backBtn = document.createElement("button");
  backBtn.innerText = "Log out"
  backBtn.id = "backLink"
  backBtn.addEventListener("click", backBtnClick)
  loginResult.append(backBtn);

  //back button
  function backBtnClick() {
      localStorage.removeItem("loggedIn")
      location.href = "index.html"
  }

  //css, backBtn
  backBtn.style.height = "40px";
  backBtn.style.width = "100px";
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
    
    <div id="adminBtn"></div>`
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
                localStorage.setItem('loggedIn', data._id);
            } else {
                loginFailMessage();
            }
        });
    });
}