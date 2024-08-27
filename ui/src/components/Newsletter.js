import { useEffect, useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import FormRequestsService from "../modules/form-requests-service";

export const Newsletter = ({onValidate, status, message}) => {
    let initialSubscribeData = {
        EMAIL: "",
        FNAME: "",
        LNAME: ""
    };

    const formRequestsService = new FormRequestsService();

    const [subscribeData, setSubscribeData] = useState(initialSubscribeData);
    const [notifyStatus, setNotifyStatus] = useState('');

    const handleChange = (newData, dataType) => {
        setSubscribeData(
            {
                ...subscribeData,
                [dataType]: newData
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subscribeData.EMAIL && subscribeData.EMAIL.indexOf("@") > -1) {
            onValidate(subscribeData);
        }
    }

    useEffect(() => {
      const sendSuccessNotify = async () => {
        
      let result = await formRequestsService.postSubscriptionNotificationToUsers(
        subscribeData
      );
      
      if (result.code !== 200) {
        setNotifyStatus({
          status: "Incompleted",
          message: `Email notify about subscribe haven't been send.`});
      } else {
        setNotifyStatus(
          {
            status: "Completed",
            message: `Please check your email, if your subscription has been completed.`});
      }
      
    }
    // sending, success, error
    
    if (status === "success") {
      sendSuccessNotify();
    }

    if (status === "success" || status === "error") {
      setSubscribeData(initialSubscribeData);
    }
  
      }, [status]);

    return (
        <section className="subscribe-form" id="subscribe">
          <Container className="subscribe-bx">
            <Row>
              <Col xs={12} sm={12}>
                <div className="subscribe-headers">
                  <h1>Subscribe our website.</h1>
                  <p>If you like our website you can support us with this subscribe.</p>
                  {status === "sending" && <Alert>{status}...</Alert>}
                  {status === "error" && <Alert>{status} and {message}!!!</Alert>}
                  {status === "success" && <Alert>{message} your subscribe has been complete!!!</Alert>}
                </div>
              </Col>
            </Row>
            <Row>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <input type="email" placeholder="email address" value={subscribeData.EMAIL} onChange={(e) => handleChange(e.target.value, 'EMAIL')} required="required" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <input type="text" placeholder="firstname" value={subscribeData.FNAME} onChange={(e) => handleChange(e.target.value, 'FNAME')} required="required" />
                  </Col>
                  <Col xs={12} sm={6}>
                    <input type="text" placeholder="lastname" value={subscribeData.LNAME} onChange={(e) => handleChange(e.target.value, 'LNAME')} required="required" />                
                  </Col> 
                </Row>
                <button type="submit"><span>Submit</span></button>
              </form>
              
            </Row>
            <Row>
              <Col xs={12} sm={12}>
                {
                  notifyStatus &&
                  <p className={notifyStatus.status === "Completed" ? "complete": "incomplete" }>{notifyStatus.status} and {notifyStatus.message}</p>
                }
              </Col>
            </Row>
          </Container>
        </section>
    )

}