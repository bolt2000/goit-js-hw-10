
// import debounce from 'lodash.debounce';

const BASE_URL = 'https://restcountries.com/v3.1/name';


function fetchCountries(name) {

  return fetch(`${BASE_URL}/${name}`)
 
    .then(response => {
    
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}


export default { fetchCountries };