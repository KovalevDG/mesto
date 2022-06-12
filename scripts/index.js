let editButton = document.querySelector('.profile__edit-button');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserJob = document.querySelector('.profile__user-job');
let addButton = document.querySelector('.profile__add-button');
let popupActive = document.querySelector('.popup');
let popupImageActive = document.querySelector('.popup-image');
let elements = document.querySelector('.elements');
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

function showPopupImage(title, link) {
	const popupImage = document.querySelector('#popup-image').content;
	let image = popupImage.querySelector('.popup-image__container').cloneNode(true);
	image.querySelector('.popup-image__title').textContent = title;
	image.querySelector('.popup-image__image').src = link;
	image.querySelector('.popup-image__image').alt = title;


	image.querySelector('.popup-image__button-close').addEventListener('click', () => {
		popupImageActive.classList.remove('popup-image_opened');
		image.remove();
	});

	popupImageActive.append(image);
	popupImageActive.classList.add('popup-image_opened');
}

function showPopup(items) {
	const popup = document.querySelector('#popup').content;
	let form = popup.querySelector('.popup__container').cloneNode(true);
	form.querySelector('.popup__title').textContent = items[0];
	form.querySelector('[name=fiald1]').id = items[1];
	form.querySelector('[name=fiald1]').placeholder = items[2];
	form.querySelector('[name=fiald1]').value = items[3];
	form.querySelector('[name=fiald2]').id = items[4];
	form.querySelector('[name=fiald2]').placeholder = items[5];
	form.querySelector('[name=fiald2]').value = items[6];

	form.querySelector('.popup__form').addEventListener('submit', (evt) => {
		evt.preventDefault();
		if (items[7] === 'addButton') {
			if (form.querySelector('[name=fiald1]').value || form.querySelector('[name=fiald2]').value) {
				addCard(form.querySelector('[name=fiald1]').value, form.querySelector('[name=fiald2]').value);
			} else {
				alert('Поля должны быть заполнены!');
			}
		} else if (items[7] === 'editButton') {
			profileUserName.textContent = form.querySelector('[name=fiald1]').value;
			profileUserJob.textContent = form.querySelector('[name=fiald2]').value;
		}
		popupActive.classList.remove('popup_opened');
		form.remove();
	});

	form.querySelector('.popup__button-close').addEventListener('click', () => {
		popupActive.classList.remove('popup_opened');
		form.remove();
	});

	popupActive.append(form);
	popupActive.classList.add('popup_opened');
}

function submitPopup (evt) {
	evt.preventDefault();
	profileUserName.textContent = nameInput.value;
	profileUserJob.textContent = jobInput.value;
	closePopup();
}

function addCard(name, link) {
	const card = document.querySelector('#card').content;
	let element = card.querySelector('.element').cloneNode(true);
	
	element.querySelector('.element__image').src = link;
	element.querySelector('.element__image').alt = name;
	element.querySelector('.element__text').textContent = name;

	element.querySelector('.element__like').addEventListener('click', (evt) => {
				evt.target.classList.toggle('element_like-active', true);
			}
		);

	element.querySelector('.element__delete').addEventListener('click', () => {
				element.remove();
			}
		);
	element.addEventListener('click', (evt) => {
			evt.preventDefault();
			showPopupImage(evt.target.alt, evt.target.src);
		}
	);

	elements.prepend(element);
}

editButton.addEventListener('click', () => {
	const items = [
				'Редактировать профиль',
				'name',
				'Название',
				profileUserName.textContent,
				'job',
				'Ссылка на картинку',
				profileUserJob.textContent,
				'editButton'
			];
	showPopup(items);

});

addButton.addEventListener('click', () => {
		const items = [
				'Новое место',
				'name',
				'Название',
				null,
				'link',
				'Ссылка на картинку',
				null,
				'addButton'
			];
		showPopup(items);

	}
);

for (let i = 0; i < 6; i++) {
	addCard(initialCards[i].name, initialCards[i].link);
}