let editButton = document.querySelector('.profile__edit-button');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserJob = document.querySelector('.profile__user-job');
let submitButton = document.querySelector('.popup__button');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name=user-name]');
let jobInput = formElement.querySelector('[name=user-job]');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let elements = document.querySelector('.elements');
let arrayCards = [
	{
		urlImage: './images/karachaevsk.jpg',
		text    : 'Карачаевск',
	},
	{
		urlImage: './images/gora-elbrus.jpg',
		text    : 'Гора Эльбрус',
	},
	{
		urlImage: './images/dombay.jpg',
		text    : 'Домбай',
	},
	{
		urlImage: './images/gora-elbrus.jpg',
		text    : 'Гора Эльбрус',
	},
	{
		urlImage: './images/dombay.jpg',
		text    : 'Домбай',
	},
	{
		urlImage: './images/karachaevsk.jpg',
		text    : 'Карачаево-Черкесия',
	},

];

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

function addCard(text, urlImage) {
	const card = document.querySelector('#card').content;
	let element = card.querySelector('.element').cloneNode(true);
	
	element.querySelector('.element__image').src = urlImage;
	element.querySelector('.element__text').textContent = text;

	element.querySelector('.element__like').addEventListener('click', function (evt) {
				evt.target.classList.toggle('element_like-active', true);
			}
		);

	elements.append(element);
}

editButton.addEventListener('click', showPopup);
formElement.addEventListener('submit', submitPopup);
closeButton.addEventListener('click', closePopup);

addButton.addEventListener('click', () => {
		addCard(arrayCards[index].text, arrayCards[index].urlImage);
	}
);

for (let i = 0; i < 6; i++) {
	addCard(arrayCards[i].text, arrayCards[i].urlImage);
}