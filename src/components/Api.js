const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .catch(console.log());

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  getUserInfo() {
    return customFetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  createCard(data) {
    return customFetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return customFetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  likeCard(cardId) {
    return customFetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: "PUT",
    });
  }
  deleteLike(cardId) {
    return customFetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  avatarImage(avatarSrc) {
    return customFetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarSrc,
      }),
    });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "c1447c07-9b09-4ed7-9490-5ede153a83d9",
    "Content-Type": "application/json",
  },
});
