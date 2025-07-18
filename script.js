const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


const movies = getMovie(API_URL); 

//showMovies(movies);

async function getMovie (url) {
    const res = await fetch(url);
    const data = await res.json();

    const movies = data.results;
    showMovies(movies);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {

        const {title , poster_path , vote_average , overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div> 

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`

        main.appendChild(movieEl);
        
    });
}

function getClassByRate (vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5 ) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit' , (e) => {
    e.preventDefault();

    const searchterm = search.value;

    if(searchterm && searchterm !== '') {
        getMovie(SEARCH_API + searchterm);

        search.value = '';
    } else {
        window.location.reload();
    }
})
