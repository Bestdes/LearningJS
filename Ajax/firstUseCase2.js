'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderError = function(msg) {
    countriesContainer.insertAdjacentText(`beforeend`, msg);
    /* countriesContainer.style.opacity = 1; */
}

const renderCountry = function(data, className = ``) {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}"</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}m People</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        /* countriesContainer.style.opacity = 1; */
  };


// This is Called Callback Hell
// Bad code is code that is difficult to understand
setTimeout(() => {
    console.log(`1 second passed`);
    setTimeout(() => {
      console.log(`2 seconds passed`);
      setTimeout(() => {
        console.log(`3 seconds passed`);
        setTimeout(() => {
          console.log(`4 seconds passed`);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
  
  
  /* const newRequest = fetch(`https://restcountries.eu/rest/v2/name/usa`);
  console.log(newRequest); */
  

  /* const getCountryData = function(country ) {
    // This returns a promise and we have to call the then() method on it
    // The then method is what returns a promise and it always returns a promise
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(ajaxResponse) {
        console.log(ajaxResponse);
        // The json method also returns a promise so we have to control for that as well and thus need another callback function
        return ajaxResponse.json().then(function(jsonConvertedProm){
            console.log(jsonConvertedProm);
            renderCountry(jsonConvertedProm[0]);
        });
    });
  }; */


// Promises don't get rid of callbacks, they just get rid of callback hell!

  const getCountryData = function(country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(ajaxResponse => ajaxResponse.json())
    .then(jsonData => {
        renderCountry(jsonData[0]);
        const neighbor = jsonData[0].borders[0];

        if(!neighbor) return;

        // Always return a promise and handle it outside of the callback then function
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    })
        .then(ajaxResponse2 => ajaxResponse2.json())
        .then(jsonData2 => { 
            renderCountry(jsonData2, `neighbour`);
        })
        // Add your error at the end of all the callbacks to catch your error for all promise rejections
        .catch(err => {
            console.error(`${err}!!!!!`);
        renderError(`Something went wrong!!! ${err.message}. Try again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
};


btn.addEventListener('click', function () {
    getCountryData(`usa`);
});

getCountryData(`namek`);