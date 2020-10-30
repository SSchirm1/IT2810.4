# Project 3

[![pipeline status](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/badges/master/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/commits/master)

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

We used the [Chakra](https://next.chakra-ui.com/docs/getting-started) libary with third part components to easily create usable and pretty ui-components for the website. Some of the main chackra components we have used are: Box, Button, Modal, IconButton, Input, Select and StyledIcons. We also used Chakra's colorMode and toggleColorMode to enable changing between day- and nightmode on the website. The pagination component is created using multiple Buttons and IconButtons from Chakra. Chakras toast-component did not have the functionality we wanted, so we used the [cogo-toast](https://github.com/Cogoport/cogo-toast) libary to add pop-ups.

### Components

The components were mainly implemented as functional components. In comparison with class components, they have a shorter and simpler syntax, which makes the code more readable,
easier to understand and easier to test. By using hooks, the functional components achieves the same functionality as class components. An advantage with using hooks
was that we could reuse stateful logic without changing the component hierarchy.

| Component name    | Description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container         | Container for SearchParameters and StudentCities components |
| Header            | The header of the page, contains headline and button for toggeling color mode                                                                                                       |
| Pagination        | Component for choosing page. Updates page ????? value in redux                                                                                           |
| SearchParameters  | Searching component. Has input-field, select button with cities and select button for sorting. Each update of one field/select leads to updating a corresponding value in Redux ??? |
| StudentCities     | Component for displaying all studentCities from the studentCity value in Redux ???. Uses StudentCityCard.                                                                           |
| StudentCityCard   | Card for showing data for one student city given as a prop. Uses StarRating to show ratings. Shows StudentCityReview-component on 'send anmeldelse'-button click.                   |
| StarRating        | Displayes a rating number as 5 stars, where the color of the stars indicates the rating                                                                                             |
| StudentCityReview | Modal for giving a review of a studentcity. Uses StarReview to take input from user. Posts the data to the server on 'Send'-button click                                           |
| StarRating       | Input-component where the user can select a number of stars as rating                                                                                                               |

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

The state and actions from the store can be used easily in our components using hooks. The state can be gotten using the [useSelector()-hook](https://react-redux.js.org/next/api/hooks#useselector) from React-Redux. To use actions we created a hook called [useActions()](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/blob/master/frontend/src/hooks/useActions/index.ts) for easily getting the actions as functions, this was more convenient than using the [useDispatch()-hook](https://react-redux.js.org/next/api/hooks#usedispatch) from React-Redux.

## Database and REST-API

We chose to use [PostgreSQL](https://www.postgresql.org/) as our database, as this is a big opensource project which has support pretty much everywhere and we have worked with it before. Postgres also had support in the ORM we wanted to use.

For our REST-API we chose to use an [Express](https://expressjs.com/)-server as we can use TypeScript with it and it is pretty lightweight to setup and use. For easy use with database we chose to use [TypeORM](https://typeorm.io/#/) with the Express-server. TypeORM handles all the interaction with the PostgreSQL-database and makes it easy to make migrations, create entities and make queries.

The main part of the Express-server is our Controllers which can be found in [/controllers](). These contains all the routes that are available for the server. All of the entities used in the database can be found in the [/entity]()-folder, these are "By", "Studentby" and "Anmeldelse" which should be pretty self-explanatory.

All of our entities can be found in the [/entity]()-folder, migrations in [/migration]()

## Using the database

All of our migrations can be found in [/migration]()-folder. Whenever we make changes to the entities we have to generate a new migration. This can be done by running:
`npm run migrate:generate -- {name of migration}`. The seeders should also potentially be changed. For seeding we use [TypeORM Seeding](https://github.com/w3tecch/typeorm-seeding), we use this to fill our database with sample data. After generating new migration run `./recrea_db.sh` to drop the database, sync the new schema and then seed the database.

## Querying the REST-API

These query parameters are available for the url `http://it2810-72.idi.ntnu.no:3000/api/studentbyer`:

| Query parameter | Allowed values                                                      | Description                                                                                       |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| take            | number                                                              | the number of student cities to return (Must be used with skip)                                   |
| skip            | number                                                              | the number of student cities to skip beforte taking (used for pagination, must be used with take) |
| sort            | alphabetical, inverseAlphabetical, ratingHighToLow, ratingLowToHigh | chooses what to order the student cities by                                                        |
| filter          | number (that matches the id of a city)                              | returns only student cities that are locted in the city with the given number as id               |
| querystring     | any                                                                 | returns only student cities with a name that contains the query string                            |

Example of complete url: `http://it2810-72.idi.ntnu.no:3000/api/studentbyer?take=4&skip=0&sort=ratingHighToLow&querystring=a&filter=1`

## Testing

We have developed unit-tests of the REST-API, unit-tests of the frontend and end-2-end tests of the application as a whole. All of these are automatically tested in [CI](#CI). These tests gives us a variety in our tests with a combination of unit-tests and e2e-tests, and gives us in general a decent coverage of our code.

### CI

Automatic CI is implemented using [Gitlab CI](https://docs.gitlab.com/ee/ci/), the configuration can be found in [.gitlab-ci.yml](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/blob/master/.gitlab-ci.yml). This setup starts up an Docker-image as an service that are available for all the tests. The `api-endpoints-test`-job runs the unit-tests in `/api`. The `e2e-test`-job sets up the Express-server with the Postgres-image and then runs the Cypress-tests found in `/frontend`. The `frontend-unit-test`-job runs all the unit-tests in `/frontend` using the `jest`-command.

### End-to-end tests

We use Cypress for end-2-end testing.

The test is located in the [/cypress/integration/studentbyer/]() folder in frontend and consists of 5 tests. The tests checks that they find the components on the website needed to do the tests, gives some input, checks the API-call, checks the API response and checks what is being displayed after the API has responded.
The tests simulates these central use cases for the website:

- Giving input for searching studentcites
- Changing the page
- Filtering by city
- Changing what to sort by

### REST-API unit-tests

We use [jest](https://jestjs.io/) as a testing framework together with [supertest](https://www.npmjs.com/package/supertest)(used for testing with HTTP) to test endpoints in our REST-API.

### Frontend unit-tests

The unit-tests in frontend are split between testing our Redux setup in isolation and the React components in isolation.

To test our Redux setup and specifically redux-saga, we are using [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) which gives us the ability to mock calls using Providers. In our case we are using static providers. These unit-tests that can be found in [/store/sagas/tests](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/store/sagas/tests) tests both of our sagas in cases where we both get responses from the axios-calls or we get errors. These tests assert that the correct actions are dispatched in both cases.

We also unit-test one of our most important React components: [SearchParameters](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/components/SearchParameters). The test can be found with the component in the [/tests](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/-/tree/master/frontend/src/components/SearchParameters/tests)-folder. We are using [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) which provides us with a DOM for working with React components. Since this component is tightly integrated with redux we have to mock the store if we are going to test it in isolation, we do this by using [redux-mock-store](https://github.com/reduxjs/redux-mock-store). We mock the dispatches using [jest.fn()](https://jestjs.io/docs/en/mock-functions.html). These tests checks that the component can use the store correctly and that changing for example the search-input or choosing an option in a `<select>` dispatches a `SET_FILTER`-action. It also generates a snapshot with the redux-state.

## Deploying the backend

Our REST-API is deployed on the virtual ubuntu machine using services. We made these easy to use by having a `Makefile`. We didn't get to setup automatic deployment so we have to ssh into the virtual machine, fetch the latest changes from Gitlab and restart the server.

## Git and cooperation
We used GitLab Issues to get an overview of what we knew was left to do in the project and what was already done. We created issues continuously as we relised they were needed. Each issue was solved in a seperate branch, and then merged into master. Before we merged into master, we checked that the last commit of the branch passed the pipeline. We had meetings (usually weekly) were we discussed what issues we should prioritize to get done by the next meeting. At the meetings we also assigned issues to ourself, and each student was responsible for finishing the issues they were assigned to. We activly used the 'To Do', 'Doing' and 'Closed' boards for issues to keep track of our current progress towards a finnished progress. Towards the end of the project it became clear that one of the group members was struggeling with both understanding our own codebase and the general consepts of the learning objectives of this assignment. This resulted in a very uneven distribution of issues amoung the groupmembers, and therefor an uneven level of contribution.

## References
- [React Redux](https://react-redux.js.org/using-react-redux/static-typing)
- [Chakra](https://chakra-ui.com/getting-started)
- [Cypress](https://docs.cypress.io/guides/component-testing/introduction.html#Getting-Started)
- [cogo-toast](https://github.com/Cogoport/cogo-toast)

