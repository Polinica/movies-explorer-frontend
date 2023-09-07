import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import Article from "../Article/Article";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

function Landing() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Article title="Студент" navId="about-me">
        <div>Описание</div>
        <div>Портфолио</div>
      </Article>
    </main>
  );
}

export default Landing;
