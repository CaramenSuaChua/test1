'use strict'

const btnNext = document.getElementById('btn-submit')
const inputFullName = document.getElementById('input-fullname')
const inputEmail = document.getElementById('input-email')
const inputPhone = document.getElementById('input-PhoneNumber')
const inputPassWord = document.getElementById('input-password')
const inputConfirmPass = document.getElementById('input-password-confirm');


const KEY_PHONE = 'dataPer';
let dataPer = JSON.parse(getFromStorage(KEY_PHONE)) ?? [];


/////loi /////////
const showError = function (input, message) {
    console.log(input)
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

////////////////kiem tra cho trong
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

///////////////kiem tra mail 
const checkEMail = function (input) {
    let isEMail = !input.value
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    input.value = input.value.trim()

    if (regex.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Emaill invalid')
    }

    return isEMail

}

//////////////kiem tra ten 
const checkName = function (input, min, max) {
    input.value = input.value.trim()

    if (input.value.length < min) {
        showError(input, `should be at least ${min} characters`)
        return true
    } else if (input.value.length > max) {
        showError(input, `should have at most ${max} characters`)
        return true
    }

    showSuccess(input)
    return false
}

///////////kieem tra phonenumber
const checkPhone = function (input) {
    let isPhone = !input.value
    let regexPhone = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    input.value = input.value.trim()

    if (regexPhone.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Phone Number doesn not exist ')
        return false;
    }

    return isPhone
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

const checkMatchConfirm = function(inputPassWord, inputConfirmPass) {
    
    if(inputPassWord.value !== inputConfirmPass.value){
        showError(inputConfirmPass, 'Password do not match')
        return true
    }

    return false;
}

/////////////an hien pass 
const passField = document.querySelector("#input-password");
const showBtn = document.querySelector("#pass");
showBtn.onclick = (()=>{
  if(passField.type === "password"){
    passField.type = "text";
    showBtn.classList.add("hide-btn");
    showBtn.classList.remove("fa-eye-slash");
    

  }else{
    passField.type = "password";
    showBtn.classList.remove("hide-btn");
    showBtn.classList.add("fa-eye-slash");
  }
});

//////////an hien confirm passs 
const passFieldd = document.querySelector("#input-password-confirm");
const showBtnn = document.querySelector("#cpass");
showBtnn.onclick = (()=>{
  if(passFieldd.type === "password"){
    passFieldd.type = "text";
    showBtnn.classList.add("hide-btn");
    showBtnn.classList.remove("fa-eye-slash");
  }else{
    passFieldd.type = "password";
    showBtnn.classList.remove("hide-btn");
    showBtnn.classList.add("fa-eye-slash");
  }
});


btnNext.addEventListener('click', function () {

    let isEmpty = checkEmtyBlank([inputFullName, inputEmail, inputPhone, inputPassWord, inputConfirmPass])
    
    
    const dataPerson = { 
        inputFullName: inputFullName.value, 
        inputEmail: inputEmail.value,
        inputPhone: inputPhone.value,
        inputPassWord: inputPassWord.value
    }
    saveToStorage(KEY_PHONE, JSON.stringify(dataPerson) )
    // localStorage.setItem(data)
    // console.log(data)

    if(!isEmpty) {
        let isEMail = checkEMail(inputEmail)
        let isName = checkName(inputFullName, 4, 20)
        let isPhone = checkPhone(inputPhone)
        let isPass = checkPass(inputPassWord )
        let isMatch = checkMatchConfirm( inputPassWord, inputConfirmPass)
    }
   
    window.location.href = '../pages/address.html';
})

document.getElementById('btn-next').addEventListener('click', function (e) {
    e.preventDefault()

    window.location.href = '../pages/address.html';
})

