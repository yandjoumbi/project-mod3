
const urlMovies = 'http://localhost:3000/movies'
const reviews = 'http://localhost:3000/reviews'
getMovies()
function getMovies() {
fetch(urlMovies)
 .then(res =>res.json())
 .then(movies => {
     for (const movie of movies ){
         createDropdown(movie)
     }
 })
}

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
    form.addEventListener('change', (e) => {
        e.preventDefault()
        // let newForm = document.getElementById('new-form-div')
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
    let avg = avgRating(movie)
    setAvgRating(movie, avg)
    const movieProfile = document.getElementById('movie-profile')
    movieProfile.className = ''
    movieProfile.innerHTML = ''
    const movieDiv = document.createElement('div')
    movieDiv.id = 'movie-div'
    movieDiv.classList = 'movie-display'
    const movieName = document.createElement('h3')
    movieName.textContent = `${movie.name}`
    const movieAverageRating = document.createElement('p')
    movieAverageRating.innerHTML = `Average Rating:${avg.toFixed(1)}`
    const movieImg = document.createElement('img')
    movieDiv.append(movieImg, movieName)
    movieDiv.appendChild(movieAverageRating)
    movieProfile.append(movieDiv)
    const ulMovie = document.createElement('ul')
    ulMovie.id = 'ul-reviews'
    movieDiv.appendChild(ulMovie)
    

    movieReviews(movie)

    movieImg.className = 'pic'
    movieImg.src = movie.image_url

    makeReviewForm(movie)

    // newReview(movie)
    
    addReview(movie)

 }

//  function newReview(movie) {
//     let reviewBtn = document.getElementById('review-button')
//     reviewBtn.addEventListener('click', () => {
//         let revForm = document.getElementById(`review-${movie.id}`)
//         revForm.className = 'review-form-clicked'
//     })
//  }

 function addMovie(movieInfo) {
    fetch(urlMovies, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(movieInfo)
    })
    .then(res => res.json())
    .then(movie => {
    createDropdown(movie)
    })

    
 }


 function updateLikes(review, likes) {
     console.log(likes)
    let allLikes = likes
    let likeButton = document.getElementById(`like-${review.id}`)
    likeButton.addEventListener('click', () => {
        console.log(likeButton)
        console.log(review.id)
       allLikes++
       console.log(allLikes)
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
            movieReview.className = 'list'
               movieReview.innerHTML = `<blockquote>${review.comment}</blockquote> <cite>${review.username}</cite><br><p id="likes-${review.id}">Likes: ${review.likes} <button id="like-${review.id}">like</button></p><br>`
               ulMovie.appendChild(movieReview),
               setAvgRating(movie)
         })
        }
     })
 }


 function movieReviews(movie) {
     ulMovie = document.getElementById('ul-reviews')
    movie.reviews.forEach(review => {
        const movieReview = document.createElement('div')
        movieReview.className = 'list'
        movieReview.innerHTML = `Comment: <blockquote>${review.comment}</blockquote> <cite>${review.username}</cite><br><p id="likes-${review.id}">Likes: ${review.likes} <button id="like-${review.id}">Like</button></p><br>`
        ulMovie.appendChild(movieReview)
        like(review)
        })
 }

 function makeReviewForm(movie) {
    const movieDiv = document.getElementById('movie-div')
    const reviewForm = document.createElement('form')
    reviewForm.classList.add('review-form')
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
 }


 function like(review) {
     console.log(review)
    let likes = review.likes
    updateLikes(review, likes)
 }

function avgRating(movie) {
    ratings = []
    movie.reviews.forEach(review => {
        ratings.push(review.rating)
    })
    let avg = 0
    let total = 0
    ratings.forEach(rating => {
        total = total + rating
    })
    if (ratings.length == 0) {
         avg = 0
    }
    else {
        avg = total / ratings.length
    }
    return avg
}



function setAvgRating(movie, avg) {
    fetch(`${urlMovies}/${movie.id}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            average_rating: avg
        })
    })
}
