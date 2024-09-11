class CreateTableQueries {
    constructor() {
        this.CREATE_EMAIL_SEND_RECORDS_TABLE = `
        CREATE TABLE IF NOT EXISTS email_send_records
        (
            email_id INTEGER PRIMARY KEY AUTOINCREMENT,
            send_from TEXT NOT NULL,
            send_to TEXT NOT NULL,
            sending_date TEXT,
            sending_time TEXT,
            is_success BOOLEAN NOT NULL
        )`;

        this.CREATE_TOTAL_EMAILS_TABLE = `
        CREATE TABLE IF NOT EXISTS total_emails
        (
            date TEXT NOT NULL,
            total_clients_message INTEGER
        )`;

    }
}

export default CreateTableQueries;






