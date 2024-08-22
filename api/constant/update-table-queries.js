class UpdateTableQueries {
    constructor() {
        this.UPDATE_TOTAL_EMAILS = `
        UPDATE total_emails
        SET total_clients_message = new_total_emails_value

        WHERE date = date('now', 'localtime')
        `
    }
}

export default UpdateTableQueries