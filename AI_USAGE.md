## AI Usage

Cursor is being used as an AI assistant during the development of this project.

Prompt #1 (Agent):
    "Create a full-stack project structure. the goal is only to prepare a clear starting structure for the project.

    I want: 
    - a frontend folder
    - a backend folder
    - do not generate the application yet
    - do not add unnecessary dependencies or files" 
Cursor created empty `frontend` and `backend` folders only. I then reviewed the structure to confirm no extra files or dependencies were added.

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
