
import sqlite3 from "sqlite3";

class EmailRepository 
{   
    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }

    createEveryTables(createTableQueries) {
        const db = new sqlite3.Database(this.fileLocation)

        if (typeof createTableQueries !== "object") {
            throw ("Only list of queries are allowed.");
        }
        for (let queries of createTableQueries) {
            db.run(queries)
        }

        console.log('Tables have been created.')
        db.close()
    }

    isTotalEmailsRecordsToday (getTotalEmailsInTodayQueries, res)  {
        const db = new sqlite3.Database(this.fileLocation)

        db.get(getTotalEmailsInTodayQueries, (err, row) => {
            console.log(row)
            if (err) {
                res.json({ERROR: "Can't access to total emails table."});
            }
            if (row.total_emails_in_today) {
                res.json({is_total_emails_records_today: true})
            } else {
                res.json({is_total_emails_records_today: false})
            }
        })
    
        db.close()
    }

    getTotalEmailsSendRecordsToday(getTotalSendRecordsForTodayQueries, res) {
        const db = new sqlite3.Database(this.fileLocation);

        db.get(getTotalSendRecordsForTodayQueries, (err, row) => {
            if (err) {
                res.json({ERROR: "Failed to get total emails end for today."})
            }
            
            res.json({total_records_for_today: row.total_records_for_today})
        })
    }

    insertNewEmailsSendRecordsRow(editedQueries, res) {
        const db = new sqlite3.Database(this.fileLocation)
    
        try {
            db.run(editedQueries);
            db.close();
        } catch(err) {
            res.json({email_records_updated_status: "incompleted", code: 400});
        }
            res.json({email_records_updated_status: "Completed", code: 200});
    }

    updatedTotalEmailsToday(bodyParmas, insertNewTotalEmailsRowQueries, updateTotalEmailsQueries, res) {
        let db = new sqlite3.Database(this.fileLocation)

        try {
            if (!bodyParmas.is_created_total_emails_records_today) {
                insertNewTotalEmailsRowQueries = insertNewTotalEmailsRowQueries.replace(
                    `totalClientsMessage`, bodyParmas.total_emails
                )

                db.run(insertNewTotalEmailsRowQueries);
            } else {
                updateTotalEmailsQueries = updateTotalEmailsQueries.replace(
                    'totalClientsMessage', bodyParmas.total_emails
                )

                db.run(updateTotalEmailsQueries)
            }
    
            db.close()
        } catch (err) {
            res.json({ERROR: "Can't update total emails for todays."})
        }

        res.json({status: 200, message: "total emails for today has been updated successfully."})
    }     
}

export default EmailRepository;


