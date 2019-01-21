import React, { Component } from 'react';

import './App.css';

import Board from './Board';

const TURN_NONE = '';
const TURN_X = 'X';
const TURN_O = 'O';

class App extends Component {

  constructor() {
    super();

    // Using NaN for empty squares is a trick that just saves us a tiny bit of work when checking
    // for a solution.
    this.state = {
      board: [
        [NaN, NaN, NaN], // row 0
        [NaN, NaN, NaN], // row 1
        [NaN, NaN, NaN]  // row 2
      ],
      squaresLeft: 9, // could be derived, but faster to maintain it as state
      turn: TURN_X,
      winningSquares: []
    };
  }

  /**
   * @param {Number} r
   * @param {Number} c
   */
  handleClick = (r, c) => {
    const {board} = this.state;
    let {squaresLeft, turn} = this.state;
    if (turn === TURN_NONE) {
      // Game is solved. Ignore click until board is reset.
      return;
    }
    if (!board[r][c]) {
      // Update board data for this square.
      board[r][c] = turn;
      squaresLeft--;
      // Check for solution, updating list of winning squares if appropriate.
      // Also update next turn if there's no solution yet.
      const winningSquares = this.computeWinningSquares(board);
      if (winningSquares.length > 0 || squaresLeft === 0) {
        turn = TURN_NONE;
      } else {
        turn = (turn === TURN_X) ? TURN_O : TURN_X;
      }
      this.setState({
        board,
        squaresLeft,
        turn,
        winningSquares
      });
    }
  }

  /**
   * Check for solution. If one is found, return list of winning squares.
   *
   * @returns {Array} winning squares (empty array if the game is not yet won)
   */
  computeWinningSquares = (board) => {
    for (let r = 0; r < 3; r++) {
      let row = board[r];
      if (row[0] === row[1] && row[1] === row[2]) {
        return [
          [r, 0],
          [r, 1],
          [r, 2]
        ];
      }
    }
    const [r0, r1, r2] = board;
    for (let c = 0; c < 3; c++) {
      if (r0[c] === r1[c] && r1[c] === r2[c]) {
        return [
          [0, c],
          [1, c],
          [2, c]
        ];
      }
    }
    if (r0[0] === r1[1] && r1[1] === r2[2]) {
      return [
        [0, 0],
        [1, 1],
        [2, 2]
      ];
    }
    if (r0[2] === r1[1] && r1[1] === r2[0]) {
      return [
        [0, 2],
        [1, 1],
        [2, 0]
      ];
    }
    return [];
  }

  initGame = () => {
    this.setState({
      board: [
        [NaN, NaN, NaN], // row 0
        [NaN, NaN, NaN], // row 1
        [NaN, NaN, NaN]  // row 2
      ],
      squaresLeft: 9,
      turn: TURN_X,
      winningSquares: []
    });
  }

  render() {
    const {board, turn, winningSquares} = this.state;
    // Winner isn't recorded in state but we can easily derive it by reading one of the winning
    // squares.
    let winner = "";
    if (winningSquares.length > 0) {
      const [r, c] = winningSquares[0];
      winner = board[r][c];
    }
    return (
      <>
        <h1>Tic-React-Toe</h1>
        <Board data={board} winningSquares={winningSquares} onClick={this.handleClick}/>
        <div className="game-controls">
          {winner ? `${winner} wins!` :
           turn ? `${turn}'s turn` :
           "No winner, try again"}
        </div>
        <div className="game-controls">
          <button onClick={this.initGame}>New game</button>
        </div>
      </>
    );
  }

}

export default App;
