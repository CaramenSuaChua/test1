'use strict '

const inputName = document.getElementById('newName')
const inputEmail = document.getElementById('newEmail')
const inputPhone = document.getElementById('newPhone')
const inputGender = document.getElementById('newGender')
const inputAddress = document.getElementById('newAddress')
const inputHobbies = document.getElementById('newHobbies')
let inputImage = document.getElementById('newImage');
const changePass = document.getElementById('changePass')
const inputOldPass = document.getElementById('current-password')
const inputNewPass = document.getElementById('new-password')
const inputConfirmNewPass = document.getElementById('confirm-new-password')
const pass = document.getElementById('input-pass') 
const updatePass = document.getElementById('updatePass')

const KEY_PHONE = 'dataPer';
let dataPer = JSON.parse(getFromStorage(KEY_PHONE)) ?? [];


const KEY_INFOR = 'dataInfor';
let dataInfor = JSON.parse(getFromStorage(KEY_INFOR)) ?? [];

const KEY_ADDRESS = 'dataAddress';
let dataAddress = JSON.parse(getFromStorage(KEY_ADDRESS)) ?? [];

console.log(dataPer)
console.log(dataInfor)
console.log(dataAddress)


inputName.textContent = ` ${dataPer.inputFullName}  `
inputEmail.textContent = dataPer.inputEmail 
inputPhone.textContent = dataPer.inputPhone 
inputGender.textContent = dataInfor.inputGender 
inputHobbies.textContent = dataInfor.inputHobies 
// inputImage.src = dataInfor.inputFile
// let img = document.getElementById('image');
inputImage.src = localStorage.getItem('image');
inputAddress.textContent = `${dataAddress.addressStreet }, ${dataAddress.addressTown} ,  ${dataAddress.addressDistrict}, ${dataAddress.addressProvince}   ` 


document.getElementById('home').addEventListener('click', function (e) {
    e.preventDefault()

    window.location.href = '../pages/address.html'
})



////loi /////////
const showError = function (input, message) {
    console.log('input', input)
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add('error');
    small.innerText = message
}

///////////thanh cong /////////////
const showSuccess = function (input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = '';
}



///////////////kiem tra cho trong
const checkEmtyBlank = function (listInput) {
    let isEmpty = false;
    listInput.forEach(input => {
        input.value = input.value.trim()

        if (!input.value) {
            isEmpty = true;
            showError(input, 'Cannot blank ')
            return false 
        } else {
            showSuccess(input)
        }
    })

    return isEmpty;
}

const chekcOldPass = function(input) {
    let isOldPass = false; 
    input.value = input.value.trim()
    console.log(inputOldPass !== dataPer.inputPassWord)
    if(inputOldPass.value !== dataPer.inputPassWord) {
        showError(input, 'Passwword wrong')
    } else {
        showSuccess(input)
    }

    return isOldPass
}

//////////////kiem tra passssssss
const checkPass = function (input) {
    let isPass = !input.value;
    let regexUpper = /[A-Z]+/g;
    let  regexLower = /[a-z]+/g;
    let regexDigit = /[0-9]+/g;
    let regexSpecial = /[@#!%^&*]+/g;
    let regexLength = new RegExp("^.{8,}$")
    input.value = input.value.trim()

    ///////////upper
    //alert(regexUpper.test(input.value));
    if (regexUpper.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Shold be at least 1 Upper letter ')
        return false;
       
    }

    //////////lower
    if (regexLower.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Shold be at least 1 Lower letter ')
        return false;
    }

    /////////////digit
    if (regexDigit.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Shold be at least 1 Number  ')
        return false;
    }

    /////////////Special 
    if (regexSpecial.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Shold be at least 1 Special character  ')
        return false;
    }

    if (regexLength.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Shold be at least 8 character   ')
        return false;
    }

    return isPass;
}
const checkMatchConfirm = function(inputNewPass, inputConfirmNewPass) {
    
    if(inputNewPass.value !== inputConfirmNewPass.value){
        showError(inputConfirmNewPass, 'Password do not match')
        return true
    }

    return false;
}

changePass.addEventListener('click', function(e){
    e.preventDefault()

    document.getElementById('formPass').style.display = 'block';
    div.style.background = "red"; 
})

updatePass.addEventListener('click', function(e){
    e.preventDefault()

    let isEmpty = checkEmtyBlank([inputOldPass, inputNewPass, inputConfirmNewPass])
    if(!isEmpty) {
        let isOldPass = chekcOldPass(inputOldPass)
        let isPass = checkPass(inputNewPass)
        let isMatch = checkMatchConfirm(inputNewPass, inputConfirmNewPass )

    }


    const newPassData = { 
        inputFullName: dataPer.inputFullName, 
        inputEmail: dataPer.inputEmail,
        inputPhone: dataPer.inputPhone,
        inputNewPass: inputNewPass.value
    }
    saveToStorage(KEY_PHONE, JSON.stringify(newPassData))

document.getElementById('modal-body').style.display = 'none';
})

document.getElementById('btn-signup').addEventListener('click', () => window.location.href='../pages/signup.html')
