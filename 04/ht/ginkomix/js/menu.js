handleUrl(window.location.href); 

document.querySelector('.menu').addEventListener('click',function(event){
	if(event.target.tagName!='A') {
		return;
	}

	event.preventDefault();
	let url = event.target.getAttribute('href');
	window.location.hash = url;	
});

function handleUrl(url) {
	let active = document.querySelector('a.active');

	if(window.location.hash=='') {
		window.location.hash =active.getAttribute('href');
	} else {
		let noActive = document.querySelector('a[href="'+url.split('#').pop()+'"]');
		document.querySelector('#'+active.getAttribute('href')).style.display='none';
		document.querySelector('#'+noActive.getAttribute('href')).style.display='block';
		active.classList.remove('active');
		noActive.className = 'active';
	}
}
window.addEventListener('hashchange',function(ev){
	handleUrl(ev.newURL);
});