import { dataJSONURL } from "./variables.js";
import { fn_getDataJSON, fn_URLSearchParams } from "./app.js";

var detailType = fn_URLSearchParams("detailType");
// console.log(detailType);
var eventID = fn_URLSearchParams("eventID");
// console.log(eventID);
const dataJSON_Object = fn_getDataJSON(dataJSONURL);
// console.log(dataJSON_Object);
const dataJSON_Array = dataJSON_Object[detailType];
// console.log(dataJSON_Array);
var event_Object;
for (let _Object of dataJSON_Array) {
  if (_Object.eventID === eventID) {
    event_Object = _Object;
  }
}
// console.log(event_Object);
// =======================================================================
const eventDOM = document.querySelector("#eventDOM");

// add HTML
eventDOM.innerHTML = `
    <h3 class="text-center" data-name="name">${event_Object.name}</h3>
    <div class="discription border mb-5">
        <img class="img-fluid" src="./images/${event_Object.imgURL_map}" alt="" data-name="imgURL_map" />
        <div class="row p-3">
          <div class="col-12 col-md-5">
            <h4>Description</h4>
            <p class="text-justify" data-name="description">
              ${event_Object.description}
            </p>
          </div>
          <div class="col-12 col-md-4">
            <h4>Schedule</h4>
            <p class="text-justify" data-name="schedule">
              ${event_Object.schedule}
            </p>
          </div>
          <div class="col-12 col-md-3">
            <h4>Date & Time</h4>
            <span class="font-weight-bold" data-name="date">${event_Object.date}</span><br />
            <span class="font-weight-bold" data-name="time">${event_Object.time}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="eventDOM_1" class="row justify-content-center">
    </div>  
`;
const eventDOM_1 = document.querySelector("#eventDOM_1");
if (event_Object.imgURL_sub1) {
  eventDOM_1.innerHTML = `    
        <div class="col-12 col-md-6 text-center mb-5">
          <img class="img-fluid" src="./images/${event_Object.imgURL_sub1}" alt="" data-name="imgURL_sub1" />
        </div>   
    `;
}
if (event_Object.imgURL_sub2) {
  eventDOM_1.innerHTML += `
        <div class="col-12 col-md-6 text-center mb-5">
          <img class="img-fluid" src="./images/${event_Object.imgURL_sub2}" alt="" data-name="imgURL_sub2" />
        </div>  
    `;
}

if (event_Object.note1) {
  eventDOM_1.innerHTML += `
        <div class="col-12 col-md-8 mb-5">
          <p class="text-center" data-name="note1">
            ${event_Object.note1}
          </p>
        </div>     
    `;
}
if (event_Object.imgURL_main2) {
  eventDOM_1.innerHTML += `
        <div class="col-12 text-center mb-5">
          <img src="./images/${event_Object.imgURL_main2}" alt="" class="img-fluid" data-name="imgURL_main2" />
        </div>
    `;
}
if (event_Object.note2) {
  eventDOM_1.innerHTML += `
        <div class="col-12 col-md-8 mb-5">
          <p class="text-center" data-name="note2">
            ${event_Object.note2}
          </p>
        </div>    
    `;
}
if (event_Object.imgURL_main3) {
  eventDOM_1.innerHTML += `
        <div class="col-12 text-center mb-5">
          <img src="./images/${event_Object.imgURL_main3}" alt="" class="img-fluid" data-name="imgURL_main3" />
        </div>    
    `;
}
if (event_Object.note3) {
  eventDOM_1.innerHTML += `
        <div class="col-12 col-md-8 mb-5">
          <p class="text-center" data-name="note3">
            ${event_Object.note3}
          </p>
        </div>   
    `;
}
eventDOM.innerHTML += `
    <div class="text-center mb-5">
        <button type="button" class="btn btn-primary">Booking online!</button>
    </div>
`;

console.log(eventDOM);
