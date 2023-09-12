import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import Student from "../Student/Student";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Footer from '../Footer/Footer';

function Landing() {
  return (
    <>
      <header>header</header>
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <Student />
      </main>
      <Footer />
    </>
  );
}

export default Landing;
