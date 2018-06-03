import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div style={{margin: '0 auto', width: '80%'}}>
        <h1>Minesweeper</h1>
        <br/>
        <p>
        Find the hidden mines beneeth the blocks
        by revealing the open spaces that will tell you
        how many mines are around you</p>
        <img
          src="http://nitro-net.com/wp-content/uploads/2017/12/minesweeper.gif"
          alt="minesweeper image"
        />
        <br/>
        <Link to="/game/easy">
          <button style={{margin: 10}}>Easy</button>
        </Link>
        <Link to="/game/medium">
          <button style={{margin: 10}}>Medium</button>
        </Link>
        <Link to="/game/hard">
          <button style={{margin: 10}}>Hard</button>
        </Link>

      </div>
    )
  }
}
