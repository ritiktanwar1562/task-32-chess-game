# Offline Chess Game using React JS

## About My Project

I built this offline chess game as part of my React learning journey. Before starting this project, I had only created small React applications. I wanted to challenge myself by creating a game that uses both React components and JavaScript logic.

While working on this project, I learned how different chess rules work and how to convert those rules into code. I completed the project by developing and testing each feature one by one.

## Features I Added

- Created an 8x8 chess board
- Added all chess pieces with their starting positions
- Added movement logic for all pieces
- Added turn system for White and Black players
- Added invalid move checking
- Added check detection
- Added checkmate logic
- Added timer for both players
- Added move list display
- Added chess move notation
- Added captured pieces display
- Added undo move feature
- Added legal move highlighting

## How I Made This Project

I started this project by creating different React components for the chess board, squares, pieces and other sections.

First, I created the board layout and displayed all chess pieces in their initial positions.

After that, I worked on the movement logic of each chess piece like Pawn, Rook, Knight, Bishop, Queen and King.

I created separate files for handling different logic parts so that the code becomes easier to manage.

Then I added player turns, timers, move history and check/checkmate functionality.

I tested every feature step by step and fixed errors while developing the project.

## Technologies Used

- React JS
- JavaScript
- HTML
- CSS
- Vite

## How To Run This Project

Follow these steps to run the project:

1. Download or clone this project.

2. Open the project folder in VS Code.

3. Open terminal in the project folder.

4. Install all dependencies:

5. Start the development server:

6. open the localhost link shown in the terminal in your browser.

## What I Learned From This Project

While creating this project, I learned many new things about React and JavaScript.

I learned:
- How to create and use React components.
- How to manage states using useState.
- How to update UI according to user actions.
- How to divide a large project into smaller files.
- How to create game logic using JavaScript.
- How to debug and solve errors.

## Problems I Faced

The hardest part of this project was implementing check and checkmate logic because I first had to find the king, then check whether any opponent piece could attack it.

Another challenge was validating legal moves without breaking the game state. During development I tested many board positions manually and fixed several bugs related to piece movement, turn switching and move validation.

I improved the project step by step instead of writing everything at once, which helped me understand the complete logic.

## Project Structure
src | |-- components |   |-- Board.jsx |   |-- Square.jsx |   |-- Piece.jsx |   |-- Timer.jsx |   |-- MoveList.jsx | |-- data |   |-- initialBoard.js | |-- utils |-- moveValidator.jsx |-- chessLogic.jsx |-- checkLogic.jsx |-- notation.jsx

## Conclusion

This project gave me practical experience with React and JavaScript. Instead of only learning React syntax, I learned how to solve real programming problems by breaking them into smaller parts.

If I continue improving this project in the future, I would like to add features such as castling, pawn promotion, draw detection and playing against the computer.