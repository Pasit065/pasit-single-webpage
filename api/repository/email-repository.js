// const sqlQueries = require("../constant/sql-queries")
class EmailRepository 
{   
    constructor(fileLocation, sqlQueries) {
        this.fileLocation = fileLocation;
        this.sqlQueries = sqlQueries
    }

    createEveryTables() {
        const db = new sqlite3.Database(this.fileLocation)

        db.run(this.sqlQueries.CREATE_EMAIL_SEND_RECORDS_TABLE)
        db.run(this.sqlQueries.CREATE_TOTAL_EMAILS_TABLE)
        console.log('Tables have been created.')
    
        db.close()
    }

    isTotalEmailsRecordsToday()  {
        const db = new sqlite3.Database(this.fileLocation)

        db.get(this.sqlQueries.GET_TOTAL_EMAILS_IN_TODAY, (err, row) => {
            if (row.total_emails_in_today) {
                return true
            } else {
                return false
            }
        })
    
        db.close()
    }

    getTotalSendRecordsToday() {
        const db = new sqlite3.Database(this.fileLocation);

        db.get(this.sqlQueries.GET_TOTAL_SEND_RECORDS_FOR_TODAY, (err, row) => {
            return {total_records_for_today: row.total_records_for_today}
        })
    }

    insertNewEmailsSendRecordsRow(editedQueries) {
        const db = new sqlite3.Database(this.fileLocation)
    
        try {
            db.run(editedQueries);
            db.close();
        } catch(err) {
            return {email_records_updated_status: "incompleted", code: 400};
        }

            return {email_records_updated_status: "Completed", code: 200}
    }

    isUpdatedTotalEmailsToday(bodyParmas) {
        let db = new sqlite3.Database(this.fileLocation)
        
        if (!bodyParmas.is_created_total_emails_records_today) {
            let insertNewEmailsRecordsQueries = this.sqlite3.INSERT_NEW_TOTAL_EMAILS_ROW;

            insertNewEmailsRecordsQueries = insertNewEmailsRecords.replace(
                `totalClientsMessage`, bodyParmas.total_emails
            )
    
            db.run(insertNewEmailsRecordsQueries);

        } else {
            let updatedTotalEmailsQueries = this.sqlQueries.UPDATED_TOTAL_EMAILS;
            updatedTotalEmailsQueries = updatedTotalEmailsQueries.replace(
                'totalClientsMessage', bodyParmas.total_emails
            )

            db.run(updatedTotalEmailsQueries)
        }
    
        db.close()

    }


}

exports.EmailRepository =  EmailRepository;



