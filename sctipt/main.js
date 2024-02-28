// load the data for card:
const loadData = async (value, isShow) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShow);
};

// main function to render
const displayPhones = (phones, isShow) => {
  const cardsContainer = document.getElementById("cards-container");
  // clear the cards container for each time search:
  cardsContainer.innerHTML = "";

  // show only 12 itme for primary search:
  // show or hide Show more button based on condition:
  const showMoreBtn = document.getElementById("show-more-div");

  if (!isShow && phones.length > 12) {
    showMoreBtn.classList.remove("hidden");
    phones = phones.slice(0, 12);
  } else {
    showMoreBtn.classList.add("hidden");
  }

  phones.forEach((phone) => {
    // disply cards handelar:
    displayCardsHandelar(phone, cardsContainer);
  });
  loaderHandelar(phones.length);
};

// display all cards:
const displayCardsHandelar = (phone, cardsContainer) => {
  const { phone_name, image, slug } = phone;
  const cardDiv = document.createElement("div");
  cardDiv.classList = `card border-2 p-5 rounded-xl`;

  cardDiv.innerHTML = `
      <figure
        title="Click to show details"
        class="cursor-pointer py-12 bg-[#f3f8ff] rounded-xl"
      >
        <img
          class="hover:scale-125 overflow-hidden transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:bg-indigo-500 duration-300"
          src="${image}"
          alt="Phone image"
        />
      </figure>

      <div class="card-body items-center text-center">
        <h2 class="card-title font-bold text-2xl">${phone_name}</h2>
        <p>
          There are many variations of passages of available, but the
          majority have suffered
        </p>
        <h3 class="font-bold text-2xl py-4">999$</h3>
        <div class="card-actions">
          <button 
          onclick="showDetailsClickHandelar('${slug}'); show_modal.showModal()"
            class="btn btn-info text-white font-semibold text-lg"
          >
            Show Details
          </button>
        </div>
      </div>
    `;
  cardsContainer.appendChild(cardDiv);
};

// search event handelar:
const value = document.getElementById("search-input-fild").value;

const searchEventHandelar = (isShow) => {
  const innerValue = document.getElementById("search-input-fild").value;
  if (innerValue) {
    loaderHandelar(0);
    loadData(innerValue, isShow);
  }
};

// show all button click handelar
const showAllBtnHandelar = () => {
  const isShow = true;
  searchEventHandelar(isShow);
};

// loader handelar
const loaderHandelar = (length) => {
  const loaderDiv = document.getElementById("spinner");
  length < 1
    ? loaderDiv.classList.remove("hidden")
    : loaderDiv.classList.add("hidden");
};

// show details click handelar:
const showDetailsClickHandelar = async(id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  
  const res = await fetch(url);
  const data = await res.json();
  const singlePhone = data.data;
  displySinglePhoneDetails(singlePhone)
}

// show single phone details:
const displySinglePhoneDetails = (singlePhone) => {
  const {name, mainFeatures,brand,image,slug, releaseDate, others} = singlePhone;

 const phoneDetails =  document.getElementById('phone-details-container');
 phoneDetails.innerHTML= `
  <figure
  class="flex justify-center py-12 bg-[#f3f8ff] rounded-xl mb-8"
>
  <img src="${image}" class="rounded-xl" />
</figure>
<div class="space-y-2">
  <h2 class="card-title font-bold text-black text-3xl">
    ${name}
  </h2>
  <p>
    It is a long established fact that a reader will be distracted
    by the readable content of a page when looking at its layout.
  </p>

  <p class="uppercase">
    <strong class="capitalize">Storage:</strong> ${
    mainFeatures?.storage }
  </p>
  <p>
    <strong class="capitalize">Display Size:</strong> ${
    mainFeatures?.displaySize }
  </p>
  <p>
    <strong class="capitalize">Chipset:</strong>
    ${mainFeatures?.chipSet}
  </p>
  <p class="uppercase">
    <strong class="capitalize">Memory:</strong> ${
    mainFeatures?.memory }
  </p>
  <p><strong class="capitalize">Slug:</strong> ${slug}</p>
  <p>
    <strong class="capitalize">Release date:</strong>
    ${releaseDate}
  </p>
  <p><strong class="capitalize">Brand:</strong> ${brand}</p>
  <p class="uppercase">
    <strong class="capitalize">Gps:</strong> ${ others?.GPS ||
    "❌" }
  </p>
</div>
  `
}
loadData('a', true)