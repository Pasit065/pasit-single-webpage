import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";
import UrlStorage from "../constant/url-storage";

export const MailchimpForm = () => {
    const urlStorage = new UrlStorage()
    // use the render prop and your custom form
    return (
      <MailchimpSubscribe
        url={urlStorage.MAILCHIMPS_URL}
        render={({ subscribe, status, message }) => (
          <Newsletter 
          onValidate={(subscribeData) => subscribe(subscribeData)}
          status={status}
          message={message} />
          
    )} >

        </MailchimpSubscribe>)
      

}