


const BASE_URL = 'https://restcountries.com/v3.1';


function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}`).then(response => response.json(),
  );
}



// function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}`)
//       .then(response => response.json()
// );
// }


export default { fetchCountries };