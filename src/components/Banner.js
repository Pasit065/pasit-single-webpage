import { Row, Col, Container } from "react-bootstrap"
import bannerImg from "../assets/img/banner-pic.png"
import TrackVisibility from "react-on-screen";

export const Banner = () => {
    return (
        <section className="banner" id="home">
          <Container className="align-items-center">
            <Row>
              <Col xs={12} sm={8} xl={6} md={6}>
                <TrackVisibility>{({ isVisible }) => 
                  <div className={isVisible ? "animate__animated animate__pulse":""}>
                    <h1>Pasit Thientrakarn web application</h1>
                    <div className="banner-details">
                      <p>This is my react application project for apply 
                        for software engineering website I would like to introduce my skills, 
                        experience and every knowledge in below section.</p>
                    </div> 
                    <div className="subscribe-link">
                      <a href='#subscribe'>
                        <button href="#footer"><span>Subscirbe me</span></button>
                      </a>
                    </div>
                  </div>}
                </TrackVisibility>
              </Col>
              <Col xs={12} sm={8} xl={5} md={6} >
                <img src={bannerImg} className="banner-img" alt="banner image"  />
              </Col>
            </Row>
          </Container>
        </section>
    )
    
}