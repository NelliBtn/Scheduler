# Interview Scheduler

The interview scheduler allows a student to book and manage an interview with a mentor appointment can be made between noon and five for each day of the week.

## How it works

When the application is loaded a request is made to the API server. The appointments are displayed for the selected day. Choosing another day shows that more appointments have been booked. When the appointment is created the user can type in a student's name and choose an interviewer from a list. Clicking on the save button will perform a save action. Saving action will make a request to the server to persist the change. Immediately before sending the request the app shows the user a status indicator.
When the responses returned from the server the status indicator is hidden and the interview is shown with the updated data. The user can edit an interview. This allows them to change the student name or chosen interviewer and save those changes to the server. If an interview is no longer needed then it can be deleted. Before deleting the interview the app confirms with the user. If the server returns an error when performing an operation the Scheduler shows the user an error message. The message can be dismissed by pressing the close button provided.

## Final Product


## Dependencies
-NodeJS
-React
-Webpack
-Babel
-Axios
-Storybook, Webpack Dev Server, Jest, Testing Library


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

