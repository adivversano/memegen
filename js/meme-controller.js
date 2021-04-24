'use strict';

var gCanvas;
var gCtx;
var gIsFirstRender;

//**** CANVAS ****//

function onLoadCanvas() {
    gCanvas = document.querySelector('.main-canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderCanvas() {
    const img = getImgById(getMeme().selectedImgId);
    const imgCanvas = new Image();

    imgCanvas.src = img.url;

    imgCanvas.onload = () => {
        gCanvas.style.width = '100%';
        gCanvas.width = imgCanvas.width;
        gCanvas.height = imgCanvas.height;

        fitImgToCanvas(imgCanvas);
        if (gIsFirstRender) {
            setLinesCoordsToImgRatio(gCanvas)
            gIsFirstRender = false;
        }
        renderTextLines();
    }
}

function isImgFitCanvas() {

}

function fitImgToCanvas(img) {
    // get the scale
    let scale = Math.min(gCanvas.width / img.width, gCanvas.height / img.height);
    // get the top left position of the image
    var x = (gCanvas.width / 2) - (img.width / 2) * scale;
    var y = (gCanvas.height / 2) - (img.height / 2) * scale;
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
}


function onDrawImg(imgId) {
    resetMeme();
    //resetting txt input placeholder
    gIsFirstRender = true;
    _renderPlaceholder('Top Text');

    setSelectedImg(+imgId);
    renderCanvas();
}

function renderTextLines() {
    if (isLinesEmpty()) return;
    const meme = getMeme();
    _drawLineFocusRect();
    meme.lines.forEach((line) => {
        _drawText(
            line.txt,
            line.x,
            line.y,
            line.strokeColor,
            line.fillColor,
            line.size,
            line.align,
            meme.strokeWidth,
            meme.fontStyle);
    })
}

function _drawText(
    txt, x = gCanvas.width / 2, y, strokeColor, fillColor, fontSize, textAlign, strokeWidth, fontStyle) {

    if (textAlign === 'right') textAlign = 'left';
    else if (textAlign === 'left') textAlign = 'right';

    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.lineWidth = strokeWidth;
    gCtx.font = `${fontSize}px ${fontStyle}`;
    gCtx.textAlign = textAlign;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function _drawLineFocusRect() {
    const currLine = getMeme().lines[getMeme().selectedLineIdx]
    gCtx.font = `${currLine.size}px Impact`;
    const txtWidth = gCtx.measureText(`${currLine.txt}`).width;
    gCtx.beginPath();
    gCtx.fillStyle = 'rgba(255,255,255,0.4)'
    gCtx.fillRect(
        (currLine.x - txtWidth / 2) - 15,
        currLine.y - currLine.size,
        txtWidth + 30,
        currLine.size + 20)
    gCtx.closePath()
}

//**** CONTROL-BOX ****//


function onSaveMeme() {

}

function onDownloadMeme(ev) {
    const data = gCanvas.toDataURL();
    ev.path[0].href = data;
}

function onSetFont(ev) {
    const fontStyle = ev.target.value;
    setFont(fontStyle);
    renderCanvas();
}

function onSetStrokeWidth() {
    const strokeWidth = document.querySelector('.stroke-container input').value;
    renderStrokeSpan(strokeWidth);
    setStrokeWidth(+strokeWidth);
    renderCanvas();
}

function renderStrokeSpan(strokeWidth) {
    const elStrokeSpan = document.querySelector('.stroke-container span');

    elStrokeSpan.innerText = strokeWidth;
}

function onToggleStrokeInput() {
    const elStrokeContainer = document.querySelector('.stroke-container');
    elStrokeContainer.classList.toggle('show');
    renderStrokeSpan(getMeme().strokeWidth);
}


function onDrawUserText(ev) {
    ev.preventDefault();
    const txt = ev.target.value;
    if (isLinesEmpty()) return;
    if (txt === '') {
        onDeleteTextLine();
        return;
    }
    drawUserText(txt);
    renderCanvas();
}


function onSetStrokeColor(ev) {
    if (isLinesEmpty()) return;
    const strokeColor = ev.target.value;
    setStrokeColor(strokeColor);
    renderCanvas();
}

function onSetFillColor(ev) {
    if (isLinesEmpty()) return;
    const fillColor = ev.target.value;
    setFillColor(fillColor);
    renderCanvas();
}

function onToggleColorInputs() {
    const elColorContainer = document.querySelector('.color-container');
    elColorContainer.classList.toggle('show');
}

function onSwitchTextFocus() {
    if (isLinesEmpty()) return;
    switchTextFocus();
    const currLine = getMeme().lines[getMeme().selectedLineIdx];
    _renderPlaceholder(currLine.txt);
    renderCanvas();
}

function onAddTextLine() {
    const txt = document.querySelector('input[type="text"]').value;
    addTextLine(txt);
    _renderPlaceholder(txt ? txt : 'Extra Text');
    renderCanvas();
}


function onDeleteTextLine() {
    deleteTextLine();
    onSwitchTextFocus();
    renderCanvas();
    if (isLinesEmpty()) {
        _renderPlaceholder('No text lines remain');
        return;
    }
}

function onIncreaseFontSize() {
    if (isLinesEmpty()) return;
    increaseFontSize();
    renderCanvas();
}

function onDecreaseFontSize() {
    if (isLinesEmpty()) return;
    decreaseFontSize();
    renderCanvas();
}

function onAlignTextLeft() {
    if (isLinesEmpty()) return;
    alignTextLeft();
    renderCanvas();
}

function onAlignTextCenter() {
    if (isLinesEmpty()) return;
    alignTextCenter();
    renderCanvas();
}

function onAlignTextRight() {
    if (isLinesEmpty()) return;
    alignTextRight();
    renderCanvas();
}

function _renderPlaceholder(placeholder) {
    document.querySelector('input[type="text"]').focus();
    document.querySelector('input[type="text"]').value = '';
    document.querySelector('input[type="text"]').placeholder = placeholder;
}