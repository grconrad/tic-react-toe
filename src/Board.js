import React, { Component } from 'react';

import './Board.css';

class Board extends Component {

  handleClick = (e) => {
    // Determine target row and cell that was clicked.
    // This logic belongs here because the details depend on this component's rendering.
    const target = e.target;
    if (target.id) {
      const [r, c] = target.id.substr('cell'.length).split('-');
      this.props.onClick(r, c);
    }
  }

  render() {
    const {data, winningSquares} = this.props;
    const squaresToMark = winningSquares.map((square) => {
      const [r, c] = square;
      return (3 * r + c);
    });
    return (
      <>
        <table className="Board" onClick={this.handleClick}>
          <tbody>
            {data.map((row, r) =>
              <tr key={`row-${r}`}>
                {row.map((cell, c) => {
                  let classNames = ["Board-cell"];
                  if (squaresToMark.includes(3 * r + c)) {
                    classNames.push("Board-cell-solved");
                  }
                  return (
                    <td key={`cell${r}-${c}`} id={`cell${r}-${c}`} className={classNames.join(" ")}>
                      {cell || ""}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }

}

export default Board;
