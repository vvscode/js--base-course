'use strict';

import Router from './js/router';
import showAboutPage from './js/aboutPage';
import showAuthorPage from './js/authorPage';
import showWeatherPage from './js/weatherForecastPage';

ymaps.ready(()=> {
    new Router({
        routes: [
            {
                name: 'weather',
                match: '',
                onEnter: showWeatherPage
            },
            {
                name: 'weather',
                match: 'weather',
                onEnter: showWeatherPage
            },
            {
                name: 'weather',
                match: /weather\/(.+)/,
                onEnter: showWeatherPage
            },
            {
                name: 'about',
                match: 'about',
                onEnter: showAboutPage
            },
            {
                name: 'author',
                match: 'author',
                onEnter: showAuthorPage
            }
        ]
    });
});


