import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import * as auth from "../utils/auth.js";
import React, { useState } from "react";
import { api } from "../utils/api";
import { useEffect, memo } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import unSuccess from "../images/unSuccess.svg";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isSubmitInLoading, setIsSubmitInLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: " ", link: " " });

  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [message, setMessage] = useState({ img: "", text: "" });

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log("Ошибка! Что-то пошло не так!");
          setCurrentUser({ name: "Ошибка!", about: "Ошибка!" });
        });
      tokenCheck();
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      });
  }

  function handleCardDelete(card) {
    setIsSubmitInLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки! Что-то пошло не так");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .postCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка! Что-то пошло не так!");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function closeAllPopups() {
    setIsOpenEditProfile(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsOpenEditProfile(true);
    setIsSubmitInLoading(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleTrashButtonClick(card) {
    setIsDeletePlacePopupOpen(true);
    setIsSubmitInLoading(false);
    setSelectedCard(card);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getCheckToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((result) => {
        setEmail(result.data.email);
        history.push("/sign-in");
        setMessage({ img: success, text: "Вы успешно зарегистрировались!" });
      })
      .catch(() =>
        setMessage({
          img: unSuccess,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleAuth(password, email) {
    auth.authorize(password, email).then((token) => {
      auth
        .getCheckToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch(() => {
          setMessage({
            img: unSuccess,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          setIsInfoTooltipOpen(true);
        });
    });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} loggedIn={loggedIn} onSignOut={onSignOut} />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegistration}
              isOpen={isOpenEditProfile}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />
          </Route>
          <Route path="/sign-in">
            <Login onAuth={handleAuth} isOpen={isOpenEditProfile} />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onTrashClick={handleTrashButtonClick}
            closeAllPopups={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onUpdateAvatar={handleUpdateAvatar}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            cards={cards}
            isOpenEditProfile={isOpenEditProfile}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isDeletePlacePopupOpen={isDeletePlacePopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            isSubmitInLoading={isSubmitInLoading}
            isSubmitSuccess={isSubmitSuccess}
            selectedCard={selectedCard}
          />
        </Switch>
        <Footer />
        <InfoTooltip
          name="infoToolTip"
          isOpen={isInfoTooltipOpen}
          img={message.img}
          title={message.text}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default memo(App);
