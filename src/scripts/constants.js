const BUTTON_EDIT = document.querySelector('.profile__edit-button');
const BUTTON_ADD = document.querySelector('.profile__add-button');
const NAME_INPUT = document.querySelector('[name=user-name]');
const JOB_INPUT = document.querySelector('[name=user-job]');
const INITIAL_CARDS = [{
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

export {BUTTON_EDIT, BUTTON_ADD, NAME_INPUT, JOB_INPUT, INITIAL_CARDS};

