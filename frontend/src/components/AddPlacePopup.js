import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, memo } from "react";

function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
  isSubmitInLoading,
  isSubmitSuccess,
}) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [errorInputName, setErrorInputName] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [inputLinkValidation, setErrorInputLink] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [isUserUseInputName, setIsUserUseInputName] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setIsUserUseInputName(false);
    setErrorInputLink(false);
  }, [isOpen]);

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]); 

  useEffect(() => {
    if (isSubmitSuccess) {
      setCardName("");
      setCardLink("");
      setErrorInputName({ isValid: false, errorMessage: "" });
      setErrorInputLink({ isValid: false, errorMessage: "" });
    }
  }, [isSubmitSuccess]);

  useEffect(() => {
    setCanSubmit(errorInputName.isValid && inputLinkValidation.isValid);
  }, [errorInputName, inputLinkValidation]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: cardName, link: cardLink });

    setIsUserUseInputName(false);
    setErrorInputLink(false);
  }

  function handleOnChangeInputName(e) {
    setCardName(e.target.value);
    setIsUserUseInputName(true);
    setErrorInputName({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  function handleOnChangeInputLink(e) {
    setCardLink(e.target.value);
    setErrorInputLink(true);
    setErrorInputLink({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="element-form"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
      isSubmitInLoading={isSubmitInLoading}
      buttonText="Сохранить"
      buttonTextInLoading="Сохранение..."
    >
        <input
          value={cardName}
          type="text"
          className="form__item"
          name="element-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleOnChangeInputName}
        />
        <span
          className={`form__input-error${
            !errorInputName.isValid ? " form__input-error_active" : ""
          }`}
          id="element-name-error"
        >
          {isUserUseInputName ? errorInputName.errorMessage : ""}
        </span>
        <input
          value={cardLink}
          type="url"
          className="form__item"
          name="element-link"
          placeholder="Ссылка на фотографию"
          required
          onChange={handleOnChangeInputLink}
        />
        <span
          className={`form__input-error${
            !inputLinkValidation.isValid ? " form__input-error_active" : ""
          }`}
          id="element-link-error"
        >
          {inputLinkValidation ? inputLinkValidation.errorMessage : ""}
        </span>
    </PopupWithForm>
  );
}

export default memo(AddPlacePopup);
