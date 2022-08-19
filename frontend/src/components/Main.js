import ImagePopup from "./ImagePopup";
import { useContext, memo } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onTrashClick,
  closeAllPopups,
  onUpdateUser,
  onUpdateAvatar,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  cards,
  isOpenEditProfile,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeletePlacePopupOpen,
  isImagePopupOpen,
  isSubmitInLoading,
  isSubmitSuccess,
  selectedCard,
}) 

{   
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div 
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__info">
            <div className="profile__title-wrapper">
              <div className="profile__text">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button 
                type="button" aria-label="редактировать" 
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
             </div>
           </div>
        </div>
        <button 
          type="button" 
          aria-label="добавить" 
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <div className="elements">
      {cards.map((card) => 
          (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashClick={onTrashClick}
            />
          )
        )}
      </div>
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isOpenEditProfile}
        onUpdateUser={onUpdateUser}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={onUpdateAvatar}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={onAddPlaceSubmit}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <DeletePopup
        onClose={closeAllPopups}
        isOpen={isDeletePlacePopupOpen}
        card={selectedCard}
        onCardDelete={onCardDelete}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
    </main>
  );
}
  
export default memo(Main);