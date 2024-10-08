
import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import UrlStorage from "../constant/url-storage";
import PngFilePaths from "../constant/png-file-paths";

export const Footer = ({imgParrentPath}) => {
    const urlStorage = new UrlStorage();
    const pngFilePaths = new PngFilePaths(imgParrentPath);

    return (
        <footer className="footer-bx">
          <MailchimpForm />
          <Container className="footer-section">
            <Row>
              <Col sm={4} className="main-quote-col"> 
                <div className="footer-quote">
                  <h1>Thanks you for your attention and feel free to ask me some question.</h1>
                </div>
              </Col>
              <Col sm={4} className="col-contents">
                <Row>
                  <Col>
                    <div className="follow-me-headers">
                      <h1>Follow me</h1>
                      <p>you can follow my other social media platforms here.</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="follow-me-social-icons">
                    <Row>
                      <Col xs={2} sm={6} md={3}>
                        <a href={urlStorage.FACEBOOK_URL} className="social-icon" target="_blank"><img src={pngFilePaths.FACEBOOK_LOGO} alt="footer-facebook" /></a>
                      </Col>
                      <Col xs={2} sm={6} md={3}>
                        <a href={urlStorage.INSTRAGRAM_URL} className="social-icon"  target="_blank"><img src={pngFilePaths.INSTRAGRAM_LOGO} alt="footer-instragram" /></a>
                      </Col>
                      <Col xs={2} sm={6} md={3}>
                        <a href={urlStorage.GITHUB_URL} className="social-icon"  target="_blank"><img src={pngFilePaths.GITHUB_LOGO} alt="footer-github" /></a>
                      </Col>
                      <Col xs={2} sm={6} md={3}>
                        <a href={urlStorage.YOUTUBE_URL} className="social-icon"  target="_blank"><img src={pngFilePaths.YOUTUBE_LOGO} alt="footer-youtube" /></a>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </Col> 
              <Col sm={3} className="col-contents">
                <Row>
                  <div className="help-options">
                    <h1>Help</h1>
                    <Col sm={12}>
                      <a href="#contact-and-question">Contact and question</a>
                    </Col>
                    <Col sm={12}>
                      <a href="#about_me">About me</a>
                    </Col>
                    
                  </div>
                </Row>
                <Row>
                  <div className="project-options">
                    <h1>Projects</h1>
                    <Col sm={12}>
                      <a href="#graduated_project">Graduation project</a>
                    </Col>
                    <Col sm={12}>
                      <a href="#Iss detection">Iss detection</a>
                    </Col>
                    <Col sm={12}>
                      <a href="#Synchronous speed calculation">Synchronous speed calculation</a>
                    </Col>
                    <Col sm={12}>
                      <a href="#Rain detection">Rain detection</a>
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </footer>
    )
}