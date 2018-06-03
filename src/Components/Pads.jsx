import React from 'react';
import "./Pads.css";

const Pads = props => {

  const { active,click } = props;

  return (
    <section className="Game">
      <div
        onClick={() => click(0)}
        id="green"
        className={active==='green' ? 'Pad active' : 'Pad'}
      />
      <div
        onClick={() => click(1)}
        id="red"
        className={active==='red' ? 'Pad active' : 'Pad'}
      />
      <div
        onClick={() => click(2)}
        id="yellow"
        className={active==='yellow' ? 'Pad active' : 'Pad'}
      />
      <div
        onClick={() => click(3)}
        id="blue"
        className={active==='blue' ? 'Pad active' : 'Pad'}
      />
    </section>
  );
};

export default Pads;
