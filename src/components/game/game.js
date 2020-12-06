import React, {Component} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';

const GameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  border: 2px solid #222;
  margin: 0 auto;
  color: #fff;
  font-size: 1.5rem;

  @media ${g.medium} {
    width: 90vw;
  }

  @media ${g.large} {
    width: 70vw;
  }

`

export default class TypeGame extends Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    return(
      <GameWrapper>
        eyoo: {words[Math.floor(Math.random() * words.length)]}
      </GameWrapper>
    );
  }
}