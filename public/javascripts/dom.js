const domElements = {
    halfWidth: window.innerWidth / 2,
    timeOut: 0,
    loader: document.querySelector('.loader'),
    loadingText: document.querySelector('.text'),
    heading: document.createElement("h1"),
    div: document.createElement("div"),
    placeholder: document.createElement("img"),
    container: document.querySelector('main'),
}

module.exports = domElements;