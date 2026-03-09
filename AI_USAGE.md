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

Prompt #2(Plan):
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
