const secure = document.getElementById('secure');
const hideItems = document.getElementById('hideItems');
const password = document.getElementById('password').value;
const error = document.getElementById('error');
const submit = document.getElementById('Submit');


hideItems.style.display = 'none';

submit.addEventListener('click', () => {
    var code = 220502080;
    // const new_password = password.textContent.trim();

    if (password === code){
        hideItems.style.display = "block";
        secure.style.display = 'none';
    } else{
        // error.textContent = "Invaid Password";
        // error.style.color ="red";
        alert("Incorrect password");
    }
});
