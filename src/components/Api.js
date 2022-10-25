export default class Api {
   constructor(options) {
      this._options = options;
   }

   getUserInfo(url) {
      return this._getDataServer(url);
   }

   getInitialCards(url) {
      return this._getDataServer(url);
   }

   _getDataServer(url){
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