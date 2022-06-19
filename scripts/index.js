const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('[name=user-name]');
const jobInput = document.querySelector('[name=user-job]');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserJob = document.querySelector('.profile__user-job');
const closeButtonProfile = document.querySelector('.popup-edit-profile__button-close');

const addButton = document.querySelector('.profile__add-button');
const popupImageActive = document.querySelector('.popup-image');
const popupProfileActive = document.querySelector('.popup-edit-profile');
const popupCardActive = document.querySelector('.popup-add-card');
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function showPopupEdit() {
	nameInput.value = profileUserName.textContent; 
	jobInput.value = profileUserJob.textContent; 
	openPopup(popupProfileActive, 'popup-edit-profile_opened'); 
} 

function openPopup (window, className) {
	window.classList.add(className);
}

function closePopup (window, className) {
	window.classList.toggle(className)
}

function submitPopupProfile (evt) {
	evt.preventDefault();

	console.log(nameInput.value);

	profileUserName.textContent = nameInput.value;
	profileUserJob.textContent = jobInput.value;
	closePopup(popupProfileActive, 'popup-edit-profile_opened');
}

function addCard(name, link) {
	const card = document.querySelector('#card').content;
	const element = card.querySelector('.element').cloneNode(true);
	
	element.querySelector('.element__image').src = link;
	element.querySelector('.element__image').alt = name;
	element.querySelector('.element__text').textContent = name;

	element.querySelector('.element__like').addEventListener('click', (evt) => {
				evt.target.classList.toggle('element_like-active');
			}
		);

	element.querySelector('.element__delete').addEventListener('click', () => {
				element.remove();
			}
		);
	element.querySelector('.element__image').addEventListener('click', () => {
			openPopup(popupImageActive, 'popup-image_opened');
		}
	);

	elements.prepend(element);
}

editButton.addEventListener('click', () => showPopupEdit());
addButton.addEventListener('click', () => openPopup(popupCardActive, 'popup-add-card_opened'));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfileActive, 'popup-edit-profile_opened')); 

initialCards.forEach(function (item) {
	addCard(item.name, item.link);
});