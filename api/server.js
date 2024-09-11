
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import EmailRepository from "./repository/email-repository.js";
import CreateTableQueries from "./constant/create-table-queries.js";
import GetTotalRowQueries from "./constant/get-total-row-queries.js";
import InsertTableQueries from "./constant/insert-table-queries.js";
import UpdateTableQueries from "./constant/update-table-queries.js"
import FileLocation from './constant/file-location.js';

const getReplacedQueries = (queries, mappingOldAndNewData) => {
    let newQueries = queries;
    for (let mappingData of mappingOldAndNewData) {
        newQueries = newQueries.replace(mappingData.oldValue, mappingData.newValue);
    };

    return newQueries
};

// Determine file location object.
const fileLocation = new FileLocation();

// Determine sql queries object for seperated parts.
const createTableQueries = new CreateTableQueries();
const getTotalRowQueries = new GetTotalRowQueries();
const insertTableQueries = new InsertTableQueries();
const updateTableQueries = new UpdateTableQueries();
// Determine email repository that can access and implement 
// every data in sqlite3 table.
const emailRepository = new EmailRepository(fileLocation.DATABASE_FILE)

// Create table if not exists.
emailRepository.createEveryTables([
    createTableQueries.CREATE_EMAIL_SEND_RECORDS_TABLE,
    createTableQueries.CREATE_TOTAL_EMAILS_TABLE
]);

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
    console.log(`is_total_emails_records_today works fine`)
    emailRepository.isTotalEmailsRecordsToday(
        getTotalRowQueries.GET_TOTAL_EMAILS_IN_TODAY,
        res
    );
})

// Checks total emails that has been send for today (Including failed emails).
Router.get('/get_total_emails_send_records_today', (req, res) => {
    console.log(`get_total_emails_send_records_today works fine`)
    emailRepository.getTotalEmailsSendRecordsToday(
        getTotalRowQueries.GET_TOTAL_SEND_RECORDS_FOR_TODAY,
        res
    )

})

// Sending emails.
Router.post("/post_question", (req, res) => {
    console.log(`post_question works fine`)
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
    console.log(`insert_email_records works fine`)
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
        insertTableQueries.INSERT_NEW_EMAIL_SEND_RECORDS_ROW,
        mappingPrevToNewColValues
    )

    emailRepository.insertNewEmailsSendRecordsRow(
        newReplacedQueries,
        res
    )
})

// Updated total emails.
Router.post('/updated_total_emails_todays', (req, res) => {
    console.log(req.body)
    console.log(`updated_total_emails_todays works fine`)
    emailRepository.updatedTotalEmailsToday(
        req.body,
        insertTableQueries.INSERT_NEW_TOTAL_EMAILS_ROW,
        updateTableQueries.UPDATE_TOTAL_EMAILS,
        res
    )
})

// Notify users after users has subscribed.
Router.post('/notify_users', (req, res) => {
    console.log(`notify_users works fine`)
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