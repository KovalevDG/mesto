export default class UserInfo {
   constructor(selectors) {
      this._selectors = selectors;
   }
   getUserInfo() {
      return this._selectors;
   }
   setUserInfo(userName, userJob) {
      this._selectors.userName = userName;
      this._selectors.userJob = userJob;
   }
}