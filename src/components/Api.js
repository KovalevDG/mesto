export default class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   postCards(card) {
      return this._request(`${this._baseUrl}cards`, {
         method: 'POST',
         body: JSON.stringify(card),
         headers: this._headers
      });
   }

   putLikeCard(cardId) {
      return this._request(`${this._baseUrl}cards/${cardId}/likes`, {
         method: 'PUT',
         headers: this._headers
      });
   }

   removeLikeCard(card) {
      return this._request(`${this._baseUrl}cards/${card._id}/likes`, {
         method: 'DELETE',
         body: JSON.stringify(card),
         headers: this._headers
      });
   }

   editUserInfo(data) {
      return this._request(`${this._baseUrl}users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify(data)
      });
   }

   editUserAvatar(data) {
      return this._request(`${this._baseUrl}users/me/avatar`, {
         method: 'PATCH',
         body: JSON.stringify({
            avatar: data.avatar
         }),
         headers: this._headers
      });
   }

   deleteCard(card) {
      return this._request(`${this._baseUrl}cards/${card._id}`, {
         method: 'DELETE',
         headers: this._headers
      });
   }

   getUserInfo() {
      return this._request(`${this._baseUrl}users/me`, { headers: this._headers });
   }

   getInitialCards() {
      return this._request(`${this._baseUrl}cards`, { headers: this._headers });
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }else{
         return Promise.reject(`Ошибка: ${res.status}`);  
      }
   }

   _request(url, options) {
      return fetch(url, options).then(this._checkResponse);
    }
}