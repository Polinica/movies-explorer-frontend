import CardButton from "../CardButton/CardButton";

function GeneralCardButton({ isSaved, onClick }) {
  const className = isSaved ? "card-button_type_done" : "card-button_type_save";
  const alt = isSaved ? "Удалить фильм из сохраненных" : "";

  return <CardButton className={className} alt={alt} onClick={onClick} />;
}

export default GeneralCardButton;
