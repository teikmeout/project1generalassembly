import React, { Component } from 'react';
import './Game.css';
class Game extends Component {
  constructor() {
    super();
    this.state = {
      beginner: 8,
      // intermediate: 16,
      // expert: 24,
      chosenDifficulty: 'beginner',
    };
  }

  // method to control the rendering of the board depending on state
  renderBoard() {
    console.log('render board');
    if (this.state.chosenDifficulty == null) {
      return <h1>Difficulty not chosen</h1>;
    }

    // map throgh rows and columns
    // this should allow us to use to separate components
    // a row component
    // and a cell component
    // since boards are simmetrical, we don't need to pass props to children
    const x = new Array(this.state.beginner).fill(0);
    console.log(x);
    x.map(el => console.log('hola'));
  }

  render() {
    return (
      <div>
        <h1>Game Page</h1>
        <section style={{border: '1px solid red'}}>
          <div className="gameboard">
          { this.renderBoard() }
          </div>
        </section>
      </div>
    );
  }
}

export default Game;
