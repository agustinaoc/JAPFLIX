const Movies_Data = "https://japceibal.github.io/japflix_api/movies-data.json";
const lista = document.getElementById("lista"); // Donde se mostrarán las películas
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("inputBuscar");
let moviesList = []; // Para guardar las películas
function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(movies => {
            moviesList = movies; //Guarda las películas en un array
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
//Moastrar películas
function showMovies(array) {
    lista.innerHTML = ""; //Borra el contenido existente
    array.forEach(movie => {
        let date = new Date(movie.release_date); //Crea un objeto Date
        let year = date.getFullYear(); //Obtiene solo el año
        let stars = "";
        let vote = Math.round((movie.vote_average / 2)); //Divide la puntuación de la película y redondea el resultado
        let i = 0
        for (i = 0; i < 5; i++) { //Pinta las estrellas en base al voto
            if (i < vote) {
                stars += `<i class="fa fa-star checked" aria-hidden="true"></i>`
            } else {
                stars += `<i class="fa fa-star unchecked" aria-hidden="true"></i>`
            }
        }
        lista.innerHTML += `
        <li class="movieItem row" data-movie-id="${movie.id}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${movie.id}" aria-controls="offcanvasTop${movie.id}">
          <div class="col-10"><h2>${movie.title}</h2>
          <p>${movie.tagline}</p></div>
          <div class="col-2"><p class="rating">${stars}</p></div>
        </li>
        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${movie.id}" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
        <h5 id="offcanvasTopLabel">${movie.title}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
  <div class="offcanvas-body">
    <p>${movie.overview}</p><hr>
    <div class="row"><p class="col-11">${movie.genres.map(genre => genre.name).join(" - ")}</p>
    <div class="dropdown col-1">
  <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    More
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><p class="dropdown-item">Year: ${year}</p></li>
    <li><p class="dropdown-item">Runtime: ${movie.runtime}min</p></li>
    <li><p class="dropdown-item">Budget: $${movie.budget}</p></li>
    <li><p class="dropdown-item">Revenue: $${movie.revenue}</p></li>
  </ul>
</div>
</div>
</div>
</div>`;
    });
}
//Filtra en base al input
function searchMovie() {
    btnBuscar.addEventListener("click", function () {
        const input = inputBuscar.value.toLowerCase();
        let filtered = moviesList.filter(movie => {
            return movie.title.toLowerCase().includes(input) || movie.genres.some(genre => genre.name.toLowerCase().includes(input)) || movie.tagline.toLowerCase().includes(input) || movie.overview.toLowerCase().includes(input)
        })
        showMovies(filtered);
    })
}
document.addEventListener("DOMContentLoaded", function () {
    getData(Movies_Data);
    searchMovie();
});