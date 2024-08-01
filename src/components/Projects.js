import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import graduatedProj from "../assets/img/graduated-proj-pic.jpg";
import issDetectProj from "../assets/img/iss-detect-proj-pic.jpg";
import synSpeedCalProj from "../assets/img/tkinter-proj-pic.jpg";
import stockPriceProj from "../assets/img/stock-price-proj-pic.jpg";
import rainDetectProj from "../assets/img/rain-detect-pic.jpg";
import projDetails from '../projects_data.json';
import projHeaderPic from "../assets/img/proj-header-pic.png";


export const Projects = () => {

    const getProjImgNamed = (projName) => {
      if (projName === "Embedded Smart Vision for Human and Detection and Counting") {
        return graduatedProj;
      } else if (projName === "Iss detection") {
        return issDetectProj;
      } else if (projName === "Synchronous speed calculation") {
        return synSpeedCalProj;
      } else if (projName === "Stock price detection") {
        return stockPriceProj;
      }  else if (projName === "Rain detection") {
        return rainDetectProj;
      } else {
        return ""
      }
    };

    const projCards = projDetails.map((proj, index) => {
      try {
        proj.projImg = getProjImgNamed(proj.name);
        if (!proj.projimg) throw "unknown image path";
      } catch (error) {
        console.log(`Image of projects named ${proj.name} is invalid. Because of ${error}`);
      }
      
      return (<ProjectCard projData={proj}  />)
    })

    return (
        <section className="proj-bx" id="projects">
          <Container>
            <Row className="proj-header-bx">
              <Col className="proj-col">
                <img src={projHeaderPic} alt="proj-header-pic" />
              </Col>
              <Col className="proj-col">
                <div className="proj-header-text">
                  <h1>Projects</h1>
                  <p>I have well experienced various Python and SQL projects but in this
                    part I will show you some example of interested projects heres.
                  </p>
                </div>
              </Col>
            </Row>
            {projCards}
          </Container>
        </section>
    )
}