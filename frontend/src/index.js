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
    form.addEventListener('submit', (e) => {
        
        e.preventDefault()
        const selectMovieId = selectMovie.options[selectMovie.selectedIndex].id
   
        movieID = selectMovieId
        //reset dropdown menu to default
        
   
    //pass information taken from user inputs to find the fighter
        movieFind(selectMovieId)
        form.reset()
    })

    const movieForm = document.getElementById('new-movie')
    movieForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const movieInfo = {
           name: e.target.movie.value,
           average_rating: 0,
           image_url: e.target.image.value
        }
        //reset dropdown menu to default
        
   
    //pass information taken from user inputs to find the fighter
        addMovie(movieInfo)
        movieForm.reset()
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
    const movieAverageRating = document.createElement('p')
    movieAverageRating.innerHTML = `Average Rating:${movie.average_rating}`
    const movieImg = document.createElement('img')
    ulMovie.append(movieImg, movieName, movieAverageRating)
    movieProfile.append(ulMovie)
    movie.reviews.forEach(review => {
        const movieReview = document.createElement('li')
        movieReview.innerHTML = `${review.comment} <button id=${review.id}>like</button>`
        ulMovie.appendChild(movieReview)
    })
    movieImg.className = 'img-fluid'
    movieImg.src = movie.image_url
    const reviewBtn = document.createElement('button')
    reviewBtn.innerText = 'New Review'
    ulMovie.appendChild(reviewBtn)

    
 }

 function addMovie(movieInfo) {
    fetch(urlMovies, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(movieInfo)
    })
 }