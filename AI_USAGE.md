## AI Usage

Cursor is being used as an AI assistant during the development of this task.

-------------------------------------------------------------------------------------------------------------

Prompt #1 (Agent):
    "Create a full-stack project structure. the goal is only to prepare a clear starting structure for the project.

    I want: 
    - a frontend folder
    - a backend folder
    - do not generate the application yet
    - do not add unnecessary dependencies or files" 

    Cursor created empty `frontend` and `backend` folders only. I then reviewed the structure to confirm no extra files or dependencies were added.

-------------------------------------------------------------------------------------------------------------

Prompt #2 (Plan):
    "I am an application that will run the game 'guess the country'. in the game, the user gets 3 clues for a random country, and will need to guess the name of it. 

    first i want to build the dataset. 
    the countries Ive chosen are:
    - Brazil
    - England
    - Israel
    - China
    - Russia
    - Greece
    - Italy
    - Egypt
    - Japan
    - Australia

    I want you to find for each country 5 clues that will be pretty indicative but not too easy.

    the clues need to be easy-medium level. 
    i want the dataset to be in a file called dataset.js"

Cursor created backend/dataset.js with the 10 chosen countries, each having 5 easy–medium clues ready for the game logic.

-------------------------------------------------------------------------------------------------------------

Prompt #3 (Agent):
    " i want to start with the backend before doing the frontend. 

    create server.js file and leave it empty.
    only create the file do nothing more."

Cursor created an empty backend/server.js file to prepare for implementing the game API.

-------------------------------------------------------------------------------------------------------------

Prompt #4 (Plan):
    "now well start working on the API inside @backend/server.js .
    - use node.js and express
    - create an endpoint called game that will choose a random country from the dataset. after that 3 random clues out of the chosen country's 5 clues.
    -create an endpoint that validates the user's answer."

Cursor updated backend/dataset.js to use CommonJS exports and implemented an Express server in backend/server.js with GET /game and POST /game/validate endpoints, including basic error handling. After reviewing the code, I cleaned up the code structure and added comments to improve readability and clarity.

-------------------------------------------------------------------------------------------------------------

Prompt #5 (Agent):
    "I want you to change the GET and POST endpoints in @backend/server.js :
    instead of using json, i want to use render to pass the data to and from @frontend/index.ejs"

Cursor refactored backend/server.js so GET /, GET /game, POST /game/validate now render the EJS view in frontend/index.ejs, and implemented index.ejs as a single-page experience with title, start button, clues, guess form, and result/error messages.

-------------------------------------------------------------------------------------------------------------

Prompt #6 (Agent):
"title is not relevant because it wont change, Ill have it in the ejs file as simple html"

Cursor removed the fixed title from the res.render for it to be added as html later on 

-------------------------------------------------------------------------------------------------------------

Prompt #7 (Agent):
    "i want to install all of the relevant moduls for this project to run it"

Cursor initialized an npm project in the repository root with package.json and installed the express and ejs modules required for the Node.js + EJS server to run.

-------------------------------------------------------------------------------------------------------------

Prompt #8 (Agent):
    "I want you to make sure that I always pass all the varibles that the EJS expects, even if they are null"

Cursor updated backend/server.js to introduce a base view model and a renderIndex helper so every render of index.ejs always receives countryId, clues, correct, correctName, and error, preventing undefined template variables.

-------------------------------------------------------------------------------------------------------------

Prompt #9 (Plan):
    "now I want to build @frontend/index.ejs from scratch. 
    - i want the styling to be very simple with no complex implementations such like animations etc.
    - I want to have the title of the game fixed to the top of the page at all time

    I want you to implement it based on the following flow:
    - the landing page will consist of only "Start a Game"  button with no extra data.
    - pressing the button will initialize the endpoint /game 
    - in /game the 3 clues will appear and under them a text box for the user's guess
    - When the user submits their answer, the application makes a request to endpoint B, moving from the initial endpoint /game flow to the answer-submission endpoint /game/validate.
    - from /game/validate the user will have an option to start a new game"

Cursor built frontend/index.ejs with a simple layout, fixed title header, and three states: landing with only a \"Start a Game\" button, game view showing 3 clues and a guess form posting to /game/validate, and result/error views offering a button to start a new game.

-------------------------------------------------------------------------------------------------------------

Prompt #10 (Agent):
    "I want the styling of @frontend/index.ejs to be in a new css file"

Cursor moved all inline CSS from index.ejs into frontend/styles.css, linked it in the EJS head with /styles.css, and added express.static in backend/server.js to serve the frontend folder so the stylesheet loads correctly.

