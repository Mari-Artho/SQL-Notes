const loggedIn = localStorage.getItem('loggedIn')

if (loggedIn != null) {
    let user = {
        id: loggedIn
    };
    console.log("Trying to restore session...")

    fetch('restore', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json()) // parse result
    .then(data => {
        if (data.email != ""){
            document.body.innerHTML = '<div id="loginResult"></div><section></section>'
            setLoggedInScreen(data);
        } else {
            loggedIn = null
        }
    })
}

if (loggedIn == null) {
    loginScreen();
}

//Page to show in the browser when log in is successful
function setLoggedInScreen(data) {
  loginResult.textContent = `Test Cpmpany Co.ltd `;
  //create add new document button.
  const addNewDocumentBtn = document.createElement("button");
  addNewDocumentBtn.innerText =  "Add new docoment";
  loginResult.append(addNewDocumentBtn);
  //add id to newDocument btn.
  addNewDocumentBtn.setAttribute("id", "newDocument");

  //css, message
  loginResult.style.display = "flex";
  loginResult.style.flexDirection = "column";
  loginResult.style.fontFamily = "Rubik";
  //css, newDocument button
  addNewDocumentBtn.style.height = "60px";
  addNewDocumentBtn.style.width = "400px";
  addNewDocumentBtn.style.margin = "30px";
 
  //hide section(login) area.
  document.querySelector("section").style.display = "none";

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
            <input type="text" id="email" placeholder="username">
            <input type="password" id="password" placeholder="password">
            <input type="submit" id="loginBtn" value="Log In">
        </form>
    </div>
    
    <ol id="newDocument"></ol>
    <div id="adminBtn"></div>`
    //Log in button
    document.getElementById('loginBtn').addEventListener('click', (e)=>{

        e.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let user = {
            email: email,
            password: password
        };

        fetch('login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json()) // parse result
        .then(data => {
            if (data.email != ""){ 
                // empty user data <=> login failed
                setLoggedInScreen(data);
                localStorage.setItem('loggedIn', data._id);
            } else {
                loginFailMessage();
            }
        });
    });

}