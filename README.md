# Project 3

[![pipeline status](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/32/badges/dev/gigante/pipeline.svg)](https://https://gitlab.stud.idi.ntnu.no/it2810-h20/team-51/project-3/-/commits/master)

## Description

The application is a website where you can view average ratings of student cities, and add your own reveiws of student cities. As a user you can filter student cities by city, search for student cities and chose ordering parameters for changing what order the student cities should be displayed in. Rating is given in stars and can be between 1 and 5. The data about student cities is not based on real-world data, but generated randomly.

## Getting started with frontend

1. Clone the project usig `git clone`
2. Navigate the frontend folder `cd frontend`
3. Run `npm install` to install dependencies
4. Run `npm start` to run the application
5. Go to `localhost:3000` in your browser to view the website

## Frontend

### Design

We used the [Chakra](https://next.chakra-ui.com/docs/getting-started) libary to easily create usable and pretty ui-components for the website. Some of the main chackra components we have used are: Box, Button, Modal, IconButton, Input, Select and StyledIcons. We also used Chakra's colorMode and toggleColorMode to enable changing between day- and nightmode on the website. The pagination component is created using multiple Buttons and IconButtons from Chakra. Chakras toast-component did not have the functionality we wanted, so we used the [cogo-toast](https://github.com/Cogoport/cogo-toast) libary to add pop-ups.

### Components

The components were mainly implemented as functional components. In comparison with class components, they have a shorter and simpler syntax, which makes the code more readable,
easier to understand and easier to test. By using hooks, the functional components achieves the same functionality as class components. An advantage with using hooks
was that we could reuse stateful logic without changing the component hierarchy.

| Component name    | Description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container         | Container fot SearchParameters and StudentCities                                                                                                                                    |
| Header            | The header of the page, contains headline and button for toggeling color mode                                                                                                       |
| Pagination        | Component for choosing page. Commponent for pagination. Updates page ????? value in redux                                                                                           |
| SearchParameters  | Searching component. Has input-field, select button with cities and select button for sorting. Each update of one field/select leads to updating a corresponding value in Redux ??? |
| StudentCities     | Component for displaying all studentCities from the studentCity value in Redux ???. Uses StudentCityCard.                                                                           |
| StudentCityCard   | Card for showing data for one student city given as a prop. Uses StarRating to show ratings. Shows StudentCityReview-component on 'send anmeldelse'-button click.                   |
| StarRating        | Displayes a rating number as 5 stars, where the color of the stars indicates the rating                                                                                             |
| StudentCityReview | Modal for giving a review of a studentcity. Uses StarReview to take input from user. Posts the data to the backend on 'Send'-button click                                           |
| Star-Rating       | Input-component where the user can select a number of stars as rating                                                                                                               |

### File Structure

The components are located within the [/src/](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src) folder, where all of the UI components are stored
in the [/components/](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/components) subfolder. Within the /components/ folder, there are separate folders for different components, and each of these folders has an index.tsx file which stores a functional component whose name coincides with the folder name. Some of the component folders contain multiple components, where the ones not stored in the index.tsx files are subcomponents of the component in the index.tsx file.

The self-made hooks are stored in the [/hooks/](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/hooks) folder, and the shared state management files (store.ts, reducers.ts, actions.ts etc.) are stored within
the [/store/](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/store) folder.

### React

In order to handle state and state-changes within our components, we used useState and useEffect. Most of the components show usage of props. In order to handle global
state, we used Redux.

### Redux

We are using [redux](https://redux.js.org/) for the global state in the app. Much of the data in the Redux store is not really necessary to hold globally, only the filter is used many places. The reason for why we wanted to hold cities and studentCities in the global state is because we wanted to learn about asynchronous actions in Redux. We chose to use [redux-saga](https://redux-saga.js.org/) as a middleware for managing side-effects in our actions, like fetching data or dispatching new actions based on other actions. Our Redux-design for fetching data by using "fetching", "pending", "success" and "failure" was inspired by [this](https://medium.com/unpacking-trunk-club/using-redux-and-redux-saga-to-handle-api-calls-18964d234660) article.

The sagas can be found in [/store/sagas](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/store/sagas). These are [generator functions](https://www.tutorialspoint.com/What-are-generator-functions-in-JavaScript) which listen to the latest actions. This can be seen in the generator function `sagas()` defined in [store.ts](https://gitlab.stud.iie.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/store/store.ts). The `citiesSaga` listens to `FETCH_CITIES`-actions, then dispatches a `PENDING_CITIES`-action before it tries to fetch data, it then sends a `SUCCESS_CITIES` or `FAILURE_CITIES`-action depending on how the request resolves. `filterSaga`, works in pretty much the same way except that it listens to `FETCH_STUDENT_CITIES` or `SET_FILTER`-actions. This means that we can easily fetch studentcities again when changing the filter, this is the strength of redux-saga over for example [redux-thunk](https://github.com/reduxjs/redux-thunk).

The state and actions from the store can be used easily in our components using hooks. The state can be gotten using the [useSelector()-hook](https://react-redux.js.org/next/api/hooks#useselector) from React-Redux. To use actions we created a simple hook called [useActions()](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/blob/master/frontend/src/hooks/useActions/index.ts) for easily getting the actions as functions, this was more convenient than using the [useDispatch()-hook](https://react-redux.js.org/next/api/hooks#usedispatch) from React-Redux.

## Database and API

### Database

We chose to use [PostgreSQL](https://www.postgresql.org/) as our database, as this is a big opensource project which has support pretty much everywhere and we have worked with it before. Postgres also had support in the ORM we wanted to use.

### API

For our REST-API we chose to use an [Express](https://expressjs.com/)-server

SKRIV NOE OM UTVIKLING/OPPSETT ETC. HER

These query parameters are available for the url `http://it2810-72.idi.ntnu.no:3000/api/studentbyer`:

| Query parameter | Allowed values                                                      | Description                                                                                       |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| take            | number                                                              | the number of student cities to return (Must be used with skip)                                   |
| skip            | number                                                              | the number of student cities to skip beforte taking (used for pagination, must be used with take) |
| sort            | alphabetical, inverseAlphabetical, ratingHighToLow, ratingLowToHigh | choses what to order the student cities by                                                        |
| filter          | number (that matches the id of a city)                              | returns only student cities that are locted in the city with the given number as id               |
| querystring     | any                                                                 | returns only student cities with a name that contains the query string                            |

Example of complete url: `http://it2810-72.idi.ntnu.no:3000/api/studentbyer?take=4&skip=0&sort=ratingHighToLow&querystring=a&filter=1`

## Testing

To run all the tests in the project, run `npm test` in the frontend folder.

### End-to-end

We use Cypress for end-2-end testing.
The test is located in the [/cypress/integration/studentbyer/]() folder in frontend and consists of 5 tests. The tests checks that they find the components on the website needed to do the tests, gives some input, checks the API-call, checks the API response and checks what is being displayed after the API has responded.
The tests simulates these central use cases for the website:

- Giving input for searching studentcites
- Changing the page
- Filtering by city
- Changing what to sort by

## Backend (API)

## Deploying the backend

WRITE SUM HERE

## References
