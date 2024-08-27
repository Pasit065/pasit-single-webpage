import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import PROJECT_DETAILS from "../constant/projects-details"


export const Projects = ({ imgParrentPath }) => {
  
    const projCards = PROJECT_DETAILS.map((proj, index) => {
      try {
        if (!proj.fileLocation) throw "unknown image path";
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