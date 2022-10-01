export default class UserInfo {
   constructor(selectors) {
      this._selectors = selectors;
   }
   getUserInfo() {
      this._profileUserInfo = {};
      this._profileUserInfo.userName = document.querySelector(this._selectors.userName);
      this._profileUserInfo.userJob = document.querySelector(this._selectors.userJob);
      return this._profileUserInfo;
   }
   setUserInfo(userName, userJob) {
      this._selectors.userName = userName;
      this._selectors.userJob = userJob;
      console.log(this._selectors);
   }
}