const laodPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContianer = document.getElementById('phone-container');
    phoneContianer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    // display no phones found
    const noFound = document.getElementById('no-found');
    if(phones.length === 0){
        noFound.classList.remove('d-none');
    }else{
        noFound.classList.add('d-none');
    }
    // display all phones 
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContianer.appendChild(div);
    });
    // stop loader
    toggleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    processSearch(10);
})

document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field').value;
    laodPhones(searchField, dataLimit);
}

// not the best way to show all 
document.getElementById('show-all-btn').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTittle = document.getElementById('phoneDetailModalLabel');
    modalTittle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseData ? phone.releaseData : 'No release data found'}</p>
        <p>storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information'}</p>
        <p>others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    `
}

laodPhones('apple')