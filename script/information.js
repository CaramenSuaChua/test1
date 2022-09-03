'use strict'


function butotnClick() {
    console.log('value: ' + fileBox.value);

    let files = fileBox.files;

    for (let i = 0; i < files.length; i++) {
        console.log('File thứ ' + (i + 1));
        console.log('name: ' + files[i].name);
        console.log('size: ' + files[i].size);
        console.log('type: ' + files[i].type);
    }
}

let fileBox = document.getElementById('fileBox');

let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', butotnClick);


document.getElementById('btn-complete').addEventListener('click', function (e) {
    e.preventDefault()

    window.location.href = '../pages/address.html'
})