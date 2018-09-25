var xDown = null;
var yDown = null;
var prevHL = null;
var nextHL = null;

function handleTouchStart(event)
{
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
}

function handleTouchMove(event)
{
    if (xDown && yDown) {
        let xUp = event.touches[0].clientX;
        let yUp = event.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if (Math.abs(xDiff) > 10 && Math.abs(yDiff) < 10) {
            if (xDiff > 0) {
                window.location.href = nextHL+'.html';
            } else {
                window.location.href = prevHL+'.html';
            }
        }
        xDown = null;
        yDown = null;
    }
}

function playAudioUS()
{
  var us = document.getElementById("us");
  us.play();
}

function playAudio()
{
    var uk = document.getElementById("uk");
    uk.addEventListener("ended", playAudioUS, false);
    uk.play();
}

function updateAudio(q)
{
    var text = '';
    text += '<h1>'+q+'</h1>\n';
    text += '<audio preload="auto" id="uk"><source src="'+q+'.uk.ogg" type="audio/ogg"></audio>\n';
    text += '<audio preload="auto" id="us"><source src="'+q+'.us.ogg" type="audio/ogg"></audio>\n';
    document.getElementById("audio").innerHTML = text;
}

function loadHLs(q)
{
    let s_highlights = localStorage.getItem('highlights');
    if (s_highlights !== null) {
        let highlights = s_highlights.split('_');
        let index = highlights.indexOf(q);
        if (index >= 0) {
            prevHL = highlights[(index+highlights.length-1) % highlights.length];
            nextHL = highlights[(index+1) % highlights.length];
        }
    }
}

function onDocumentReady()
{
    var url = window.location.pathname;
    var q = url.substring(url.lastIndexOf('/')+1);
    if (q.lastIndexOf(".") != -1)
        q = q.substring(0, q.lastIndexOf("."));
    updateAudio(q);
    document.addEventListener('click', playAudio);

    loadHLs(q);
    if (prevHL && nextHL) {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
    }
}

