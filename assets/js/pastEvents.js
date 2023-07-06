const cardData = data.events
//Cards

//Past Cards
function newArray(array){
    let date=[]
    for (let datePast of array){
        if (datePast.date<"2023-01-01"){
            date.push(datePast)
        }
    } return date
}

const pastData = newArray(cardData)

//Cards container

let containerCards= document.getElementById("cards")

function newCard(data){
    return `<article class="main-card card col-10 p-2 col-lg-5">
    <img src="${data.image}" class="card-img-top" alt="foot-fair.img">
    <div class="card-body d-xl-flex flex-xl-column justify-content-xl-between">
        <h3 class="card-title text-center fw-bold m-xl-0">${data.name}</h3>
        <p class="card-text fs-3 m-xl-0">${data.description}</p>
        <div class="d-flex justify-content-between m-0">
            <p class="align-self-center m-0 fw-bold fs-3">$${data.price}USD</p>
            <a href="./assets/pages/details.html" class="btn btn-outline-dark align-self-center">Details</a>
        </div>
    </div>
</article>`
}
function dataCard(data,elementHtml){
    let template=""
    for (let infNewCard of data){
        template += newCard(infNewCard)
    }
    elementHtml.innerHTML += template
}

 dataCard(pastData,containerCards)