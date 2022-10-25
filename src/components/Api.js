export default class Api {
   constructor(options) {
      this._options = options;
   }

   setUserInfo = (url) => {
      fetch(url, this._options)
         .then(res => res.json())
         .then((data) => {
            const userName = data.name;
            const userAbout = data.about;
            // console.log(userName, userAbout);
            return userName;
         })
         .catch((err) => {
            console.log('Ошибка. Запрос не выполнен');
          }); 
   }
}