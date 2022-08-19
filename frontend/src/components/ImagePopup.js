import { useEffect, memo } from "react";

function ImagePopup({ card, onClose, isOpen }) {
  useEffect(() => {
    const handlerKeyClick = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handlerKeyClick);
    } else {
      document.removeEventListener("keydown", handlerKeyClick);
    }
  }, [isOpen]);

  function handleMouseClick(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen && "popup_is-opened"}`}
      onMouseDown={handleMouseClick}
    >
      <div className="popup__image-container">
        <button
          onClick={onClose}
          aria-label="закрыть"
          type="button"
          className="popup__close popup__close_correct"
        ></button>
        <img
            src={card.link}
            alt={card.name}
            className="popup__image"
        />
        <h4 className="popup__image-title">{card.name}</h4>  
      </div>
    </div>
  );
}

export default memo(ImagePopup);
