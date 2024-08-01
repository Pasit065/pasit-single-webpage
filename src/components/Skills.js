
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import pyLogo from '../assets/svg/python-pic.svg';
import jsLogo from '../assets/svg/js-pic.svg';
import htmlLogo from '../assets/svg/html-pic.svg';
import cssLogo from '../assets/svg/css-pic.svg';
import sqlLogo  from '../assets/svg/sql-pic.svg';
import reactLogo from '../assets/svg/react-pic.svg';
import requestsLogo from '../assets/svg/requests-pic.svg';
import flaskLogo from '../assets/svg/flask-pic.svg';
import smtpLogo from '../assets/svg/smtp-pic.svg';

export const Skills = () => {
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
                  <img src={pyLogo} />
                  <h2>Python</h2>
                </div>
                <div className="item">
                  <img src={sqlLogo} />
                  <h2>Sql</h2>
                </div>
                <div className="item">
                  <img src={jsLogo} />
                  <h2>Javascript</h2>
                </div>
                <div className="item">
                  <img src={htmlLogo} />
                  <h2>Html</h2>
                </div>
                <div className="item">
                  <img src={cssLogo} />
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
                  <img src={requestsLogo} />
                  <h2>requests</h2>
                </div>
                <div className="item">
                  <img src={reactLogo} />
                  <h2>React</h2>
                </div>
                <div className="item">
                  <img src={smtpLogo} />
                  <h2>smtp</h2>
                </div>
                <div className="item">
                  <img src={flaskLogo} />
                  <h2>flask</h2>
                </div>
              </Carousel>
            </Row>
          </Container>
        </section>
    )
}