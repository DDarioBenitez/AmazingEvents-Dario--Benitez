const eventData=data.events
console.log(eventData)


    let search = document.getElementById("inputSearch")
    
    let cards= document.getElementById("cards");
 //checkbox
    let divCheck = document.getElementById("div-check") 
    let category = eventData.map(category => category.category);
    // console.log(category)
    let ordenReduce= Array.from( new Set(category));
    // console.log(ordenReduce)
//Cards



function newCard(data){
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
// console.log(newCard(eventData))

function imprCard(data,elementHtml){
    let template=""
    for (let infNewCard of data){
        template += newCard(infNewCard)
    }
    elementHtml.innerHTML += template
}
 imprCard(eventData,cards)

 //checkbox

 function newCheck(data){
    return `<div class=" main-check form-check pt-1 p-1 m-0 text-start col-md-3 fs-4 col-xl-2 col-xxl-1">
    <input class="form-check-input" type="checkbox" value= "${data}" id="flexCheckDefault1">
    <label class="form-check-label" for="flexCheckDefault1">
        ${data}
    </label>
</div>`
 }

 function imprCheck(data, elementHtml){
    let template=""
    for (let check of data) {
        template += newCheck(check)
    }
    elementHtml.innerHTML += template
    // console.log(template)
 }
 imprCheck(ordenReduce,divCheck)

 function empty(elementHtml){
    elementHtml.innerHTML=""
}



let checkBoxs = document.querySelectorAll('input[type="checkbox"]');
let checksChecked = Array.from(checkBoxs)
function arrayChecks(arrayChecks){
    let aux=arrayChecks.filter(check=> check.checked == true)
    return aux.map(check=> check.value)
}
// console.log(checksChecked) 
// console.log(checkBoxs)
// console.log(checkseleccionado);


divCheck.addEventListener("change", (e)=>{
let checkSelect = arrayChecks(checksChecked)
console.log(checkSelect)
let searchValue = search.value.toLowerCase()
empty(cards)
let arraysCardsSelect = filterConvined(eventData,checkSelect,search)
console.log(arraysCardsSelect);
    if(checkSelect.length==0 && searchValue.length>0 && arraysCardsSelect.length==0 || checkSelect.length==0 && searchValue.length>0){
        return errosMensage(cards)
    }else if(arraysCardsSelect.length==0 && checkSelect.length>0){
        return errosMensage(cards)
    }else if(arraysCardsSelect.length==0){
        return imprCard(eventData,cards)
    }else{
        return imprCard(arraysCardsSelect,cards)
    }
}
)
 // Search

search.addEventListener("input", (e)=>{
    let searchValue = search.value.toLowerCase()
    console.log(searchValue)
    let checkSelect = arrayChecks(checksChecked)
    // let searchCards= includesCardsOfSearch(eventData,search)
    // console.log(searchCards)
    empty(cards) 
    let searchCardsConvined = filterConvined(eventData,checkSelect,search)
    console.log(searchCardsConvined)
    if(searchCardsConvined.length== 0 && searchValue.length>0){   
        return errosMensage(cards)
    }else if(searchCardsConvined.length==0){
    return imprCard(eventData,cards)
    }else{
        return imprCard(searchCardsConvined,cards)
    }
})

function errosMensage(elementHtml){
    return elementHtml.innerHTML ="<h5>No matches found</h5>"
}

function includesCardsOfSearch(events,input){
    let filter =  events.filter(event => event.name.toLowerCase().includes(input.value.toLowerCase()) )
    return filter
  }

function filterCardsCheck(events,checkValue){
    if(checkValue.length==0){
        return events
    }else{
        let filter =  events.filter(event => checkValue.includes(event.category) )
        return filter
    }
    
  }

  // filtro cruzado
function filterConvined(events,checkValue,searchValue){
    let search = includesCardsOfSearch(events,searchValue)
    let check = filterCardsCheck(search,checkValue)
   return check
  }
