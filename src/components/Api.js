export default class Api {
   constructor(options) {
      this._options = options;
      this._urlProfile = 'https://mesto.nomoreparties.co/v1/cohort-52/users/me';
      this._urlCards = 'https://mesto.nomoreparties.co/v1/cohort-52/cards';
   }

   postCards(card) {
      return fetch(this._urlCards, {
         method: 'POST',
         body: JSON.stringify(card),
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if(res.ok) {
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   putLikeCard(cardId) {
      return fetch(this._urlCards + '/' + cardId + '/likes', {
         method: 'PUT',
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if(res.ok) {
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   removeLikeCard(card) {
      return fetch(this._urlCards + '/' + card._id + '/likes', {
         method: 'DELETE',
         body: JSON.stringify(card),
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if(res.ok) {
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   editUserInfo(data) {
      return fetch(this._urlProfile, {
         method: 'PATCH',
         body: JSON.stringify(data),
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if (res.ok) {
               console.log(res);
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   editUserAvatar(data) {
      return fetch(this._urlProfile + '/avatar', {
         method: 'PATCH',
         body: JSON.stringify({
            avatar: data.avatar
         }),
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if (res.ok) {
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   deleteCard(data) {
      return fetch(this._urlCards + '/' + data._id, {
         method: 'DELETE',
         headers: {
            authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
            'Content-Type': 'application/json'
         }
      })
         .then((res) => {
            if (res.ok) {
               console.log(res);
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);  
            }
         })
         .catch((err) => console.log(err));
   }

   getUserInfo() {
      return this._getData(this._urlProfile);
   }

   getInitialCards() {
      return this._getData(this._urlCards);
   }

   _getData(url) {
      return fetch(url, this._options)
         .then((res) => {
            if(res.ok){
               return res.json();
            }else{
               return Promise.reject(`Ошибка: ${res.status}`);
            }
      });
   }
}