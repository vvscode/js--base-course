import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h1>World Weather</h1>
      <h2>The side presents weather for any city</h2>
      <h3>Simple using:</h3>
      <p>Top part of site: buttons for transition by site (About, Main, Author), switch of HTTP-request (with help XMLHttpRequest object or fetch method) and window for search city on the map.</p>
      <p>Bottom part of site: shows three blocks - history, weather and favorites. Block of history has a list of five the last cities found. Center block shows weather for city which is in the center of the map. In the right block includes cities which user chose (you have to click on the star on the map for choose).</p>
      <p>Also for search you may enter the name of city in the URL-string in format "#/city&name" for example: "https://syarmolenka.github.io/knowweather/#/city&Minsk".</p>
      <h3>Used API:</h3>
      <ul>
        <li><a href="https://www.yandex.by">Yandex</a></li>
        <li><a href="https://www.google.com/">Google</a></li>
        <li><a href="https://www.darksky.net">DarkSky</a></li>
        <li><a href="https://www.ipinfo.io/">IPinfo</a></li>
      </ul>
    </div>);
};

export default About;
