import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap";

export const QuestionForm = ({imgParrentPath}) => {
    const initialFormData = {
        firstname:"",
        lastname:"",
        age:"",
        email:"",
        phone:"",
        address:"",
        message:""
    };

    const [responseStatus, setResponseStatus] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const [buttonText, setButtonText] = useState('send');

    const handleFormChange = (title, value) => {
        setFormData({
            ...formData,
            [title]:value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");

        let response = await fetch("http://localhost:5000/post_question", {
            method:"Post",
            headers:{
                "Content-Type":"Application/json;charset=utf-8"
            },
            body:JSON.stringify(formData)
        });
        
        let result = await response.json();
        setFormData(initialFormData);
        setButtonText("send");

        setResponseStatus({isSuccess:true, message:"Question has been send successfully."});

        response = await fetch("http://localhost:5000/insert_email_records", {
            method:"Post",
            headers:{
                "Content-Type":"Application/json;charset=utf-8"
            },
            body:JSON.stringify({
            send_from: 'pan289277@gmail.com',
            send_to: formData.email,
            is_success: result.code === 200 ? true:false
          })
        });

        response = await fetch("http://localhost:5000/get_total_emails_records");
        let todayTotalEmails = await response.json();

        response = await fetch("http://localhost:5000/is_total_emails_records_today");
        let isTotalEmailsRecordCreated= await response.json();
        
        response = await fetch("http://localhost:5000/updated_total_emails_todays", {
            method:"Post",
            headers:{
                "Content-Type":"Application/json;charset=utf-8"
            },
            body:JSON.stringify({
              total_emails: todayTotalEmails.total_records_for_today, 
              is_created_total_emails_records_today: isTotalEmailsRecordCreated.is_total_emails_records_today
          })
        });

        if (result.code === 200) {
            setResponseStatus({isSuccess:true, message:"Question has been send successfully."});
            
        } else {
            setResponseStatus({isSuccess:false, message:"Failed to send message."});
        }

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
                    <a href="http://facebook.com"><img src={imgParrentPath + "facebook-logo.png"} alt="facebook-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href="https://github.com/Pasit065"><img src={imgParrentPath + "github-logo.png"} alt="github-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href="http://youtube.com"><img src={imgParrentPath + "youtube-logo.png"} alt="youtube-logo" /></a>
                  </Col>
                  <Col xs={3} sm={3} md={3} className="contact-social-logo">
                    <a href="http://instragram.com"><img src={imgParrentPath + "instragram-logo.png"} alt="ig-logo" /></a>
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
                      <input type="text" placeholder="firstname" value={formData.firstname} onChange={(e) => handleFormChange('firstname', e.target.value)} />
                    </Col>
                    <Col md={6}>
                      <input type="text" placeholder="lastname" value={formData.lastname} onChange={(e) => handleFormChange('lastname', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <input type="number" placeholder="age" value={formData.age} onChange={(e) => handleFormChange('age', e.target.value)} />
                    </Col>
                    <Col md={6}>
                      <input type="tel" placeholder="phone number" value={formData.phone} onChange={(e) => handleFormChange('phone', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <input type="email" placeholder="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea rows={2} type="text" placeholder="address" value={formData.address} onChange={(e) => handleFormChange('address', e.target.value)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea rows={4} type="text" placeholder="message" value={formData.message} onChange={(e) => handleFormChange('message', e.target.value)} />
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