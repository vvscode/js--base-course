'use strict';

import hideAll from './hidePage';

import about from '../pages/aboutPage.html';
document.getElementById('content').innerHTML += about;

export default function showAboutPage() {
    hideAll();
    let aboutPageContent = document.getElementById('aboutPageContent');
    aboutPageContent.style.display = 'block';
}
