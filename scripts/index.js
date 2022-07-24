const popups = document.querySelectorAll('.popup');
const popupOverlayProfile = document.querySelector('.popup-edit-profile');
const popupProfileActive = document.querySelector('.popup-edit-profile');
const closeButtonProfile = popupProfileActive.querySelector('.popup-edit-profile__button-close');
const formElementProfile = document.forms['form-edit-profile']; 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('[name=user-name]');
const jobInput = document.querySelector('[name=user-job]');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserJob = document.querySelector('.profile__user-job');

const card = document.querySelector('#card').content;
const popupOverlayAddCard = document.querySelector('.popup-add-card');
const listElement = document.querySelector('#card');
const titleInput = document.querySelector('[name=card-title]');
const linkInput = document.querySelector('[name=card-link]');
const formElementAddCard = document.forms['form-add-card'];
const popupCardActive = document.querySelector('.popup-add-card');
const closeButtonAddCard = document.querySelector('.popup-add-card__button-close')

const popupImageActive = document.querySelector('.popup-image');
const closeButtonImage = popupImageActive.querySelector('.popup-image__button-close')
const cardTitle = popupImageActive.querySelector('.popup-image__title');
const cardLink = popupImageActive.querySelector('.popup-image__image');
const elements = document.querySelector('.elements');
const initialCards = [{
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
    openPopup(popupProfileActive);
}

function submitPopupProfile(evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserJob.textContent = jobInput.value;
    closePopup(popupProfileActive);
}

function showPopupAddCard() {
    formElementAddCard.reset();
    openPopup(popupCardActive);
}

function submitPopupAddCard(evt) {
    evt.preventDefault();
    addCard(elements, createCard(titleInput.value, linkInput.value));
    closePopup(popupCardActive);
}

function showPopupImage() {
    openPopup(popupImageActive);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popupAddEventListener();
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function popupAddEventListener() {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__button-close')) {
                closePopup(popup);
            }
        })
    });
}


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function createCard(name, link) {
    const element = card.querySelector('.element').cloneNode(true);

    element.querySelector('.element__image').src = link;
    element.querySelector('.element__image').alt = name;
    element.querySelector('.element__text').textContent = name;

    element.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element_like-active');
    });
    element.querySelector('.element__delete').addEventListener('click', () => {
        element.remove();
    });
    element.querySelector('.element__image').addEventListener('click', () => {
        cardTitle.textContent = name;
        cardLink.src = link;
        cardLink.alt = name;
        showPopupImage();
    });
    return element;
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

editButton.addEventListener('click', () => showPopupEdit());

addButton.addEventListener('click', () => {
    const buttonElement = formElementAddCard.querySelector('.popup__submit-button');
    const inputList = Array.from(formElementAddCard.querySelectorAll('.popup__input'));
    toggleButtonState(buttonElement, inputList);
    showPopupAddCard();
});
formElementProfile.addEventListener('submit', submitPopupProfile);
formElementAddCard.addEventListener('submit', submitPopupAddCard);

initialCards.forEach(function (item) {
	addCard(elements, createCard(item.name, item.link));
});

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active',
}); 