//Cards
export function newCard(data) {
    return `<article class="main-card card col-10 p-2 col-lg-5">
    <img src="${data.image}" class="card-img-top" alt="">
    <div class="card-body d-xl-flex flex-xl-column justify-content-xl-between">
        <h3 class="card-title text-center fw-bold m-xl-0">${data.name}</h3>
        <p class="card-text fs-3 m-xl-0">${data.description}</p>
        <div class="d-flex justify-content-between m-0">
            <p class="align-self-center m-0 fw-bold fs-3">$${data.price}USD</p>
            <a href="./assets/pages/details.html?id=${data._id}" class="btn btn-outline-dark align-self-center">Details</a>
        </div>
    </div>
</article>`
}
export function newCardPastAndFuture(data) {
    return `<article class="main-card card col-10 p-2 col-lg-5">
    <img src="${data.image}" class="card-img-top" alt="foot-fair.img">
    <div class="card-body d-xl-flex flex-xl-column justify-content-xl-between">
        <h3 class="card-title text-center fw-bold m-xl-0">${data.name}</h3>
        <p class="card-text fs-3 m-xl-0">${data.description}</p>
        <div class="d-flex justify-content-between m-0">
            <p class="align-self-center m-0 fw-bold fs-3">$${data.price}USD</p>
            <a href="./details.html?id=${data._id}" class="btn btn-outline-dark align-self-center">Details</a>
        </div>
    </div>
</article>`
}

export function imprCard(data, elementHtml, newCard) {
    let template = ""
    for (let infNewCard of data) {
        template += newCard(infNewCard)
    }
    elementHtml.innerHTML += template
}

//Create Checkbox

export function newCheck(data) {
    return `<div class=" main-check form-check pt-1 p-1 m-0 text-start col-md-3 fs-4 col-xl-2 col-xxl-1">
        <input class="form-check-input" type="checkbox" value= "${data}" id="${data}">
        <label class="form-check-label" for="${data}">
            ${data}
        </label>
    </div>`
}

export function imprCheck(data, elementHtml, newCheck) {
    let template = ""
    for (let check of data) {
        template += newCheck(check)
    }
    elementHtml.innerHTML += template
}

//Clear elementHTML
export function empty(elementHtml) {
    elementHtml.innerHTML = ""
}

//Error mesage
export function errorMesage(elementHtml) {
    return elementHtml.innerHTML = "<h5>No matches found</h5>"
}

//Filters 
export function arrayChecks(arrayChecks) {
    let aux = arrayChecks.filter(check => check.checked == true)
    return aux.map(check => check.value)
}

export function includesCardsOfSearch(events, input) {
    let filter = events.filter(event => event.name.toLowerCase().includes(input.value.toLowerCase()))
    return filter
}

export function filterCardsCheck(events, checkValue) {
    if (checkValue.length == 0) {
        return events
    } else {
        let filter = events.filter(event => checkValue.includes(event.category))
        return filter
    }
}

// filtro cruzado
export function filterConvined(events, checkValue, searchValue) {
    let check = filterCardsCheck(includesCardsOfSearch(events, searchValue), checkValue)
    return check
}