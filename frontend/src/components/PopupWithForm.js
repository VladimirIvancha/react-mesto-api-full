import { useEffect, memo } from "react";

function PopupWithForm({
  title,
  name,
  onClose,
  isOpen,
  onSubmit,
  canSubmit,
  isSubmitInLoading,
  buttonText,
  buttonTextInLoading,
  children,
}) {
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
    <section
      className={`popup ${isOpen && "popup_is-opened"} popup_type_${name}`}
      onMouseDown={handleMouseClick}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} noValidate onSubmit={onSubmit}>
          <fieldset className="form__edit">
            {children}
            <button
              type="submit"
              className={`popup__save-info${
                !canSubmit || isSubmitInLoading
                  ? " popup__save-info_inactive"
                  : ""
              }`}
              disabled={!canSubmit || isSubmitInLoading}
            >
              {isSubmitInLoading ? buttonTextInLoading : buttonText}
            </button>
          </fieldset>
        </form>
        
      </div>
    </section>
  );
}

export default memo(PopupWithForm);
