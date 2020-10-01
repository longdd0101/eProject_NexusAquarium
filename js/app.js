import { dataJSONURL, nameDataJSONToLocalStorage } from "./variables.js";

//Load data from Json file to dataFromJSONToLocalStorage_Array
export function fn_getDataJSON(dataJSONURL) {
  let dataJSON_Array;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", dataJSONURL, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      dataJSON_Array = JSON.parse(xhr.responseText);
      localStorage.setItem(nameDataJSONToLocalStorage, JSON.stringify(dataJSON_Array));
    }
  };

  dataJSON_Array = JSON.parse(localStorage.getItem(nameDataJSONToLocalStorage));
  return dataJSON_Array;
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
