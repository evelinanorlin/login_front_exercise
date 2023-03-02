// API ska hantera inloggnongen
// frontend med inloggningsformulär
// Formulär ska skicka användarnamn och lösenord till server
//Global array på servern
// alla användare ska ha unikt ID
// Servern ska kolla om det är en korrekt inloggning, i så fall svara med användarens ID, spara detta i localStorage på klienten.
// Vid felaktig inloggning skall en error skickas tillbaka.

// Två formulär (logga in, skapa användare)

const userList = document.getElementById('user-list');
const saveUserBtn = document.getElementById('newUserBtn');
const newUser = document.getElementById('newUser');
const newPassword = document.getElementById('newPassword');
const loginUser = document.getElementById('loginUser');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {
    printUsers(data);
  })

function printUsers(users){
  userList.innerHTML = ``;

  users.map(user => {
    let li = document.createElement("li");
    li.id = user.id;
    li.innerHTML = user.username + " " + user.password;

    userList.appendChild(li)
  })
}

saveUserBtn.addEventListener('click', () => {
  let user = {username: newUser.value, password: newPassword.value}
  
  fetch("http://localhost:3000/users/newuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => printUsers(data))
})

loginBtn.addEventListener('click', () => {
  let userLogin = {username: loginUser.value, password: loginPassword.value}

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.message.username)

      if(data.message.id){
        loginMessage.innerText = `Du är inloggad`;
      } else{
        loginMessage.innerText = `Fel användarnamn eller lösenord`;
      }
    })
})
  // fetch("http://localhost:3000/users")
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data);
  //   for (let i = 0; i < data.length; i++){
  //     if(loginUser.value === data[i].username && loginPassword.value === data[i].password){
  //       console.log("succes!")
  //     }
  //   }
  // })


