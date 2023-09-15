import "./Student.css";
import Article from "../Article/Article";
import AboutMe from "../main/AboutMe/AboutMe";
import Portfolio from "../main/Portfolio/Portfolio";

function Student() {
  return (
    <Article title="Студент" navId="student">
      <AboutMe />
      <Portfolio />
    </Article>
  );
}

export default Student;
