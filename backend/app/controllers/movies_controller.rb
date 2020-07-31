class MoviesController < ApplicationController

    def index 
        movies = Movie.all 
        render json: movies
    end

    def show
        movie = Movie.find(id: params[:id])
        render json: movie, include: [:reviews]
    end

    def create
        movie = Movie.create(movie_params)
        
        render json: movie
    end

    def update
        movie = Movie.find(params[:id])
        movie.update(movie_params)
        render json: movie
    end

    private

    def movie_params
        params.require(:movie).permit(:name, :image_url, :average_rating)
    end
   

end
