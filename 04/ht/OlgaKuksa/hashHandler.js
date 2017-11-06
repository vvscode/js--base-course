window.location.hash="#Calendar";

window.onhashchange=onHashChange;


function onHashChange()
{
    if (document.getElementById('CalScript'))
        document.getElementById('CalScript').parentNode.removeChild(document.getElementById('CalScript'));
    var paras = document.getElementsByTagName('div');
    while(paras[0]) paras[0].parentNode.removeChild(paras[0]);

    if(location.hash=="#Calendar") {
        new Calendar(1,1,1,1,new Date(2017,10,1),111),document.getElementById("caltest")};
    if(location.hash=="#Settings") {
        drawLayout();

    };

}