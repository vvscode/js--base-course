'use strict';

bus.on('route:about:enter', function() {
    hideAll();
    let aboutPageContent = document.getElementById('aboutPageContent');
    aboutPageContent.style.display = 'block';
});
