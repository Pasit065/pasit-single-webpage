const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const sqlite3 = require('sqlite3');


const createEmailEmptyTables = () => {
    const db = new sqlite3.Database("./emails_data.db")

    const CREATE_TABLE_EMAIL_RECORDS = `CREATE TABLE IF NOT EXISTS email_send_records(
        email_id INTEGER PRIMARY KEY AUTOINCREMENT,
        send_from TEXT NOT NULL,
        send_to TEXT NOT NULL,
        sending_date TEXT,
        sending_time TEXT,
        is_success BOOLEAN NOT NULL
    
    )`

    const CREATE_TABLE_TOTAL_EMAIL = `CREATE TABLE IF NOT EXISTS total_emails(
        date TEXT NOT NULL,
        total_clients_message INTEGER
    )`

    db.run(CREATE_TABLE_EMAIL_RECORDS)
    db.run(CREATE_TABLE_TOTAL_EMAIL)

    console.log('Tables have been created.')

    db.close()

}

createEmailEmptyTables()
const Router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', Router)

app.listen(5000, () => console.log('Backend server has been started.'))
console.log(process.env.my_email)

// Create transporter to sending email
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.my_email,
        pass: process.env.smtp_pass
    }
})

Router.get('/is_total_emails_records_today', (req, res) => {
    const db = new sqlite3.Database('./emails_data.db');
    let total_emails_records_today = `
    SELECT COUNT(*) total_emails_in_today
    FROM total_emails

    WHERE date = date('now', 'localtime')
    ` 
    db.get(total_emails_records_today, (err, row) => {
        if (err) {
            res.json({ERROR: 'Your requests has been failed.'})
        }
        if (row.total_emails_in_today) {
            res.json({is_total_emails_records_today: true})
        } else {
            res.json({is_total_emails_records_today: false})
        }
    })

    db.close()
})

Router.get('/get_total_emails_records', (req, res) => {
    const db = new sqlite3.Database('./emails_data.db');
    
    let count_total_emails_today = `
    SELECT COUNT(*) total_records
    FROM email_send_records

    WHERE sending_date = date('now', 'localtime')
    ` 

    db.get(count_total_emails_today, (err, row) => {
        if (err) {
            res.json({ERROR: err})
        }
        
        res.json({total_records_for_today: row.total_records})
    })
})

Router.post("/post_question", (req, res) => {
    const formData = req.body;
    const mailMessge = {
        to: formData.email,
        subject: 'Question response.',
        html: `
        <h2>Question return.</h2>
        <h3>Hello ${formData.firstname} ${formData.lastname}, ${formData.age} years old.</h3>
        <h4>from ${formData.address}.</h4>
        <p>My name is Pasit and i am the admin of this web application thanks you for your suggestion and doing my form.
        I have recieved some message and question from you and I will send you some answer later.</p>
        <p>Please don't forget to checking email for some response and thanks you for your responsing.</p>
        `
    }

    transporter.sendMail(mailMessge, async (error) => {
        if (error) {
            res.json({ERROR: error});
        } else {
            res.json({code: 200, message: "Your question has been send successfully."})
        }
    })
})

Router.post('/insert_email_records', (req, res) => {
    const db = new sqlite3.Database('./emails_data.db')

    let new_email_data = req.body

    INSERT_NEW_EMAIL_RECORDS_ROW = `
    INSERT INTO email_send_records(send_from, send_to, sending_date, sending_time, is_success)
    VALUES ('${new_email_data.send_from}', '${new_email_data.send_to}', date('now', 'localtime'), time('now', 'localtime'), ${new_email_data.is_success})
    `
    try {
        db.run(INSERT_NEW_EMAIL_RECORDS_ROW)
        db.close()
    } catch(err) {
    res.json({email_records_updated_status: "incompleted", code: 400})
    }

    res.json({email_records_updated_status: "Completed", code: 200})
    
    })

Router.post('/updated_total_emails_todays', (req, res) => {
    let db = new sqlite3.Database('./emails_data.db')
    
    console.log(req.body)

    if (!req.body.is_created_total_emails_records_today) {
        let INSERT_NEW_EMAILS_RECORDS = `
        INSERT INTO total_emails(date, total_clients_message) 
        VALUES (date('now', 'localtime'), ${req.body.total_emails})`

        db.run(INSERT_NEW_EMAILS_RECORDS)

    } else {
        console.log("done")
        let UPDATED_TOTAL_EMAILS = `
        UPDATE total_emails
        SET total_clients_message = ${req.body.total_emails}

        WHERE date = date('now', 'localtime')
        `
        db.run(UPDATED_TOTAL_EMAILS)
        console.log("done")

    }

    db.close()

})


Router.post('/notify_users', (req, res) => {
    const mailMessge = {
        to: req.body.email,
        subject: 'Congraduation!! Thanks you for your subscribe.',
        html: `
        <h2>We have appreciated your subscribtion.</h2>
        <p>Hello ${req.body.name} we have recieve your subscribe. Please don't forget to follow me 
        in other platform.</p>`
    }

    transporter.sendMail(mailMessge, async (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({code: 200, message: "Your notify has been send successfully."})
        }
    })
})