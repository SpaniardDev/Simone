import React from 'react';
import './Header.css';

const Header = props => {
  let phase   = props.phase;
  let winner  = null;
  let playing = null;
  if (
    phase === 'rookie' ||
    phase === 'strict' ||
    phase === 'hardcore' ||
    phase === 'OMG'
  ) {
    playing = true;
  } else if ( phase === 'winner' ) {
    winner = true;
    playing = false;
  } else if ( phase === 'loser') {
    winner = playing = false;
  } else {
    playing = false;
  }
  return (
    <section className="Header">
      <h1 className="logo">SIMONE</h1>
      <div className={playing || props.display ? 'counter' : 'counter hidden'}>
        <small>{winner ? '~ YOU WON! ~' : playing ? `~ ${phase} level ~` : '~ YOU LOSE ~' }</small><br />
        <span>{props.index}</span>
        <small> of </small>
        <span>{props.seq.length}</span>
      </div>
      <h5 className="display">{playing && props.display}</h5>
    </section>
  );
};

export default Header;
