
var highlights = [];
var ignores = [];

function saveLocalStorage() {
    localStorage.setItem('highlights', highlights.join('_'));
    localStorage.setItem('ignores', ignores.join('_'));
}

function highlight(element) {
    let word = element.dataset.word;
    if (ignores.indexOf(word) >= 0) {
        let index = ignores.indexOf(word);
        element.classList.remove('ignore');
        element.getElementsByTagName('p')[0].style.display = 'block';
        ignores.splice(index, 1);
    } else {
        if (highlights.indexOf(word) < 0)
            highlights.push(word);
        element.classList.add('highlight');
    }
    saveLocalStorage();
}

function ignore(element) {
    let word = element.dataset.word;
    if (highlights.indexOf(word) >= 0) {
        let index = highlights.indexOf(word);
        element.classList.remove('highlight');
        highlights.splice(index, 1);
    } else {
        if (ignores.indexOf(word) < 0)
            ignores.push(word);
        element.classList.add('ignore');
        element.getElementsByTagName('p')[0].style.display = 'none';
    }
    saveLocalStorage();
}

function openTab_cambridge(word) {
    window.open('https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/'+word, 'cambridge');
}

function openTab_webster(word) {
    window.open('https://www.merriam-webster.com/dictionary/'+word, 'webster');
}

function onClick(event) {
    if (event.target.matches('span.float_right')) {
        let parent = event.target.parentElement;
        let word = parent.dataset.word;
        event.preventDefault();
        if (event.target.innerHTML === '[+]')
            highlight(parent);
        else if (event.target.innerHTML === '[-]')
            ignore(parent)
        else if (event.target.innerHTML === '[cambridge]')
            openTab_cambridge(word);
        else if (event.target.innerHTML === '[webster]')
            openTab_webster(word);
    }
}

function finalize(element) {
    let word = element.dataset.word;
    let type = element.dataset.type;
    let desc = element.innerHTML;
    let text = '';
    text += '<span class="float_right">[webster]</span>\n';
    text += '<span class="float_right">[cambridge]</span>\n';
    text += '<span class="float_right">[+]</span>\n';
    text += '<span class="float_right">[-]</span>\n';
    text += '<span>' + word + ' [' + type + ']</span>\n';
    text += '<p>' + desc + '</p>\n';
    element.innerHTML = text;
    if (highlights.indexOf(word) >= 0)
        highlight(element);
    if (ignores.indexOf(word) >= 0)
        ignore(element);
}

function onDocumentReady() {

    let s_highlights = localStorage.getItem('highlights');
    if (s_highlights !== null) {
        highlights = s_highlights.split('_');
    }

    let s_ignores = localStorage.getItem('ignores');
    if (s_ignores !== null) {
        ignores = s_ignores.split('_');
    }

    let elements = document.querySelectorAll('[data-word]');
    for (let i=0;  i< elements.length; i++) {
        finalize(elements[i]);
    }

    document.addEventListener('click', onClick);
}
