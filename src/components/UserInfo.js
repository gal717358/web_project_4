export class UserInfo {
  constructor(profileName, profileJob, profileImage) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
    this._image = document.querySelector(profileImage);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const job = this._job.textContent;
    return { name, job };
  }

  setUserInfo(userInfo) {
    const { name, job, avatar } = userInfo;
    this._name.textContent = name;
    this._job.textContent = job;
    this._image.src = avatar;
  }
}
