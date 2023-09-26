const loadPhones = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayShowPhones(data.data));
};

const displayShowPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  
  const errorMessage = document.getElementById("error-message");
  if (phones.length === 0) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const { brand, phone_name, image, slug } = phone;

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card border-2">
        <figure><img src="${image}" class="w-full px-4 pt-3" alt="phones" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone_name}</h2>
          <p><strong>Brand: </strong>${brand}</p>
          <div class="card-actions mt-4">
            <a href="#phoneModal" onclick="phoneDetails('${slug}')" class="btn btn-primary text-white">Show Details</a>
          </div>
        </div>
      </div>
    `;
    phonesContainer.appendChild(div);
  });
};

const phoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayShowPhoneDetails(data.data));
};

const displayShowPhoneDetails = (phone) => {
  const { name, brand, releaseDate, image, mainFeatures } = phone;
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = name;
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <img src="${image}" class="w-full" alt="">
    <div class='mt-3'>
      <p><strong>Brand: </strong>${brand}</p>
      <p><strong>Release Date: </strong>${
        releaseDate ? releaseDate : "Not Found"
      }</p>
      <p><strong>Storage: </strong>${mainFeatures?.storage}</p>
    </div>
  `;
};

const searchElement = () => {
  const element = document.getElementById("input-field");
  const searchText = element.value;
  element.value = "";
  loadPhones(searchText);
};

// search input field enter key handler
document
  .getElementById("input-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // code for enter
      searchElement();
    }
  });

loadPhones("samsung");
