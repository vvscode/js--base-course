var cssId = 'calendarCSS';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://drive.google.com/open?id=1KwTmcZkDpA8RQATkWLGbNNpbDq4Z67BW';
    head.appendChild(link);
}