'use strict';


window.onload = () => {
    renderGallery();
    onLoadCanvas();
    addEventListeners()
}

// TODO:
function addEventListeners() {
    addControlBoxListeners();
}

function addControlBoxListeners() {
    // debugger
    document.querySelector('[name="txt-input"]').addEventListener('input', onDrawUserText);
    document.querySelector('.switch-btn').addEventListener('click', onSwitchTextFocus);
    document.querySelector('.add-btn').addEventListener('click', onAddTextLine);
    document.querySelector('.delete-btn').addEventListener('click', onDeleteTextLine);
    document.querySelector('.increase-btn').addEventListener('click', onIncreaseFontSize);
    document.querySelector('.decrease-btn').addEventListener('click', onDecreaseFontSize);
    document.querySelector('.align-left-btn').addEventListener('click', onAlignTextLeft);
    document.querySelector('.align-center-btn').addEventListener('click', onAlignTextCenter);
    document.querySelector('.align-right-btn').addEventListener('click', onAlignTextRight);

    document.querySelector('.stroke-width-btn').addEventListener('click', onToggleStrokeInput);
    document.querySelector('[name="stroke-val"]').addEventListener('input', onSetStrokeWidth);

    document.querySelector('.color-btn').addEventListener('click', onToggleColorInputs);
    document.querySelector('.stroke-color').addEventListener('input', onSetStrokeColor);
    document.querySelector('.fill-color').addEventListener('input', onSetFillColor);
    

    document.querySelector('.font-select').addEventListener('change', onSetFont);
    document.querySelector('.download-btn').addEventListener('click', onDownloadMeme);
    document.querySelector('.save-btn').addEventListener('click', onSaveMeme);
    // document.querySelector('.share-btn').addEventListener('click', onShareMeme);
}

function onFilterBy(keyword) {
    filterBy(keyword);
    renderGallery();
}

function renderGallery() {
    const images = getImgs();

    const filterImgs = getFilterImgs();
    if (filterImgs.length) images = filterImgs;

    let strHTMLs = '';
    images.forEach((img) => {
        strHTMLs += `<img onclick="onOpenEditor(this)" data-id="${img.id}" src="${img.url}">`
    });

    const elGalleryContainer = document.querySelector('.gallery-container');

    elGalleryContainer.innerHTML = strHTMLs;
}

function onOpenEditor(elImg) {
    const imgId = elImg.dataset.id;
    const elEditorContainer = document.querySelector('.editor-container');
    const elBlackScreen = document.querySelector('.main-content-screen');
    // const elGalleryContainer = document.querySelector('.gallery-container');
    elEditorContainer.hidden = false;
    elBlackScreen.hidden = false;
    onDrawImg(imgId);
}

function onCloseMemeEditor() {
    let elEditorContainer = document.querySelector('.editor-container');
    let elBlackScreen = document.querySelector('.main-content-screen');
    elEditorContainer.hidden = true;
    elBlackScreen.hidden = true;
}

function onToggleMenu() {
    const elHam = document.querySelector('.hamburger');

    if (elHam.classList.contains('is-active') &&
        document.body.classList.contains('menu-open')) {
        elHam.classList.toggle('is-active');
        document.body.classList.toggle('menu-open');

    } else {
        elHam.classList.toggle('is-active');
        document.body.classList.toggle('menu-open');
    }

}

function onGallery() {
    let elEditorContainer = document.querySelector('.editor-container');
    let elBlackScreen = document.querySelector('.main-content-screen');
    elEditorContainer.hidden = true;
    elBlackScreen.hidden = true;
    if (document.body.classList.contains('menu-open')) onToggleMenu();
}