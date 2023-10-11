const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
    'live_p82CwYxZqFtNGXfSFI7XrThXKQVhxh8542BDEdjKLOjNWDrliMHADRW4withtGSN';

export function fetchBreeds() {
    return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(r => {
        if (!r.ok) {
            throw new Error(r.status);
        }
        return r.json();
    })
};

export function fetchCatByBreed(breedId) {
    return fetch(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(r => {
        if (!r.ok) {
            throw new Error(r.status);
        }
        return r.json();
    }
    )
};