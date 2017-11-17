var content = document.getElementById('content');
var router = new Router([
    {
        name: 'calendar',
        match: /.+#calendar/,
        onLeave: () => content.innerHTML = '',
        onEnter: () => {
            content.innerHTML += '<div id="#calendar1" class="fullScreen"></div>';
            new Calendar({
                el: '#calendar1',
                showMonth: true,
                allowAdd: true,
                allowRemove: true,
                allowChangeMonth: true,
                date: [2017, 12],
            });
        },
    },
    {
        name: 'options',
        match: /.+#options/,
        onLeave: () => content.innerHTML = '',
        onEnter: () => new CalendarConfiguration('content'),
    },
], eventBus);

router.handleUrl(undefined, '/#calendar');

document.body.addEventListener('click', (ev) => {
    if (!ev.target.matches('a')) {
        return;
    }
    ev.preventDefault();

    var url = ev.target.getAttribute('href');
    window.location.hash = url;
});

window.addEventListener('hashchange', (ev) => eventBus.trigger('window:hashchange', ev.oldURL, ev.newURL));
