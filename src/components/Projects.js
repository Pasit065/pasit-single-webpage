import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projDetails from "../projects_data.json";

export const Projects = ({imgParrentPath}) => {
  
    const getProjImgNamed = (projName) => {
      if (projName === "Embedded Smart Vision for Human and Detection and Counting") {
        return imgParrentPath + "graduated-proj-pic.jpg";
      } else if (projName === "Iss detection") {
        return imgParrentPath + "iss-detect-proj-pic.jpg";
      } else if (projName === "Synchronous speed calculation") {
        return imgParrentPath + "tkinter-proj-pic.jpg";
      } else if (projName === "Stock price detection") {
        return imgParrentPath + "stock-price-proj-pic.jpg";
      }  else if (projName === "Rain detection") {
        return imgParrentPath + "rain-detect-pic.jpg";
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
                <img src={imgParrentPath + "proj-header-pic.png"} alt="proj-header-pic" />
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