// Đọc file JSON bằng AJAX
const xhr = new XMLHttpRequest();
const url = "./js/data.json";
const content = document.querySelector("#content tbody");
const animalList = document.querySelector("#animalList");

xhr.onreadystatechange = xuLyKetQuaLayDuoc;
xhr.open("GET", url);
xhr.send();

function xuLyKetQuaLayDuoc() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    var animals = JSON.parse(xhr.responseText);
    // console.log(animals);

    var animalName = animalList.getAttribute("animal-Name");
    console.log(animalName);
    switch (animalName) {
      case "sharks":
        for (let animal of animals.sharks) {
          // content.innerHTML += `<tr><td>${animal.no}</td><td>${animal.name}</td><td>${animal.size}</td><td><img class="img-fluid" src="./images/${animal.imgURL}" alt="" /></td></tr>`;
          animalList.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 animalList-item"> <button>Prepare</button> <img class="img-fluid" src="./images/${animal.imgURL}" alt="" /> <h4>${animal.name}</h4> <p>${animal.description}</p>  </div>`;
        }
        break;
      case "jellies":
        for (let animal of animals.jellies) {
          // content.innerHTML += `<tr><td>${animal.no}</td><td>${animal.name}</td><td>${animal.size}</td><td><img class="img-fluid" src="./images/${animal.imgURL}" alt="" /></td></tr>`;
          animalList.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 animalList-item"> <button>Prepare</button> <img class="img-fluid" src="./images/${animal.imgURL}" alt="" /> <h4>${animal.name}</h4> <p>${animal.description}</p>  </div>`;
        }
        break;
      case "dolphins":
        for (let animal of animals.dolphins) {
          // content.innerHTML += `<tr><td>${animal.no}</td><td>${animal.name}</td><td>${animal.size}</td><td><img class="img-fluid" src="./images/${animal.imgURL}" alt="" /></td></tr>`;
          animalList.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 animalList-item"> <button>Prepare</button> <img class="img-fluid" src="./images/${animal.imgURL}" alt="" /> <h4>${animal.name}</h4> <p>${animal.description}</p>  </div>`;
        }
        break;
    }
  }
}
