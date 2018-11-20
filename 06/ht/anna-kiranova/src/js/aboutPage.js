'use strict';

import about from '../pages/aboutPage.html';
document.getElementById('content').innerHTML += about;

import hideAll from './hidePage';

export default function showAboutPage() {
    hideAll();
    let aboutPageContent = document.getElementById('aboutPageContent');
    aboutPageContent.style.display = 'block';
}
