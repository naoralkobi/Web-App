const usersList = new Map();
const displayNames = new Map();
const user_message = new Map();

usersList.set("avivharel",12345678)
displayNames.set("avivharel","avivi123");

usersList.set("naoralkobi",12345678)
displayNames.set("naoralkobi","naori");

usersList.set("yossiMaatuk",12345678)
displayNames.set("yossiMaatuk","yossik");

usersList.set("superman",12345678)
displayNames.set("superman","supermen");

usersList.set("nanabanana",12345678)
displayNames.set("nanabanana","nanabanana123");

// show error message.
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

// function to set the error message
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

// function to clear the error message
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function saveProfilePicture(event){
    var image = document.getElementById('imgOutput1');

    image.src = URL.createObjectURL(event.target.files[0]);

    localStorage.setItem("profile_pic", image.src);

    document.getElementById("chooseText").innerText = "";
}

function setConnectedUser() { 
    localStorage.setItem("connectedUser", true);

}

function validate()
{
    let name = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    if(usersList.has(name) && usersList.get(name) == password)
    {

        localStorage.setItem("user_display_name", displayNames.get(name));
        connection(name,password);
    }
}
