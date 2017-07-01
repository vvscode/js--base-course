import {renderScoreFromLS} from '../components/localStorage'

var div = document.querySelector('div.main');
var about = {
    name: 'about',
    match: (text) => text === 'about',
    onBeforeEnter: () => console.log(`onBeforeEnter about`),
    onEnter: () => {
        div.innerHTML = '<p>Андрей</p> <a href="https://vk.com/stolpner_andrey" target="_blank">VK</a><br><hr>';
        renderScoreFromLS();
    },
    onLeave: () => div.innerHTML = ''
};

export { about };