const usersList = new Map();
const displayNames = new Map();
const user_message = new Map();

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
