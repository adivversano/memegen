'use strict';

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    strokeWidth: 2,
    lines: [
        {
            txt: 'Top Text',
            // x: -1,
            // y: -1,
            size: 60,
            align: 'center',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            isDragging: false
        },
        {
            txt: 'Bottom Text',
            // x: -1,
            // y: -1,
            size: 60,
            align: 'center',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            isDragging: false
        }
    ],
}
var gSavedMemes = [];

function setLinesCoordsToImgRatio(canvas) {
    // if (gMeme.lines[1]) return;
    gMeme.lines[0].x = canvas.width / 2;
    gMeme.lines[0].y = canvas.height * 0.2;
    gMeme.lines[1].x = canvas.width / 2;
    gMeme.lines[1].y = canvas.height * 0.9;
}

function isLinesEmpty() {
    return !gMeme.lines.length;
}

function getMeme() {
    return gMeme;
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        strokeWidth: 2,
        lines: [
            {
                txt: 'Top Text',
                // x: -1,
                // y: -1,
                size: 60,
                align: 'center',
                fillColor: '#ffffff',
                strokeColor: '#000000',
                isDragging: false
            },
            {
                txt: 'Bottom Text',
                // x: -1,
                // y: -1,
                size: 60,
                align: 'center',
                fillColor: '#ffffff',
                strokeColor: '#000000',
                isDragging: false
            }
        ],
    }
}

function setSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
}


//**** CONTROL-BOX ****//

function setStrokeWidth(strokeWidth) {
    gMeme.strokeWidth = strokeWidth;
}

function alignTextLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left';
}

function alignTextCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
}

function alignTextRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right';
}

function increaseFontSize() {
    const currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[currLineIdx].size *= 1.1;
}

function decreaseFontSize() {
    const currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[currLineIdx].size *= 0.9;
}

function deleteTextLine() {
    const currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice([currLineIdx], 1);
}

function addTextLine(txt) {
    //if usertxt is empty write :extra text
    debugger
    txt = (txt === '') ? 'Extra Text' : txt;
    gMeme.lines.push({
        txt,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2 + 25,
        size: 60,
        align: 'center',
        fillColor: '#ffffff',
        strokeColor: '#000000'
    });

    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchTextFocus() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0

}

function drawUserText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor;
}

function setFillColor(fillColor) {
    getCurrTxt().fillColor = fillColor;
}

function getCurrTxt() {
    return gMeme.lines[gMeme.selectedLineIdx];
}