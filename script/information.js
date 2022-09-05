'use strict'

const gender = document.getElementsByName('gender')
const inputFile = document.getElementById('inputfile');
const inputFileName = document.getElementById('inputfilename')
const inputHobies = document.getElementById('input-hobbies');

const KEY_INFOR = 'dataInfor';
let dataInfor = JSON.parse(getFromStorage(KEY_INFOR)) ?? [];

let file; 
inputFile.addEventListener('change', (event) => {
    console.log(event.target)
    const fileInput = event.target.files[0];
    file = fileInput.name
    console.log(fileInput)
    inputFileName.textContent = fileInput.name
    console.log(file)
    }
)


function butotnClick() {
    console.log('value: ' + inputFile.value);
    inputFileName.textContent = inputFile.name
    let files = inputFile.files;

    for (let i = 0; i < files.length; i++) {
        console.log('File thứ ' + (i + 1));
        console.log('name: ' + files[i].name);
        console.log('size: ' + files[i].size);
        console.log('type: ' + files[i].type);
    }

}


document.getElementById('btn-complete').addEventListener('click', function (e) {
    e.preventDefault()

    butotnClick()
    const dataInfor = {
        inputFile: inputFile.value,
        inputGender: '',
        inputHobies: inputHobies.value
    }

    ////////////kiem tra gioi tinh 
    const checkGender = function () {

        for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                dataInfor.inputGender = gender[i].value
                console.log('gender', dataInfor.inputGender)
            }
        }
    }
    checkGender(e)
    console.log(dataInfor)
    saveToStorage(KEY_INFOR, JSON.stringify(dataInfor))

    const imgPath = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string and save to localStorage
        localStorage.setItem("image", reader.result);
    }, false);

    if (imgPath) {
        reader.readAsDataURL(imgPath);
    }


    window.location.href = '../pages/profile.html'
})

document.getElementById('btn-previous').addEventListener('click', function(){
    window.location.href='../pages/address.html';
})
