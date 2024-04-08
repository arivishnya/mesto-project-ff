const token = "a0036ef3-200a-495e-9686-79f48f6c8df6";
const cohort = "wff-cohort-10";

const config = {
  headers: {
    authorization: token,
  },
  headersWithContentType: {
    authorization: token,
    "Content-Type": "application/json",
  },
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  editBaseUrl: `https://nomoreparties.co/v1/${cohort}`,
};
let userId;

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

function handleError(error) {
  console.error(error);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleResponse)
    .then((result) => {
      userId = result._id;
      return result;
    })
    .catch(handleError);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function changeUserInfo(data) {
  return fetch(`${config.editBaseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function addCard(data) {
  return fetch(`${config.editBaseUrl}/cards`, {
    method: "POST",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function deleteCard(cardId) {
  return fetch(`${config.editBaseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function addCardLike(cardId) {
  return fetch(`${config.editBaseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function deleteCardLike(cardId) {
  return fetch(`${config.editBaseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

function changeUserAvatar(data) {
  return fetch(`${config.editBaseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => result)
    .catch(handleError);
}

export {
  userId,
  getUser,
  getCards,
  changeUserInfo,
  addCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
  changeUserAvatar,
};
