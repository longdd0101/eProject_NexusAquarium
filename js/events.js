import { dataJSONURL, nameDataJSONToLocalStorage } from "./variables.js";
import { fn_getDataJSON, fn_getDataFromLocalStorage } from "./app.js";

const _data = fn_getDataJSON(dataJSONURL);

console.log(_data);
// const dataJSONURL = "./js/data.json";
// console.log(dataJSONURL);
// const dataFromJSON_Array = fn_getDataFromJSON(dataJSONURL);
// console.log(dataFromJSON_Array);
