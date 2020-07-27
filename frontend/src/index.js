const urlMovies = 'http://localhost:3000/movies'
const reviews = 'http://localhost:3000/reviews'

fetch(urlMovies)
 .then(res =>res.json())
 .then(movies => {
     for (const movie of movies ){
         createDropdown(movie)
     }
 })

 //dropdown to show movies
 function createDropdown(movie){
     const selectMovie = document.querySelector('#movie')
     const optionMovie = document.createElement('option')
     optionMovie.value = `${movie.name}`
     optionMovie.innerHTML = `${movie.name}`
     optionMovie.id = `${movie.id}`
     selectMovie.append(optionMovie)
 }

 
    const form = document.querySelector('#movie-form');
    const selectMovie = document.querySelector('#movie')
    form.addEventListener('click', (e) => {
        
        e.preventDefault()
        const selectMovieId = selectMovie.options[selectMovie.selectedIndex].id
   
        movieID = selectMovieId
        //reset dropdown menu to default
        
   
    //pass information taken from user inputs to find the fighter
        movieFind(selectMovieId)
        form.reset()
    })

  

 

 function movieFind(selectMovieId){
     fetch(`${urlMovies}/${selectMovieId}`)
     .then(res => res.json())
     .then(res => showMovie(res))
  }

 function showMovie(movie){
  
    const movieProfile = document.querySelector('#movie-profile')
    movieProfile.innerHTML = ''
    movieProfile.className = 'container-left'
    const ulMovie = document.createElement('ul')
    const movieName = document.createElement('h3')
    movieName.textContent = `${movie.name}`
    const movieAverageRating = document.createElement('li')
    movieAverageRating.innerHTML = `Average Rating:${movie.average_rating}`
    const movieImg = document.createElement('img')
    movieImg.className = 'img-fluid'
    movieImg.src = movie.image_url

    ulMovie.append(movieImg, movieName, movieAverageRating)
    movieProfile.append(ulMovie)
 }