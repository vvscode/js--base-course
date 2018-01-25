var skycons = new Skycons();

function setIcons() {

    var icons = document.querySelectorAll('canvas');
    for (let i = 0; i < icons.length; i++) {
        skycons.add(icons[i], Skycons[icons[i].className.toUpperCase().replace(/-/g, "_")]);
    }

    skycons.play();
};
setIcons();

export default function updateIcons() {
    var icons = document.querySelectorAll('canvas');
    for (let i = 0; i < icons.length; i++) {
        skycons.set(icons[i], Skycons[icons[i].className.toUpperCase().replace(/-/g, "_")]);
    }
}