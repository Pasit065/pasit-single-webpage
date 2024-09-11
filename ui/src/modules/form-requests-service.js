
class FormRequestsService {
    constructor() {
        this.POST_REQUESTS_HEADERS = {
            "Content-Type":"Application/json;charset=utf-8"
        }
    }

    async postNewQuestion(formData) {
        let response = await fetch("http://localhost:5000/post_question", {
            method: "Post",
            headers: this.POST_REQUESTS_HEADERS,
            body:JSON.stringify(formData)
        });

        return response.json();
    }

    async postInsertEmailRecords(formData, emailResultCode) {
        let response = await fetch("http://localhost:5000/insert_email_records", {
            method:"Post",
            headers: this.POST_REQUESTS_HEADERS,
            body:JSON.stringify({
                sendFrom: 'pan289277@gmail.com',
                sendTo: formData.email,
                isSuccess: emailResultCode === 200 ? true:false
            })
        });
    }

    async getTotalEmailsRecords() {
        let response = await fetch("http://localhost:5000/get_total_emails_send_records_today");
        return response.json();
    }

    async getIsTotalRecordsToday() {
        let response = await fetch("http://localhost:5000/is_total_emails_records_today");
        return response.json();
    }

    async postUpdateTotalEmailsToday(todayTotalEmails, isTotalEmailsRecordCreated) {
        let response = await fetch("http://localhost:5000/updated_total_emails_todays", {
            method:"Post",
            headers: this.POST_REQUESTS_HEADERS,
            body:JSON.stringify({
            total_emails: todayTotalEmails.total_records_for_today, 
            is_created_total_emails_records_today: isTotalEmailsRecordCreated.is_total_emails_records_today
            })
        });
    }

    async postSubscriptionNotificationToUsers(subscribeData) {
        let response = await fetch("http://localhost:5000/notify_users", {
            method: "Post",
            headers: this.POST_REQUESTS_HEADERS,
            body: JSON.stringify({
                email: subscribeData.EMAIL, 
                name: `${subscribeData.FNAME} ${subscribeData.LNAME}`
            })
        });
        return response.json();
    }
    
}

export default FormRequestsService;