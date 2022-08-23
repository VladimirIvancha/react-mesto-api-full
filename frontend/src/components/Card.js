import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-icon${isLiked ? " element__like-icon-active" : ""}`
  );

  const cardLikesCount = props.card.likes.length;

  return (
    <article className="element">
      <img
        src={props.card.link}
        className="element__image"
        alt={props.card.name}
        onClick={() => props.onCardClick(props.card)}
      />
          {isOwn && (
          <button
            type="button"
            aria-label="удалить"
            className="element__delete-button"
            onClick={() => props.onTrashClick(props.card)}
          />
          )}
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-wrapper"> 
            <button 
              type="button" 
              aria-label="лайкнуть" 
              className={cardLikeButtonClassName}
              onClick={() => props.onCardLike(props.card)}
            />
              <span className="element__like-value">
                {cardLikesCount === 0 ? "" : cardLikesCount}
              </span>
            </div>
      </div>      
    </article>
  );
}

export default Card;
