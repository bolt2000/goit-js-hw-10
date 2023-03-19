// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

/* <body>
<input type="text" id="search-box" />
<ul class="country-list"></ul>
<div class="country-info"></div>

<script src="index.js" type="module"></script>
// </body> */

import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { API } from './api-service';

const DEBOUNCE_DELAY = 300;

const refs = {
countryInput: document.querySelector('#search-box'),
countryList: document.querySelector('.country-list'),
countryInfo: document.querySelector('.country-info'),
};


refs.countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
     const form = e.currentTarget;
    const countrySearch = refs.countryInput.value.trim();

  //  if (countrySearch === '') {
  //     refs.countryList.innerHTML = ''
  //     refs.countryInfo.innerHTML = ''
  //     return       
  //     }

  
  API.fetchCountries(countrySearch)
    .then(renderCountry)
    .catch(error => Notify.failure('Не корректний запит або мало символів'))
    .finally(() => form.reset());
}

// const BASE_URL = 'https://restcountries.com/v3.1/name';
// function fetchCountries(name) {
//   return fetch(`${BASE_URL}/${name}`).then(response => response.json(),
//   );
// }


function renderCountryList(evt) {
  refs.countryList.innerHTML = evt
    .map(country => {
      return `
                  <li class="country-item">
      <img class="list-image" src=${flags.svg} />     
      <p class="country-name">${country.name.official}</p>
      </li>`
    })
    .join('');
}



function renderCountryInfo(evt) {

   refs.countryInfo.innerHTML = evt
            .map(country => {
            return `
      <img src = "${country.flags.svg}" alt="Flag country" width="50" /> 
      <h2>${country.name.official}</h2>
      <ul>
      <li>Capital:</li>
      <span>${country.capital}</span> 
      <li>Population:</li>
      <span> ${country.population}</span>
      <li>Languages:</li>
      <span> ${Object.values(country.languages).join()}</span>
      </ul>`
      })
      .join('');
         
      }    


function renderCountry(country) {


  //   if (country.length > 10 ) {
  //   Notiflix.Notify.warning('Too many'); 
    
  // } else if (country.length >= 2 && country.length <= 10) {
  //   renderCountryList(country);     

  // } else {
  //   renderCountryInfo(country);
        
  // }

  if (country.length > 10 && country.length < 1) {
    Notiflix.Notify.warning('Too many'); 
    
  } else if (country.length > 1 && country.length <= 10) {
    renderCountryList(country);     

  } else {
    renderCountryInfo(country);
        
  }
}
  

