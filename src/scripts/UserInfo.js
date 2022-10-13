export default class UserInfo {
   constructor(selectors) {
      this._selectors = selectors;
   }
   getUserInfo() {
      this._userInfo = {};
      this._userName = document.querySelector(this._selectors.userName);
      this._userJob = document.querySelector(this._selectors.userJob);
      this._userInfo.userName = this._userName.textContent;
      this._userInfo.userJob = this._userJob.textContent;
      return this._userInfo;
   }
   setUserInfo(userName, userJob) {
      this._profileUserName = document.querySelector('.profile__user-name');
      this._profileUserJob = document.querySelector('.profile__user-job');
      this._profileUserName.textContent = userName;
      this._profileUserJob.textContent = userJob
   }
}