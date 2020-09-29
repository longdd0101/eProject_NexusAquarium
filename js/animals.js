// Đọc file JSON bằng AJAX
const xhr = new XMLHttpRequest();
const url = "./js/data.json";
const tableCompare = document.querySelector("#tableCompare tbody");
const animalList = document.querySelector("#animalList");

xhr.onreadystatechange = loadEventListeners;
xhr.open("GET", url);
xhr.send();
// ====================================================================================================
function loadEventListeners() {
  // Create DOM animal List
  fn_createDOMAnimalList();

  // addCompare click
  animalList.addEventListener("click", fn_clickCompare);

  // Event click "Delete"
}

// Create DOM Animal List =================================================================================
function fn_createDOMAnimalList() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    var animalsJSON = JSON.parse(xhr.responseText);
    var animalType = animalList.getAttribute("animalType");
    for (let animalsJSON_Type in animalsJSON) {
      if (animalType === animalsJSON_Type) {
        for (let animal of animalsJSON[animalType]) {
          animalList.innerHTML += `
            <div class="animalList-item col-12 col-sm-6 col-md-4 col-lg-3 " animalID="${animal.id}"> 
              <button class="addCompare">Compare</button> 
              <img class="img-fluid" src="./images/${animal.imgURL}" alt="" /> 
              <h4>${animal.name}</h4> 
              <p>${animal.description}</p>  
            </div>`;
        }
      }
    }
  }
}

// Function fn_clickCompare, event click ===================================================================
function fn_clickCompare(event) {
  if (event.target.classList.contains("addCompare")) {
    const animalDOM = event.target.parentElement;

    //Get info animalObject  from DOM
    const animalObject = fn_getAnimalObject(animalDOM);

    //Add tr to table
    fn_addTrTag(animalObject);

    console.log(animalObject);
  }
}

// Function get animalObject from animalDOM ===================================================================
function fn_getAnimalObject(animalDOM) {
  const animalID = animalDOM.getAttribute("animalID");

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

// Add one Tag <tr> to <tbody> ===================================================================
function fn_addTrTag(animalObject) {
  // Create HTML Element: tr
  const trTag = document.createElement("tr");

  // Add class to <tr> Tag
  trTag.classList.add("animal-item");

  // add HTML
  trTag.innerHTML = `  
        <td>
          <img class="img-thumbnail" src="./images/${animalObject.imgURL}" alt="${animalObject.name}" />
        </td>
        <td>${animalObject.name}</td>
        <td>${animalObject.size}</td>
        <td>${animalObject.habitat}</td>
        <td><button>Delete</button></td>           
    `;
  // add to tbody
  tableCompare.appendChild(trTag);
}
