import { Col, Container, Row } from "react-bootstrap";

export const Profile = ({imgParrentPath}) => {
    return (
        <section className="profile-bx" id="about_me">
          <Container className="profile-container">
            <Row>
              <Col xs={12} md={5} xl={4} className="profile-img" >
                <img src={imgParrentPath + 'profile-pic.png'} alt="My profile image" />
              </Col>
              <Col xs={12} md={6} xl={7} className="personal-details">
                <div className="personal-inform">
                  <h1>About me</h1>
                  <p>My name is Pasit Thientrakarn 22 years old, I fond of back-end developers
                     works like using SQL and others language like Python to implementing data. 
                     Form now I'am willing to uses my own skills to adaptate to real works.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="add-inform">
                  <h2>Any question heres</h2>
                  <p>You can leave any question that you have to admin and we will answers you in few days
                    please feel free to asking me!!.
                  </p>
                  <div className="question-a">
                    <a href="#question">
                      <button href="#question"><span>Ask me</span></button>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
    )
}

