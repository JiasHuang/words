
var highlights = [];
var ignores = [];
var bMenubox = 0;

function toggleMenubox(word = null) {
    let element = document.getElementById('menubox');
    if (!bMenubox && word) {
        text = '';
        text += '<p>' + word + '</p>\n';
        text += '<table>\n';
        text += '<tr><td>Ignore</td><td>Highlight</td></tr>\n';
        text += '<tr><td>Cambridge</td><td>Webster</td></tr>\n';
        text += '</table>\n';
        element.innerHTML = text;
        element.style.display = 'block';
        bMenubox = true;
    } else {
        element.style.display = 'none';
        bMenubox = false;
    }
}

function saveLocalStorage() {
    localStorage.setItem('highlights', highlights.join('_'));
    localStorage.setItem('ignores', ignores.join('_'));
}

function toggleHighlight(word) {
    let element = document.querySelector('div[data-word='+word+']');
    if (ignores.indexOf(word) >= 0) {
        let index = ignores.indexOf(word);
        element.classList.remove('ignore');
        element.getElementsByTagName('p')[1].style.display = 'block';
        ignores.splice(index, 1);
    }
    if (highlights.indexOf(word) >= 0) {
        let index = highlights.indexOf(word);
        element.classList.remove('highlight');
        highlights.splice(index, 1);
    }
    else {
        highlights.push(word);
        element.classList.add('highlight');
    }
}

function toggleIgnore(word) {
    let element = document.querySelector('div[data-word='+word+']');
    if (highlights.indexOf(word) >= 0) {
        let index = highlights.indexOf(word);
        element.classList.remove('highlight');
        highlights.splice(index, 1);
    }
    if (ignores.indexOf(word) >= 0) {
        let index = ignores.indexOf(word);
        element.classList.remove('ignore');
        element.getElementsByTagName('p')[1].style.display = 'block';
        ignores.splice(index, 1);
    }
    else {
        ignores.push(word);
        element.classList.add('ignore');
        element.getElementsByTagName('p')[1].style.display = 'none';
    }
}

function openTab_cambridge(word) {
    window.open('https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/'+word, 'cambridge');
}

function openTab_webster(word) {
    window.open('https://www.merriam-webster.com/dictionary/'+word, 'webster');
}

function onClick(event) {
    let element = event.target.closest('div');
    if (element && element.hasAttribute('data-word')) {
        let word = element.dataset.word;
        event.preventDefault();
        toggleMenubox(word);
    } else if (element.classList.contains('menubox')) {
        let word = element.getElementsByTagName('p')[0].innerHTML;
        if (event.target.innerHTML === 'Ignore') {
            toggleIgnore(word);
            saveLocalStorage();
        } else if (event.target.innerHTML === 'Highlight') {
            toggleHighlight(word);
            saveLocalStorage();
        } else if (event.target.innerHTML === 'Cambridge') {
            openTab_cambridge(word);
        } else if (event.target.innerHTML === 'Webster') {
            openTab_webster(word);
        }
    } else {
        toggleMenubox();
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
    for (let i=0;  i< elements.length; i++) {
        finalize(elements[i]);
    }

    let s_highlights = localStorage.getItem('highlights');
    if (s_highlights !== null && s_highlights.length > 0) {
        let words = s_highlights.split('_');
        for (let i=0; i<words.length; i++) {
            toggleHighlight(words[i]);
        }
    }

    let s_ignores = localStorage.getItem('ignores');
    if (s_ignores !== null && s_ignores.length > 0) {
        let words = s_ignores.split('_');
        for (let i=0; i<words.length; i++) {
            toggleIgnore(words[i]);
        }
    }

    document.addEventListener('click', onClick);
}
