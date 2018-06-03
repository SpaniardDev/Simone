import React, { Component } from 'react';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Pads from './Components/Pads';

import './Game.css';

class Game extends Component {
  /*****************************************************
   * Initializing properties and the state.            *
   *****************************************************/
  colors = ['green', 'red', 'yellow', 'blue'];
  sounds = [];
  randomSequence = [];
  miliseconds = null;
  levels = {
    ROOKIE: { steps: 6, speed: 1000 },
    STRICT: { steps: 12, speed: 1000 },
    HARDCORE: { steps: 24, speed: 800 },
    OMG: { steps: 99, speed: 700 }
  };
  state = {
    gamePhase: 'start',
    active: '',
    display: '',
    compSequence: [],
    playerSequence: [],
    seqIndex: 1,
    currLevel: ''
  };

  /*****************************************************
   * Preloading game sounds from the Internet.         *
   *****************************************************/
  componentWillMount() {
    let URLs = [
      'https://www.dropbox.com/s/mfvhhomhyzwym91/simonSound1.mp3?raw=1',
      'https://www.dropbox.com/s/1eka97ggcatmv8c/simonSound2.mp3?raw=1',
      'https://www.dropbox.com/s/mhbzfaygjwzcq8l/simonSound3.mp3?raw=1',
      'https://www.dropbox.com/s/e7ibkv8zihbdtkh/simonSound4.mp3?raw=1',
      'https://www.dropbox.com/s/pt6gfb0uolqy53v/simonSound_wrong.mp3?raw=1',
      'https://www.dropbox.com/s/7uy8ttxu71cw9t3/simonSound_win.mp3?raw=1'
    ];
    this.sounds = URLs.map(url => {
      let audio = new Audio();
      audio.src = url;
      audio.preload = 'auto';
      audio.volume = 0.75;
      return audio;
    });
  }

  /*****************************************************
   * Setting up the state to start/restart the game.   *
   *****************************************************/
  initGameState = (phase, crop, ms) => {
    this.miliseconds = ms;
    this.setState(
      {
        gamePhase: phase,
        compSequence: this.randomSequence.slice(0, crop),
        playerSequence: [],
        seqIndex: 1,
        display: 'Pay attention',
        currLevel: phase
      },
      () => setTimeout(() => this.playSequence(this.miliseconds), 500)
    );
  };

  /*****************************************************
   * Setting up the level of the game as requested.    *
   *****************************************************/
  changeGamePhase = phase => {
    // Redefines de body's BG Color to black.
    document.body.style.backgroundColor = 'black';
    // Generates a new random sequence to be played/matched.
    this.randomSequence = new Array(99)
      .fill(null)
      .map(number => Math.floor(Math.random() * 4));

    // Checks the level chosen and initialize the game.
    if (phase === 'rookie')
      this.initGameState(
        phase,
        this.levels.ROOKIE.steps,
        this.levels.ROOKIE.speed
      );
    if (phase === 'strict')
      this.initGameState(
        phase,
        this.levels.STRICT.steps,
        this.levels.STRICT.speed
      );
    if (phase === 'hardcore')
      this.initGameState(
        phase,
        this.levels.HARDCORE.steps,
        this.levels.HARDCORE.speed
      );
    if (phase === 'OMG')
      this.initGameState(phase, this.levels.OMG.steps, this.levels.OMG.speed);
    // If not a game level, update the state only.
    else this.setState({ gamePhase: phase });
  };

  /*****************************************************
   * Playing the computer's random sequence.           *
   *****************************************************/
  playSequence = () => {
    let index = 0;
    let seqIndex = this.state.seqIndex + 1;
    // Lights up the sequence by intervals, one at a time.
    let play = setInterval(() => {
      // If the local index didn't finish playing the player's sequence...
      if (index <= this.state.playerSequence.length) {
        // ...lights up each color in the sequence and sets up the new
        // state index (seqIndex + 1)...
        this.sounds[this.state.compSequence[index]].play();
        this.setState({
          display: 'Pay attention',
          seqIndex: seqIndex,
          active: this.colors[this.state.compSequence[index]]
        });
        // ...the color is set to inactive (dimming it) after ms/2...
        setTimeout(() => {
          this.setState({
            active: ''
          });
        }, this.miliseconds / 2);
        // ...and goes for the next item...
        index++;
        // If it's finished playing the sequence...
      } else {
        // ...stops the interval and changes the state for the player.
        clearInterval(play);
        this.setState({
          display: 'Your turn',
          active: '',
          playerSequence: []
        });
      }
    }, this.miliseconds);
  };

