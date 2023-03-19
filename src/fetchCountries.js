import './css/styles.css';


// searchCounter();

// fetchCounter()
// .then(country)
// .catch(error => console.log(error));

// function fetchCounter() {
//     return fetch('https://restcountries.com/v3.1/name/deutschland')
//     .then(response => { 
//         return response.json();
//     // })
//     // .then(searchCounter)
//     // .catch(error => {
//     //     console.log(error);
//     });
// }





export function fetchCounter(name) {
    return fetch(`https://restcountries.com/v3.1/name//${name}`)
      .then(response => response.json());
}
