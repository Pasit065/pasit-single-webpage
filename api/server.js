const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const sqlQueries = require("./constant/sql-queries");
const fileLocation = require("./constant/file-location");
const email_repository = require("./repository/email-repository");

const getReplacedQueries = (queries, mappingOldAndNewData) => {
    let newQueries = queries;
    for (let mappingData of mappingOldAndNewData) {
        newQueries.replace(mappingData.oldValue, mappingData.newValue);
    };

    return newQueries
};

// Determine new object for implement emails data in database.
const emailRepository = new email_repository.EmailRepository(fileLocation.DATABASE, sqlQueries);

// Create table if not exists.
emailRepository.createEveryTables();

// Initial setup variables.
const Router = express.Router();
const app = express();

// Allow which users can connect server.
app.use(cors());
app.use(express.json());

// Determine initial route path.
app.use('/', Router)

// Connect to port 5000.
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

// Get total emails for today if it true it means in total emails table
// it already has total emails counting for today.
Router.get('/is_total_emails_records_today', (req, res) => {
    isTotalEmailsRecordsToday = emailRepository.isTotalEmailsRecordsToday()

    if (!isTotalEmailsRecordsToday) {
        res.json({ERROR: 'Your requests has been failed.'});
    }

    res.json(isTotalEmailsRecordsToday)
})

// Checks total emails that has been send for today (Including failed emails).
Router.get('/get_total_emails_send_records_today', (req, res) => {
    totalRecordsSendResponse = emailRepository.getTotalSendRecordsToday()
    
    if (!totalRecordsSendResponse) {
        res.json({ERROR: "Your requests has been failed."})
    }

    res.json({total_records_for_today: row.total_records_for_today})
})

// Sending emails.
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

// Insert new email record after email has been send
Router.post('/insert_email_records', (req, res) => {
    let new_email_data = req.body;
    let mappingPrevToNewColValues = [];

    for (let colName in new_email_data) {
        mappingPrevToNewColValues = mappingPrevToNewColValues.concat([
            {
                oldValue: colName,
                newValue: new_email_data[colName]
            }
        ])
    }

    const newReplacedQueries = getReplacedQueries(
        emailRepository.sqlQueries.INSERT_NEW_EMAIL_SEND_RECORDS_ROW,
        mappingPrevToNewColValues
    )

    responseObject = emailRepository.insertNewEmailsSendRecordsRow(
        newReplacedQueries
    )

    res.json(responseObject)
})

// Updated total emails.
Router.post('/updated_total_emails_todays', (req, res) => {
    try {
        emailRepository.updatedTotalEmailsToday(req.body)
    } catch(err) {
        res.json({ERROR: "Failed to updated total emails table."})
    }

    res.json({status: 200, message: "total emails for today has been updated successfully."})
   
})

// Notify users after users has subscribed.
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


