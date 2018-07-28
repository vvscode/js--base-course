import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding: 1em;
`
const H1 = styled.h1`
  text-align: center;
`
const H2 = styled.h2`
  text-align: center;
`
const P = styled.p`
  padding: 0 1em;
  text-align: justify;
`
const A = styled.a`
  text-decoration: none;
`

const About = _ => {
  return (
    <Div>
      <H1>Realization game "Life"</H1>
      <H2>Game "Life" - cells automaton, that John Horton Conway (english mathematician) invented</H2>
      <P>Detail information for the game you can find <A href="https://en.wikipedia.org/wiki/John_Horton_Conway#Conway's_Game_of_Life">here</A>.</P>
      <P>In header you will find the tab 'Menu', that include: regulator of speed the game, button play/stop of the game, buttons the jump by history and two windows of choose the size of game field.</P>
      <P>And also you can jump by three method the game (Text, Canvas, Svg), that shows relevant technology of display game.</P>
    </Div>
  );
};

export default About;
