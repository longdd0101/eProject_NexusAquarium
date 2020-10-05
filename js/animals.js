import { dataJSONURL } from "./variables.js";
import { fn_URLSearchParams, fn_getDataJSON } from "./app.js";

var detailType = fn_URLSearchParams("detailType");
var detailID = fn_URLSearchParams("detailID");
console.log(detailID);
const animalListDOM = document.querySelector("#animalList");
const animalDetailDOM = document.querySelector("#animalDetail");

fn_createDOMAnimalList(detailType);
if (detailID != null) {
  fn_createDOMAnimalDetail(detailType, detailID);
}

// Create DOM Animal List =================================================================================
function fn_createDOMAnimalList(detailType) {
  const dataJSON_Object = fn_getDataJSON(dataJSONURL);

  for (let _animal of dataJSON_Object[detailType]) {
    animalListDOM.innerHTML += `
            <div class="animalList-item col-12 col-sm-6 col-md-4 mt-3 mb-3 " animalID="${_animal.id}"> 
              <a href="./animals.html?detailType=${detailType}&detailID=${_animal.id}">
                <img
                class="img-fluid animalList-item-imgURL"
                src="./images/${_animal.imgURL}"
                alt=""
                />
                <h4>${_animal.name}</h4> 
              </a>
              <p>${_animal.description}</p>  
            </div>
          `;
  }
}
// Create DOM Animal Detail =================================================================================
function fn_createDOMAnimalDetail(detailType, detailID) {
  const dataJSON_Object = fn_getDataJSON(dataJSONURL);

  for (let _animal of dataJSON_Object[detailType]) {
    if (_animal.id === detailID) {
      animalDetailDOM.innerHTML += `
        
        <div class="row justify-content-center">
          <div class="col-12 col-md-9 bg-light pt-3 border">
            <div class="row">
              <div class="col-12 col-md-6">
                <img class="img-fluid" src="./images/${_animal.imgURL}" alt="" dataName="imgURL"/>
              </div>
              <div class="col-12 col-md-6 pt-3 pt-md-0">
                <h4 dataName="name">${_animal.name}</h4>
                <span dataName="description">
                  ${_animal.description}
                </span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-sm-4">
                <strong>Animal type</strong>
                <p dataname="animalType">${_animal.animalType}</p>
                <strong>Diet</strong>
                <p dataName="diet">${_animal.diet}</p>
              </div>
              <div class="col-12 col-sm-4">
                <strong>Habitat</strong>
                <p dataName="habitat">${_animal.habitat}</p>
                <strong>Range</strong>
                <p dataName="range">${_animal.range}</p>
              </div>
              <div class="col-12 col-sm-4">
                <strong>Size</strong>
                <p dataName="size">${_animal.size}</p>
                <strong>Relatives</strong>
                <p dataName="relatives">${_animal.relatives}</p>
              </div>
            </div>
          </div>
        </div>
        
      
            `;
    }
  }
}
