export default class UserInfo {
   constructor(selectors) {
      this._selectors = selectors;
      this._profileUserName = document.querySelector(selectors.userName);
      this._profileUserJob = document.querySelector(selectors.userJob);
   }
   getUserInfo() {
      this._userInfo = {};
      this._userInfo.userName = this._profileUserName.textContent;
      this._userInfo.userJob = this._profileUserJob.textContent;
      return this._userInfo;
   }
   setUserInfo(userName, userJob) {
      this._profileUserName.textContent = userName;
      this._profileUserJob.textContent = userJob
   }
}