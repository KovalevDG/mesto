export default class Api {
   constructor(options) {
      this._options = options;
      this._urlProfile = 'https://mesto.nomoreparties.co/v1/cohort-52/users/me';
      this._urlCards = 'https://mesto.nomoreparties.co/v1/cohort-52/cards';
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
         if(res.ok) {
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