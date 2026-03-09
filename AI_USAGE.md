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

Prompt #3 (Agent):
    " i want to start with the backend before doing the frontend. 

    create server.js file and leave it empty.
    only create the file do nothing more."
Cursor created an empty backend/server.js file to prepare for implementing the game API.

Prompt #4 (Plan):
    "now well start working on the API inside @backend/server.js .
    - use node.js and express
    - create an endpoint called game that will choose a random country from the dataset. after that 3 random clues out of the chosen country's 5 clues.
    -create an endpoint that validates the user's answer."
Cursor updated backend/dataset.js to use CommonJS exports and implemented an Express server in backend/server.js with GET /game and POST /game/validate endpoints, including basic error handling. After reviewing the code, I cleaned up the code structure and added comments to improve readability and clarity.
