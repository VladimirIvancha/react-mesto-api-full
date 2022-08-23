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
      method: 'GET',
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  
  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }
  
  patchUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }
  
  changeLikeCardStatus(cardId, needLike) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: needLike ? "PUT" : "DELETE",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }
}

const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
}
  
const api = new Api({
  baseUrl: "https://api.vivanchafrontend.mestoproject.nomoredomains.sbs",
})
  
export {api};
  