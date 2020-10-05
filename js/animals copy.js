import { dataJSONURL, nameDataBookingToLocalStorage } from "./variables.js";
import { fn_URLSearchParams, fn_getDataJSON, fn_getObjectFromDataJSON } from "./app.js";

var detailType = fn_URLSearchParams("detailType");

const tableCompare = document.querySelector("#tableCompare tbody");
const animalList = document.querySelector("#animalList");
fn_createDOMAnimalList(detailType);

// Đọc file JSON bằng AJAX
const xhr = new XMLHttpRequest();
const url = "./js/data.json";
xhr.onreadystatechange = loadEventListeners;
xhr.open("GET", url);
xhr.send();
// ====================================================================================================
function loadEventListeners() {
  // Create table Compare from Local Storage
  fn_compareLocalStorage();

  // Event add Compare click
  animalList.addEventListener("click", fn_clickCompare);

  // Event click "Delete"
  tableCompare.addEventListener("click", fn_deleteRow);
}

// Create DOM Animal List =================================================================================
function fn_createDOMAnimalList(detailType) {
  const dataJSON_Object = fn_getDataJSON(dataJSONURL);
  for (let dataJSON_Array in dataJSON_Object) {
    if (dataJSON_Array === detailType) {
      for (let animal of dataJSON_Object[dataJSON_Array]) {
        animalList.innerHTML += `
            <div class="animalList-item col-12 col-sm-6 col-md-4 mb-3 " animalID="${animal.id}"> 
              <button class="addCompare">Compare</button> 
              <img class="img-fluid" src="./images/${animal.imgURL}" alt="" /> 
              <h4>${animal.name}</h4> 
              <p>${animal.description}</p>  
            </div>`;
      }
    }
  }
}

// Xem lại sau
// Function create table compare form Local Storage ===================================================================
function fn_compareLocalStorage() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    let animalsLocalStorage_Array = fn_getAnimalsLocalStorage();
    // Detete all existing row
    while (tableCompare.hasChildNodes()) {
      tableCompare.removeChild(tableCompare.firstChild);
    }
    // create row from local storage
    for (let animalObjectLocal of animalsLocalStorage_Array) {
      fn_addTrTag(animalObjectLocal);
    }
  }
}

// Function fn_clickCompare, event click ===================================================================
function fn_clickCompare(event) {
  if (event.target.classList.contains("addCompare")) {
    const animalDOM = event.target.parentElement;
    const animalID = animalDOM.getAttribute("animalID");
    //Get info animalObject  from DOM
    const animalObject = fn_getAnimalObjectFromID(animalID);
    // Change Local Storage
    fn_setAnimalsLocalStorage(animalObject);
    // Reload Local Storage and create table compare
    fn_compareLocalStorage();
  }
}

// Delete a row (Tag <tr>) ========================================================================
function fn_deleteRow(event) {
  if (event.target.classList.contains("deleteRow")) {
    // event.target.parentElement.parentElement.remove();
    const animalDOM = event.target;
    const animalID = animalDOM.getAttribute("animalID");
    const animalObject = fn_getAnimalObjectFromID(animalID);
    fn_removeAnimalsLocalStorage(animalObject);
    fn_compareLocalStorage();
  }
}

// Function get animalsLocalStorage ===================================================================
function fn_getAnimalsLocalStorage() {
  let animalsLocalStorage_Array;
  if (localStorage.getItem("animalsLocalStorage_String") === null) {
    animalsLocalStorage_Array = [];
  } else {
    animalsLocalStorage_Array = JSON.parse(localStorage.getItem("animalsLocalStorage_String"));
  }
  return animalsLocalStorage_Array;
}

// Function set animalLocalStorage ===================================================================
function fn_setAnimalsLocalStorage(animalObject) {
  let checkID = 0;
  let animalsLocalStorage_Array = fn_getAnimalsLocalStorage();

  for (let animalObjectLocal of animalsLocalStorage_Array) {
    if (animalObjectLocal.id === animalObject.id) {
      checkID = 1;
    }
  }
  if (checkID === 0) {
    animalsLocalStorage_Array.push(animalObject);
  }
  localStorage.setItem("animalsLocalStorage_String", JSON.stringify(animalsLocalStorage_Array));
}

// Function remove an Object of animalLocalStorage ===================================================================
function fn_removeAnimalsLocalStorage(animalObject) {
  let animalsLocalStorage_Array = fn_getAnimalsLocalStorage();

  for (let animalObjectLocal of animalsLocalStorage_Array) {
    if (animalObjectLocal.id === animalObject.id) {
      animalsLocalStorage_Array.splice(animalsLocalStorage_Array.indexOf(animalObjectLocal), 1);
    }
  }
  localStorage.setItem("animalsLocalStorage_String", JSON.stringify(animalsLocalStorage_Array));
}

// Function get animalObject from animalDOM ===================================================================
function fn_getAnimalObjectFromID(animalID) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const animalsJSON = JSON.parse(xhr.responseText);

    for (let animalsJSON_Type in animalsJSON) {
      for (let animalJSON of animalsJSON[animalsJSON_Type]) {
        if (animalID === animalJSON.id) {
          var animalObject = animalJSON;
        }
      }
    }
  }
  return animalObject;
}

// Add a Tag <tr> to <tbody> ===================================================================
function fn_addTrTag(animalObject) {
  // Create HTML Element: tr
  const trTag = document.createElement("tr");

  // Add class to <tr> Tag
  trTag.classList.add("compareItem");

  // add HTML
  trTag.innerHTML = `  
        <td>
          <img class="img-thumbnail" src="./images/${animalObject.imgURL}" alt="${animalObject.name}" />
        </td>
        <td>${animalObject.name}</td>
        <td>${animalObject.size}</td>
        <td>${animalObject.habitat}</td>
        <td><button class="deleteRow" animalID="${animalObject.id}">Delete</button></td>           
    `;
  // add to tbody
  tableCompare.appendChild(trTag);
}
