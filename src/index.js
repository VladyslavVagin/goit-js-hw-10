import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

const selectItem = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');

errorText.classList.add('is-hidden');
loaderText.classList.add('is-hidden');

fetchBreeds().then(cats => {
    cats.map(cat => {
        const catsNameMarkup = `<option value="${cat.id}">${cat.name}</option>`;
        selectItem.insertAdjacentHTML('beforeend', catsNameMarkup);
    });
    new SlimSelect({
        select: selectItem,
    });
});

selectItem.addEventListener('change', onChangeCat);

function onChangeCat(e) {
    const beerId = e.currentTarget.value;
    loaderText.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');
    selectItem.setAttribute('disabled', '');
    fetchCatByBreed(beerId).then(r => {
        console.log(r);
        const { url, breeds } = r[0];
        catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="500"/>
        <div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p>
        <p><h2>Temperament:</h2>${breeds[0].temperament}</p></div>`;
        Notify.success('REQUEST ACCEPTED');
    }).catch(onError).finally(setTimeout((onFinally), 2000));
};

function onError() {
    Notify.failure('SORRY!!! SOMETHING WENT WRONG !!! SERVER NOT ANSWER');
    loaderText.classList.add('is-hidden');
    errorText.classList.remove('is-hidden');
};
function onFinally() {
    errorText.classList.add('is-hidden');
    loaderText.classList.add('is-hidden');
    catInfo.classList.remove('is-hidden');
    selectItem.removeAttribute('disabled');
};