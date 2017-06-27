var artical = document.querySelector('div.artical');
var about = {
    name: 'about',
    match: (text) => text === 'about',
    onBeforeEnter: () => console.log(`onBeforeEnter about`),
    onEnter: () => {
        artical.innerHTML = '<p>Андрей</p> <a href="https://vk.com/stolpner_andrey" target="_blank">VK</a>';
    },
    onLeave: () => artical.innerHTML = ''
};

export { about };