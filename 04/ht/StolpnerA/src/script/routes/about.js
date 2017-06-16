var about = {
    name: 'about',
    match: (text) => text === 'about',
    onBeforeEnter: () => console.log(`onBeforeEnter about`),
    onEnter: () => console.log(`onEnter about`),
    onLeave: () => console.log(`onLeave about`)
};

export { about };