import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <Typewriter
    //text as an array
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
