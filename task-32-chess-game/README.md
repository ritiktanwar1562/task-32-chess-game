# Offline Chess Game using React JS

## About My Project

I made this Offline Chess Game project using React JS.

The main purpose of making this project was to learn how to create interactive applications using React and understand how game logic works.

This is a two player chess game where both players can play on the same device by taking turns.

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

The most difficult part of this project was creating chess movement rules without using any external chess library.

Every chess piece has different movement rules, so creating validation logic was challenging.

I also faced problems while managing turns, timers and checking game conditions.

I solved these problems by testing each part separately and improving my code step by step.

## Project Structure
src | |-- components |   |-- Board.jsx |   |-- Square.jsx |   |-- Piece.jsx |   |-- Timer.jsx |   |-- MoveList.jsx | |-- data |   |-- initialBoard.js | |-- utils |-- moveValidator.jsx |-- chessLogic.jsx |-- checkLogic.jsx |-- notation.jsx

## Conclusion

Making this chess game was a challenging but useful experience for me.

This project improved my React skills and helped me understand how real applications are built using logic and components.

I learned how to solve problems step by step and create a complete working project.