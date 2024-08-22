import { Container, Row, Col } from "react-bootstrap";

export const ProjectCard = ({projData}) => {
    return (
        <Container className="proj-card-bx" id={
          projData.name === "Embedded Smart Vision for Human and Detection and Counting"? "graduated_project": projData.name
        }>
          <Row>
            <Col xs={12} md={6} className="proj-col">
              <div className="proj-content-text">
                <h1>{projData.name === "Embedded Smart Vision for Human and Detection and Counting" &&
                  "Graduated Project:  \n"}{projData.name}</h1>
                <p>{projData.message}</p>
              </div>
            </Col>
            <Col xs={12} md={6} className="proj-col">
              <img src={projData.fileLocation} alt="proj-img" />
            </Col>
          </Row>
        </Container>
        
    )
} 