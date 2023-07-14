let eventData = data.events 
// console.log(eventData)

let dateEvent= data.currentDate
// console.log(dateEvent)

let eventSearch= location.search
// console.log(eventSearch)

let eventIdSearch = new URLSearchParams(eventSearch)
// console.log(eventIdSearch);

let eventId = eventIdSearch.get('id')
// console.log(eventId)

let detailsMain = document.getElementById("details-main") 

let eventRequired = eventData.find(event => event._id == eventId)
// console.log(eventRequired)

function  createCardPast(event) {   
    return  `<section class="col-11 card col-md-10">
    <div class="row g-0 justify-content-evenly align-items-center">
        <div class="col-md-4 col-xl-5 align-self-center ps-md-2">
            <img src=${event.image} class="img-fluid rounded-start p-xl-3" alt="">
        </div>
        <div class="col-md-8 col-xl-5">
            <div class="card-body  d-flex flex-column align-items-center justify-content-evenly">
                <h5 class="card-title text-center">${event.name}</h5>
                <ul>
                    <li>
                        Date: ${event.date}
                    </li>
                    <li>
                        ${event.description}
                    </li>
                    <li>
                        Caegory: ${event.category}
                    </li>
                    <li>
                        Place: ${event.place}
                    </li>
                    <li>
                        Capacity: ${event.capacity}
                    </li>
                    <li>
                        Asistance: ${event.assistance}
                    </li>
                    <li>
                        Price: ${event.price}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>`
}
 function createCardUpComing(event){
    return  `<section class="col-11 card col-md-10">
    <div class="row g-0 justify-content-evenly align-items-center">
        <div class="col-md-4 col-xl-5 align-self-center ps-md-2">
            <img src=${event.image} class="img-fluid rounded-start p-xl-3" alt="">
        </div>
        <div class="col-md-8 col-xl-5">
            <div class="card-body  d-flex flex-column align-items-center justify-content-evenly">
                <h5 class="card-title text-center">${event.name}</h5>
                <ul>
                    <li>
                        Date: ${event.date}
                    </li>
                    <li>
                        ${event.description}
                    </li>
                    <li>
                        Caegory: ${event.category}
                    </li>
                    <li>
                        Place: ${event.place}
                    </li>
                    <li>
                        Capacity: ${event.capacity}
                    </li>
                    <li>e
                        Estimate: ${event.estimate}
                    </li>
                    <li>
                        Price: ${event.price}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>`
 }

 function imprCardDetails(event,currentDate,elementHtml){
    if(event.date<currentDate){
        return elementHtml.innerHTML= createCardPast(event)
    }else{
        return elementHtml.innerHTML= createCardUpComing(event)
    }
 }
 imprCardDetails(eventRequired,dateEvent,detailsMain);