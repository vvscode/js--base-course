var city = {
    name: 'city',
    match: /city=(.+)/,
    onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
    onEnter: (city) => console.log(`onEnter city:${city}`),
    onLeave: (city) => console.log(`onLeave city:${city}`)
};