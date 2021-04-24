'use strict';


var gKeywords = {
    'happy': 2,
    'funny': 13,
    'mad': 4,
    'dogs': 5,
    'crazy': 3,
    'trump': 1,
    'putin': 3,
    'cute': 5,
    'animal': 7,
    'baby': 8,
    'love': 5,
    'sad': 1
}
var gImgs = [];
var gFilterImgs = [];


loadImages();


function filterBy(userStrFilter) {
    gFilterImgs = gImgs.filter(img => {
         return img.keywords.some(keyword => {
              return keyword.startsWith(userStrFilter.toLowerCase())
            });
        });
}

function getFilterImgs() {
    return gFilterImgs;
}

function getImgs() {
    return gImgs;
}

function getImgById(imgId) {
    return gImgs.find(img => { return img.id === imgId });
}

function loadImages() {
    gImgs.push({ id: 1, url: `img/gallery/1.jpg`, keywords: ['crazy', 'trump'] });
    gImgs.push({ id: 2, url: `img/gallery/2.jpg`, keywords: ['dogs', 'cute', 'animal'] });
    gImgs.push({ id: 3, url: `img/gallery/3.jpg`, keywords: ['baby', 'dogs'] });
    gImgs.push({ id: 4, url: `img/gallery/4.jpg`, keywords: ['animal', 'cute'] });
    gImgs.push({ id: 5, url: `img/gallery/5.jpg`, keywords: ['baby', 'funny'] });
    gImgs.push({ id: 6, url: `img/gallery/6.jpg`, keywords: ['funny', 'crazy'] });
    gImgs.push({ id: 7, url: `img/gallery/7.jpg`, keywords: ['baby', 'funny'] });
    gImgs.push({ id: 8, url: `img/gallery/8.jpg`, keywords: ['crazy', 'love'] });
    gImgs.push({ id: 9, url: `img/gallery/9.jpg`, keywords: ['baby', 'crazy'] });
    gImgs.push({ id: 10, url: `img/gallery/10.jpg`, keywords: ['funny', 'happy'] });
    gImgs.push({ id: 11, url: `img/gallery/11.jpg`, keywords: ['crazy', 'funny'] });
    gImgs.push({ id: 12, url: `img/gallery/12.jpg`, keywords: ['crazy', 'funny'] });
    gImgs.push({ id: 13, url: `img/gallery/13.jpg`, keywords: ['love', 'happy'] });
    gImgs.push({ id: 14, url: `img/gallery/14.jpg`, keywords: ['mad'] });
    gImgs.push({ id: 15, url: `img/gallery/15.jpg`, keywords: ['funny', 'love'] });
    gImgs.push({ id: 16, url: `img/gallery/16.jpg`, keywords: ['happy', 'funny'] });
    gImgs.push({ id: 17, url: `img/gallery/17.jpg`, keywords: ['crazy', 'putin'] });
    gImgs.push({ id: 18, url: `img/gallery/18.jpg`, keywords: ['funny', 'sad'] });
}


// function randomKeyword() {
//     let keywords = ['happy', 'funny', 'mad', 'dogs', 'crazy']
//     return keywords[getRandomInt(0, 4)]
// }