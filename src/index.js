import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_p82CwYxZqFtNGXfSFI7XrThXKQVhxh8542BDEdjKLOjNWDrliMHADRW4withtGSN";

const url = 'https://api.thecatapi.com/v1/breeds';
const breedSelect = document.querySelector('.breed-select');

fetchBreeds();

function fetchBreeds() {
    fetch(url).then(result => result.json())
        .then(cats => cats.map(cat => {
            const catsNameMarkup = `<option value="${cat.id}">${cat.name}</option>`;
            breedSelect.insertAdjacentHTML('beforeend', catsNameMarkup);
            return cat;
        }));
};
// breedSelect.addEventListener('changed', onChangeCat);

