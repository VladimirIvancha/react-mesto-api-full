class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then(this._checkResponse)
        .then((result) => {
          return result;
        });
    }
  
    patchUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then(this._checkResponse);
    }
  
    patchUserAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar,
        }),
      }).then(this._checkResponse);
    }
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then(this._checkResponse)
        .then((result) => {
          return result;
        });
    }
    postCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then(this._checkResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    changeLikeCardStatus(cardId, needLike) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: needLike ? "PUT" : "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }
  
  const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
    headers: {
      authorization: "ab243ec9-3aed-4ed2-9077-4cc2ab0d2543",
      "Content-Type": "application/json",
    },
  });
  
  export {api};
  