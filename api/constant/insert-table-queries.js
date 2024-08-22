
class InsertTableQueries {
    constructor() {
        this.INSERT_NEW_EMAIL_SEND_RECORDS_ROW = `
        INSERT INTO email_send_records(send_from, send_to, sending_date, sending_time, is_success)
        VALUES ('sendFrom', 'sendTo', date('now', 'localtime'), time('now', 'localtime'), isSuccess)
        `
    
        this.INSERT_NEW_TOTAL_EMAILS_ROW = `
        INSERT INTO total_emails(date, total_clients_message) 
        VALUES (date('now', 'localtime'), totalClientsMessage)
        `
        
    }
}


export default InsertTableQueries;






