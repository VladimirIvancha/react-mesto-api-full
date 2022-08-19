function InfoTooltip ({
  name, 
  isOpen, 
  img, 
  title, 
  onClose
}) {
  const classNamePopup = `popup ${name} ${isOpen && 'popup_is-opened'}`
  
  return (
    <div className={classNamePopup}>
      <div className="infoToolTip__info">
        <img src={img} alt={title} className="infoToolTip__image"/>
        <h2 className="infoToolTip__title">{title}</h2>
        <button className="infoToolTip__button-close" type="button" onClick={onClose}></button>
      </div>
    </div>  
  )
}

export default InfoTooltip