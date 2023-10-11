import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './style.css';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');

errorText.classList.add('is-hidden');
loaderText.classList.add('is-hidden');

fetchBreeds().then(cats => cats.map(cat => {
    const catsNameMarkup = `<option value="${cat.id}">${cat.name}</option>`;
    breedSelect.insertAdjacentHTML('beforeend', catsNameMarkup);
    return cat;
}));

breedSelect.addEventListener('change', onChangeCat);

function onChangeCat(e) {
    const beerId = e.currentTarget.value;
    loaderText.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');
    breedSelect.setAttribute('disabled', '');
    fetchCatByBreed(beerId).then(r => {
        console.log(r);
        const { url, breeds } = r[0];
        catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="450"/>
        <div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
    }).catch(() => {
        loaderText.classList.add('is-hidden');
        errorText.classList.remove('is-hidden');
    }).finally(setTimeout(() => {
        loaderText.classList.add('is-hidden');
        catInfo.classList.remove('is-hidden');
        breedSelect.removeAttribute('disabled');
    }, 3000));
};

