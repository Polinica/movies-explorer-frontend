import AuthLinks from "../AuthLinks/AuthLinks";
import Promo from "../main/Promo/Promo";
import NavTab from "../main/NavTab/NavTab";
import Student from "../Student/Student";
import AboutProject from "../main/AboutProject/AboutProject";
import Techs from "../main/Techs/Techs";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Landing() {
  return (
    <>
      <Header isThemed={true} />
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
