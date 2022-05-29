let editButton = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__button');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('[name=user-name]');
let jobInput = formElement.querySelector('[name=user-job]');

function showPopup() {
	console.log('Похоже, что кнопку нажали');
	let popup = document.querySelector('.popup');
	popup.classList.add('popup_opened');
}

function submitPopup (evt) {
	evt.preventDefault();
	console.log('Похоже, что нажата кнопка сохранить');
	document.querySelector('.profile__user-name').textContent = nameInput.value;
	document.querySelector('.profile__user-job').textContent = jobInput.value;
}

function closePopup() {
	console.log('Похоже, что форму пора закрыть');
	let popup_opened = document.querySelector('.popup_opened');
	popup_opened.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
submitButton.addEventListener('submit', submitPopup);
closeButton.addEventListener('click', closePopup);