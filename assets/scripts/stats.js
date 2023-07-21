fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(data => data.json())
    .then(data => {
        //Contenedores
        const tableFuture = document.getElementById("table-future")
        const tablePast = document.getElementById("table-past")
        console.log(tablePast)
        const firstTable = document.getElementById("first-tabla")

        //Datos
        let eventsFutures = data.events.filter(event => event.date >= data.currentDate);
        console.log(eventsFutures)
        let eventsPast = data.events.filter(event => event.date < data.currentDate);
        console.log(eventsPast);
        let events = data.events
        console.log((events));
        let currentDate = data.currentDate
        let categorysPast = Array.from(new Set(eventsPast.map(event => event.category)))
        let categorysFutures = Array.from(new Set(eventsFutures.map(event => event.category)))
        let futures = filtrarByCategory(eventsFutures, categorysFutures)
        let past = filtrarByCategory(eventsPast, categorysPast)
        //Ejecuciones
        firstTabla(eventsPast, events, firstTable)

        imprEventLine(futures, tableFuture, createEventLine)
        imprEventLine(past, tablePast, createEventLine)
    }).catch(error => console.log(("fallo")))

// 
// //Funciones

function firstTabla(eventPast, events, elementoHtml) {
    return elementoHtml.innerHTML = `<tr class="text-center align-middle" id="">
 <td class="text-danger bg-light-subtle fs-5 align-middle">${mayorPorcentajeAssitance(eventPast)}</td>
 <td class="text-danger bg-light-subtle fs-5 align-middle">${minumPorcentajeAssistance(eventPast)}</td>
 <td class="text-danger bg-light-subtle fs-5 align-middle">${mayorCapacity(events)}</td>
</tr>`
}
function createEventLine(event) {
    return `<tr class="text-center align-middle">
    <td class="text-danger bg-light-subtle fs-5 align-middle">${event.category}</td>
    <td class="text-danger-emphasis bg-light-subtle align-middle">$${event.revenue.toLocaleString()} USD</td>
    <td class="text-danger-emphasis bg-light-subtle align-middle">${event.porcentageOfAssitance} %</td>
</tr>`
}

function imprEventLine(array, elementoHtml, newLine) {
    let template = ""
    for (let event of array) {
        template += newLine(event)
    }
    return elementoHtml.innerHTML += template
}
function revenues(event, currentDate) {
    return currentDate < event.date ? event.price * event.estimate : event.price * event.assistance
}
function porcentageAssitance(event, currentDate) {
    return currentDate < event.date ? Math.round(100 * event.estimate / event.capacity) : Math.round(100 * event.assistance / event.capacity)
}
function filtrarByCategory(events, categorys) {
    let resultadoMap = categorys.map(category => {
        let eventosDeLaCategoria = events.filter(event => event.category == category)
        let capacityTotal = 0
        let assistanceTotal = 0
        let objetoFinal = {
            category: category,
            revenue: 0,
            porcentageOfAssitance: 0,
        }
        for (let event of eventosDeLaCategoria) {
            objetoFinal.revenue += event.price * (event.assistance || event.estimate)
            capacityTotal += event.capacity
            assistanceTotal += (event.assistance || event.estimate)
            objetoFinal.porcentageOfAssitance = Math.round(100 * assistanceTotal / capacityTotal)
        }
        return objetoFinal
    })
    return resultadoMap
}

function mayorPorcentajeAssitance(events) {
    let control = 0
    let aux
    let eventSelec
    for (let event of events) {
        aux = Math.round(100 * event.assistance / event.capacity)
        if (control <= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return eventSelec = `"${eventSelec}",  ${aux} %`
}

function minumPorcentajeAssistance(events) {
    let control = Math.round(100 * events[0].assistance / events[0].capacity)
    let aux
    let eventSelec
    for (let event of events) {
        aux = Math.round(100 * event.assistance / event.capacity)
        if (control >= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return eventSelec = `"${eventSelec}",  ${aux} %`
}

function mayorCapacity(events) {
    let control = 0
    let aux
    let eventSelec
    for (let event of events) {
        aux = event.capacity
        if (control <= aux) {
            control = aux
            eventSelec = event.name
        }
    }
    return `"${eventSelec}"`
}
