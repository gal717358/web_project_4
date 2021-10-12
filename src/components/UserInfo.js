export class UserInfo {
  constructor(profileName, profileJob) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const job = this._job.textContent;
    return { name, job };
  }

  setUserInfo(userInfo) {
    const { name, job } = userInfo;
    this._name.textContent = name;
    this._job.textContent = job;
  }
}