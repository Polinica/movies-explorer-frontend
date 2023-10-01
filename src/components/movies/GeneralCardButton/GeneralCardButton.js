import { CARD_TEXTS } from "../../../utils/config";
import CardButton from "../CardButton/CardButton";

function GeneralCardButton({ isSaved, onClick }) {
  const className = isSaved ? "card-button_type_done" : "card-button_type_save";
  const alt = isSaved ? CARD_TEXTS.DELETE_BUTTON_ALT : "";

  return <CardButton className={className} alt={alt} onClick={onClick} />;
}

export default GeneralCardButton;
