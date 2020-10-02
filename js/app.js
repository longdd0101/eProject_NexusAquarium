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

// Function get LocalStorage ===================================================================
export function fn_getDataFromLocalStorage(nameData_String) {
  let _data;
  if (localStorage.getItem("nameData_String") === null) {
    _data = [];
  } else {
    _data = JSON.parse(localStorage.getItem("nameData_String"));
  }
  return _data;
}

//GET parameter form URL ===================================================================
export function fn_URLSearchParams(parameterName) {
  let _parameters = new URLSearchParams(window.location.search);

  return _parameters.get(parameterName);
}
