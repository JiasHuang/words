
var highlights = [];
var bMenubox = false;

function saveLocalStorage() {
    localStorage.setItem('highlights', highlights.join('_'));
}

function toggleMenubox(word) {
    let element = document.getElementById('menubox');
    if (!bMenubox && word) {
        element.getElementsByTagName('p')[0].innerHTML = word;
        element.style.display = 'block';
        bMenubox = true;
    } else {
        element.style.display = 'none';
        bMenubox = false;
    }
}

function toggleHighlight(word) {
    let element = document.querySelector('div[data-word='+word+']');
    let index = highlights.indexOf(word);
    if (index >= 0) {
        element.classList.remove('highlight');
        highlights.splice(index, 1);
    }
    else {
        highlights.push(word);
        element.classList.add('highlight');
    }
}

function onOpenTab(site) {
    let element = document.getElementById('menubox');
    let word = element.getElementsByTagName('p')[0].innerHTML;
    if (site == 'webster') {
        window.open('https://www.merriam-webster.com/dictionary/'+word, 'webster');
    } else if (site == 'cambridge') {
        window.open('https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/'+word, 'cambridge');
    }
}

function onToggleHighlight() {
    let element = document.getElementById('menubox');
    let word = element.getElementsByTagName('p')[0].innerHTML;
    toggleHighlight(word);
    saveLocalStorage();
}

function onClick(event) {
    let element = event.target.closest('div');
    if (element && element.hasAttribute('data-word')) {
        let word = element.dataset.word;
        event.preventDefault();
        toggleMenubox(word);
    }
}

function finalize(element) {
    let word = element.dataset.word;
    let type = element.dataset.type;
    let desc = element.innerHTML;
    let text = '';
    text += '<p>' + word + ' [' + type + ']</p>\n';
    text += '<p>' + desc + '</p>\n';
    element.innerHTML = text;
}

function onDocumentReady() {

    let elements = document.querySelectorAll('[data-word]');
    for (let i=0;  i<elements.length; i++) {
        finalize(elements[i]);
    }

    let s_highlights = localStorage.getItem('highlights');
    if (s_highlights !== null) {
        let words = s_highlights.split('_');
        for (let i=0; i<words.length; i++) {
            if (words[i].length > 0)
                toggleHighlight(words[i]);
        }
    }

    document.addEventListener('click', onClick);
    show10();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function hideAll() {
    let elements = document.querySelectorAll('[data-word]');
    for (let i=0;  i<elements.length; i++)
        elements[i].style.display = 'none';
}

function showAll() {
    let elements = document.querySelectorAll('[data-word]');
    for (let i=0;  i<elements.length; i++)
        elements[i].style.display = 'block';
}

function show10() {
    hideAll();
    let elements = document.querySelectorAll('[data-word]');
    for (let i=0;  i<10; i++)
        elements[getRndInteger(0, elements.length)].style.display = 'block';
}

function showHLs() {
    hideAll();
    let elements = document.querySelectorAll('[data-word].highlight');
    console.log(elements.length);
    for (let i=0;  i<elements.length; i++)
        elements[i].style.display = 'block';
}
