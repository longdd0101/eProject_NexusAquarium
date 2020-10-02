import { dataJSONURL, nameDataJSONToLocalStorage } from "./variables.js";

//Load data from Json file to dataFromJSONToLocalStorage_Array =============================
export function fn_getDataJSON(dataJSONURL) {
  let _dataJSON_Object;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataJSONURL, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      _dataJSON_Object = JSON.parse(xhr.responseText);
      localStorage.setItem(nameDataJSONToLocalStorage, JSON.stringify(_dataJSON_Object));
    }
  };

  _dataJSON_Object = JSON.parse(localStorage.getItem(nameDataJSONToLocalStorage));
  return _dataJSON_Object;
}

// Function get Object From Data JSON ===================================================================
export function fn_getObjectFromDataJSON(detailType, detailID) {
  const dataJSON_Object = fn_getDataJSON(dataJSONURL);
  const dataJSON_Array = dataJSON_Object[detailType];
  var getObject;
  for (let _Object of dataJSON_Array) {
    if (_Object.id === detailID) {
      getObject = _Object;
    }
  }
  return getObject;
}
// Function get animalsLocalStorage ===================================================================
export function fn_getArrayLocalStorage(arrayLocalStorage_name) {
  let arrayLocalStorage;
  if (localStorage.getItem(arrayLocalStorage_name) === null) {
    arrayLocalStorage = [];
  } else {
    arrayLocalStorage = JSON.parse(localStorage.getItem(arrayLocalStorage_name));
  }
  return arrayLocalStorage;
}

// Function set Object to LocalStorage ===================================================================
export function fn_setObjectToArrayLocalStorage(_object, arrayLocalStorage_name) {
  let checkID = 0;
  let arrayLocalStorage = fn_getArrayLocalStorage(arrayLocalStorage_name);

  for (let arrayItem of arrayLocalStorage) {
    if (arrayItem.id === _object.id) {
      checkID = 1;
    }
  }
  if (checkID === 0) {
    arrayLocalStorage.push(_object);
  }
  localStorage.setItem(arrayLocalStorage_name, JSON.stringify(arrayLocalStorage));
}
// Function remove ObjectID In Array Local Storage  ===================================================================
export function fn_removeObjectIDInArrayLocalStorage(_objectID, arrayLocalStorage_name) {
  let arrayLocalStorage = fn_getArrayLocalStorage(arrayLocalStorage_name);

  for (let arrayItem of arrayLocalStorage) {
    if (arrayItem.id === _objectID) {
      arrayLocalStorage.splice(arrayLocalStorage.indexOf(arrayItem), 1);
    }
  }
  localStorage.setItem(arrayLocalStorage_name, JSON.stringify(arrayLocalStorage));
}

//GET parameter form URL ===================================================================
export function fn_URLSearchParams(parameterName) {
  let _parameters = new URLSearchParams(window.location.search);
  return _parameters.get(parameterName);
}
