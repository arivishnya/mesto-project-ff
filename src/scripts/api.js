const token = "a0036ef3-200a-495e-9686-79f48f6c8df6";
const cohort = "wff-cohort-10";
const url = `https://mesto.nomoreparties.co/v1/${cohort}`;
const urlChangeData = `https://nomoreparties.co/v1/${cohort}`;
let userId;

function getUser() {
  return fetch(`${url}/users/me`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      userId = result._id;
      return result;
    });
}

function getCards() {
  return fetch(`${url}/cards`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => result);
}

function changeUserInfo(data) {
  return fetch(`${urlChangeData}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => result);
}

function addCard(data) {
  return fetch(`${urlChangeData}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => result);
}

function deleteCard(cardId) {
  return fetch(`${urlChangeData}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => result);
}

export { userId, getUser, getCards, changeUserInfo, addCard, deleteCard };
