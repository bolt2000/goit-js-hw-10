

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
  
    const countrySearch = refs.countryInput.value.trim();

   if (countrySearch === '') {
     refs.countryList.innerHTML = '';
     refs.countryInfo.innerHTML = '';
      return       
      }

  
  API.fetchCountries(countrySearch)
    .then(renderCountry)
    .catch(error => onFetchError())
    ;
}

function renderCountry(country) {


  if (country.length > 10) {
  
    Notify.warning('Немає такої країни');
    
  } else if (country.length >= 2) {
     refs.countryInfo.innerHTML = '';
    renderCountryList(country);
    

  } else {
    refs.countryList.innerHTML = '';
    renderCountryInfo(country);
        
  }

}


function renderCountryList(e) {

   refs.countryList.innerHTML = e.map(country => {
     return `
        <li class="country-item">
          <img src = "${country.flags.svg}" alt="Flag country" width="30" /> 
          <h2 class="name">${country.name.official}</h2>
          </li>
          `
        })
    .join('');  
   clearName(refs.renderCountryInfo);
}    


function renderCountryInfo(e) {

   refs.countryInfo.innerHTML = e.map(country => {
     return `
     <ul>
        <li class="country-item">
          <img src = "${country.flags.svg}" alt="Flag country" width="30" /> 
          <h2 class="name">${country.name.official}</h2>
            </li>
          
                 <li><span class="info">Capital:</span> ${country.capital}</li>
                
            <li><span class="info">Population:</span> ${country.population}</li>
               
            <li><span class="info">Languages:</span> ${Object.values(country.languages).join()}</li> 
          </ul>`
        })
    .join('');       
}    
  
function onFetchError(error) {
  Notify.info('Знайдено занадто багато совпадінь. Введіть більш конкретну назву')
}
