'use strict';

import author from '../pages/authorPage.html';
document.getElementById('content').innerHTML += author;

import hideAll from './hidePage';

export default function showAuthorPage() {
    hideAll();
    let authorPageContent = document.getElementById('authorPageContent');
    authorPageContent.style.display = 'block';
}
