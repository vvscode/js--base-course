'use strict';

bus.on('route:author:enter', function() {
    hideAll();
    let authorPageContent = document.getElementById('authorPageContent');
    authorPageContent.style.display = 'block';
});
