let editButton = document.querySelector('.profile__edit-button');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserJob = document.querySelector('.profile__user-job');
let submitButton = document.querySelector('.popup__button');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name=user-name]');
let jobInput = formElement.querySelector('[name=user-job]');
let popup = document.querySelector('.popup');

function showPopup() {
	nameInput.value = profileUserName.textContent;
	jobInput.value = profileUserJob.textContent;
	popup.classList.add('popup_opened');
}

function submitPopup (evt) {
	evt.preventDefault();
	profileUserName.textContent = nameInput.value;
	profileUserJob.textContent = jobInput.value;
	closePopup();
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
formElement.addEventListener('submit', submitPopup);
closeButton.addEventListener('click', closePopup);