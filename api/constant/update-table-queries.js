class UpdateTableQueries {
    constructor() {
        this.UPDATE_TOTAL_EMAILS = `
        UPDATE total_emails
        SET total_clients_message = totalClientsMessage

        WHERE date = date('now', 'localtime')
        `
    }
}

export default UpdateTableQueries