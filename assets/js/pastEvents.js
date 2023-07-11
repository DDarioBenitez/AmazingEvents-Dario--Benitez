const cardData = data.events
//Cards

//Past Cards
function newArray(array){
    let date=[]
    for (let datePast of array){
        if (datePast.date<data.currentDate){
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
function imprCard(data,elementHtml){
    let template=""
    for (let infNewCard of data){
        template += newCard(infNewCard)
    }
    elementHtml.innerHTML += template
}

 imprCard(pastData,containerCards)

 //checkbox
let divCheck = document.getElementById("div-check") 

let category = pastData.map(category => category.category)
console.log(category)
let ordenReduce= Array.from( new Set(category))
console.log(ordenReduce)



 function newCheck(data){
    return `<div class=" main-check form-check pt-1 p-1 m-0 text-start col-md-3 fs-4 col-xl-2 col-xxl-1">
    <input class="form-check-input" type="checkbox" value= "${data}" id="flexCheckDefault1">
    <label class="form-check-label" for="flexCheckDefault1">
        ${data}
    </label>
</div>`
 }

 function imprCheck(data, elementHtml, checkNew){
    let template=""
    for (let newCheck of data) {
        template += checkNew(newCheck)
    }
    elementHtml.innerHTML += template
 }
 imprCheck(ordenReduce,divCheck,newCheck)

 function empty(elementHtml){
    elementHtml.innerHTML=""
}

function filterCards(events,eventsFilterStrings){
    let filter =  events.filter(event => eventsFilterStrings.includes(event.category) )
    return filter
  }
  
  
  divCheck.addEventListener("change", (e)=>{
  let checkBoxs =document.querySelectorAll('input[type="checkbox"]:checked') 
  let checkSelect=Array.from(checkBoxs).map(checkBox=> checkBox.value)
  console.log(checkBoxs)
  console.log(checkSelect)
  let cardsSelect=filterCards(pastData,checkSelect)
  empty(cards)
      if(checkSelect.length==0){
          return imprCard(pastData,cards,newCard)
      }else{
          return imprCard(cardsSelect,cards,newCard)
      }
  }
  )