-------------------------------------------------------------------------------------------------------------

Prompt #11 (Agent):
    "I want to make a change small change in the styling: 
    i dont want the content to be in a white box, and i want each clue to be in a small round edged box of its own"

Cursor removed the white background and border from the .card in frontend/styles.css so content is no longer inside a white box, and added .clues-list styling so each clue appears in its own small round-edged box (border-radius, light background, padding) in frontend/styles.css and added class=\"clues-list\" to the clues ul in index.ejs.

-------------------------------------------------------------------------------------------------------------

Prompt #12 (Plan):
    "Now the development of the project is done, I would like to make a change.
    at the moment, the dataset is stored inside a js and being stored in-memory during runtime, I want to change it by storing the countries and clues of @backend/dataset.js in a simple postgre databae instead. note: take into consideration that later on we will prepare the project in order to deploy in on Vercel (well do it later, now i want you to focus only on migrating the dataset to Postgre)"

Cursor added PostgreSQL support using pg in backend/db.js, created backend/seedCountries.js to create and seed a countries table from the existing dataset, and refactored backend/server.js so /game and /game/validate now fetch and validate countries using the PostgreSQL database instead of the in-memory dataset.

-------------------------------------------------------------------------------------------------------------

Prompt #13 (Agent):
    "I dont want to use @backend/dataset.js  anymore and I dont want other people using it too."

Cursor inlined the countries dataset directly into backend/seedCountries.js so it no longer imports backend/dataset.js, and then removed backend/dataset.js entirely so the project now relies only on PostgreSQL as the single source of truth for country data.

-------------------------------------------------------------------------------------------------------------

Prompt #14 (Agent):
    "that the postgres url  postgresql://neondb_owner:npg_v8QqCrxf9TpS@ep-summer-sunset-a4n4nuaf-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

    make the adjustments in @backend/server.js  and all the other relevant files following our conversation"

Cursor implemented Option A (use POSTGRES_URL with DATABASE_URL as fallback for Vercel/Neon): updated backend/db.js to set the connection string from process.env.POSTGRES_URL || process.env.DATABASE_URL and adjusted the missing-config warning; updated README.md with an Environment section documenting POSTGRES_URL and DATABASE_URL, added pg to dependencies, and added a one-time seed step (node backend/seedCountries.js) to the How to Run instructions.

-------------------------------------------------------------------------------------------------------------

Prompt #15 (Agent):
    "I want to be able to choose to run the project locally or through Vercel. for that i want you to make the adjustments by:
    splitting the @backend/server.js file into 2 files inside backend - first is app.js that contains all of the routes and the logic that the original server file had, the second is a new server.js that will require app.js in order to run the server locally if i choose to with listen.
    make these adjustments and all follow-up adjustments needed to achieve my goal."

Cursor split the Express app into backend/app.js (all middleware, helpers, routes, and error handler; no PORT or app.listen; module.exports = app) and backend/server.js (require ./app, PORT, app.listen only). Added api/index.js that requires ../backend/app and exports it for Vercel's serverless handler. Added vercel.json at project root with rewrites so all requests go to /api. Updated README.md "How to Run" with Local (node backend/server.js) vs Vercel (deploy and set POSTGRES_URL; no server.js on Vercel).

-------------------------------------------------------------------------------------------------------------

Prompt #16 (Agent):
    "implement Option 1 (demo database fallback) so i can run the project without setting any environment variables, as this database contains no sensitive data. In backend/db.js: Add a constant DEMO_CONNECTION_STRING with [Neon URL]. Use it as a fallback when neither POSTGRES_URL nor DATABASE_URL is set. Always pass a valid connection string to new Pool(). Update the warning so it only logs when the demo fallback is used. Optionally update README.md so 'How to Run' states that testers can run with no env setup and that setting POSTGRES_URL or DATABASE_URL overrides the demo."

Cursor initially implemented a DEMO_CONNECTION_STRING fallback in backend/db.js as described, and updated README.md to document zero-setup usage. Later, at the user's request to remove the fallback and avoid exposing the Neon URL, Cursor refactored backend/db.js so it now requires POSTGRES_URL or DATABASE_URL (no built-in demo connection string), and added a .env file template with POSTGRES_URL= for local configuration.

-------------------------------------------------------------------------------------------------------------

Prompt #17 (Agent):
    "update in README the link to the live app: https://guessthecountry-nadavmas.vercel.app/"

Cursor updated README.md so the Live app section now points to the deployed Vercel URL https://guessthecountry-nadavmas.vercel.app/ instead of the previous deployment URL.

