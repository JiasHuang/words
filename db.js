
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
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
    text += '<audio preload="auto" id="uk"><source src="db/'+q+'.uk.ogg" type="audio/ogg"></audio>\n';
    text += '<audio preload="auto" id="us"><source src="db/'+q+'.us.ogg" type="audio/ogg"></audio>\n';
    document.getElementById("audio").innerHTML = text;
}

function updateResult(q)
{
    var text = '';
    text += '<iframe id="iframe" src="db/'+q+'.html" />\n';
    document.getElementById("result").innerHTML = text;
}

function onDocumentReady()
{
    var q = GetURLParameter('q');
    updateAudio(q);
    updateResult(q);
    document.addEventListener('click', playAudio);
}

