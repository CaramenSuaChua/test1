$(function () {
    apiProvince=(prodvince)=>{
        let district;
    
        prodvince.forEach(element => {
            $('#province').append(`<option value="${element.code}">${element.name}</option>`)
        });
        $('#province').change(function () {
            $('#district').html('<option value="-1">Chọn quận/huyện</option>')
            $('#town').html('<option value = "-1"> Chọn phường/xã </option>')
            let value = $(this).val();
            $.each(prodvince,function(index,element){
                if (element.code == value) {
                    district = element.districts;
                    $.each(element.districts,function(index,element1){
                        $('#district').append(`<option value="${element1.code}">${element1.name}</option>`)
                    })
                    
                }
            })         
        });    
        $('#district').change(function () {
            $('#town').html('<option value = "-1"> Chọn phường/xã </option>')
            let value = $(this).val();
            $.each(district,function(index,element){
                if (element.code == value) {
                    element.wards.forEach(element1 => {
                        $('#town').append(`<option value="${element1.code}">${element1.name}</option>`)
                    });
                }
            })       
        });
    }
    prodvince = JSON.parse(data);
     apiProvince(prodvince);
})

const addressProvince = document.getElementById('province')
const addressDistrict = document.getElementById('district')
const addressTown = document.getElementById('town')
const addressStreet = document.getElementById('street')

const KEY_ADDRESS = 'dataAddress'
let dataAddress = JSON.parse(getFromStorage(KEY_ADDRESS)) ?? []

document.getElementById('btn-submit').addEventListener('click', function(e){
    e.preventDefault()

    var dataRecord = JSON.parse(data)
    e.preventDefault()
    var mySelectedProvince = dataRecord.find(x => x.code == addressProvince.value);
    var mySelectedDistrict = mySelectedProvince.districts.find(x => x.code == addressDistrict.value);
    var mySelectedTown = mySelectedDistrict.wards.find(x => x.code == addressTown.value);

    const dataAddress = {
        addressProvince:mySelectedProvince.name,
        addressDistrict:mySelectedDistrict.name,
        addressTown: mySelectedTown.name,
        addressStreet:addressStreet.value
    }

    saveToStorage(KEY_ADDRESS, JSON.stringify(dataAddress) )
    console.log(dataAddress)

    window.location.href='../pages/information.html';
})

document.getElementById('btn-previous').addEventListener('click', function(){
    window.location.href='../pages/signup.html';
})

document.getElementById('btn-next').addEventListener('click', function (e) {
    e.preventDefault()

    window.location.href = '../pages/information.html';
})



