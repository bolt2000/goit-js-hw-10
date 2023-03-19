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
import API from './api-service';
import getRefs from './get-refs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

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
    .catch(error => onFetchError())
    // .finally(() => form.reset())
    ;
}


function renderCountryList(e) {

   refs.countryList.innerHTML = e.map(country => {
        return `
          <img src = "${country.flags.svg}" alt="Flag country" width="50" /> 
          <h2>${country.name.official}</h2>
          `
        })
    .join('');       
}    


function renderCountryInfo(e) {

   refs.countryInfo.innerHTML = e.map(country => {
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


    if (country.length > 10 ) {
    Notiflix.Notify.warning('Too many'); 
    
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryList(country);     

  } else {
    renderCountryInfo(country);
        
  }

  // if (country.length > 10 && country.length < 1) {
  //   Notiflix.Notify.warning('Too many'); 
    
  // } else if (country.length > 1 && country.length <= 10) {
  //   renderCountryList(country);     

  // } else {
  //   renderCountryInfo(country);
        
  // }
}
  

function onFetchError(error) {
  Notify.warning('Не корректний запит або мало символів')
}
