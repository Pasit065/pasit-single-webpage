module.exports.CREATE_EMAIL_SEND_RECORDS_TABLE = `
    CREATE TABLE IF NOT EXISTS email_send_records
    (
        email_id INTEGER PRIMARY KEY AUTOINCREMENT,
        send_from TEXT NOT NULL,
        send_to TEXT NOT NULL,
        sending_date TEXT,
        sending_time TEXT,
        is_success BOOLEAN NOT NULL
    )`;

module.exports.CREATE_TOTAL_EMAILS_TABLE = `
    CREATE TABLE IF NOT EXISTS total_emails
    (
        date TEXT NOT NULL,
        total_clients_message INTEGER
    )`;
    
module.exports.GET_TOTAL_EMAILS_IN_TODAY = `
    SELECT COUNT(*) total_emails_in_today
    FROM total_emails

    WHERE date = date('now', 'localtime')
    `; 

module.exports.GET_TOTAL_SEND_RECORDS_FOR_TODAY = `
    SELECT COUNT(*) total_records_for_today
    FROM email_send_records

    WHERE sending_date = date('now', 'localtime')
    `;

module.exports.INSERT_NEW_EMAIL_SEND_RECORDS_ROW = `
    INSERT INTO email_send_records(send_from, send_to, sending_date, sending_time, is_success)
    VALUES ('sendFrom', 'sendTo', date('now', 'localtime'), time('now', 'localtime'), isSuccess)
    `

module.exports.INSERT_NEW_TOTAL_EMAILS_ROW = `
    INSERT INTO total_emails(date, total_clients_message) 
    VALUES (date('now', 'localtime'), totalClientsMessage)
    `
    
module.exports.UPDATE_TOTAL_EMAILS =  `
    UPDATE total_emails
    SET total_clients_message = new_total_emails_value

    WHERE date = date('now', 'localtime')
    `
        







