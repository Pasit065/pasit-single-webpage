class GetTotalRowQueries {
    constructor() {
        this.GET_TOTAL_EMAILS_IN_TODAY = `
        SELECT COUNT(*) total_emails_in_today
        FROM total_emails
    
        WHERE date = date('now', 'localtime')
        `; 
    
        this.GET_TOTAL_SEND_RECORDS_FOR_TODAY = `
        SELECT COUNT(*) total_records_for_today
        FROM email_send_records

        WHERE sending_date = date('now', 'localtime')
        `;
    }

}

export default GetTotalRowQueries;






