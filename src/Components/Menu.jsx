import React from 'react';
import './Menu.css';

const Menu = props => {

  if ( props.phase === 'start' ) {
    return (
      <section>
        <h2 className="title">Want to play SIMONE?</h2>
        <div className="items">
          <a
            href="#/"
            alt="Start a new game"
            title="Start a new game"
            className="item"
            onClick={() => props.changePhase('levels')}
          >
            [ LET'S PLAY ]
          </a>
        </div>
      </section>
    );
  } else if ( props.phase === 'levels' ) {
    return (
      <section>
        <h2 className="title">Select a level</h2>
        <div className="items">
          <a
            href="#/"
            alt="If you fail, you can try again and again"
            title="If you fail, you can try again and again"
            className="item"
            onClick={() => props.changePhase('rookie')}
          >
            [ ROOKIE ]
          </a>
          <a
            href="#/"
            alt="In this level, if you fail, you've lost"
            title="In this level, if you fail, you've lost"
            className="item"
            onClick={() => props.changePhase('strict')}
          >
            [ STRICT ]
          </a>
          <a
            href="#/"
            alt="CAUTION! Speedy level"
            title="CAUTION! Speedy level"
            className="item"
            onClick={() => props.changePhase('hardcore')}
          >
            [ HARDCORE ]
          </a>
          <a
            href="#/"
            alt="OH MY GOD level. It says it all!"
            title="OH MY GOD level. It says it all!"
            className="item"
            onClick={() => props.changePhase('OMG')}
          >
            [ OMG! ]
          </a>
        </div>
      </section>
    );
  } else if ( props.phase === 'loser' ) {
    return (
      <section>
        <h2 className="title">Sorry... You lose.</h2>
        <p>Want to try again? I'm sure you can do better! :)</p>
        <div className="items">
          <a
            href="#/"
            alt="Start a new game"
            title="Start a new game"
            className="item"
            onClick={() => props.changePhase('levels')}
          >
            [ WHY NOT? GAME ON! ]
          </a>
        </div>
      </section>
    );
  } else if ( props.phase === 'winner' ) {
    return (
      <section>
        <h2 className="title">Sweet!! We have a winner!</h2>
        <p>
          Want to share this awesome victory with your friends?{' '}
          <a class="item" href={"https://twitter.com/intent/tweet?hashtags=Simon,Game,FreeCodeCamp,Coders,Dev,React&via=spaniarddev&related=freecodecamp&text=" + encodeURIComponent( `Yay! I just won at the coolest Simon Game ever on level [${props.currLevel}]! Try it yourself: https://codepen.io/spaniarddev/full/KRJVNw/`)} rel="noopener noreferrer" target="_blank">
            [ Tweet it! ]
          </a>
        </p>
        <div className="items">
          <a
            href="#/"
            alt="Start a new game"
            title="Start a new game"
            className="item"
            onClick={() => props.changePhase('levels')}
          >
            [ LET'S TRY ANOTHER LEVEL! ]
          </a>
        </div>
      </section>
    );
  } else {
    return '';
  }
};

export default Menu;