  /*****************************************************
   * Handling the click/tap on the colored pads.       *
   *****************************************************/
  handlePads = color => {
    const phase = this.state.gamePhase;
    // If the game started, a level was chosen and its the human's turn...
    if (
      phase !== 'start' &&
      phase !== 'levels' &&
      this.state.display === 'Your turn'
    ) {
      // ...plays the corresponding sound and lights up the color...
      this.sounds[color].play();
      this.setState({
        active: this.colors[color],
        playerSequence: [...this.state.playerSequence, color]
      });
      setTimeout(() => {
        this.setState(
          {
            active: ''
          },
          // ...and then it checks if the current sequence is correct.
          this.checkSequence()
        );
      }, this.miliseconds / 2);
    }
  };

  /*****************************************************
   * Checking if the entered sequence is correct       *
   *****************************************************/
  checkSequence = () => {
    // Copies the sequences arrays, cropping the computer one to match the
    // player's array in size.
    const playerSq = this.state.playerSequence;
    const compSq = this.state.compSequence.slice(0, this.state.seqIndex - 1);

    for (let index in playerSq) {
      // If both elements in the sequence match...
      if (playerSq[index] === compSq[index]) {
        // ...if the current sequence is completed...
        if (Number(index) === Number(compSq.length - 1)) {
          // ...and if we checked all the original sequence...
          if (Number(index) === Number(this.state.compSequence.length - 1)) {
            // Mission accomplished ;)
            this.setState({
              display: 'Yay! We have a winner!',
              gamePhase: 'winner'
            });
            // Plays the winning song.
            this.sounds[5].play();
            // If, instead, the current sequence is verified but there are
            // more elements in the original sequence, continue verifying.
          } else {
            setTimeout(() => this.playSequence(this.miliseconds), 500);
          }
        }
        // Last element on player's seq. didn't match the computer's sequence.
      } else {
        // If a rookie player, starts again, giving infinite chances to win.
        if (this.state.gamePhase === 'rookie') {
          // Sets body's BG 'red' for a moment and plays the WRONG sound...
          document.body.style.backgroundColor = 'red';
          this.sounds[4].play();
          this.setState(
            {
              display: 'Oops! Try again...',
              playerSequence: [],
              seqIndex: 1
            },
            () =>
              //...and after 2 seconds, redefines body's BG color to 'black'
              // and plays the sequence again.
              setTimeout(() => {
                document.body.style.backgroundColor = 'black';
                this.playSequence(this.miliseconds);
              }, 2000)
          );
          // If not a rookie player, game over.
        } else {
          this.setState({
            gamePhase: 'loser',
            display: 'Nope! Wrong sequence.'
          });
          // Sets body's BG 'red' for a moment and plays the WRONG sound.
          document.body.style.backgroundColor = 'red';
          this.sounds[4].play();
        }
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header
          phase={this.state.gamePhase}
          seq={this.state.compSequence}
          index={this.state.seqIndex - 1}
          display={this.state.display}
        />
        <nav
          className={
            this.state.gamePhase === 'start' ||
            this.state.gamePhase === 'levels' ||
            this.state.gamePhase === 'loser' ||
            this.state.gamePhase === 'winner'
              ? 'Menu show'
              : 'Menu hidden'
          }
        >
          <Menu
            phase={this.state.gamePhase}
            currLevel={this.state.currLevel}
            changePhase={this.changeGamePhase}
          />
        </nav>
        <Pads active={this.state.active} click={this.handlePads} />
      </React.Fragment>
    );
  }
}

export default Game;
