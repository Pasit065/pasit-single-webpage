# Pasit-Single-Website
**Pasit-Single-Website** is a single page website for my personal data developed based on **React Framework** and **Express Framework** using **Javascript language** with *Create React App* environment, HTML and CSS to optimize contents.

## Overview
In the project contain multiple components section that introduce my personal profile information such as skills, projects and etc. Moreover, it provide my contact and my gitHub account link.

The project also provide question form and subscription form that allow user to fill form and sent response to user via email. Form is executed and fetching data to backend server to retrive user data.

![](./ui/public/webpage-result/banner_and_navbar.png)

## Important Directories and Files
- `ui` used for store **React Website** script which contain every components. every components is stored inside `./ui/src/components`.

- `api` directory used for store **Express** server side script to handling every requests that is provided. 

- `database` directory used for contain `email_data.db` file which storing email status data.

- `App.css` inside `./ui/src/` directory for styling webpage.

## Database
Database that is used by the project is *Sqlite3 DBMS (Database Management System)* which is flexible to store and retrive data.

Inside `email_data.db` have 2 tables as follow

- `email_send_records` used for store each email record data.

- `total_emails` used for counting total emails in each day.

## API Forms
The website contain 2 forms named `QuestionForm` and `MailchimpForm` that are allowed user to fill data.

## `QuestionForm`

![](./ui/public/webpage-result/question.png)

Initially when user has filled `QuestionForm`, it will response user input by sending email response. Moreover, React Website is fetching user's input to **Express Server** to retrive data to `email_data.db`.

### Simplified Diagram

![](./ui/public/simplified_question_form.png)



### `MailchimpForm` Diagram
- `MailchimpForm` provided **Mailchimp Form** that contain form to retrive users subscription and store subscription to **Mailchimp** server that inside **Mailchimp** website. When subscription is provided successfully React ui script will sent request to
Express server. After that Express server will sent user notification when subcscription is success. 

- `Mailchimp` is a platform website that allow you to provide subscription server to retrive users subscription data. First, log in and create some solution to retrive subscription data.
## Usage
### Initial Setup
Before executing React webpage, a few setup are required.

1. In `./package.json` 
## `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`npm start` also execute command that you've define in `package.json`

For example if in `package.json` "scripts" is:

```
"scripts": {
    "start": "cd ./ui/ && react-script start"
}
```

Which means you are going to `ui` directory and execute `react-script start`

## `react-script start` 
`react-script start` will find `package.json` file for initial configuration and find 
`main` file that will be executed.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
