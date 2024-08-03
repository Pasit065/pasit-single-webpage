
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export const Skills = () => {
  const svgParrentPath = process.env.PUBLIC_URL + "/assets/svg/";
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



    return (
        <section className="skill" id="skills">
          <Container className="skill-bx">
            <Row>
              <Col>
              <div className="code-skill-header">
                <h1>Coding Skills</h1>
                <p>This is the list of my skills in coding world that include my available coding 
                  language.
                </p>
              </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <Carousel responsive={responsive} infinite={true} className="skill-slider" >
                <div className="item">
                  <img src={svgParrentPath + "python-pic.svg"} />
                  <h2>Python</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "sql-pic.svg"} />
                  <h2>Sql</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "js-pic.svg"} />
                  <h2>Javascript</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "html-pic.svg"} />
                  <h2>Html</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "css-pic.svg"} />
                  <h2>Css</h2>
                </div>
              </Carousel>
              </Col>
            </Row>
          </Container>
          <Container className="other-skill-bx">
            <Row>
              <div className="other-skill-header">
                <h1>Others skills</h1>
                  <p>I have experience of coding by studing by myself in i have done various projects
                  that i uses various framework and module such as turtle, requests, react and I have learned git command and doing well with command prompt and also i can uses GitHub to store my projects repository. 
                  And heres is my useful framework. 
                  </p>
              </div>
            </Row>
            <Row>
              <Carousel responsive={responsive} infinite={true} className="skill-slider" >
                <div className="item">
                  <img src={svgParrentPath + "requests-pic.svg"} />
                  <h2>requests</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "react-pic.svg"} />
                  <h2>React</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "smtp-pic.svg"} />
                  <h2>smtp</h2>
                </div>
                <div className="item">
                  <img src={svgParrentPath + "flask-pic.svg"} />
                  <h2>flask</h2>
                </div>
              </Carousel>
            </Row>
          </Container>
        </section>
    )
}