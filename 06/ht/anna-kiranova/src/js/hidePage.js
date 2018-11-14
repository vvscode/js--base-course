'use strict';

export default function hideAll() {
    let content = document.getElementById('content');
    let footer = document.getElementById('footer');
    footer.style.display = 'none';
    let nodes = content.querySelectorAll('#content > div');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = 'none';
    }
}