View this project hosted on AWS Amplify at the following URL: https://main.d9umppj6r6ld0.amplifyapp.com/

# Getting Started with Brittlepay Fair Fare Calculator

This Project is a Brittlepay Coding Exercise by Lee Treehouse. Instructions for this exercise have been provided in the public folder of this project.

To successfully use this project, you will need a well formed taps.json file as described in the coding exercise description. If needed, one has been provided in the public folder of this project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run this project locally

Project is to be run with yarn, instructions can be found here if needed https://classic.yarnpkg.com/en/docs/getting-started

In the project directory, you must run:

### `yarn install`

to install dependencies and then you can choose from `yarn start` or `yarn test` as described below.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Build and Deploy

Out of scope for this project, feel free to discuss with Lee

## Assumptions - Business Rules

- Trips can occur over multiple days (realistic example is getting on just before midnight and getting on just after).
- No changes in time zone during the trip are accommodated (including daylight savings time rollback)
- Company Id and Bus Id can be any string - however these must match perfectly, including case, for a touch on and off to be paired.
- For Incomplete trips I will not be able to calculate finished or durationSecs, these can be omitted from the JSON output
- “Status” value in output should be set to “COMPLETED”, “INCOMPLETE”, or “CANCELLED” ie it should relate to the three categories of trip, not the status of the application's operation etc.
- No validation of Primary Account Numbers / Credit Card Numbers is required

## Assumptions - Project Requirements

- Project is supplied as emailed zip to be run locally - no release pipeline is required
- UX and accessibility requirements are out of scope
- It is assumed that any file uploaded by a user is a well formed, accurate taps.json as described in the coding exercise description
- This project does not address performance concerns (including algorithmic complexity) - in a real scenario runtime complexity will be important and these calculations would probably be done in the back end
- In a real case I’d request to be supplied dates in a different format where order of date and month isn’t ambiguous
- There were some inconsistencies between the sample input and sample output I didn't know how to resolve so I've treated them as mistakes (ignored the requirement) - 900 seconds for duration seconds, "B37" for busId

## Next steps to expand from here

- Add a data grid or table visualisation of the trip data to appear below the download JSON link
- Consult with team on ways to improve test implementation (my weak area), and test the react components
