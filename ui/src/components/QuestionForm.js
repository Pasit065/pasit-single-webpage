import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import PngFilePaths from "../constant/png-file-paths";
import UrlStorage from "../constant/url-storage";
import FormRequestsService from "../modules/form-requests-service";

export const QuestionForm = ({ imgParrentPath }) => {
    const initialFormData = {
        firstname:"",
        lastname:"",
        age:"",
        email:"",
        phone:"",
        address:"",
        message:""
    };
 
    const formRequestsService = new FormRequestsService();
    const pngFilePaths = new PngFilePaths(imgParrentPath);
    const urlStorage = new UrlStorage()

    const [responseStatus, setResponseStatus] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const [buttonText, setButtonText] = useState("send");

    const handleFormChange = (title, value) => {
        setFormData({
            ...formData,
            [title]:value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");

        let result = await formRequestsService.postNewQuestion(formData);

        if (result.code === 200) {
          setResponseStatus({isSuccess:true, message:"Question has been send successfully."});
        } else {
          setResponseStatus({isSuccess:false, message:"Failed to send message."});
        }

        setFormData(initialFormData);
        setButtonText("send");

        await formRequestsService.postInsertEmailRecords(formData, result.code);

        let todayTotalEmails = await formRequestsService.getTotalEmailsRecords();
        let isTotalEmailsRecordCreated = await formRequestsService.getIsTotalRecordsToday();
        
        await formRequestsService.postUpdateTotalEmailsToday(todayTotalEmails, isTotalEmailsRecordCreated);
    }

    return (
      <section className="question-contact-form" id="contact-and-question">
        <Container className="question-contact-bx">
          <Row className="align-item-center">
            <Col xs={12} sm={12} md={6} id="contact">
              <div className="contact-details">
                <h1>Contact me</h1>
                <p>If you want to contact me with other option beside question form. Feel free to contact me.</p>
                  
                <h3>Email :</h3>
                <p>{process.env.REACT_APP_ADMIN_EMAIL}</p>

                <h3>Phone :</h3>
                <p>xxx-xxx-xxxx</p>

                <h3>Social media :</h3>
                <Row className="socials-contact">
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href={urlStorage.FACEBOOK_URL} className="social-icon" target="_blank" ><img src={pngFilePaths.FACEBOOK_LOGO} alt="facebook-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href={urlStorage.GITHUB_URL} className="social-icon" target="_blank" ><img src={pngFilePaths.GITHUB_LOGO} alt="github-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href={urlStorage.YOUTUBE_URL} className="social-icon" target="_blank" ><img src={pngFilePaths.YOUTUBE_LOGO} alt="youtube-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href={urlStorage.INSTRAGRAM_URL} className="social-icon" target="_blank" ><img src={pngFilePaths.INSTRAGRAM_LOGO} alt="ig-logo" /></a>
                  </Col>
                </Row>                
                
              </div>
            </Col>
            <Col className="question-bx" id="question" xs={12} sm={12} md={6}>
              <Row className="question-headers">
                <h1>Any question heres:</h1>
                <p>If you have any question feel free to leaving it in this form.</p>
                
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                        <input type="text" placeholder="firstname" title="Please fill this thing" value={formData.firstname} onChange={(e) => handleFormChange('firstname', e.target.value)} pattern="[a-zA_Z]{2,4}" required="required" />
                    </Col>
                    <Col md={6}>
                      <input type="text" placeholder="lastname" value={formData.lastname} onChange={(e) => handleFormChange('lastname', e.target.value)} required="required" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <input type="number" placeholder="age" value={formData.age} onChange={(e) => handleFormChange('age', e.target.value)} required="required" />
                    </Col>
                    <Col md={6}>
                      <input type="tel" placeholder="phone number" value={formData.phone} onChange={(e) => handleFormChange('phone', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <input type="email" placeholder="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} required="required" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea rows={2} type="text" placeholder="address" value={formData.address} onChange={(e) => handleFormChange('address', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea rows={4} type="text" placeholder="message" value={formData.message} onChange={(e) => handleFormChange('message', e.target.value)} title="Lsss" required="required" />
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                  </Row>
                  <Row>
                    <div className="res-status">
                      <p className={
                      !responseStatus ? "": 
                      responseStatus.isSuccess ? "complete": "incomplete"

                      }>{responseStatus.message}</p>
                    </div>
                  </Row>
                </form>
              </Row>
            </Col>
          </Row>
          
        </Container>
      </section>
    )
    
}