
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
    const movieDiv = document.createElement('div')
    const movieName = document.createElement('h3')
    movieName.textContent = `${movie.name}`
    // const movieAverageRating = document.createElement('p')
    // movieAverageRating.innerHTML = `Average Rating:${movie.average_rating}`
    const movieImg = document.createElement('img')
    movieDiv.append(movieImg, movieName)
    movieProfile.append(movieDiv)
    const ulMovie = document.createElement('ul')
    movieDiv.appendChild(ulMovie)
    movie.reviews.forEach(review => {
        const movieReview = document.createElement('li')
        movieReview.innerHTML = `<blockquote>${review.comment}</blockquote> <cite>${review.username}</cite><br><p id="likes-${review.id}">Likes: ${review.likes} <button id="like-${review.id}">like</button></p><br>`
        ulMovie.appendChild(movieReview)
        let likes = review.likes
        updateLikes(review, likes)
        })
    movieImg.className = 'img-fluid'
    movieImg.src = movie.image_url
    const reviewBtn = document.createElement('button')
    reviewBtn.innerText = 'New Review'
    movieDiv.appendChild(reviewBtn)
    const reviewForm = document.createElement('form')
    reviewForm.id = `review-${movie.id}`
    reviewForm.innerHTML = `<input type="textarea" name= "username" placeholder= 'Enter Your Name'>
    <input type="textarea" name= "review" placeholder= 'Enter Your Review'>
    <select name= "stars">
        <option value= "0"> 0 Stars </option>
        <option value= "1"> 1 Star </option>
        <option value= "2"> 2 Stars </option>
        <option value= "3"> 3 Stars </option>
        <option value= "4"> 4 Stars </option>
        <option value= "5"> 5 Stars </option>
    </select>
    <input type='submit' value='make it so'>`
    movieDiv.appendChild(reviewForm)
    addReview(movie)

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

 function updateLikes(review, likes) {
    let allLikes = likes
    let likeButton = document.getElementById(`like-${review.id}`)
    likeButton.addEventListener('click', () => {
       allLikes++
        document.getElementById(`likes-${review.id}`).innerHTML = `Likes: ${allLikes} <button id="like-${review.id}">like</button>`
    fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            likes: allLikes
        })
    })

})

 }

 function addReview(movie) {
     let rForm = document.getElementById(`review-${movie.id}`)
     console.log(rForm)
     rForm.addEventListener('submit', e => {
         e.preventDefault();
         newReview = {
             username: e.target.username.value,
             comment: e.target.review.value,
             rating: e.target.stars.value,
             likes: 0,
             movie_id: movie.id
         };

         if (movie.id === 6 && e.target.stars.value !== '0') {
            
            alert('Ragnarock is a trash movie. You cannot rate it above 0 stars.')}
        else {


         fetch('http://localhost:3000/reviews/', {
             method: "POST",
             headers: {
                 'content-type': 'application/json',
                 accept: 'application/json'
             },
             body: JSON.stringify(newReview)
         })
         .then(res => res.json())
         .then(review => {
            const ulMovie = document.querySelector('ul')
            const movieReview = document.createElement('li')
               movieReview.innerHTML = `<blockquote>${review.comment}</blockquote> <cite>${review.username}</cite><br><p id="likes-${review.id}">Likes: ${review.likes} <button id="like-${review.id}">like</button></p><br>`
               ulMovie.appendChild(movieReview)
         })
        }
     })
     
 }
