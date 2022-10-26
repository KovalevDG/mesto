export default class UserInfo {
   constructor(selectors) {
      this._selectors = selectors;
      this._profileUserName = document.querySelector(selectors.userName);
      this._profileUserJob = document.querySelector(selectors.userJob);
      this._profileUserAvatar = document.querySelector(selectors.userAvatar);
   }
   getUserInfo() {
      this._userInfo = {};
      this._userInfo.userName = this._profileUserName.textContent;
      this._userInfo.userJob = this._profileUserJob.textContent;
      return this._userInfo;
   }
   setUserInfo(data) {
      this._profileUserName.textContent = data.name;
      this._profileUserJob.textContent = data.about;
   }
   setUsetAvatar(url) {
      this._profileUserAvatar.src = url;
   }
}