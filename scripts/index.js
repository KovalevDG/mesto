const popupProfileActive = document.querySelector('.popup-edit-profile');
const closeButtonProfile = popupProfileActive.querySelector('.popup-edit-profile__button-close');
const formElementProfile = popupProfileActive.querySelector('.popup-edit-profile__form');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('[name=user-name]');
const jobInput = document.querySelector('[name=user-job]');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserJob = document.querySelector('.profile__user-job');

const addButton = document.querySelector('.profile__add-button');
const listElement = document.querySelector('#card');
const titleInput = document.querySelector('[name=card-title]');
const linkInput = document.querySelector('[name=card-link]');
const formElementAddCard = document.querySelector('.popup-add-card__form');
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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function createCard(name, link) {
    const card = document.querySelector('#card').content;
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
addButton.addEventListener('click', () => showPopupAddCard());
formElementProfile.addEventListener('submit', submitPopupProfile);
formElementAddCard.addEventListener('submit', submitPopupAddCard);


closeButtonProfile.addEventListener('click', () => closePopup(popupProfileActive));
closeButtonAddCard.addEventListener('click', () => closePopup(popupCardActive));
closeButtonImage.addEventListener('click', () => closePopup(popupImageActive));

initialCards.forEach(function(item) {
    addCard(elements, createCard(item.name, item.link));
});

enableValidation({
    formSelectorProfile: 'popup-edit-profile__form',
    inputSelectorProfile: 'popup-edit-profile__input',
    submitButtonSelectorProfile: 'popup-edit-profile__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
});