let button = document.getElementById("register-button");
button.disabled = true;

let passwordInput = document.getElementById('password');
let confirmInput = document.getElementById("password-confirm");
let unsernameInput = document.getElementById("username")
confirmInput.addEventListener('input', ()=>{
    if(confirmInput.value === passwordInput.value && username){
        button.disabled = false;
    } else {
        button.disabled = true;
    }
})