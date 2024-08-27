
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

        return await response.json();
    }

    async postInsertEmailRecords(formData, emailResultCode) {
        let response = await fetch("http://localhost:5000/insert_email_records", {
            method:"Post",
            headers: this.POST_REQUESTS_HEADERS,
            body:JSON.stringify({
                send_from: 'pan289277@gmail.com',
                send_to: formData.email,
                is_success: emailResultCode === 200 ? true:false
            })
        });
    }

    async getTotalEmailsRecords() {
        let response = await fetch("http://localhost:5000/get_total_emails_records");
        return await response.json();
    }

    async getIsTotalRecordsToday() {
        let response = await fetch("http://localhost:5000/is_total_emails_records_today");
        return await response.json();
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
}


export default FormRequestsService;



