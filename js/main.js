// Đọc file JSON bằng AJAX
const xhr = new XMLHttpRequest();
const url = "./js/data.json";
const content = document.querySelector("#content tbody");

xhr.onreadystatechange = xuLyKetQuaLayDuoc;
xhr.open("GET", url);
xhr.send();

function xuLyKetQuaLayDuoc() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    var animals = JSON.parse(xhr.responseText);
    // console.log(animals);
    for (let animal of animals.sharks) {
      content.innerHTML += `<tr><td>${animal.no}</td><td>${animal.name}</td><td>${animal.size}</td><td>${animal.range}</td></tr>`;
    }
  }
}
