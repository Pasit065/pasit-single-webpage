import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

export const MailchimpForm = () => {
    const url = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
    
    // use the render prop and your custom form
    return (
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <Newsletter 
          onValidate={(subscribeData) => subscribe(subscribeData)}
          status={status}
          message={message} />
          
    )} >

        </MailchimpSubscribe>)
      

}