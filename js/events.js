import { dataJSONURL, nameDataBookingToLocalStorage } from "./variables.js";
import {
  fn_getDataJSON,
  fn_URLSearchParams,
  fn_getObjectFromDataJSON,
  fn_setObjectToArrayLocalStorage,
  fn_getArrayLocalStorage,
  fn_removeObjectIDInArrayLocalStorage,
} from "./app.js";

var detailType = fn_URLSearchParams("detailType");
var detailID = fn_URLSearchParams("detailID");
// console.log(detailType);
// console.log(detailID);
const event_Object = fn_getObjectFromDataJSON(detailType, detailID);
// console.log(event_Object);
const eventDOM = document.querySelector("#eventDOM");

// Add HTML DOM =======================================================================
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
    <div class="text-center ">
        <button id="bookingButton" type="button" class="btn btn-primary">Booking online!</button>
    </div>
`;

// BOOKING =====================================================================================================================
const bookingButton = document.querySelector("#bookingButton");
const bookingSection = document.querySelector("#bookingSection");
const bookingTable = document.querySelector("#bookingTable tbody");

bookingButton.addEventListener("click", fn_bookingButton);
bookingTable.addEventListener("click", fn_deleteRow);
bookingTable.addEventListener("change", fn_changeQuantity);

fn_bookingFromLocalStorage(bookingTable, nameDataBookingToLocalStorage);
fn_updateElementSummaryTotal();

function fn_bookingButton() {
  fn_setObjectToArrayLocalStorage(event_Object, nameDataBookingToLocalStorage);
  fn_bookingFromLocalStorage(bookingTable, nameDataBookingToLocalStorage);
  fn_updateElementSummaryTotal();
}

function fn_bookingFromLocalStorage(bookingTable, nameDataBookingToLocalStorage) {
  const arrayDataBooking = fn_getArrayLocalStorage(nameDataBookingToLocalStorage);
  //Delete row old
  while (bookingTable.hasChildNodes()) {
    bookingTable.removeChild(bookingTable.firstChild);
  }
  for (const _object of arrayDataBooking) {
    fn_addTrTagBooking(_object, bookingTable);
  }
}

// Function Add a Tag <tr> to <tbody> ===================================================================
function fn_addTrTagBooking(_Object, _DOM) {
  // Create HTML Element: tr
  const trTag = document.createElement("tr");

  // Add class to <tr> Tag
  // trTag.setAttribute("detailID", _Object.id);
  trTag.setAttribute("class", "tesst");
  trTag.setAttribute("detailID", _Object.id);

  // add HTML
  trTag.innerHTML = `  
      <td class="ticket_thumbnail">
        <img src="./images/${_Object.imgURL_main1}" alt="" class="img-fluid" dataName="imgURL_main1"/>
          <span dataName="name">${_Object.name}</span>
        </td>
      <td>
        <input
          type="number"
          name="ticket_quantity"
          min="0"

          value="${_Object.ticket_adult_quantity}"

          class="ticket_quantity"
          ticketType="ticket_adult"
          dataName="ticket_adult_quantity"
        />
      </td>
      <td class="ticket_price" ticketType="ticket_adult" dataName="ticket_adult_price">
        ${_Object.ticket_adult_price}$
      </td>

      <td>
        <input
          type="number"
          name="ticket_quantity"
          min="0"

          value="${_Object.ticket_child_quantity}"

          class="ticket_quantity"
          ticketType="ticket_child"
          dataName="ticket_child_quantity"
        />
      </td>
      <td class="ticket_price" ticketType="ticket_child" dataName="ticket_child_price">
        ${_Object.ticket_child_price}$
      </td>
      
      <td class="ticket_summary" dataName="ticket_summary" >
        ${_Object.ticket_summary}$
      </td>
      <td>
        <button class="bookingRemove" >Remove</button>
      </td>        
    `;
  // add to tbody
  _DOM.appendChild(trTag);
}
// Function delete row -  a Tag <tr> of <tbody> ===================================================================
function fn_deleteRow(event) {
  if (event.target.classList.contains("bookingRemove")) {
    // Get ID
    const _DOM = event.target.parentElement.parentElement;
    // console.log(_DOM);
    const detailID = _DOM.getAttribute("detailID");
    // console.log(detailID);

    // remove in localstorage
    fn_removeObjectIDInArrayLocalStorage(detailID, nameDataBookingToLocalStorage);

    // re create <tr>
    fn_bookingFromLocalStorage(bookingTable, nameDataBookingToLocalStorage);
    fn_updateElementSummaryTotal();
  }
}
// Function change quantity  ===================================================================
// fn_changeQuantity();
function fn_changeQuantity(change) {
  if (change.target.classList.contains("ticket_quantity")) {
    // element Input
    const elementInput = change.target;
    const dataQuantity_Name = elementInput.getAttribute("dataName");
    const dataQuantity_Value = elementInput.value;

    // element tr
    const elementTr = elementInput.parentElement.parentElement;
    const detailID = elementTr.getAttribute("detailID");
    // console.log(elementTr);
    console.log(detailID);

    // change arrayDataBooking in local storage
    fn_updateQuantityArrayDataBooking(detailID, dataQuantity_Name, dataQuantity_Value);

    fn_bookingFromLocalStorage(bookingTable, nameDataBookingToLocalStorage);
    fn_updateElementSummaryTotal();
  }
}

function fn_updateQuantityArrayDataBooking(detailID, dataQuantity_Name, dataQuantity_Value) {
  const arrayDataBooking = fn_getArrayLocalStorage(nameDataBookingToLocalStorage);

  for (const _object of arrayDataBooking) {
    if (_object.id === detailID) {
      _object[dataQuantity_Name] = dataQuantity_Value;
      _object["ticket_summary"] =
        parseInt(_object["ticket_adult_quantity"]) * parseInt(_object["ticket_adult_price"]) +
        parseInt(_object["ticket_child_quantity"]) * parseInt(_object["ticket_child_price"]);
    }
  }
  localStorage.setItem(nameDataBookingToLocalStorage, JSON.stringify(arrayDataBooking));
}

function fn_updateElementSummaryTotal() {
  const arrayDataBooking = fn_getArrayLocalStorage(nameDataBookingToLocalStorage);
  let summaryTotal = 0;
  for (const _object of arrayDataBooking) {
    summaryTotal += parseInt(_object["ticket_summary"]);
  }
  const elementSummaryTotal = document.querySelector("#bookingTable #summaryTotal");
  elementSummaryTotal.innerText = summaryTotal + "$";
  // const _arrayDataBooking = fn_getArrayLocalStorage(nameDataBookingToLocalStorage);
  // console.log(_arrayDataBooking);
}
